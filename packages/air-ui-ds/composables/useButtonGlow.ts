// composables/useButtonGlow.ts
// Button glow: the color follows the style type and the spread follows the button size.
export const useButtonGlow = (props: {
    glowColorMode?: GlowColorMode
    glowTrigger?: GlowTrigger
    styleType: ButtonStyleType
    size: ButtonSize
}) => {
    const colorClass = computed(() => {
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
            [ButtonSize.XS]: '[--glow-size:8px]',
            [ButtonSize.SM]: '[--glow-size:12px]',
            [ButtonSize.MD]: '[--glow-size:16px]',
            [ButtonSize.LG]: '[--glow-size:20px]',
            [ButtonSize.XL]: '[--glow-size:24px]',
            [ButtonSize.XXL]: '[--glow-size:32px]',
        }

        return variant[props.size as ButtonSize] || '[--glow-size:20px]'
    })

    return useGlow(() => props.glowColorMode, {
        trigger: () => props.glowTrigger,
        colorClass,
        sizeClass,
    })
}
