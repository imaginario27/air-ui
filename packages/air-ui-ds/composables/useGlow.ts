// composables/useGlow.ts
// Returns the utility classes that draw a glow around an element.
// `glowColorMode` decides in which theme it shows (light, dark, both or none), `trigger` decides when (always, hover, focus),
// `type` decides if the glow is drawn outside (outer) or inside (inner) the element and `opacity` sets how strong it is (0 to 100).
// The glow reads `--glow-color`, `--glow-size` and `--glow-opacity`; pass `colorClass` / `sizeClass` (static `[--glow-*:…]` classes) to set the first two.
// `size` (in px) overrides `sizeClass` when it is a valid number.
interface GlowOptions {
    trigger?: MaybeRefOrGetter<GlowTrigger | undefined>
    type?: MaybeRefOrGetter<GlowType | undefined>
    opacity?: MaybeRefOrGetter<number | string | null | undefined>
    size?: MaybeRefOrGetter<number | string | null | undefined>
    colorClass?: MaybeRefOrGetter<string>
    sizeClass?: MaybeRefOrGetter<string>
    // Use `:focus-within` instead of `:focus-visible`, for a wrapper that contains the focusable element (e.g. an input box)
    focusWithin?: boolean
}

type GlowEvent = 'always' | 'hover' | 'focus' | 'focusWithin'

const DEFAULT_GLOW_OPACITY = 55
const MAX_GLOW_SIZE = 64

// Tailwind scans the source text, so each class below must be written out in full (never built from a template)
const GLOW_SHADOW: Record<GlowEvent, string> = {
    always: 'shadow-[0_0_var(--glow-size,24px)_color-mix(in_srgb,var(--glow-color,var(--color-background-primary-brand-default))_var(--glow-opacity,55%),transparent)]',
    hover: 'hover:shadow-[0_0_var(--glow-size,24px)_color-mix(in_srgb,var(--glow-color,var(--color-background-primary-brand-default))_var(--glow-opacity,55%),transparent)]',
    focus: 'focus-visible:shadow-[0_0_var(--glow-size,24px)_color-mix(in_srgb,var(--glow-color,var(--color-background-primary-brand-default))_var(--glow-opacity,55%),transparent)]',
    focusWithin:
        'focus-within:shadow-[0_0_var(--glow-size,24px)_color-mix(in_srgb,var(--glow-color,var(--color-background-primary-brand-default))_var(--glow-opacity,55%),transparent)]',
}

const GLOW_SHADOW_DARK: Record<GlowEvent, string> = {
    always: '[.dark_&]:shadow-[0_0_var(--glow-size,24px)_color-mix(in_srgb,var(--glow-color,var(--color-background-primary-brand-default))_var(--glow-opacity,55%),transparent)]',
    hover: '[.dark_&]:hover:shadow-[0_0_var(--glow-size,24px)_color-mix(in_srgb,var(--glow-color,var(--color-background-primary-brand-default))_var(--glow-opacity,55%),transparent)]',
    focus: '[.dark_&]:focus-visible:shadow-[0_0_var(--glow-size,24px)_color-mix(in_srgb,var(--glow-color,var(--color-background-primary-brand-default))_var(--glow-opacity,55%),transparent)]',
    focusWithin:
        '[.dark_&]:focus-within:shadow-[0_0_var(--glow-size,24px)_color-mix(in_srgb,var(--glow-color,var(--color-background-primary-brand-default))_var(--glow-opacity,55%),transparent)]',
}

const GLOW_SHADOW_INNER: Record<GlowEvent, string> = {
    always: 'shadow-[inset_0_0_var(--glow-size,24px)_color-mix(in_srgb,var(--glow-color,var(--color-background-primary-brand-default))_var(--glow-opacity,55%),transparent)]',
    hover: 'hover:shadow-[inset_0_0_var(--glow-size,24px)_color-mix(in_srgb,var(--glow-color,var(--color-background-primary-brand-default))_var(--glow-opacity,55%),transparent)]',
    focus: 'focus-visible:shadow-[inset_0_0_var(--glow-size,24px)_color-mix(in_srgb,var(--glow-color,var(--color-background-primary-brand-default))_var(--glow-opacity,55%),transparent)]',
    focusWithin:
        'focus-within:shadow-[inset_0_0_var(--glow-size,24px)_color-mix(in_srgb,var(--glow-color,var(--color-background-primary-brand-default))_var(--glow-opacity,55%),transparent)]',
}

const GLOW_SHADOW_INNER_DARK: Record<GlowEvent, string> = {
    always: '[.dark_&]:shadow-[inset_0_0_var(--glow-size,24px)_color-mix(in_srgb,var(--glow-color,var(--color-background-primary-brand-default))_var(--glow-opacity,55%),transparent)]',
    hover: '[.dark_&]:hover:shadow-[inset_0_0_var(--glow-size,24px)_color-mix(in_srgb,var(--glow-color,var(--color-background-primary-brand-default))_var(--glow-opacity,55%),transparent)]',
    focus: '[.dark_&]:focus-visible:shadow-[inset_0_0_var(--glow-size,24px)_color-mix(in_srgb,var(--glow-color,var(--color-background-primary-brand-default))_var(--glow-opacity,55%),transparent)]',
    focusWithin:
        '[.dark_&]:focus-within:shadow-[inset_0_0_var(--glow-size,24px)_color-mix(in_srgb,var(--glow-color,var(--color-background-primary-brand-default))_var(--glow-opacity,55%),transparent)]',
}

