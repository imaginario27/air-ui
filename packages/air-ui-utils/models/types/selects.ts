export interface SelectOption {
    id?: string | number
    value: string | number
    text?: string
    icon?: any
    customIcon?: string
    userDisplayName?: string
    userProfileImg?: string
    imgUrl?: string
    alt?: string
    helpText?: string
    to?: string
    isExternal?: boolean
}