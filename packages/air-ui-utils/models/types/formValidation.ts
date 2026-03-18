export type RuleValidationValue = string | number | null

export interface RuleValidationItem {
    item: RuleValidationValue
    operator: RuleValidationValue
    value: RuleValidationValue
}

export type ArrayValidator<T> = (value: T[]) => string | null

/**
 * Configuration options for the ready-to-use RulesField validator factory.
 */
export interface CreateRulesFieldValidatorOptions {
    required?: boolean
    requiredFieldMessage?: string
    incompleteRuleMessage?: string
    maxRules?: number
    maxRulesMessage?: string
    validators?: ArrayValidator<RuleValidationItem>[]
}
