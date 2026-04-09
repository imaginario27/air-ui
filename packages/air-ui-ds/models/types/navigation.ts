export interface SubmenuItem {
    text: string
    to: string
}

export interface MenuItem {
    text: string
    to: string
    children?: SubmenuItem[]
    submenuDropdownClass?: string
}

export interface SocialNetwork {
    name: string
    link: string
    icon: string
}

export interface SidebarMenuItem {
    text: string
    icon?: string
    to?: string
    isSectionTitle?: boolean
    children?: SidebarMenuItem[]
    disabled?: boolean
}