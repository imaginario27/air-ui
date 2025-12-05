<template>
    <div 
        :class="[
            'flex',
            'items-center',
            'gap-2',
            'px-3',
            'hover:cursor-pointer',
            'group',
            styleClass
        ]"
    >
        <MdiIcon 
            v-if="decoration === TabDecoration.ICON"
            size="20"
            preserveAspectRatio="xMidYMid meet"
            :class="[
                'min-w-[20px]'
            ]"
            :icon
        />

        <template v-if="decoration === TabDecoration.IMAGE">
            <img
                v-if="imgUrl && isImageLoaded"
                :src="imgUrl"
                alt="Tab decoration"
                class="w-[20px] h-[20px] rounded"
                @load="handleImageLoad"
                @error="handleImageError"
            >
            <img
                v-else
                :src="missingImagePlaceholder"
                alt="Tab decoration"
                class="w-[20px] h-[20px] rounded"
            >
        </template>

        <span 
            :class="[
                'text-sm',
                'font-semibold',
            ]"
        >
            {{ text }}
        </span>

        <Badge 
            v-if="computedBadgeValue"
            :text="computedBadgeValue"
            :styleType="active ? BadgeStyle.FILLED : BadgeStyle.FLAT"
            :color="active ? ColorAccent.PRIMARY_BRAND : ColorAccent.NEUTRAL"
            :shape="BadgeShape.PILL"
            :class="[ 
                !props.active && tabStyle !== TabStyle.PILL_MONOCRHOME && 'group-hover:bg-background-primary-brand-subtle-active',
            ]"
        />
    </div>
</template>
<script setup lang="ts">
// Imports
import missingImagePlaceholder from "@/assets/images/placeholders/missing-image-placeholder.png"

// Props
const props = defineProps({
    tabStyle: {
        type: String as PropType<TabStyle>,
        default: TabStyle.UNDERLINE,
        validator: (value: TabStyle) => Object.values(TabStyle).includes(value),
    },
    text: {
        type: String as PropType<string>,
        default: 'Tab text',
    },
    decoration: {
        type: String as PropType<TabDecoration>,
        default: TabDecoration.NONE,
        validator: (value: TabDecoration) => Object.values(TabDecoration).includes(value),
    },
    icon: {
        type: String as PropType<any>,
        default: 'mdiHelp',
    },
    imgUrl: String as PropType<string>,
    active: {
        type: Boolean as PropType<boolean>,
        default: false,
    },
    badgeValue: [String, Number] as PropType<string | number>,
})

// States
const isImageLoaded = ref(true)

// Handlers for image load and error
const handleImageLoad = () => {
    isImageLoaded.value = true
}

const handleImageError = () => {
    isImageLoaded.value = false
}

// Computed Tailwind Classes
const styleClass = computed(() => {
    const styleVariants = {
        [TabStyle.UNDERLINE]: [
            'min-h-[52px]', 
            'border-b-2', 
            props.active ? 
                'border-b-border-primary-brand-default text-text-primary-brand-active' 
                : 'border-b-border-inactive text-text-neutral-inactive, hover:text-text-primary-brand-hover hover:border-b-border-primary-brand-hover',  
        ],
        [TabStyle.PILL]: [
            'min-h-[40px]',
            'rounded', 
            props.active ? 
                'text-text-primary-brand-active bg-background-primary-brand-subtle-active' 
                : 'text-text-neutral-inactive hover:text-text-primary-brand-hover',  
        ],
        [TabStyle.PILL_MONOCRHOME]: [
            'min-h-[40px]',
            'rounded', 
            props.active ? 
                'text-text-neutral-on-monochrome-active-bg bg-background-neutral-active' 
                : 'text-text-neutral-inactive hover:text-text-neutral-on-monochrome-hover-bg',  
        ],
    }
    return styleVariants[props.tabStyle as TabStyle] || [
        'min-h-[52px]', 
        'border-b-2', 
        props.active ? 
            'border-b-border-primary-brand-default text-text-primary-brand-active' 
            : 'border-b-border-inactive text-text-neutral-inactive, hover:text-text-primary-brand-hover hover:border-b-border-primary-brand-hover',  
    ]
})

// Computed functions
const computedBadgeValue = computed(() => {
    if (props.badgeValue === null || props.badgeValue === undefined) return null

    return typeof props.badgeValue === 'number' ? props.badgeValue.toString() : props.badgeValue
})
</script>