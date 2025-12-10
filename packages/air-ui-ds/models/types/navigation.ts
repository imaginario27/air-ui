export interface MenuItem {
    text: string
    to: string
}

export interface FooterMenuItem {
    text: string
    to: string
}

export interface SidebarMenuItem {
    text: string
    icon?: string
    to?: string
    isSectionTitle?: boolean
}