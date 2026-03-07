import { FeedbackType } from '@/models/enums/feedbacks'

export default defineEventHandler(async (event) => {
    const body = await readBody(event)

    const config = useRuntimeConfig()

    const labels = [
        body.type === FeedbackType.BUG ? FeedbackType.BUG : FeedbackType.SUGGESTION,
        'docs',
    ]

    const metadata = body.metadata || {}

    const issueBody = `
Page:
${body.page}

Type:
${body.type}

Description:
${body.description}

---

Environment

URL: ${metadata.url || 'N/A'}
Browser: ${metadata.browser || 'N/A'}
OS: ${metadata.os || 'N/A'}
Viewport: ${metadata.viewport || 'N/A'}
Language: ${metadata.language || 'N/A'}
User Agent: ${metadata.userAgent || 'N/A'}
`

    const githubApiURL = `https://api.github.com/repos/${config.githubRepo}/issues`

    const issue = await $fetch(githubApiURL, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${config.githubToken}`,
            Accept: 'application/vnd.github+json',
        },
        body: {
            title: `[${body.type === FeedbackType.BUG ? FeedbackType.BUG : FeedbackType.SUGGESTION}] ${body.title}`,
            labels,
            body: issueBody.trim(),
        },
    })

    return issue
})