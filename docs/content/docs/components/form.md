## Component

::component-code
---
srcDir: 'content/demos/forms/BasicForm.vue'
previewBackground: "white"
isCodePreviewEnabled: false
componentSource: 'docs'
---
::

## Architecture
The `Form` component provides a clean and consistent layout structure for building forms.

It’s designed to work with the `FormRow`, `FormFieldGroup`, and `FormActions` components to help organize fields and actions intuitively.

```vue
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
```

## Components
This set of components are used to create the layout of a form.

::components-table
---
components: [
    {
        name: "<FormRow>",
        description: "Wraps form field components, ensuring proper spacing and alignment.On smaller screens, fields are automatically stacked vertically for better readability.",
    },
    {
        name: "<FormFieldGroup>",
        description: "Groups related form fields under a common title.",
    },
    {
        name: "<FormActions>",
        description: "Groups form action buttons, such as Submit or Cancel. On mobile devices, buttons stack vertically and their order can be customized via props.",
    },
]
---
::


## Usage

### FormRow
The `FormRow` component is used to wrap form field components, ensuring proper spacing and alignment.

```vue
<template>
    <FormRow>
        <InputField 
            id="first-name"
            v-model="formData.firstName"
            label="Full name"
        />
    </FormRow>
    <FormRow>
        <InputField 
            id="full-name"
            v-model="formData.lastName"
            label="Full name"
        />
    </FormRow>
</template>
```

::props-table
---
props: [
    {
        "name": "spaced",
        "default": "false",
        "type": "boolean"
    },
]
---
::

#### spaced
Adds some extra vertifcal padding to the row.

```vue
<template>
    <FormRow spaced>
        ...
    </FormRow>
</template>
```

- **Type:** `boolean`
- **Default:** `false`

### FormFieldGroup
The `FormFieldGroup` component groups related form fields under a common title.

```vue
<template>
    <FormFieldGroup title="Personal Information">
        <FormRow>
            <InputField 
                id="first-name"
                v-model="formData.firstName"
                label="First name"
            />
            <InputField 
                id="last-name"
                v-model="formData.lastName"
                label="Last name"
            />
        </FormRow>
    </FormFieldGroup>
</template>
```

::props-table
---
props: [
    {
        "name": "title",
        "default": "'Group title'",
        "type": "string"
    },
    {
        "name": "titleClass",
        "type": "string"
    },
    {
        "name": "headingTag",
        "default": "'h1'",
        "type": "'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'"
    },
]
---
::

#### title
Sets the title of the form field group.

```vue
<template>
    <FormFieldGroup title="Personal Information">
        ...
    </FormFieldGroup>
</template>
```

- **Type:** `string`
- **Default:** `'Group title'`

### FormActions
The `FormActions` component groups form action buttons, such as Submit or Cancel. On mobile devices, buttons stack vertically and their order can be customized via props.

```vue
<template>
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
</template>
```

::props-table
---
props: [
    {
        "name": "reverseOnMobile",
        "default": "false",
        "type": "boolean"
    },
]
---
::

#### reverseOnMobile
Reverses the order of the buttons on mobile devices. 

```vue
<template>
    <FormActions reverseOnMobile>
        ...
    </FormActions>
</template>
```

- **Type:** `boolean`
- **Default:** `true`

## Triggers
### submit
To submit a form, there two options:

#### Via `@submit`
1. Attach the `@submit` emitter to the `Form` and set the handle submit function. It automatically prevents default behaviour.
2. Set one of the form buttons`type` prop to `submit`.
3. The `@submit` event will be triggered when the form is submitted.

```vue
<template>
    <Form @submit="handleSubmit">
        <FormRow>
            <InputField 
                id="full-name"
                v-model="formData.fullName"
                label="Full name"
            />
        </FormRow>
        <FormActions>
            <ActionButton 
                type="submit" 
                text="Submit"
                :styleType="ButtonStyleType.PRIMARY_BRAND_FILLED"
            />
        </FormActions>
    </Form>
</template>
<script setup lang="ts">
// Methods
const handleSubmit = () => {
    // Submit logic here
}
</script>
```

#### Via button `@click`
`@submit` emitter can be omitted when the submit function is being set directly to the submit button `@click`.

In this case, the button does not require the `type` prop.

```vue
<template>
    <Form>
        <FormRow>
            <InputField 
                id="full-name"
                v-model="formData.fullName"
                label="Full name"
            />
        </FormRow>
        <FormActions>
            <ActionButton 
                text="Submit"
                :styleType="ButtonStyleType.PRIMARY_BRAND_FILLED"
                @click="handleSubmit"
            />
        </FormActions>
    </Form>
</template>
<script setup lang="ts">
// Methods
const handleSubmit = () => {
    // Submit logic here
}
</script>
```

