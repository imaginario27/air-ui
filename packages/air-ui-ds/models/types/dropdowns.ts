export interface DropdownMenuItem {
    actionType?: DropdownActionType
    sectionTitle?: boolean
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
    disabled?: boolean
    callback?: () => void
    children?: DropdownMenuItem[]
}

export interface ContextMenuItem extends DropdownMenuItem {
    divider?: boolean
    kbd?: string | string[]
    children?: ContextMenuItem[]
}

export interface CollapsedDropdownItem {
    sectionTitle?: boolean
    text: string
    to?: string
    icon?: string
    type?: DropdownItemType
    size?: DropdownItemSize
    helpText?: string
    isExternal?: boolean
    disabled?: boolean
    hasSeparator?: boolean
    actionType: DropdownActionType
    children?: CollapsedDropdownItem[]
}

