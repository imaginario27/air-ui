export interface ActionButton {
    text: string
    value: string
    active?: boolean
    action?: () => void
    size?: ButtonSize
    icon?: string
    iconPosition?: IconPosition
    disabled?: boolean
}

export type ToggleButton = ActionButton
export interface OptionButton extends ActionButton {
    styleType?: ButtonStyleType
}

export interface AlertButton {
    text: string
    actionType?: ButtonActionType
    icon?: string
    iconPosition?: IconPosition
    disabled?: boolean
    to?: string
    isExternal?: boolean
    callback?: () => void
}