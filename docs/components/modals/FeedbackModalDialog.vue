<template>
    <ModalDialog 
        :modelValue
        @update:modelValue="updateModelValue"
    >
        <ModalContent>  
            <ModalTitle :title="modalTitle" />

            <p class="text-sm text-text-secondary">
                {{ modalDescription }}
            </p>

            <!-- Form -->
            <Form @submit="handleSubmit">
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
                <FormActions class="justify-end">
                    <ActionButton 
                        text="Cancel"
                        @click="handleClose"
                    />
                    <ActionButton 
                        :styleType="ButtonStyleType.PRIMARY_BRAND_FILLED"
                        :text="submitButtonText"
                        type="submit"
                    />
                </FormActions>
            </Form>
        </ModalContent>
    </ModalDialog>
</template>
<script setup lang="ts">
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
const route = useRoute()

// States
const formData = reactive({
    title: '',
    description: '',
    github: '',
    page: route.fullPath,
})

const metadata = reactive({
    url: '',
    userAgent: '',
    browser: '',
    os: '',
    viewport: '',
})

const isSubmitting = ref(false)

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

    const hasErrors = !isValid

    if (hasErrors) {
        $toast.error(FormSubmitError.REQUIRED_FIELDS, {
            toastId: 'form-required-fields-error',
        })
        return
    }

    isSubmitting.value = true

    try {
        const githubUsername = formData.github?.replace(/^@/, '').trim()

        await $fetch('/api/feedback', {
            method: 'POST',
            body: {
                type: props.type,
                title: formData.title,
                description: formData.description,
                github: githubUsername,
                page: formData.page,
                metadata,
            },
        })

        emit('action')

        handleClose()

        resetForm()
    } catch (error) {
        $toast.error(error, {
            toastId: 'submit-error',
        })
    }

    isSubmitting.value = false

    $toast.success('Form submitted successfully', {
        toastId: 'form-success',
    })    
}

onMounted(() => {
    metadata.url = globalThis.location.href
    metadata.userAgent = navigator.userAgent
    metadata.viewport = `${window.innerWidth}x${window.innerHeight}`

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
})
</script>