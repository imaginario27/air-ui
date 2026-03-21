<template>
    <ModalDialog 
        :model-value="props.modelValue"
        @update:model-value="updateModelValue"
    >
        <ModalContent>  
            <ModalTitle :title="modalTitle" />

            <p class="text-sm text-text-secondary">
                {{ modalDescription }}
            </p>

            <!-- Form -->
            <Form @submit="handleSubmit">
                <input
                    v-model="formData.website"
                    type="text"
                    name="website"
                    autocomplete="off"
                    tabindex="-1"
                    aria-hidden="true"
                    class="sr-only"
                >
                <FormRow>
                    <InputField
                        id="subject"
                        v-model="formData.title"
                        v-model:error="formErrors.title"
                        label="Subject"
                        :placeholder="subjectTitlePlaceholder"
                        required
                        :validator="validateField"
                        :maxLength="FieldMaxLength.GITHUB_ISSUE_SUBJECT"
                    />
                </FormRow>
                <FormRow>
                    <TextareaField
                        id="description"
                        v-model="formData.description"
                        v-model:error="formErrors.description"
                        label="Description"
                        :placeholder="descriptionPlaceholder"
                        required
                        :validator="validateField"
                        :maxLength="FieldMaxLength.GITHUB_ISSUE_DESCRIPTION"
                        minHeightClass="min-h-[300px]"
                        textareaClass="max-h-[600px]"
                    />
                </FormRow>
                <FormRow>
                    <InputField
                        id="github"
                        v-model="formData.github"
                        label="GitHub username (optional)"
                        placeholder="your-github-username"
                        :maxLength="FieldMaxLength.GITHUB_ISSUE_USERNAME"
                        helpText="Add your username without '@'"
                        autocomplete="off"
                    />
                </FormRow>
                <FormRow>
                    <FileUploadField 
                        id="files"
                        v-model="formData.files"
                        label="Screenshots (optional)"
                        :accept="['image/png', 'image/jpeg']"
                        multiple
                        :maxFiles="4"
                        :maxFileSize="0.25"
                    />
                </FormRow>
                <FormRow v-if="turnstileEnabled">
                    <Card>
                        <CardHeader>
                            <h3 class="text-sm font-medium text-text-default">
                                Security Check
                            </h3>
                        </CardHeader>
                        <CardBody>
                           <div 
                                ref="turnstileWidgetContainer" 
                                class="turnstile-widget-container flex w-full justify-center" 
                            />

                            <p v-if="turnstileError"
                                class="mt-2 rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-status-danger">
                                {{ turnstileError }}
                            </p>
                        </CardBody>
                    </Card>
                </FormRow>
                <FormActions class="justify-end">
                    <ActionButton 
                        text="Cancel"
                        isMobileFullWidth
                        @click="handleClose"
                    />
                    <ActionButton 
                        :styleType="ButtonStyleType.PRIMARY_BRAND_FILLED"
                        :text="submitButtonText"
                        type="submit"
                        isMobileFullWidth
                        :disabled="isSubmitDisabled"
                        :isLoading="isSubmitting"
                    />
                </FormActions>
            </Form>
        </ModalContent>
    </ModalDialog>
</template>
<script setup lang="ts">
import type {
    FeedbackFormData,
    FeedbackMetadata,
} from '@/models/types/feedbackModal'

// Props
const props = defineProps({
    modelValue: {
        type: Boolean as PropType<boolean>,
        default: false,
    },
    type: {
        type: String as PropType<FeedbackType>,
        default: FeedbackType.SUGGESTION,
        validator: (value: FeedbackType) => Object.values(FeedbackType).includes(value),
    },
})

// Initialize toast
const { $toast } = useNuxtApp()

// Composables
const config = useRuntimeConfig()
const route = useRoute()
const { submitFeedback } = useFeedbackSubmission()

// States
const formData = reactive<FeedbackFormData>({
    title: '',
    description: '',
    github: '',
    website: '',
    page: route.fullPath,
    files: [],
})

const metadata = reactive<FeedbackMetadata>({
    url: '',
    userAgent: '',
    browser: '',
    os: '',
    viewport: '',
    language: '',
})

const isSubmitting = ref(false)
const formStartedAt = ref(Date.now())
const turnstileWidgetContainer = ref<HTMLElement | null>(null)

const turnstileSiteKey = computed(() => config.public.turnstileSiteKey as string || '')
const {
    turnstileEnabled,
    turnstileToken,
    turnstileError,
    renderTurnstile,
    clearTurnstileState,
} = useTurnstile({
    siteKey: turnstileSiteKey,
    theme: 'auto',
    size: 'flexible',
    appearance: 'always',
})

// Validation
const { formErrors, resetForm, validateFormFields } = useForm({
    formData,
    requiredFields: [
        'title', 
        'description', 
    ],
    validators: {
        title: validateField,
        description: validateField,
    },
})

