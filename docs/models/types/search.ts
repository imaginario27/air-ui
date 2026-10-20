export interface SearchSectionItem {
    text: string
    to: string
    excerpt?: string
}

export interface SearchItem {
    text: string
    breadcrumbs: string
    badgeText: string
    to: string
    sections?: SearchSectionItem[]
}
