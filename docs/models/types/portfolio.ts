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
    sectionIcon?: string
    items: ComponentPortfolioItem[]
}

export type BlockPortfolioItem = ComponentPortfolioItem

export type GroupedBlockPortfolioItem = GroupedComponentPortfolioItem

export interface GroupedUtilPortfolioItem {
    title: string
    sectionIcon?: string
    items: UtilPortfolioItem[]
}

export interface UtilPortfolioItem {
    title: string
    to?: string
    isSectionTitle?: boolean
    sectionIcon?: string 
    description?: string
}