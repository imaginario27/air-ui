<template>
    <Card 
        :hasBorder 
        :hasShadow 
        :class="[
            hasShadow ? '!shadow-sm' : undefined,
            '!p-6',
            orientation === Orientation.HORIZONTAL ? 'md:!flex-row' : undefined
        ]"
    >
        <div class="flex flex-col gap-2 w-full">
            <CardHeader>
                <CardTitle :title />
            </CardHeader>
            <CardBody>
                <p class="text-sm text-text-neutral-subtle">{{ description }}</p>
            </CardBody>
        </div>
        <CardActions v-if="$slots['actions']">
            <slot name="actions" />
        </CardActions>
    </Card>
</template>
<script setup lang="ts">
// Props
defineProps({
    title: {
        type: String as PropType<string>,
        default: 'Title',
    },
    description: {
        type: String as PropType<string>,
        default: 'Description',
    },
    orientation: {
        type: String as PropType<Orientation>,
        default: Orientation.VERTICAL,
        validator: (value: Orientation) => Object.values(Orientation).includes(value),
    },
    hasShadow: {
        type: Boolean as PropType<boolean>,
        default: true,
    },
    hasBorder: {
        type: Boolean as PropType<boolean>,
        default: false,
    }
})
</script>