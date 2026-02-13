<template>
    <div 
        :class="[
            'flex',
            'flex-col',
            'gap-4',
            'mt-2',
        ]"
    >
        <component
            :is="resolvedHeadingTag"
            :class="[
                'font-semibold',
                'text-text-neutral-subtle',
                titleClass,
            ]"
        >
            {{ title }}
        </component>
        <slot />
    </div>
</template>
<script setup lang="ts">
// Props
const props = defineProps({
    title: {
        type: String as PropType<string>,
        default: 'Group title',
    },
    titleClass: String as PropType<string>,
    headingTag: {
        type: String as PropType<'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'>,
        default: 'h3',
        validator: (value: string ) => ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].includes(value as string)
    },
})

// Computed
const resolvedHeadingTag = computed(() =>
    ['h1','h2','h3','h4','h5','h6'].includes(props.headingTag)
        ? props.headingTag
        : 'h3'
)
</script>
