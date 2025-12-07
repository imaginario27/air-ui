<template>
    <div 
        :class="[
            'w-full',
            'flex',
            'gap-4',
            'mt-8',
            'pt-8',
            'border-t border-border-default',
            justifyClass,
        ]"
    >
        <ContentFooterNavigator 
            v-if="previousPage"
            :label="previousPage.label"
            :description="previousPage.description"
            :to="previousPage.link"
            icon="mdiArrowLeftThin"
            :iconPosition="IconPosition.LEFT"
        />

        <ContentFooterNavigator 
            v-if="nextPage"
            :label="nextPage.label"
            :description="nextPage.description"
            :to="nextPage.link"
            icon="mdiArrowRightThin"
            :iconPosition="IconPosition.RIGHT"
        />
    </div>
</template>
<script setup lang="ts">
// Props
const props = defineProps({
    previousPage: Object as PropType<ContentFooterNavigator>,
    nextPage: Object as PropType<ContentFooterNavigator>,
})

// Computed classes
const justifyClass = computed(() => {
    if (props.previousPage && props.nextPage) return 'justify-between'
    if (props.previousPage) return 'justify-start'
    if (props.nextPage) return 'justify-end'
    return 'justify-end'
})
</script>