## Usage
```vue
<template>
    <!-- Rest of the form -->
    <!-- In the first date field, use validateField to ensure it's not empty -->
    <InputField 
        id="start-date"
        v-model="formData.startDate"
        v-model:error="formErrors.startDate"
        label="Start Date"
        :validator="validateField"
        type="date"
        required
    />
    
    <!-- In the end date field, use validateDateRange to ensure it is not before the start date -->
    <InputField 
        id="end-date"
        v-model="formData.endDate"
        v-model:error="formErrors.endDate"
        label="End Date"
        :validator="(value) => validateDateRange(formData.startDate, value)"
        type="date"
        required
    />
    <!-- Rest of the form -->
</template>
const formData = reactive({
    startDate: '',
    endDate: '',
})

// Validation
const { formErrors, resetForm, validateFormFields } = useForm({
    formData,
    requiredFields: [
        'startDate',
        'endDate',
    ],
    validators: {
        startDate: validateField,
        endDate: (value) => validateDateRange(formData.startDate, value),
    },
})

// Methods
const handleSubmit = () => {
    const isValid = validateFormFields()

    const dateRangeError = formErrors.endDate
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
 * Validates that an end date is not before a start date.
 *
 * @param startDate - The start date to compare from.
 * @param endDate - The end date to compare against.
 * @param requiredFieldMessage - Optional message if either date is missing or invalid.
 * @param invalidRangeMessage - Optional message if end date is before start date.
 * @returns A string with the error message if invalid, or null if the range is valid.
 */
export declare const validateDateRange: (
    startDate: unknown,
    endDate: unknown,
    requiredFieldMessage?: string,
    invalidRangeMessage?: string,
) => string | null
```