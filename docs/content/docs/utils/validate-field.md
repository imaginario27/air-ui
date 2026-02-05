## Usage
```vue
<template>
    <!-- Rest of the form -->
    <InputField 
        id="full-name"
        v-model="formData.fullName"
        v-model:error="formErrors.fullName"
        label="Full name"
        placeholder="Enter full name"
        required
        :validator="validateField"
    />
    <!-- Rest of the form -->
</template>
<script setup lang="ts">
// States
const formData = reactive({
    fullName: '',
})

// Validation
const { formErrors, resetForm, validateFormFields } = useForm({
    formData,
    requiredFields: [
        'fullName', 
    ],
    validators: {
        fullName: validateField,
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
 * Validates a field value to ensure it is not empty, null, or undefined.
 *
 * @param value - The value to validate.
 * @param requiredFieldMessage - Optional custom error message if invalid.
 * @returns A string containing the error message if invalid, or null if valid.
 */
export declare const validateField: (
    value: unknown,
    requiredFieldMessage?: string,
) => string | null
```