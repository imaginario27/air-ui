import { FeedbackType } from '@/models/enums/feedbacks'
import { FieldMaxLength } from '@/models/constants/form'
import type {
    BuildIssueBodyPayload,
    CreateGitHubIssuePayload,
    DuplicateFeedbackPayload,
    NormalizedFeedbackFields,
    SpamGuardState,
    TurnstileVerifyResponse,
} from '@/models/types/feedbackSubmission'
import { uploadFeedbackImage } from '@/server/utils/uploadFeedbackImage'
import { createHash } from 'node:crypto'
import type { MultiPartData } from 'h3'

const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000
const RATE_LIMIT_MAX_REQUESTS = 5
const MIN_SUBMIT_TIME_MS = 2_000
const MAX_SUBMIT_AGE_MS = 24 * 60 * 60 * 1000
const DEDUPE_WINDOW_MS = 30 * 60 * 1000

const globalState = globalThis as typeof globalThis & {
    __feedbackSpamGuardState?: SpamGuardState
}

const spamGuardState: SpamGuardState = globalState.__feedbackSpamGuardState ?? {
    ipRequests: new Map<string, number[]>(),
    payloadFingerprints: new Map<string, number>(),
}

globalState.__feedbackSpamGuardState = spamGuardState

const normalizeWhitespace = (value: string | undefined) => (value || '').replaceAll(/\s+/g, ' ').trim()

const throwBadRequest = (statusMessage: string) => {
    throw createError({
        statusCode: 400,
        statusMessage,
    })
}

const validateSubmissionTiming = (submittedAtRaw: string | undefined) => {
    const submittedAt = Number(submittedAtRaw || '')

    if (!Number.isFinite(submittedAt)) {
        throwBadRequest('Missing submission timestamp')
    }

    const submitDuration = Date.now() - submittedAt

    if (submitDuration < MIN_SUBMIT_TIME_MS || submitDuration > MAX_SUBMIT_AGE_MS) {
        throwBadRequest('Invalid submission timing')
    }
}

export const parseMultipartPayload = (parts: MultiPartData[]) => {
    const fields: Record<string, string> = {}
    const files: MultiPartData[] = []

    for (const part of parts) {
        if (part.filename) {
            files.push(part)
            continue
        }

        if (part.name) {
            fields[part.name] = part.data.toString()
        }
    }

    return {
        fields,
        files,
    }
}

export const applyRateLimit = (ip: string) => {
    const now = Date.now()
    const existing = spamGuardState.ipRequests.get(ip) || []
    const recent = existing.filter((timestamp) => now - timestamp < RATE_LIMIT_WINDOW_MS)

    if (recent.length >= RATE_LIMIT_MAX_REQUESTS) {
        throw createError({
            statusCode: 429,
            statusMessage: 'Too many feedback submissions. Please try again later.',
        })
    }

    recent.push(now)
    spamGuardState.ipRequests.set(ip, recent)
}

export const normalizeAndValidateFields = (fields: Record<string, string>): NormalizedFeedbackFields => {
    if (normalizeWhitespace(fields.website)) {
        throwBadRequest('Invalid submission')
    }

    validateSubmissionTiming(fields.clientSubmittedAt)

    const title = normalizeWhitespace(fields.title)
    const description = (fields.description || '').trim()
    const github = normalizeWhitespace(fields.github).replace(/^@/, '')
    const page = normalizeWhitespace(fields.page)
    const type = fields.type === FeedbackType.BUG
        ? FeedbackType.BUG
        : FeedbackType.SUGGESTION
    const turnstileToken = normalizeWhitespace(fields.turnstileToken)

    if (!title || !description) {
        throwBadRequest('Title and description are required')
    }

    if (title.length > FieldMaxLength.GITHUB_ISSUE_SUBJECT) {
        throwBadRequest('Title is too long')
    }

    if (description.length > FieldMaxLength.GITHUB_ISSUE_DESCRIPTION) {
        throwBadRequest('Description is too long')
    }

    if (github.length > FieldMaxLength.GITHUB_ISSUE_USERNAME || (github && !/^[a-z\d](?:[a-z\d]|-(?=[a-z\d])){0,38}$/i.test(github))) {
        throwBadRequest('Invalid GitHub username')
    }

    if (!page || page.length > 500) {
        throwBadRequest('Invalid page value')
    }

    return {
        title,
        description,
        github,
        page,
        type,
        turnstileToken,
    }
}

