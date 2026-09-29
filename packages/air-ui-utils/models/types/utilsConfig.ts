export interface UtilsConfig {
    validation: {
        requiredFieldMessage: () => string
        invalidEmailMessage: () => string
        passwordsDoNotMatchMessage: () => string
        invalidDateRangeMessage: () => string
        invalidUrlMessage: () => string
    }
}
