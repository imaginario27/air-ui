## Usage
```vue
<template>
    <!-- Rest of the form -->
    <!-- In the first password field, use validateField to ensure it's not empty -->
    <InputField 
        id="password"
        v-model="formData.password"
        v-model:error="formErrors.password"
        label="Password"
        :validator="validateField"
        type="password"
        required
    />
    
    <!-- In the repeat password field, use validatePasswordMatch to ensure it matches the first -->
    <InputField 
        id="password-repeat"
        v-model="formData.passwordRepeat"
        v-model:error="formErrors.passwordRepeat"
        label="Password repeat"
        :validator="(value) => validatePasswordMatch(value, formData.passwordRepeat)"
        type="password"
        required
    />
    <!-- Rest of the form -->
</template>
const formData = reactive({
    password: '',
    passwordRepeat: '',
})

// Validation
const { formErrors, resetForm, validateFormFields } = useForm({
    formData,
    requiredFields: [
        'password',
        'passwordRepeat',
    ],
    validators: {
        password: validateField,
        passwordRepeat: (value) => validatePasswordMatch(formData.password, value),
    },
})

// Methods
const handleSubmit = () => {
    const isValid = validateFormFields()

    const passwordMatchError = formErrors.passwordRepeat
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
 * Validates that two password values match.
 *
 * @param password - The original password.
 * @param confirmPassword - The repeated password to compare.
 * @param requiredFieldMessage - Optional custom error message if a field is empty.
 * @param mismatchMessage - Optional custom error message if passwords do not match.
 * @returns A string with the error message if invalid, or null if valid.
 */
export declare const validatePasswordMatch: (
    password: unknown,
    confirmPassword: unknown,
    requiredFieldMessage?: string,
    mismatchMessage?: string,
) => string | null
```