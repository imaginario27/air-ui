import type {
    FeedbackSubmissionPayload,
} from '@/models/types/feedbackModal'

const appendFilesToFormData = (form: FormData, files: File[]) => {
    files.forEach((file) => {
        form.append('files', file, file.name || 'screenshot')
    })
}

const buildFeedbackFormData = (payload: FeedbackSubmissionPayload) => {
    const form = new FormData()

    form.append('type', payload.type)
    form.append('title', payload.formData.title)
    form.append('description', payload.formData.description)
    form.append('github', payload.formData.github)
    form.append('page', payload.formData.page)
    form.append('website', payload.formData.website)
    form.append('clientSubmittedAt', String(payload.clientSubmittedAt))
    form.append('turnstileToken', payload.turnstileToken)
    form.append('metadata', JSON.stringify(payload.metadata))

    appendFilesToFormData(form, payload.formData.files)

    return form
}

export const useFeedbackSubmission = () => {
    const submitFeedback = async (payload: FeedbackSubmissionPayload) => {
        const form = buildFeedbackFormData(payload)

        await $fetch('/api/feedback', {
            method: 'POST',
            body: form,
        })
    }

    return {
        submitFeedback,
    }
}