import { FeedbackType } from '@/models/enums/feedbacks'

export default defineEventHandler(async (event) => {
    const body = await readBody(event)

    const config = useRuntimeConfig()

    const labels = [
        body.type === FeedbackType.BUG ? FeedbackType.BUG : FeedbackType.SUGGESTION,
        'docs',
    ]

    const metadata = body.metadata || {}

    const reportedBy = body.github
    ? `<a href="https://github.com/${body.github}" target="_blank" rel="noopener noreferrer">@${body.github}</a>`
    : 'Anonymous'

    const issueBody = `
**Page**
${body.page}

**Reported by**
${reportedBy}

**Type**
${body.type}

---

## Description
${body.description}

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

    const githubApiURL = `https://api.github.com/repos/${config.githubRepo}/issues`

    const issue = await $fetch(githubApiURL, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${config.githubToken}`,
            Accept: 'application/vnd.github+json',
        },
        body: {
            title: `[${body.type}] ${body.title}`,
            labels,
            body: issueBody.trim(),
        },
    })

    return issue
})