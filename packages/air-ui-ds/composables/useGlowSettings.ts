// composables/useGlowSettings.ts
// Resolves the glow settings of a component: a prop passed to the component wins, then the value set in the DS config
// for its family (`useDSConfig().glow`), then the built-in default.
interface GlowSettingsProps {
    glowColorMode?: GlowColorMode
    glowTrigger?: GlowTrigger
    glowType?: GlowType
    glowOpacity?: number
    glowSize?: number | null
}

export const useGlowSettings = (group: keyof DesignSystemConfig['glow'], props: GlowSettingsProps) => {
    const config = useDSConfig().glow[group]

    return {
        colorMode: computed(() => props.glowColorMode ?? config.colorMode),
        trigger: computed(() => props.glowTrigger ?? config.trigger),
        type: computed(() => props.glowType ?? config.type),
        opacity: computed(() => props.glowOpacity ?? config.opacity),
        size: computed(() => props.glowSize ?? config.size),
    }
}
