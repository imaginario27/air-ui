<template>
    <Alert 
        :type="props.type"
        :icon="props.icon"
        :title="props.title"
        :description="props.description"
        class="mb-4"
    />
    
</template>
<script setup lang="ts">
// Local interfaces
interface AlertProps {
    type: AlertType,
    icon: any,
    title: string,
    description: string,
}

// Props
defineProps({
    props: {
        type: Object as PropType<Partial<AlertProps>>, 
        default: () => ({}),
    },
})
</script>
