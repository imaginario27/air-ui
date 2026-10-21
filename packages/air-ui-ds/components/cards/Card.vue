<template>
    <div
        data-surface="container"
        :class="[
            'flex flex-col gap-5',
            'bg-background-container-surface',
            'p-4',
            hasBorder ? 'border border-border-default' : undefined,
            'rounded-lg',
            hasShadow && !glowReplacesLightShadow ? 'shadow-sm' : undefined,
            hasShadow && glowReplacesDarkShadow ? '[.dark_&]:shadow-none' : undefined,
            'w-full',
            glowClass.length ? 'transition-[background-color,box-shadow] duration-200' : undefined,
            hasBackgroundHover && !glowClass.length && 'transition-colors duration-200',
            hasBackgroundHover && 'hover:bg-background-neutral-subtlest/40',
            ...glowClass,
        ]"
    >
        <slot />
    </div>
</template>
<script setup lang="ts">
// Props
const props = defineProps({
    hasShadow: {
        type: Boolean as PropType<boolean>,
        default: true,
    },
    hasBorder: {
        type: Boolean as PropType<boolean>,
        default: true,
    },
    hasBackgroundHover: {
        type: Boolean as PropType<boolean>,
        default: false,
    },
    glowColorMode: {
        type: String as PropType<GlowColorMode>,
        validator: (value: GlowColorMode) => Object.values(GlowColorMode).includes(value),
    },
    glowTrigger: {
        type: String as PropType<GlowTrigger>,
        validator: (value: GlowTrigger) => Object.values(GlowTrigger).includes(value),
    },
    glowType: {
        type: String as PropType<GlowType>,
        validator: (value: GlowType) => Object.values(GlowType).includes(value),
    },
    glowOpacity: {
        type: Number as PropType<number>,
        validator: (value: number) => value >= 0 && value <= 100,
    },
    glowSize: {
        type: Number as PropType<number | null>,
        validator: (value: number | null) => value === null || value >= 0,
    },
})

// Glow
const glowSettings = useGlowSettings('card', props)
const { glowClass } = useGlow(glowSettings.colorMode, {
    trigger: glowSettings.trigger,
    type: glowSettings.type,
    opacity: glowSettings.opacity,
    size: glowSettings.size,
    focusWithin: true,
    colorClass: '[--glow-color:var(--color-background-neutral-bold)]',
    sizeClass: '[--glow-size:12px]',
})

// The glow takes the place of the resting shadow when that shadow would win over it (always-on glow) or could not
// transition to it (an inner glow is an inset shadow, which does not interpolate with the outer resting shadow)
// It only does so in the theme(s) where the glow is shown (`glowColorMode`), so the other theme keeps its shadow
const glowReplacesShadow = computed(
    () =>
        glowClass.value.length > 0 &&
        (glowSettings.trigger.value === GlowTrigger.ALWAYS || glowSettings.type.value === GlowType.INNER),
)

const glowReplacesLightShadow = computed(
    () =>
        glowReplacesShadow.value &&
        [GlowColorMode.LIGHT, GlowColorMode.BOTH].includes(glowSettings.colorMode.value as GlowColorMode),
)

// An always-on dark glow already beats the resting shadow in dark mode (the `.dark` variant is more specific),
// so the resting shadow is only cleared there when the glow is a transition (inner glow on hover/focus)
const glowReplacesDarkShadow = computed(
    () =>
        glowReplacesShadow.value && !glowReplacesLightShadow.value && glowSettings.trigger.value !== GlowTrigger.ALWAYS,
)
</script>
