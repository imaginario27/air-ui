export interface UtilsConfig {
    validation: {
        requiredFieldMessage: () => string
        invalidEmailMessage: () => string
        passwordsDoNotMatchMessage: () => string
        invalidDateRangeMessage: () => string
        invalidUrlMessage: () => string
        requiredEmailMessage: () => string
        /** Receives the minimum so each language can pluralize on its own. */
        minItemsMessage: (min: number) => string
        /** Receives the maximum so each language can pluralize on its own. */
        maxItemsMessage: (max: number) => string
        atLeastOneRuleMessage: () => string
        incompleteRuleMessage: () => string
        /** Receives the maximum so each language can pluralize on its own. */
        maxRulesMessage: (max: number) => string
    }
    common: {
        invalidNumberText: () => string
        readMoreText: () => string
    }
    /** Reactive getter apps use to signal that texts changed (e.g. the locale). Optional. */
    revalidateOn?: () => unknown
}
