export interface GlowSettings {
    colorMode: GlowColorMode
    trigger: GlowTrigger
    type: GlowType
    opacity: number
    // In px. `null` keeps the size that the component calculates by itself (e.g. from its `size`)
    size: number | null
}
