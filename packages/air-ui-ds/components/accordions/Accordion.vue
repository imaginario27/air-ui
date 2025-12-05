<template>
    <div 
        v-if="items"
        :class="[
            'flex',
            'flex-col',
            'w-full',
            'gap-0',
            'divide-y',
            'divide-border-neutral-subtle',
            'border-t',
            'border-b',
            'border-border-neutral-subtle'
        ]"
    >
        <AccordionItem 
            v-for="item in items" :key="item.id" 
            :title="item.title"
            :content="item.content"
        />
    </div>
</template>
<script setup lang="ts">
// Props
defineProps({
    items: {
        type: Array as PropType<AccordionItem[]>,
        required: true
    }
})
</script>