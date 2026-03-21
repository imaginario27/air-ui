import {
    applyRateLimit,
    buildIssueBody,
    createIssueInGitHub,
    ensureNotDuplicate,
    normalizeAndValidateFields,
    parseMetadata,
    parseMultipartPayload,
    uploadScreenshots,
    validateFiles,
    verifyTurnstileToken,
} from '@/server/utils/feedbackSubmission'
import type { RuntimeConfigWithTurnstile } from '@/models/types/feedbackSubmission'

export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig() as RuntimeConfigWithTurnstile
    const clientIp = getRequestIP(event, { xForwardedFor: true }) || 'unknown'

    applyRateLimit(clientIp)

    const parts = await readMultipartFormData(event)

    if (!parts) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Invalid form data',
        })
    }

    const { fields, files } = parseMultipartPayload(parts)
    const normalized = normalizeAndValidateFields(fields)

    if (config.turnstileSecretKey) {
        await verifyTurnstileToken(config.turnstileSecretKey, normalized.turnstileToken, clientIp)
    }

    ensureNotDuplicate({
        clientIp,
        type: normalized.type,
        title: normalized.title,
        description: normalized.description,
    })

    const metadata = parseMetadata(fields.metadata)
    validateFiles(files)

    const labels = [normalized.type, 'docs']
    const reportedBy = normalized.github
        ? `<a href="https://github.com/${normalized.github}" target="_blank" rel="noopener noreferrer">@${normalized.github}</a>`
        : 'Anonymous'
    const imageUrls = await uploadScreenshots(files)
    const issueBody = buildIssueBody({
        page: normalized.page,
        reportedBy,
        type: normalized.type,
        description: normalized.description,
        imageUrls,
        metadata,
    })

    return createIssueInGitHub({
        config,
        type: normalized.type,
        title: normalized.title,
        labels,
        issueBody,
    })
})