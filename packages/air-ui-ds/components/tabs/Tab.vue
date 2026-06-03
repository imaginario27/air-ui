<template>
    <div
        role="tab"
        :aria-selected="active"
        :tabindex="tabindex"
        :class="[
            'flex',
            'items-center',
            'gap-2',
            'px-3',
            'hover:cursor-pointer',
            'group',
            'outline-none',
            'focus-visible:ring-2 focus-visible:ring-border-primary-brand-default',
            disabled && 'opacity-disabled cursor-not-allowed pointer-events-none',
            styleClass,
        ]"
    >
        <Icon
            v-if="decoration === TabDecoration.ICON"
            :name="icon"
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
                disabled && 'select-none',
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
    size: {
        type: String as PropType<TabSize>,
        default: TabSize.LG,
        validator: (value: TabSize) => Object.values(TabSize).includes(value),
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
        type: String as PropType<string>,
        default: 'mdi:help',
    },
    imgUrl: String as PropType<string>,
    active: {
        type: Boolean as PropType<boolean>,
        default: false,
    },
    badgeValue: [String, Number] as PropType<string | number>,
    disabled: {
        type: Boolean as PropType<boolean>,
        default: false,
    },
    tabindex: {
        type: Number as PropType<number>,
        default: 0,
    },
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
            underlineStyleSizeClass.value,
            'border-b-2', 
            props.active ? 
                'border-b-border-primary-brand-default text-text-primary-brand-active' 
                : 'border-b-border-inactive !text-text-default hover:!text-text-primary-brand-hover hover:border-b-border-primary-brand-hover',  
        ],
        [TabStyle.PILL]: [
            pillStyleSizeClass.value,
            'rounded', 
            props.active ? 
                'text-text-primary-brand-on-soft-bg bg-background-primary-brand-subtle-active' 
                : '!text-text-default hover:!text-text-primary-brand-hover',  
        ],
        [TabStyle.PILL_MONOCRHOME]: [
            pillStyleSizeClass.value,
            'rounded', 
            props.active ? 
                'text-text-neutral-on-monochrome-active-bg bg-background-neutral-active' 
                : '!text-text-default hover:!text-text-neutral-on-monochrome-hover-bg',  
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

const underlineStyleSizeClass = computed(() => {
    const variant: Record<TabSize, string> = {
        [TabSize.LG]: "min-h-[52px]",
        [TabSize.MD]: "min-h-[40px]",
        [TabSize.SM]: "min-h-[36px]",
    }

    return variant[props.size as TabSize] || "min-h-[52px]"
})

const pillStyleSizeClass = computed(() => {
    const variant: Record<TabSize, string> = {
        [TabSize.LG]: "min-h-[40px]",
        [TabSize.MD]: "min-h-[36px]",
        [TabSize.SM]: "min-h-[32px]",
    }

    return variant[props.size as TabSize] || "min-h-[40px]"
})

// Computed functions
const computedBadgeValue = computed(() => {
    if (props.badgeValue === null || props.badgeValue === undefined) return null

    return typeof props.badgeValue === 'number' ? props.badgeValue.toString() : props.badgeValue
})
</script>