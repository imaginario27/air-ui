<template>
    <output
        :aria-label="ariaLabel ?? dsConfig.accessibility.spinnerText()"
        :class="['block', 'shrink-0', 'h-4', 'w-4', ...(isRing ? ringClasses : iconClasses)]"
        :style="isRing ? undefined : { 'border-width': '0 !important' }"
    >
        <Icon
            v-if="!isRing"
            :name="iconName!"
            :mode="IconMode.SVG"
            :svgCustomize="resolvedUseOpacity ? undefined : removeStaticOpacity"
            :iconClass="['w-full', 'h-full', 'min-w-full', 'min-h-full']"
        />
    </output>
</template>

<script setup lang="ts">
import { loadIcon } from '@iconify/vue'

const props = defineProps({
    ariaLabel: String as PropType<string>,
    variant: {
        type: String as PropType<SpinnerVariant | null>,
        default: null,
        validator: (value: SpinnerVariant | null) => value === null || Object.values(SpinnerVariant).includes(value),
    },
    useOpacity: {
        type: Boolean as PropType<boolean | null>,
        default: null,
    },
})

const dsConfig = useDSConfig()

const resolvedVariant = computed(() => props.variant ?? dsConfig.spinner.variant)
const resolvedUseOpacity = computed(() => props.useOpacity ?? dsConfig.spinner.useOpacity)

const removeStaticOpacity: CollectionCustomizeCallback = (svg) => svg.replace(/\sopacity="[^"]*"/g, '')

const iconName = computed(() =>
    resolvedVariant.value === SpinnerVariant.RING ? undefined : `svg-spinners:${resolvedVariant.value}`,
)

// Falls back to the CSS ring when the icon collection cannot be resolved
const iconFailed = ref(false)

watch(
    iconName,
    async (name) => {
        iconFailed.value = false
        if (!name || !import.meta.client) return

        try {
            await loadIcon(name)
        } catch {
            iconFailed.value = true
        }
    },
    { immediate: true },
)

const isRing = computed(() => !iconName.value || iconFailed.value)

const ringClasses = [
    'animate-spin',
    'will-change-transform',
    'rounded-full',
    'border-2',
    'border-border-primary-brand-default',
    'border-t-transparent',
]

const iconClasses = ['text-border-primary-brand-default']
</script>
