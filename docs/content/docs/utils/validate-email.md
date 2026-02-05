## Usage
```vue
<template>
    <!-- Rest of the form -->
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
    <!-- Rest of the form -->
</template>
<script setup lang="ts">
// States
const formData = reactive({
    email: '',
})

// Validation
const { formErrors, resetForm, validateFormFields } = useForm({
    formData,
    requiredFields: [
        'email', 
    ],
    validators: {
        email: validateEmail,
    },
})

// Methods
const handleSubmit = () => {
    const isValid = validateFormFields()

    const hasErrors = !isValid

    // Rest of the submit logic
</script>
```

::content-alert
---
props:
    preset: 'form-validation'
---
::

## Type definition
```ts
/**
 * Validates whether a given value is a valid email address.
 *
 * @param value - The value to validate as an email.
 * @param requiredFieldMessage - Optional error if the email is empty or missing.
 * @param invalidEmailMessage - Optional error if the email format is invalid.
 * @returns A string with the validation error if invalid, or null if valid.
 */
export declare const validateEmail: (
    value: unknown,
    requiredFieldMessage?: string,
    invalidEmailMessage?: string,
) => string | null
```