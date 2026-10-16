// composables/useButtonGlow.ts
// Button glow: the color follows the style type and the spread follows the button size.
// An inner glow on a filled button would be the same color as its background, so it uses the color of the label on that fill instead.
export const useButtonGlow = (props: {
    glowColorMode?: GlowColorMode
    glowTrigger?: GlowTrigger
    glowType?: GlowType
    glowOpacity?: number
    glowSize?: number | null
    styleType: ButtonStyleType
    size: ButtonSize
}) => {
    const settings = useGlowSettings('button', props)

    const colorClass = computed(() => {
        if (settings.type.value === GlowType.INNER) {
            const innerVariant = {
                [ButtonStyleType.PRIMARY_BRAND_FILLED]: '[--glow-color:var(--color-text-neutral-on-filled)]',
                [ButtonStyleType.SECONDARY_BRAND_FILLED]: '[--glow-color:var(--color-text-neutral-on-filled)]',
                [ButtonStyleType.DELETE_FILLED]: '[--glow-color:var(--color-text-neutral-on-filled)]',
                [ButtonStyleType.NEUTRAL_FILLED]: '[--glow-color:var(--color-text-neutral-on-neutral-filled-bg)]',
            }
            const inner = innerVariant[props.styleType as keyof typeof innerVariant]

            if (inner) return inner
        }

        const variant = {
            [ButtonStyleType.PRIMARY_BRAND_FILLED]: '[--glow-color:var(--color-background-primary-brand-default)]',
            [ButtonStyleType.PRIMARY_BRAND_SOFT]: '[--glow-color:var(--color-background-primary-brand-default)]',
            [ButtonStyleType.PRIMARY_BRAND_TRANSPARENT]: '[--glow-color:var(--color-background-primary-brand-default)]',
            [ButtonStyleType.SECONDARY_BRAND_FILLED]: '[--glow-color:var(--color-background-secondary-brand-default)]',
            [ButtonStyleType.NEUTRAL_FILLED]: '[--glow-color:var(--color-background-neutral-bold)]',
            [ButtonStyleType.NEUTRAL_OUTLINED]: '[--glow-color:var(--color-background-neutral-bold)]',
            [ButtonStyleType.NEUTRAL_TRANSPARENT]: '[--glow-color:var(--color-background-neutral-bold)]',
            [ButtonStyleType.NEUTRAL_TRANSPARENT_SUBTLE]: '[--glow-color:var(--color-background-neutral-bold)]',
            [ButtonStyleType.DELETE_FILLED]: '[--glow-color:var(--color-background-delete-default)]',
            [ButtonStyleType.DELETE_SOFT]: '[--glow-color:var(--color-background-delete-default)]',
            [ButtonStyleType.DELETE_OUTLINED]: '[--glow-color:var(--color-background-delete-default)]',
            [ButtonStyleType.DELETE_TRANSPARENT]: '[--glow-color:var(--color-background-delete-default)]',
        }

        return variant[props.styleType as ButtonStyleType] || '[--glow-color:var(--color-background-neutral-bold)]'
    })

    const sizeClass = computed(() => {
        const variant = {
            [ButtonSize.XS]: '[--glow-size:4px]',
            [ButtonSize.SM]: '[--glow-size:8px]',
            [ButtonSize.MD]: '[--glow-size:12px]',
            [ButtonSize.LG]: '[--glow-size:16px]',
            [ButtonSize.XL]: '[--glow-size:20px]',
            [ButtonSize.XXL]: '[--glow-size:24px]',
        }

        return variant[props.size as ButtonSize] || '[--glow-size:16px]'
    })

    return useGlow(settings.colorMode, {
        trigger: settings.trigger,
        type: settings.type,
        opacity: settings.opacity,
        size: settings.size,
        colorClass,
        sizeClass,
    })
}
