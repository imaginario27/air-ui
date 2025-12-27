<template>
    <Form 
        class="max-w-[600px]"
        @submit="handleSubmit" 
        @reset="resetForm"
    >
        <FormRow>
            <InputField 
                id="full-name"
                v-model="formData.fullName"
                v-model:error="formErrors.fullName"
                label="Full name"
                placeholder="Enter full name"
                required
                :validator="validateField"
            />
        </FormRow>
        <FormRow>
            <InputField 
                id="email"
                v-model="formData.email"
                v-model:error="formErrors.email"
                label="Email"
                placeholder="Enter email"
                :validator="validateEmail"
                type="email"
                required
            />
        </FormRow>
        <FormFieldGroup title="Additional Information">
            <FormRow>
                <InputField
                    id="phone"
                    v-model="formData.phone"
                    label="Phone"
                    placeholder="Enter phone number"
                />
                <InputField
                    id="address"
                    v-model="formData.address"
                    label="Address"
                    placeholder="Enter address"
                />
            </FormRow>
        </FormFieldGroup>
        <FormActions>
            <ActionButton 
                type="submit" 
                text="Submit"
                :styleType="ButtonStyleType.PRIMARY_BRAND_FILLED"
            />
            <ActionButton 
                type="reset" 
                text="Reset"
            />
        </FormActions>
    </Form>
</template>
<script setup lang="ts">
// Initialize toast
const { $toast } = useNuxtApp()

// States
const formData = reactive({
    fullName: '',
    email: '',
    phone: '',
    address: '',
})

// Validation
const { formErrors, resetForm, validateFormFields } = useForm({
    formData,
    requiredFields: [
        'fullName', 
        'email', 
    ],
    validators: {
        fullName: validateField,
        email: validateEmail,
    },
})

// Methods
const handleSubmit = () => {
    const isValid = validateFormFields()

    const hasErrors = !isValid

    if (hasErrors) {
        $toast.error('Some fields contain errors', {
            toastId: 'form-error',
        })
        return
    }

    $toast.success('Form submitted successfully', {
        toastId: 'form-success',
    })

    resetForm()
}
</script>