### reset
To reset a form, there two options:

#### Via `@reset`
1. Attach the `@reset` emitter to the `Form` and set the handle submit function. It automatically prevents default behaviour.
2. Set one of the form buttons`type` prop to `reset`.
3. The `@reset` event will be triggered when the form is submitted.

```vue
<template>
    <Form @reset="resetForm">
        <FormRow>
            <InputField 
                id="full-name"
                v-model="formData.fullName"
                label="Full name"
            />
        </FormRow>
        <FormActions>
            <ActionButton 
                type="reset" 
                text="Reset"
            />
        </FormActions>
    </Form>
</template>
<script setup lang="ts">
// States
const formData = reactive({
    fullName: '',
})

// Composables
const { resetForm } = useForm({
    formData,
})
</script>
```

#### Via button `@click`
`@reset` emitter can be omitted when the submit function is being set directly to the submit button `@click`.

In this case, the button does not require the `type` prop.

```vue
<template>
    <Form>
        <FormRow>
            <InputField 
                id="full-name"
                v-model="formData.fullName"
                label="Full name"
            />
        </FormRow>
        <FormActions>
            <ActionButton 
                text="Reset"
                @click="resetForm"
            />
        </FormActions>
    </Form>
</template>
<script setup lang="ts">
// States
const formData = reactive({
    fullName: '',
})

// Composables
const { resetForm } = useForm({
    formData,
})
</script>
```

## Validation
To properly validate a form, consider the following aspects:

### formData
A reactive object named `formData` is required to store the form’s field values. This object should be defined inside the `<script>` block.

### Form field requirements
Must use this two props:
- `required` attribute
- `v-model:error` binding (linked to `formErrors`)

### Validation composable
Use the `useForm` composable to manage validation logic:

```ts
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
    validateOn: FormValidationMode.SUBMIT // Optional (Default: Submit)
})
```

- **formErrors:** An object that holds error messages for each form field.
- **resetForm:** A function to reset all fields and error states.
- **validateFormFields:** A function to validate all required fields using the provided validators.
- **validateOn (optional):** 

    Defines when validation should be triggered before form submission.
    By default, the validation mode is set to `FormValidationMode.SUBMIT`, which means fields are only validated when the form is submitted.
    <br><br>
    If you prefer to validate fields when they lose focus, you can set `validateOn` to `FormValidationMode.BLUR`.
    Once the form has been submitted at least once, validation will automatically switch to BLUR mode for subsequent changes.
    <br><br>
    When calling `resetForm`, the validation mode will be reset to the initially defined `validateOn` value.

### Usage example

```vue
<template>
    <Form @submit="handleSubmit">
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
        <FormActions>
            <ActionButton 
                type="submit" 
                text="Submit"
                :styleType="ButtonStyleType.PRIMARY_BRAND_FILLED"
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

    if (!isValid) {
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
```

### Key takeaways

- Define a formData object using reactive() to manage field values.
- Bind each field’s error to formErrors using v-model:error, matching the corresponding key from formData.
- Use the useForm composable to define:
    - Required fields
    - Custom validation logic for each field
- Call validateFormFields() inside the submit handler to check if all fields pass validation.
- Use resetForm() after a successful submission to clear the form.

### Validation functions
#### validateField
Checks if the field value has a value and is not empty.

```ts
validators: {
    field: validateField,
}
```

#### validateEmail
Validates whether a given value is a properly formatted email address and not empty.

```ts
validators: {
    email: validateEmail,
}
```

#### validatePasswordMatch
Validates that the repeated password matches the original one.

```ts
validators: {
    passwordRepeat: value => validatePasswordMatch(formData.password, value),
}
```

#### validateUrl
Validates whether the value is a valid URL and is not empty.

```ts
validators: {
    url: validateUrl,
}
```

#### validateBooleanField
Validates that a boolean field (checkbox or switch) is true.

```ts
validators: {
    acceptConditions: validateBooleanField,
}
```

#### validateArrayField
Validates that the field is a non-empty array, optionally checking minimum and/or maximum item counts.

```ts
validators: {
    technologies: validateArrayField,
}
```

#### validateDateRange
Validates that the end date is after or equal to the start date.
If either date is missing or invalid, it returns an error message.

```ts
validators: {
    startDate: value => validateField(value),
    endDate: value => validateDateRange(formData.startDate, value),
}