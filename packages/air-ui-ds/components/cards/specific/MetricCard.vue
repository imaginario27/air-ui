<template>
    <Card>
        <CardHeader>
            <CardTitle 
                :title 
                :class="[align === Align.CENTER && 'text-center']"
            />
        </CardHeader>
        <CardBody>
            <div :class="['flex flex-col', align === Align.CENTER && 'text-center']">
                <span class="font-semibold text-2xl md:text-3xl">
                    {{ value }}
                </span>
                <p 
                    v-if="description"
                    class="text-text-neutral-subtle text-sm"
                >
                    {{ description }}
                </p>
            </div>
        </CardBody>
    </Card>
</template>
<script setup lang="ts">
// Props
defineProps({
    title: {
        type: String as PropType<string>,
        default: 'Card title'
    },
    value: {
        type: [String, Number] as PropType<string | number>,
        default: 0
    },
    description: String,
    align: {
        type: String as PropType<Align.LEFT | Align.CENTER>,
        default: Align.LEFT,
        validator: (value: Align) => [Align.LEFT, Align.CENTER].includes(value),
    }
})
</script>