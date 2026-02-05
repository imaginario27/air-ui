## Usage
```vue
<template>
    <!-- Rest of the form -->
    <SelectField 
        id="multi-choice"
        v-model="formData.technologies"
        v-model:error="formErrors.technologies"
        :options="exampleTechnologies"
        label="Technologies"
        :validator="validateArrayField"  
        multiple
        required    
    />
    <!-- Rest of the form -->
</template>
<script setup lang="ts">
// States
const formData = reactive({
    technologies: [],
})

// Validation
const { formErrors, resetForm, validateFormFields } = useForm({
    formData,
    requiredFields: [
        'technologies',
    ],
    validators: {
        technologies: validateArrayField,
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
 * Validates that a given value is a non-empty array (or meets min/max length criteria).
 *
 * @param value - The value to validate. Should be an array.
 * @param requiredFieldMessage - Custom error message if not an array or empty.
 * @param minLength - Optional minimum number of items required.
 * @param maxLength - Optional maximum number of items allowed.
 * @param lengthErrorMessage - Optional error message if min/max constraints are violated.
 * @returns A string containing the error message if invalid, or null if valid.
 */
export declare const validateArrayField: (
    value: unknown,
    requiredFieldMessage?: string,
    minLength?: number,
    maxLength?: number,
    lengthErrorMessage?: string,
) => string | null
```