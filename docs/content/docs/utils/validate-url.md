## Usage
```vue
<template>
    <!-- Rest of the form -->
    <InputField 
        id="url"
        v-model="formData.url"
        v-model:error="formErrors.url"
        label="Url"
        :validator="validateUrl"
        type="url"
        required
    />
    <!-- Rest of the form -->
</template>
<script setup lang="ts">
// States
const formData = reactive({
    url: '',
})

// Validation
const { formErrors, resetForm, validateFormFields } = useForm({
    formData,
    requiredFields: [
        'url',
    ],
    validators: {
        url: validateUrl,
    },
})

// Methods
const handleSubmit = () => {
    const isValid = validateFormFields()

    const formUrlError = formErrors.url
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
 * Validates whether a given value is a valid URL.
 *
 * @param value - The value to validate as a URL.
 * @param requiredFieldMessage - Optional custom message if the value is empty.
 * @param invalidUrlMessage - Optional custom message if the URL format is invalid.
 * @returns A string containing the error message if invalid, or null if valid.
 */
export declare const validateUrl: (
    value: unknown,
    requiredFieldMessage?: string,
    invalidUrlMessage?: string,
) => string | null
```