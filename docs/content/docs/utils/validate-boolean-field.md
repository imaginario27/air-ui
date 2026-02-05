## Usage
```vue
<template>
    <!-- Rest of the form -->
    <SwitchField 
        id="enable-feature"
        v-model="formData.enableFeature"
        v-model:error="formErrors.enableFeature"
        label="Accept conditions"
        :validator="validateBooleanField"  
        required    
    />
    <!-- Rest of the form -->
</template>
<script setup lang="ts">
// States
const formData = reactive({
    enableFeature: false,
})

// Validation
const { formErrors, resetForm, validateFormFields } = useForm({
    formData,
    requiredFields: [
        'enableFeature',
    ],
    validators: {
        enableFeature: validateBooleanField,
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
 * Validates a checkbox/switch field to ensure it is checked (true).
 *
 * @param value - The value to validate. Should be a boolean.
 * @param requiredFieldMessage - Optional custom error message if not checked.
 * @returns A string containing the error message if unchecked, or null if valid.
 */
export declare const validateBooleanField: (
    value: unknown,
    requiredFieldMessage?: string,
) => string | null
```