// Emits
const emit = defineEmits(['update:modelValue', 'close', 'action'])

// Computed
const pageTitle = computed(() => {
    if (route.meta?.title) {
        return route.meta.title as string
    }

    if (import.meta.client && document?.title) {
        return document.title.replace(/\s*\|\s*.*/, '')
    }

    if (route.name) {
        return String(route.name)
    }

    return route.path
})

const modalTitle = computed(() => {
    if (props.type === FeedbackType.BUG) {
        return `Report an issue | ${pageTitle.value}`
    }

    return `Suggestions & Feedback | ${pageTitle.value}`
})

const modalDescription = computed(() => {
    if (props.type === FeedbackType.BUG) {
        return 'Found a problem in the documentation? Let us know so we can fix it.'
    }

    return 'Share your ideas to improve our documentation and components.'
})

const submitButtonText = computed(() => {
    if (props.type === FeedbackType.BUG) {
        return 'Submit issue'
    }

    return 'Submit suggestion'
})

const subjectTitlePlaceholder = computed(() => {
    if (props.type === FeedbackType.BUG) {
        return 'What went wrong?'
    }

    return 'What improvement would you like to see?'
}) 

const descriptionPlaceholder = computed(() => {
    if (props.type === FeedbackType.BUG) {
        return `What happened?
Describe the issue you encountered.

Steps to reproduce:
1. ...
2. ...
3. ...

Expected result:
...`
    }

    return `Describe your suggestion.

What improvement would you like to see?
How would this help you when using the component or documentation?`
})

const submitMessage = computed(() => {
    if (props.type === FeedbackType.BUG) {
        return 'Issue submitted successfully'
    }

    return 'Suggestion submitted successfully'
}) 

const hasRequiredFields = computed(() => {
    return Boolean(formData.title.trim())
        && Boolean(formData.description.trim())
})

const hasValidTurnstile = computed(() => {
    return !turnstileEnabled.value || Boolean(turnstileToken.value)
})

const isSubmitDisabled = computed(() => {
    return isSubmitting.value || !hasRequiredFields.value || !hasValidTurnstile.value
})

// Methods
const updateModelValue = (value: boolean) => {
    emit('update:modelValue', value)
}

const handleClose = () => {
    updateModelValue(false)
    emit('close')
}

const handleSubmit = async () => {
    const isValid = validateFormFields()

    if (!isValid) {
        $toast.error(FormSubmitError.REQUIRED_FIELDS, {
            toastId: 'form-required-fields-error',
        })
        return
    }

    if (turnstileEnabled.value && !turnstileToken.value) {
        $toast.error('Please complete the captcha.', {
            toastId: 'turnstile-required',
        })
        turnstileError.value = 'Captcha verification is required.'
        return
    }

    isSubmitting.value = true

    try {
        await submitFeedback({
            type: props.type,
            formData,
            metadata,
            clientSubmittedAt: formStartedAt.value,
            turnstileToken: turnstileToken.value,
        })

        emit('action')
        handleClose()
        resetForm()
        clearTurnstileState()
        formStartedAt.value = Date.now()

        $toast.success(submitMessage.value, {
            toastId: 'form-success',
        })
    } catch (error) {
        $toast.error(error, {
            toastId: 'submit-error',
        })
    }

    isSubmitting.value = false
}

onMounted(() => {
    if (import.meta.client) {
        metadata.url = globalThis.location.href
    }
    metadata.userAgent = navigator.userAgent
    metadata.viewport = `${window.innerWidth}x${window.innerHeight}`
    metadata.language = navigator.language

    const ua = navigator.userAgent

    if (ua.includes('Chrome')) metadata.browser = 'Chrome'
    else if (ua.includes('Firefox')) metadata.browser = 'Firefox'
    else if (ua.includes('Safari')) metadata.browser = 'Safari'
    else if (ua.includes('Edge')) metadata.browser = 'Edge'
    else metadata.browser = 'Unknown'

    if (ua.includes('Mac')) metadata.os = 'macOS'
    else if (ua.includes('Windows')) metadata.os = 'Windows'
    else if (ua.includes('Linux')) metadata.os = 'Linux'
    else if (ua.includes('Android')) metadata.os = 'Android'
    else if (ua.includes('iPhone') || ua.includes('iPad')) metadata.os = 'iOS'
    else metadata.os = 'Unknown'

    if (props.modelValue && turnstileEnabled.value) {
        renderTurnstile(turnstileWidgetContainer.value)
    }
})

watch(() => props.modelValue, (isOpen) => {
    if (!isOpen) {
        clearTurnstileState()
        formStartedAt.value = Date.now()
        return
    }

    formStartedAt.value = Date.now()

    if (turnstileEnabled.value) {
        renderTurnstile(turnstileWidgetContainer.value)
    }
})
</script>

<style scoped>
.turnstile-widget-container :deep(div),
.turnstile-widget-container :deep(iframe) {
    width: 100% !important;
}
</style>