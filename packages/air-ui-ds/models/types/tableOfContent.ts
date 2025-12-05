export interface TOCLink {
    text: string
    id: string
    children?: TOCLink[]
    depth: number
}