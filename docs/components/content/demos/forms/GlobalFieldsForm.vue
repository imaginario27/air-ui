<template>
    <Section>
        <SectionBody>
            <Form 
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

                    <InputField 
                        id="location"
                        v-model="formData.location"
                        v-model:error="formErrors.location"
                        label="Location"
                        placeholder="Enter city"
                        :validator="validateField"
                        required
                    />

                    <InputField 
                        id="years"
                        v-model="formData.years"
                        v-model:error="formErrors.years"
                        label="Years"
                        type="number"
                        placeholder="Years"
                        min="5"
                        max="20"
                        :validator="validateField"
                        required
                    />

                </FormRow>
                <FormRow>
                    <InputField 
                        id="email"
                        v-model="formData.email"
                        v-model:error="formErrors.email"
                        label="Email"
                        :validator="validateEmail"
                        type="email"
                        required
                    />
                </FormRow>
                <FormRow>
                    <InputField 
                        id="password"
                        v-model="formData.password"
                        v-model:error="formErrors.password"
                        label="Password"
                        :validator="validateField"
                        type="password"
                        required
                    />
                    <InputField 
                        id="password-repeat"
                        v-model="formData.passwordRepeat"
                        v-model:error="formErrors.passwordRepeat"
                        label="Password repeat"
                        :validator="(value) => validatePasswordMatch(value, formData.passwordRepeat)"
                        type="password"
                        required
                    />
                </FormRow>
                <FormRow>
                    <InputField 
                        id="start-date"
                        v-model="formData.startDate"
                        v-model:error="formErrors.startDate"
                        label="Start date"
                        :validator="validateField"
                        type="date"
                        required
                    />
                    <InputField 
                        id="end-date"
                        v-model="formData.endDate"
                        v-model:error="formErrors.endDate"
                        label="End date"
                        :validator="(value) => validateDateRange(formData.startDate, value)"
                        type="date"
                        required
                    />
                </FormRow>
                <FormRow>
                    <InputField 
                        id="datetime-local"
                        v-model="formData.datetimeLocal"
                        v-model:error="formErrors.datetimeLocal"
                        label="Date time local"
                        :validator="validateField"
                        type="datetime-local"
                        required
                    />
                </FormRow>
                <FormRow>
                    <InputField 
                        id="url"
                        v-model="formData.url"
                        v-model:error="formErrors.url"
                        label="Url"
                        :validator="validateUrl"
                        type="url"
                        required
                    />
                </FormRow>
                <FormRow>
                    <InputField 
                        id="color"
                        v-model="formData.color"
                        v-model:error="formErrors.color"
                        label="Color"
                        type="color" 
                        :validator="validateField"      
                    />
                </FormRow>
                <FormRow>
                    <TextareaField 
                        id="description"
                        v-model="formData.description"
                        v-model:error="formErrors.description"
                        label="Description"
                        :maxLength="255"
                        :validator="validateField"    
                        required  
                    />
                </FormRow>
                <FormRow>
                    <InputField 
                        id="phone"
                        v-model="formData.phone"
                        v-model:error="formErrors.phone"
                        label="Phone"
                        :validator="validateField"  
                        required    
                    />
                </FormRow>
                <FormRow>
                    <CheckboxField 
                        id="accept-conditions"
                        v-model="formData.acceptConditions"
                        v-model:error="formErrors.acceptConditions"
                        label="Accept conditions"
                        :validator="validateBooleanField"  
                        required    
                    />
                </FormRow>
                <FormRow>
                    <ButtonField 
                        id="button-field"
                        label="Button Field" 
                    />
                </FormRow>
                <FormRow>
                    <SwitchField 
                        id="enable-feature"
                        v-model="formData.enableFeature"
                        v-model:error="formErrors.enableFeature"
                        label="Accept conditions"
                        :validator="validateBooleanField"  
                        required    
                    />
                </FormRow>
                <FormRow>
                    <SelectField 
                        id="single-choice"
                        v-model="formData.type"
                        v-model:error="formErrors.type"
                        :options="exampleTypes"
                        label="Type"
                        :validator="validateField"  
                        required    
                    />
                </FormRow>
                <FormRow>
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
                </FormRow>
                <FormRow>
                    <OptionButtonsGroupField 
                        id="technolgies"
                        v-model="formData.technologiesOptions"
                        v-model:error="formErrors.technologiesOptions"
                        :buttons="exampleButtonOptionsTechnologies"
                        label="Technology options"
                        :validator="validateArrayField"  
                        isRounded
                        isMultiple
                        required
                    />
                </FormRow>
                <FormRow>
                    <ToggleButtonsGroupField 
                        id="sorting"
                        v-model="formData.sorting"
                        :buttons="exampleSortingButtons"
                        label="Sorting"

                    />
                </FormRow>
                <FormRow>
                    <RadioGroupField 
                        id="purchase-option"
                        v-model="formData.purchaseOption"
                        v-model:error="formErrors.purchaseOption"
                        :options="examplePurchaseOptions"
                        name="purchase-option"
                        label="Purchase options"
                        :validator="validateField"  
                        required
                    />
                </FormRow>
                <FormRow>
                    <RadioGroupField 
                        id="device-option"
                        v-model="formData.deviceOption"
                        v-model:error="formErrors.deviceOption"
                        :options="exampleDeviceOptions"
                        :type="RadioType.BUTTON"
                        name="device-option"
                        label="Device options"
                        :validator="validateField"  
                        required
                    />
                </FormRow>
                <FormRow>
                    <FileUploadField 
                        id="file"
                        v-model="formData.file"
                        v-model:error="formErrors.file"
                        label="File"
                        :validator="validateArrayField"  
                        required
                        multiple
                        :maxFiles="5"
                        showPreview
                        previewImageUrl="https://picsum.photos/200/200"
                    />
                </FormRow>
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
        </SectionBody>
    </Section>
