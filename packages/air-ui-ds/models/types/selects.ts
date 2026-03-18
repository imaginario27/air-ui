export interface SelectOption {
    id?: string | number
    value: string | number
    text?: string
    inputType?: AllowedInputType
    applicableTypes?: AllowedInputType[]
    icon?: string
    userDisplayName?: string
    userProfileImg?: string
    imgUrl?: string
    alt?: string
    helpText?: string
    to?: string
    isExternal?: boolean
}

export interface SelectableCardOption {
    value: string | boolean
    title: string
    titleClass?: string
    description: string
    descriptionClass?: string
    checkIcon?: string
    icon?: string
    containedIconColor?: ColorAccent
    hasSecondaryBtn?: boolean
    secondaryBtnText?: string
    secondaryBtnIconPosition?: IconPosition
    secondaryBtnIcon?: string
    disabled?: boolean
    secondaryBtnCallback?: () => void
}
