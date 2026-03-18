export type RuleValue = string | number | null

export interface RuleItem {
    item: RuleValue
    operator: RuleValue
    value: RuleValue
    type?: AllowedInputType
}