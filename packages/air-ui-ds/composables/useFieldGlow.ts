// composables/useFieldGlow.ts
// Form field glow: only the field box glows (never the label or the help text).
// The color is the brand color and turns to the error color on error. The spread follows the field size.
// The focus trigger uses `:focus-within` because the focusable element lives inside the box.
export const useFieldGlow = (
    props: {
        glowColorMode?: GlowColorMode
        glowTrigger?: GlowTrigger
        size?: string
    },
    hasError: MaybeRefOrGetter<boolean> = false,
) => {
    return useGlow(() => props.glowColorMode, {
        trigger: () => props.glowTrigger,
        focusWithin: true,
        colorClass: () =>
            toValue(hasError)
                ? '[--glow-color:var(--color-border-error)]'
                : '[--glow-color:var(--color-border-primary-brand-default)]',
        sizeClass: () => (props.size === InputSize.LG ? '[--glow-size:16px]' : '[--glow-size:12px]'),
    })
}
