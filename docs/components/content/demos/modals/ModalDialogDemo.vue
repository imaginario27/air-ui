<template>
    <ModalDialog v-model="showModal">
        <ModalContent>
            <ModalHeaderGroup>
                <ModalTitle title="Contact us" />
                <ModalDescription>Fill in the form and we'll get back to you soon.</ModalDescription>
            </ModalHeaderGroup>
            <Form @submit="handleSubmit" @reset="resetForm">
                <FormRow>
                    <InputField
                        id="contact-name"
                        v-model="formData.name"
                        v-model:error="formErrors.name"
                        label="Name"
                        placeholder="Your name"
                        required
                        :validator="validateField"
                    />
                </FormRow>
                <FormRow>
                    <InputField
                        id="contact-email"
                        v-model="formData.email"
                        v-model:error="formErrors.email"
                        label="Email"
                        placeholder="you@example.com"
                        type="email"
                        required
                        :validator="validateEmail"
                    />
                </FormRow>
                <FormRow>
                    <SelectField
                        id="contact-topic"
                        v-model="formData.topic"
                        :options="topics"
                        label="Topic"
                        placeholder="Select a topic"
                    />
                </FormRow>
                <FormRow>
                    <TextareaField
                        id="contact-message"
                        v-model="formData.message"
                        label="Message"
                        placeholder="Write your message"
                    />
                </FormRow>
                <FormActions class="justify-end">
                    <ActionButton
                        type="submit"
                        text="Send"
                        :styleType="ButtonStyleType.PRIMARY_BRAND_FILLED"
                        isMobileFullWidth
                    />
                    <ActionButton type="button" text="Cancel" isMobileFullWidth @click="showModal = false" />
                </FormActions>
            </Form>
        </ModalContent>
    </ModalDialog>
    <ActionButton :styleType="ButtonStyleType.NEUTRAL_FILLED" text="Open Modal" @click="showModal = true" />
</template>
<script setup lang="ts">
const showModal = ref(false)

const formData = reactive({
    name: '',
    email: '',
    topic: '',
    message: '',
})

const topics: SelectOption[] = [
    { text: 'General inquiry', value: 'general' },
    { text: 'Support', value: 'support' },
    { text: 'Sales', value: 'sales' },
]

const { formErrors, resetForm, validateFormFields } = useForm({
    formData,
    requiredFields: ['name', 'email'],
    validators: {
        name: validateField,
        email: validateEmail,
    },
})

const handleSubmit = () => {
    if (!validateFormFields()) return

    showModal.value = false
    resetForm()
}
</script>