</template>
<script setup lang="ts">
// Initialize toast
const { $toast } = useNuxtApp()

// Data
const exampleTypes: SelectOption[] = [
    {
        text: 'Tutorial',
        value: 'tutorial',
    },
    {
        text: 'Guide',
        value: 'guide',
    },
    {
        text: 'Documentation',
        value: 'documentation',
    },
    {
        text: 'Example',
        value: 'example',
    },
    {
        text: 'Demo',
        value: 'demo',
    },
]

const exampleTechnologies: SelectOption[] = [
    {
        text: 'Vue.js',
        value: 'vue',
    },
    {
        text: 'Nuxt',
        value: 'nuxt',
    },
    {
        text: 'React',
        value: 'react',
    },
    {
        text: 'Next.js',
        value: 'next',
    },
    {
        text: 'Tailwind CSS',
        value: 'tailwind',
    },
    {
        text: 'TypeScript',
        value: 'typescript',
    },
    {
        text: 'JavaScript',
        value: 'javascript',
    },
    {
        text: 'Node.js',
        value: 'node',
    },
]

const exampleButtonOptionsTechnologies: OptionButton[] = [
    {
        text: 'Vue.js',
        value: 'vue',
    },
    {
        text: 'Nuxt',
        value: 'nuxt',
    },
    {
        text: 'React',
        value: 'react',
    },
]

const exampleSortingButtons: ToggleButton[] = [
    {
        text: 'Oldest',
        value: 'oldest',
    },
    {
        text: 'Newest',
        value: 'newest',
    },
]

const examplePurchaseOptions: RadioOption[] = [
    {
        id: 'card',
        label: 'Card',
        value: 'card',
    },
    {
        id: 'bank-account',
        label: 'Bank account',
        value: 'bank-account',
    }
]

const exampleDeviceOptions: RadioOption[] = [
    {
        id: 'laptop',
        label: 'Laptop',
        value: 'taptop',
    },
    {
        id: 'mobile',
        label: 'Mobile',
        value: 'mobile',
    }
]


const formData = reactive({
    fullName: '',
    location: '',
    years: null,
    email: '',
    password: '',
    passwordRepeat: '',
    startDate: '',
    endDate: '',
    url: '',
    image: '',
    color: '',
    datetimeLocal:'',
    description: '',
    phone: '',
    acceptConditions: false,
    enableFeature: false,
    type: '',
    technologies: [],
    technologiesOptions: [],
    sorting: 'oldest',
    purchaseOption: '',
    deviceOption: '',
    file: [],
})

const { formErrors, resetForm, validateFormFields } = useForm({
    formData,
    requiredFields: [
        'fullName', 
        'location', 
        'email', 
        'years',
        'password',
        'passwordRepeat',
        'startDate',
        'endDate',
        'url',
        'color',
        'datetimeLocal',
        'description',
        'phone',
        'acceptConditions',
        'enableFeature',
        'type',
        'technologies',
        'technologiesOptions',
        'purchaseOption',
        'deviceOption',
        'file',
    ],
    validators: {
        fullName: validateField,
        location: validateField,
        years: validateField,
        email: validateEmail,
        password: validateField,
        passwordRepeat: value => validatePasswordMatch(formData.password, value),
        startDate: value => validateField(value),
        endDate: value => validateDateRange(formData.startDate, value),
        url: validateUrl,
        color: validateField,
        datetimeLocal: validateField,
        description: validateField,
        phone: validateField,
        acceptConditions: validateBooleanField,
        enableFeature: validateBooleanField,
        type: validateField,
        technologies: validateArrayField,
        technologiesOptions: validateArrayField,
        purchaseOption: validateField,
        deviceOption: validateField,
        file: validateArrayField,
    },
})

const handleSubmit = () => {
    const isValid = validateFormFields()

    const passwordMatchError = formErrors.passwordRepeat
    const dateRangeError = formErrors.endDate

    const hasErrors = !isValid || !!passwordMatchError || !!dateRangeError

    if (hasErrors) {
        if (passwordMatchError) {
            $toast.error(passwordMatchError, {
                toastId: 'password-mismatch',
            })
        } else if (dateRangeError) {
            $toast.error(dateRangeError, {
                toastId: 'date-range-error',
            })
        } else {
            $toast.error('Some fields contain errors', {
                toastId: 'form-error',
            })
        }

        return
    }

    $toast.success('Form submitted successfully', {
        toastId: 'form-success',
    })

    resetForm()
}
</script>