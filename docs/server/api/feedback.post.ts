import { FeedbackType } from '@/models/enums/feedbacks'
import { uploadFeedbackImage } from '@/server/utils/uploadFeedbackImage'

export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig()

    const parts = await readMultipartFormData(event)

    if (!parts) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Invalid form data',
        })
    }

    const fields: Record<string, string> = {}
    const files: any[] = []

    for (const part of parts) {
        if (part.filename) {
            files.push(part)
        } else if (part.name) {
            fields[part.name] = part.data.toString()
        }
    }

    /*
        Parse metadata safely
    */

    let metadata: Record<string, any> = {}

    if (fields.metadata) {
        try {
            metadata = JSON.parse(fields.metadata)
        } catch {
            metadata = {}
        }
    }

    /*
        File validation
    */

    const allowedTypes = [
        'image/png',
        'image/jpeg',
    ]

    const maxFiles = 4
    const maxSize = 250 * 1024

    if (files.length > maxFiles) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Too many files',
        })
    }

    for (const file of files) {
        if (!allowedTypes.includes(file.type)) {
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

    /*
        Labels
    */
    const labels = [
        fields.type === FeedbackType.BUG
            ? FeedbackType.BUG
            : FeedbackType.SUGGESTION,
        'docs',
    ]

    /*
        Reporter
    */
    const reportedBy = fields.github
        ? `<a href="https://github.com/${fields.github}" target="_blank" rel="noopener noreferrer">@${fields.github}</a>`
        : 'Anonymous'


    /*
        Upload screenshots
    */
    const imageUrls: string[] = []

    if (files.length) {
        const uploads = await Promise.all(
            files.map((file) =>
                uploadFeedbackImage({
                    data: file.data,
                    filename: file.filename,
                    type: file.type,
                }),
            ),
        )

        uploads.forEach((upload) => {
            imageUrls.push(upload.secure_url)
        })
    }

    /*
        Screenshot markdown
    */
    const screenshotsSection = imageUrls.length
        ? `

---

## Screenshots

${imageUrls.map((url) => `![Screenshot](${url})`).join('\n\n')}
`
        : ''

    /*
        Issue body
    */

    const issueBody = `
**Page**
${fields.page}

**Reported by**
${reportedBy}

**Type**
${fields.type}

---

## Description
${fields.description}

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

    /*
        Create GitHub issue
    */
    try {
        const issue = await $fetch(
            `https://api.github.com/repos/${config.githubRepo}/issues`,
            {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${config.githubToken}`,
                    Accept: 'application/vnd.github+json',
                },
                body: {
                    title: `[${fields.type}] ${fields.title}`,
                    labels,
                    body: issueBody.trim(),
                },
            },
        )

        return issue
    } catch (error: any) {
        throw createError({
            statusCode: error?.statusCode || 500,
            statusMessage: 'Failed to create GitHub issue',
        })
    }
})