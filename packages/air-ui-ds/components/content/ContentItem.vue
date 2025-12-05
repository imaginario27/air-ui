<template>
    <NuxtLink :to>
        <component
            :is="wrapperComponent"
            :class="dynamicWrapperClass"
            v-bind="cardProps"
        >
            <ContentItemImage 
                v-if="hasImage"
                :src="imgUrl"
                :alt="imgAlt"
                :aspectRatio="imgAspectRatio"
                :hoverEffect="imgHoverEffect"
                :hoverIcon="imgHoverIcon"
                :fallbackIcon="imgFallbackIcon"
                :containerClass="imgContainerClass"
            />

            <!-- Custom content-->
            <slot 
                v-if="$slots['content']"
                name="content" 
            />

            <!-- Content -->
            <div 
                v-else
                class="w-full flex flex-col gap-1.5"
            >
                <component 
                    :is="titleTag" 
                    :class="titleClass"
                >   
                    {{ trimText(title, titleMaxLength) }}
                </component>

                <p
                    v-if="description"
                    :class="descriptionClass"
                >
                    {{ trimText(description, descriptionMaxLength) }}
                </p>
            </div>
        </component>
    </NuxtLink>
</template>

<script setup lang="ts">
// Dynamic component import
import Card from '../cards/Card.vue'

// Props
const props = defineProps({
    type: {
        type: String as PropType<ContentItemType>,
        default: ContentItemType.CARD
    },
    title: {
        type: String as PropType<string>,
        default: 'Title',
    },
    titleTag: {
        type: String as PropType<'h3' | 'h4' | 'h5' | 'h6'>,
        default: 'h4',
        validator: (value: string) => ['h3', 'h4', 'h5', 'h6'].includes(value),
    },
    titleClass: {
        type: String as PropType<string>,
        default: 'font-semibold',
    },
    titleMaxLength: {
        type: Number as PropType<number>,
        default: 72,
    },
    description: String as PropType<string>,
    descriptionClass: {
        type: String as PropType<string>,
        default: 'text-sm text-text-neutral-subtle',
    },
    descriptionMaxLength: {
        type: Number as PropType<number>,
        default: 100,
    },
    to: String as PropType<string>,
    hasImage: {
        type: Boolean as PropType<boolean>,
        default: true,
    },
    imgUrl: String as PropType<string>,
    imgAlt: {
        type: String as PropType<string>,
        default: 'Item image'
    },
    imgAspectRatio: {
        type: String as PropType<AspectRatio>,
        default: AspectRatio.AR_16_9,
    },
    imgHoverEffect: {
        type: String as PropType<ImageHoverEffect>,
        default: ImageHoverEffect.BLUR,
        validator: (value: ImageHoverEffect) => Object.values(ImageHoverEffect).includes(value),
    },
    imgHoverIcon: String as PropType<any>,
    imgFallbackIcon: String as PropType<any>,
    imgContainerClass: String as PropType<string>,
    containerClass: String as PropType<string>,
    hasCardShadow: {
        type: Boolean as PropType<boolean>,
        default: true,
    },
    hasCardBackgroundHover: {
        type: Boolean as PropType<boolean>,
        default: false,
    },
    
})

// Computed
const dynamicWrapperClass = computed(() => {
    const baseClasses = [
        'gap-4',
        props.containerClass
    ]

    if (props.type === ContentItemType.BASIC) {
        baseClasses.unshift('w-full', 'flex', 'flex-col')
    }

    return baseClasses
})

const wrapperComponent = computed(() => {
    return props.type === ContentItemType.CARD ? Card : 'div'
})

const cardProps = computed(() => {
    if (props.type !== ContentItemType.CARD) return {}

    return {
        hasShadow: props.hasCardShadow,
        hasBackgroundHover: props.hasCardBackgroundHover,
    }
})
</script>
