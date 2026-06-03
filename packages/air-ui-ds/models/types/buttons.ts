export interface ActionButton {
    text: string
    value: string
    ariaLabel?: string
    active?: boolean
    action?: () => void
    size?: ButtonSize
    icon?: string
    iconPosition?: IconPosition
    disabled?: boolean
}

export interface BaseToggleButton {
    value: string
    ariaLabel?: string
    active?: boolean
    action?: () => void
    size?: ButtonSize
    icon?: string
}

export interface ToggleButton extends BaseToggleButton {
    text: string
    iconPosition?: IconPosition
}

export type ToggleIconButton = BaseToggleButton

export type ToggleButtonItem = ToggleButton | ToggleIconButton

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