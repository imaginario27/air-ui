export interface DropdownMenuItem {
    actionType?: DropdownActionType
    text?: string
    icon?: string
    size?: DropdownItemSize
    type?: DropdownItemType
    userDisplayName?: string
    userProfileImg?: string
    imgUrl?: string
    alt?: string
    helpText?: string
    to?: string
    isExternal?: boolean
    hasSeparator?: boolean
    callback?: () => void
}
