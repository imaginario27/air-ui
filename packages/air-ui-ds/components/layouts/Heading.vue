<template>
    <div
        :class="[
            'w-full flex flex-col',
            alignmentClasses,
        ]"
    >
        <!-- Overtitle -->
        <span
            v-if="overtitle"
            :class="[
                'font-semibold',
                overtitleSizeClass,
                'text-text-secondary-brand-default',
                spaceOvertitleClass,
                isOverTitleUppercase && 'uppercase',
                overtitleClass,
            ]"
        >
            {{ overtitle }}
        </span>

        <!-- Dynamic title -->
        <component
            :is="headingTag"
            :class="[
                titleSizeClass, 
                'font-semibold', 
                'text-text-default',
                titleClass,
            ]"
        >
            {{ title }}
        </component>

        <!-- Description -->
        <p
            v-if="description"
            :class="[
                descriptionSizeClass, 
                'text-text-neutral-subtle', 
                spaceDescriptionClass,
                descriptionClass,
            ]"
        >
            {{ description }}
        </p>
    </div>
</template>

<script setup lang="ts">
// Props
const props = defineProps({
    overtitle: String as PropType<string>,
    isOverTitleUppercase: {
        type: Boolean as PropType<boolean>,
        default: false,
    },
    title: { 
        type: String as PropType<string>, 
        default: 'Heading title' 
    },
    description: String as PropType<string>,
    align: {
        type: String as PropType<Align>,
        default: Align.LEFT,
        validator: (value: string) => Object.values(Align).includes(value as Align),
    },
    size: {
        type: String as PropType<HeadingSize>,
        default: HeadingSize.LG,
        validator: (value: string) =>
            Object.values(HeadingSize).includes(value as HeadingSize),
    },
    spacing: {
        type: String as PropType<HeadingSpacing>,
        default: HeadingSpacing.NORMAL,
        validator: (value: string) =>
            Object.values(HeadingSpacing).includes(value as HeadingSpacing),
    },
    headingTag: {
        type: [String, Number] as PropType<'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'>,
        default: 'h1',
        validator: (value: string | number) => ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].includes(value as string)
    },
    isMobileCentered: {
        type: Boolean as PropType<boolean>,
        default: false,
    },
    overtitleClass: String as PropType<string>,
    titleClass: String as PropType<string>,
    descriptionClass: String as PropType<string>,
})

// Computed classes
const alignmentClasses = computed(() => {
    const alignMap = {
        [Align.LEFT]: 'lg:items-start lg:text-left',
        [Align.CENTER]: 'lg:items-center lg:text-center',
        [Align.RIGHT]: 'lg:items-end lg:text-right',
    }

    if (props.isMobileCentered) {
        // Centered on mobile, and follow desktop alignment rules
        return ['items-center text-center', alignMap[props.align]].join(' ')
    }

    // Normal mobile alignment follows main alignment
    const baseAlignMap = {
        [Align.LEFT]: 'items-start text-left',
        [Align.CENTER]: 'items-center text-center',
        [Align.RIGHT]: 'items-end text-right',
    }

    return [baseAlignMap[props.align], alignMap[props.align]].join(' ')
})

const titleSizeClass = computed(() => {
    const map = {
        [HeadingSize.XXS]: 'text-lg',
        [HeadingSize.XS]: 'text-xl',
        [HeadingSize.SM]: 'text-2xl',
        [HeadingSize.MD]: 'text-3xl md:text-4xl',
        [HeadingSize.LG]: 'text-4xl md:text-5xl',
        [HeadingSize.XL]: 'text-5xl md:text-7xl',
    }
    return map[props.size] || 'text-4xl md:text-5xl'
})

const overtitleSizeClass = computed(() => {
    const map = {
        [HeadingSize.XXS]: 'text-xs',
        [HeadingSize.XS]: 'text-sm',
        [HeadingSize.SM]: 'text-sm',
        [HeadingSize.MD]: 'text-base',
        [HeadingSize.LG]: 'text-base',
        [HeadingSize.XL]: 'text-base',
    }
    return map[props.size] || 'text-base'
})

const descriptionSizeClass = computed(() => {
    const map = {
        [HeadingSize.XXS]: 'text-sm',
        [HeadingSize.XS]: 'text-sm',
        [HeadingSize.SM]: 'text-sm',
        [HeadingSize.MD]: 'text-lg',
        [HeadingSize.LG]: 'text-lg',
        [HeadingSize.XL]: 'text-lg',
    }
    return map[props.size] || 'text-lg'
})

const spaceOvertitleClass = computed(() => {
    const map = {
        [HeadingSize.XXS]: 'mb-1',
        [HeadingSize.XS]: 'mb-1',
        [HeadingSize.SM]: 'mb-1',
        [HeadingSize.MD]: 'mb-3',
        [HeadingSize.LG]: 'mb-3',
        [HeadingSize.XL]: 'mb-3',
    }
    return map[props.size] || 'mb-3'
})

const spaceDescriptionClass = computed(() => {
    const normal = {
        [HeadingSize.XXS]: 'mt-3',
        [HeadingSize.XS]: 'mt-3',
        [HeadingSize.SM]: 'mt-3',
        [HeadingSize.MD]: 'mt-4',
        [HeadingSize.LG]: 'mt-6',
        [HeadingSize.XL]: 'mt-4',
    }
    const spaced = {
        [HeadingSize.XXS]: 'mt-4',
        [HeadingSize.XS]: 'mt-4',
        [HeadingSize.SM]: 'mt-4',
        [HeadingSize.MD]: 'mt-5',
        [HeadingSize.LG]: 'mt-9',
        [HeadingSize.XL]: 'mt-5',
    }

    return props.spacing === HeadingSpacing.SPACED
        ? spaced[props.size]
        : normal[props.size] || 'mt-6'
})
</script>