export const verifyTurnstileToken = async (turnstileSecretKey: string, turnstileToken: string, clientIp: string) => {
    if (!turnstileToken) {
        throwBadRequest('Captcha verification required')
    }

    let verification: TurnstileVerifyResponse

    try {
        verification = await $fetch<TurnstileVerifyResponse>('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
            method: 'POST',
            body: new URLSearchParams({
                secret: turnstileSecretKey,
                response: turnstileToken,
                remoteip: clientIp,
            }),
        })
    } catch {
        throw createError({
            statusCode: 502,
            statusMessage: 'Captcha verification failed',
        })
    }

    if (!verification.success) {
        throwBadRequest('Captcha verification failed')
    }
}

export const ensureNotDuplicate = ({
    clientIp,
    type,
    title,
    description,
}: DuplicateFeedbackPayload) => {
    const fingerprint = createHash('sha256')
        .update([clientIp, type, title.toLowerCase(), description.toLowerCase()].join('|'))
        .digest('hex')
    const now = Date.now()

    for (const [key, timestamp] of spamGuardState.payloadFingerprints.entries()) {
        if (now - timestamp >= DEDUPE_WINDOW_MS) {
            spamGuardState.payloadFingerprints.delete(key)
        }
    }

    const existing = spamGuardState.payloadFingerprints.get(fingerprint)

    if (existing && now - existing < DEDUPE_WINDOW_MS) {
        throw createError({
            statusCode: 429,
            statusMessage: 'Duplicate feedback detected. Please wait before sending the same message.',
        })
    }

    spamGuardState.payloadFingerprints.set(fingerprint, now)
}

export const parseMetadata = (metadataRaw: string | undefined) => {
    if (!metadataRaw) {
        return {} as Record<string, string>
    }

    try {
        return JSON.parse(metadataRaw) as Record<string, string>
    } catch {
        return {} as Record<string, string>
    }
}

export const validateFiles = (files: MultiPartData[]) => {
    const allowedTypes = new Set([
        'image/png',
        'image/jpeg',
    ])

    const maxFiles = 4
    const maxSize = 250 * 1024

    if (files.length > maxFiles) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Too many files',
        })
    }

    for (const file of files) {
        if (!file.type || !allowedTypes.has(file.type)) {
            throw createError({
                statusCode: 400,
                statusMessage: 'Invalid file type',
            })
        }

        if (file.data.length > maxSize) {
            throw createError({
                statusCode: 400,
                statusMessage: 'File too large',
            })
        }
    }
}

export const uploadScreenshots = async (files: MultiPartData[]) => {
    if (!files.length) {
        return [] as string[]
    }

    const uploads = await Promise.all(
        files.map((file) =>
            uploadFeedbackImage({
                data: file.data,
                filename: file.filename,
                type: file.type,
            }),
        ),
    )

    return uploads.map((upload) => upload.secure_url)
}

export const buildIssueBody = ({
    page,
    reportedBy,
    type,
    description,
    imageUrls,
    metadata,
}: BuildIssueBodyPayload) => {
    const screenshotsSection = imageUrls.length
        ? `

---

## Screenshots

${imageUrls.map((url) => `![Screenshot](${url})`).join('\n\n')}
`
        : ''

    return `
**Page**
${page}

**Reported by**
${reportedBy}

**Type**
${type}

---

## Description
${description}

${screenshotsSection}

---

## Environment

- **URL:** ${metadata.url || 'N/A'}
- **Browser:** ${metadata.browser || 'N/A'}
- **OS:** ${metadata.os || 'N/A'}
- **Viewport:** ${metadata.viewport || 'N/A'}
- **Language:** ${metadata.language || 'N/A'}

<details>
<summary><strong>User Agent</strong></summary>

${metadata.userAgent || 'N/A'}

</details>
`
}

export const createIssueInGitHub = async ({
    config,
    type,
    title,
    labels,
    issueBody,
}: CreateGitHubIssuePayload) => {
    try {
        return await $fetch(
            `https://api.github.com/repos/${config.githubRepo}/issues`,
            {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${config.githubToken}`,
                    Accept: 'application/vnd.github+json',
                },
                body: {
                    title: `[${type}] ${title}`,
                    labels,
                    body: issueBody.trim(),
                },
            },
        )
    } catch (error: unknown) {
        const maybeError = error as { statusCode?: number }
        throw createError({
            statusCode: maybeError?.statusCode || 500,
            statusMessage: 'Failed to create GitHub issue',
        })
    }
}