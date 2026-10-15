// composables/useGlow.ts
// Returns the utility classes that draw a glow around an element.
// `glowColorMode` decides in which theme it shows (light, dark, both or none) and `trigger` decides when (always, hover, focus).
// The glow reads `--glow-color` and `--glow-size`; pass `colorClass` / `sizeClass` (static `[--glow-*:…]` classes) to set them.
interface GlowOptions {
    trigger?: MaybeRefOrGetter<GlowTrigger | undefined>
    colorClass?: MaybeRefOrGetter<string>
    sizeClass?: MaybeRefOrGetter<string>
    // Use `:focus-within` instead of `:focus-visible`, for a wrapper that contains the focusable element (e.g. an input box)
    focusWithin?: boolean
}

type GlowEvent = 'always' | 'hover' | 'focus' | 'focusWithin'

// Tailwind scans the source text, so each class below must be written out in full (never built from a template)
const GLOW_SHADOW: Record<GlowEvent, string> = {
    always: 'shadow-[0_0_var(--glow-size,24px)_color-mix(in_srgb,var(--glow-color,var(--color-background-primary-brand-default))_55%,transparent)]',
    hover: 'hover:shadow-[0_0_var(--glow-size,24px)_color-mix(in_srgb,var(--glow-color,var(--color-background-primary-brand-default))_55%,transparent)]',
    focus: 'focus-visible:shadow-[0_0_var(--glow-size,24px)_color-mix(in_srgb,var(--glow-color,var(--color-background-primary-brand-default))_55%,transparent)]',
    focusWithin:
        'focus-within:shadow-[0_0_var(--glow-size,24px)_color-mix(in_srgb,var(--glow-color,var(--color-background-primary-brand-default))_55%,transparent)]',
}

const GLOW_SHADOW_DARK: Record<GlowEvent, string> = {
    always: '[.dark_&]:shadow-[0_0_var(--glow-size,24px)_color-mix(in_srgb,var(--glow-color,var(--color-background-primary-brand-default))_55%,transparent)]',
    hover: '[.dark_&]:hover:shadow-[0_0_var(--glow-size,24px)_color-mix(in_srgb,var(--glow-color,var(--color-background-primary-brand-default))_55%,transparent)]',
    focus: '[.dark_&]:focus-visible:shadow-[0_0_var(--glow-size,24px)_color-mix(in_srgb,var(--glow-color,var(--color-background-primary-brand-default))_55%,transparent)]',
    focusWithin:
        '[.dark_&]:focus-within:shadow-[0_0_var(--glow-size,24px)_color-mix(in_srgb,var(--glow-color,var(--color-background-primary-brand-default))_55%,transparent)]',
}

// Turns the light glow off in dark mode. It mirrors each trigger so it always beats the light shadow's specificity
const GLOW_OFF_DARK: Record<GlowEvent, string> = {
    always: '[.dark_&]:shadow-none',
    hover: '[.dark_&]:hover:shadow-none',
    focus: '[.dark_&]:focus-visible:shadow-none',
    focusWithin: '[.dark_&]:focus-within:shadow-none',
}

const TRIGGER_EVENTS: Record<GlowTrigger, GlowEvent[]> = {
    [GlowTrigger.ALWAYS]: ['always'],
    [GlowTrigger.HOVER]: ['hover'],
    [GlowTrigger.FOCUS]: ['focus'],
    [GlowTrigger.HOVER_FOCUS]: ['hover', 'focus'],
}

export const useGlow = (glowColorMode: MaybeRefOrGetter<GlowColorMode | undefined>, options: GlowOptions = {}) => {
    const glowClass = computed<string[]>(() => {
        const type = toValue(glowColorMode)

        if (!type || type === GlowColorMode.NONE) return []

        const triggerEvents =
            TRIGGER_EVENTS[toValue(options.trigger) as GlowTrigger] || TRIGGER_EVENTS[GlowTrigger.ALWAYS]
        const events = triggerEvents.map((event) => (event === 'focus' && options.focusWithin ? 'focusWithin' : event))

        const variant: Record<GlowColorMode, string[]> = {
            [GlowColorMode.NONE]: [],
            [GlowColorMode.BOTH]: events.map((event) => GLOW_SHADOW[event]),
            [GlowColorMode.LIGHT]: [
                ...events.map((event) => GLOW_SHADOW[event]),
                ...events.map((event) => GLOW_OFF_DARK[event]),
            ],
            [GlowColorMode.DARK]: events.map((event) => GLOW_SHADOW_DARK[event]),
        }

        const classes = variant[type] || []

        if (!classes.length) return []

        return [...classes, toValue(options.colorClass) || '', toValue(options.sizeClass) || ''].filter(Boolean)
    })

    return {
        glowClass,
    }
}
