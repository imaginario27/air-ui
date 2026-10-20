import { reactive } from 'vue'

const utilsConfig = reactive<UtilsConfig>({
    validation: {
        requiredFieldMessage: () => 'This field is required.',
        invalidEmailMessage: () => 'Invalid email address.',
        passwordsDoNotMatchMessage: () => 'Passwords do not match.',
        invalidDateRangeMessage: () => 'Start date must be before or equal to end date',
        invalidUrlMessage: () => 'Invalid URL.',
        requiredEmailMessage: () => 'Email is required.',
        minItemsMessage: (min) => `At least ${min} item${min > 1 ? 's' : ''} required`,
        maxItemsMessage: (max) => `No more than ${max} item${max > 1 ? 's' : ''} allowed`,
        atLeastOneRuleMessage: () => 'Add at least one complete rule.',
        incompleteRuleMessage: () => 'Complete all rule fields before continuing.',
        maxRulesMessage: (max) => `No more than ${max} rule${max > 1 ? 's' : ''} allowed.`,
    },
    common: {
        invalidNumberText: () => 'Not a valid number',
        readMoreText: () => 'Read more',
    },
})

export const useUtilsConfig = () => utilsConfig
