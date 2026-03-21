export type SpamGuardState = {
    ipRequests: Map<string, number[]>
    payloadFingerprints: Map<string, number>
}

export type TurnstileVerifyResponse = {
    success: boolean
    'error-codes'?: string[]
}

export type RuntimeConfigWithTurnstile = {
    githubToken: string
    githubRepo: string
    turnstileSecretKey?: string
}

export type NormalizedFeedbackFields = {
    title: string
    description: string
    github: string
    page: string
    type: FeedbackType
    turnstileToken: string
}

export type DuplicateFeedbackPayload = {
    clientIp: string
    type: FeedbackType
    title: string
    description: string
}

export type BuildIssueBodyPayload = {
    page: string
    reportedBy: string
    type: FeedbackType
    description: string
    imageUrls: string[]
    metadata: Record<string, string>
}

export type CreateGitHubIssuePayload = {
    config: RuntimeConfigWithTurnstile
    type: FeedbackType
    title: string
    labels: string[]
    issueBody: string
}