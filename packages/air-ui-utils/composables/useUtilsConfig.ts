import { reactive } from 'vue'

const utilsConfig = reactive<UtilsConfig>({
    validation: {
        requiredFieldMessage: () => 'This field is required.',
        invalidEmailMessage: () => 'Invalid email address.',
        passwordsDoNotMatchMessage: () => 'Passwords do not match.',
        invalidDateRangeMessage: () => 'Start date must be before or equal to end date',
        invalidUrlMessage: () => 'Invalid URL.',
    },
})

export const useUtilsConfig = () => utilsConfig
