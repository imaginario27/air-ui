<template>
    <div 
        :class="[
            'flex flex-wrap',
            hasContainer && 'border border-border-default',
            hasContainer && containerStyleClass,
            hasContainer && isContainerFullWidth && 'w-full',
            disabled && 'opacity-disabled cursor-not-allowed pointer-events-none',
        ]"
    >
        <Tab 
            v-for="(tab, index) in tabs" 
            :key="index" 
            :text="tab.text" 
            :icon="tab.icon"
            :imgUrl="tab.imgUrl" 
            :badgeValue="tab.badgeValue"
            :active="index === activeIndex" 
            :disabled="disabled || tab.disabled"
            :tabStyle
            :size="tabSize"
            :decoration
            @click="handleTabClick(index, tab.to)"
            @pointerenter="handleTabPrefetch(tab.to)"
            @focus="handleTabPrefetch(tab.to)"
        />
    </div>
</template>

<script setup lang="ts">
// Props
const props = defineProps({
    tabs: {
        type: Array as PropType<TabItem[]>, 
        default: () => [
            { 
                text: 'Tab 1',
            },
            { 
                text: 'Tab 2',
            },
            { 
                text: 'Tab 3',
            },
        ],
    },
    modelValue: {
        type: Number as PropType<number>,
        default: 0,
    },
    tabStyle: String as PropType<TabStyle>,
    tabSize: {
        type: String as PropType<TabSize>,
        default: TabSize.LG,
        validator: (value: TabSize) => Object.values(TabSize).includes(value),
    },
    decoration: String as PropType<TabDecoration>,
    hasContainer: {
        type: Boolean as PropType<boolean>,
        default: false,
    },
    isContainerFullWidth: {
        type: Boolean as PropType<boolean>,
        default: false,
    },
    disabled: {
        type: Boolean as PropType<boolean>,
        default: false,
    },
    prefetchOn: {
        type: [String, Object] as PropType<PrefetchOnStrategy>,
        default: PrefetchOn.VISIBILITY,
    },
})

// Local
const activeIndex = ref(props.modelValue)

// Emit Event
const emit = defineEmits(['update:modelValue'])

// Methods
const handleTabClick = (index: number, to?: string) => {
    if(to) {
        navigateTo(to)
        return
    }

    activeIndex.value = index
    emit('update:modelValue', index)
}

const isPrefetchOnOptions = (prefetchOn: PrefetchOnStrategy): prefetchOn is PrefetchOnOptions => {
        return typeof prefetchOn === 'object' && prefetchOn !== null
}

const shouldPrefetchOn = (trigger: PrefetchOn): boolean => {
    if (!isPrefetchOnOptions(props.prefetchOn)) {
            return props.prefetchOn === trigger
    }

    return trigger === PrefetchOn.VISIBILITY
            ? !!props.prefetchOn.visibility
            : !!props.prefetchOn.interaction
}

const handleTabPrefetch = (to?: string) => {
    if (!to) return

    if (!shouldPrefetchOn(PrefetchOn.INTERACTION)) return

    // fire and forget - do not await to avoid blocking
    preloadRouteComponents(to)
}
// Watchers
watch(() => props.modelValue, (newVal) => {
    activeIndex.value = newVal
})

// Computed classes
const containerStyleClass = computed(() => {
    const variant: Record<TabSize, string> = {
        [TabSize.LG]: "p-4 rounded-md",
        [TabSize.MD]: "p-3 rounded-sm",
        [TabSize.SM]: "p-2 rounded-sm",
    }

    return variant[props.tabSize as TabSize] || "p-4 rounded-md"
})
</script>