// Turns the light glow off in dark mode. It mirrors each trigger so it always beats the light shadow's specificity
const GLOW_OFF_DARK: Record<GlowEvent, string> = {
    always: '[.dark_&]:shadow-none',
    hover: '[.dark_&]:hover:shadow-none',
    focus: '[.dark_&]:focus-visible:shadow-none',
    focusWithin: '[.dark_&]:focus-within:shadow-none',
}

// Opacity comes in steps of 5, written out in full for the same reason. The default (55) needs no class: it is the fallback of the shadow
const GLOW_OPACITY: Record<number, string> = {
    0: '[--glow-opacity:0%]',
    5: '[--glow-opacity:5%]',
    10: '[--glow-opacity:10%]',
    15: '[--glow-opacity:15%]',
    20: '[--glow-opacity:20%]',
    25: '[--glow-opacity:25%]',
    30: '[--glow-opacity:30%]',
    35: '[--glow-opacity:35%]',
    40: '[--glow-opacity:40%]',
    45: '[--glow-opacity:45%]',
    50: '[--glow-opacity:50%]',
    55: '[--glow-opacity:55%]',
    60: '[--glow-opacity:60%]',
    65: '[--glow-opacity:65%]',
    70: '[--glow-opacity:70%]',
    75: '[--glow-opacity:75%]',
    80: '[--glow-opacity:80%]',
    85: '[--glow-opacity:85%]',
    90: '[--glow-opacity:90%]',
    95: '[--glow-opacity:95%]',
    100: '[--glow-opacity:100%]',
}

// Size comes in steps of 2 up to 64px, written out in full for the same reason
const GLOW_SIZE: Record<number, string> = {
    0: '[--glow-size:0px]',
    2: '[--glow-size:2px]',
    4: '[--glow-size:4px]',
    6: '[--glow-size:6px]',
    8: '[--glow-size:8px]',
    10: '[--glow-size:10px]',
    12: '[--glow-size:12px]',
    14: '[--glow-size:14px]',
    16: '[--glow-size:16px]',
    18: '[--glow-size:18px]',
    20: '[--glow-size:20px]',
    22: '[--glow-size:22px]',
    24: '[--glow-size:24px]',
    26: '[--glow-size:26px]',
    28: '[--glow-size:28px]',
    30: '[--glow-size:30px]',
    32: '[--glow-size:32px]',
    34: '[--glow-size:34px]',
    36: '[--glow-size:36px]',
    38: '[--glow-size:38px]',
    40: '[--glow-size:40px]',
    42: '[--glow-size:42px]',
    44: '[--glow-size:44px]',
    46: '[--glow-size:46px]',
    48: '[--glow-size:48px]',
    50: '[--glow-size:50px]',
    52: '[--glow-size:52px]',
    54: '[--glow-size:54px]',
    56: '[--glow-size:56px]',
    58: '[--glow-size:58px]',
    60: '[--glow-size:60px]',
    62: '[--glow-size:62px]',
    64: '[--glow-size:64px]',
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

        const isInner = toValue(options.type) === GlowType.INNER
        const lightShadow = isInner ? GLOW_SHADOW_INNER : GLOW_SHADOW
        const darkShadow = isInner ? GLOW_SHADOW_INNER_DARK : GLOW_SHADOW_DARK

        const variant: Record<GlowColorMode, string[]> = {
            [GlowColorMode.NONE]: [],
            [GlowColorMode.BOTH]: events.map((event) => lightShadow[event]),
            [GlowColorMode.LIGHT]: [
                ...events.map((event) => lightShadow[event]),
                ...events.map((event) => GLOW_OFF_DARK[event]),
            ],
            [GlowColorMode.DARK]: events.map((event) => darkShadow[event]),
        }

        const classes = variant[type] || []

        if (!classes.length) return []

        // Snap to the nearest step of 5 inside 0–100; anything that is not a number falls back to the default
        const rawOpacity = toValue(options.opacity)
        const numericOpacity =
            rawOpacity === undefined || rawOpacity === null || rawOpacity === '' ? NaN : Number(rawOpacity)
        const opacity = Number.isFinite(numericOpacity)
            ? Math.min(100, Math.max(0, Math.round(numericOpacity / 5) * 5))
            : DEFAULT_GLOW_OPACITY
        const opacityClass = opacity === DEFAULT_GLOW_OPACITY ? '' : GLOW_OPACITY[opacity] || ''

        // A valid custom size snaps to the nearest step of 2 inside 0–64 and replaces the size of the component
        const rawSize = toValue(options.size)
        const numericSize = rawSize === undefined || rawSize === null || rawSize === '' ? NaN : Number(rawSize)
        const sizeClass = Number.isFinite(numericSize)
            ? GLOW_SIZE[Math.min(MAX_GLOW_SIZE, Math.max(0, Math.round(numericSize / 2) * 2))] || ''
            : toValue(options.sizeClass) || ''

        return [...classes, toValue(options.colorClass) || '', sizeClass, opacityClass].filter(Boolean)
    })

    return {
        glowClass,
    }
}
