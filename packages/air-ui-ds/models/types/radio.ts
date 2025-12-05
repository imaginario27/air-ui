export interface RadioOption {
    id: string | number
    value: string | number | boolean
    label: string
    helpText?: string
    disabled?: boolean
    type?: ColorAccent.INFO | ColorAccent.SUCCESS | ColorAccent.DANGER | ColorAccent.PRIMARY_BRAND | ColorAccent.SECONDARY_BRAND
    icon?: string
}