import type { FeedbackType } from '@/models/enums/feedbacks'

export type FeedbackFormData = {
    title: string
    description: string
    github: string
    website: string
    page: string
    files: File[]
}

export type FeedbackMetadata = {
    url: string
    userAgent: string
    browser: string
    os: string
    viewport: string
    language: string
}

export type FeedbackSubmissionPayload = {
    type: FeedbackType
    formData: FeedbackFormData
    metadata: FeedbackMetadata
    clientSubmittedAt: number
    turnstileToken: string
}