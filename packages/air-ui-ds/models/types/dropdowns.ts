export interface DropdownMenuItem {
    actionType?: DropdownActionType
    text?: string
    icon?: any
    size?: DropdownItemSize
    type?: DropdownItemType
    userDisplayName?: string
    userProfileImg?: string
    imgUrl?: string
    alt?: string
    helpText?: string
    to?: string
    isExternal?: boolean
    exportData?: Record<string, any>[]
    exportFields?: Record<string, any>
    exportType?: string
    exportFileName?: string
    hasSeparator?: boolean
    callback?: () => void
}
