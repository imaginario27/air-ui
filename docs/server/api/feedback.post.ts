import { FeedbackType } from '@/models/enums/feedbacks'

export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig()

    // Read multipart form
    const parts = await readMultipartFormData(event)

    if (!parts) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Invalid form data',
        })
    }

    const fields: Record<string, any> = {}
    const files: any[] = []

    for (const part of parts) {
        if (part.filename) {
            files.push(part)
        } else if (part.name) {
            fields[part.name] = part.data.toString()
        }
    }

    const metadata = fields.metadata ? JSON.parse(fields.metadata) : {}

    const labels = [
        fields.type === FeedbackType.BUG
            ? FeedbackType.BUG
            : FeedbackType.SUGGESTION,
        'docs',
    ]

    const reportedBy = fields.github
        ? `<a href="https://github.com/${fields.github}" target="_blank" rel="noopener noreferrer">@${fields.github}</a>`
        : 'Anonymous'

    /*
    |--------------------------------------------------------------------------
    | Upload images to GitHub repo
    |--------------------------------------------------------------------------
    */

    const uploadImageToGithub = async (file: any) => {
        const path = `feedback-images/${Date.now()}-${file.filename}`

        const base64 = file.data.toString('base64')

        await $fetch(
            `https://api.github.com/repos/${config.githubRepo}/contents/${path}`,
            {
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${config.githubToken}`,
                    Accept: 'application/vnd.github+json',
                },
                body: {
                    message: `upload feedback image ${file.filename}`,
                    content: base64,
                    branch: 'main',
                },
            }
        )

        return `https://raw.githubusercontent.com/${config.githubRepo}/main/${path}`
    }

    const imageUrls: string[] = []

    for (const file of files) {
        const url = await uploadImageToGithub(file)
        imageUrls.push(url)
    }

    /*
    |--------------------------------------------------------------------------
    | Build screenshots markdown
    |--------------------------------------------------------------------------
    */

    const screenshotsSection = imageUrls.length
        ? `

---

## Screenshots

${imageUrls.map((url) => `![Screenshot](${url})`).join('\n\n')}
`
        : ''

    /*
    |--------------------------------------------------------------------------
    | Issue body
    |--------------------------------------------------------------------------
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
    |--------------------------------------------------------------------------
    | Create GitHub issue
    |--------------------------------------------------------------------------
    */

    const githubApiURL = `https://api.github.com/repos/${config.githubRepo}/issues`

    const issue = await $fetch(githubApiURL, {
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
    })

    return issue
})