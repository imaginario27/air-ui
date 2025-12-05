export interface ComponentPortfolioItem {
    title: string
    to?: string
    isSectionTitle?: boolean
    sectionIcon?: string 
    imgUrl?: string
    description?: string
}

export interface GroupedComponentPortfolioItem {
    title: string
    sectionIcon?: any
    items: ComponentPortfolioItem[]
}
