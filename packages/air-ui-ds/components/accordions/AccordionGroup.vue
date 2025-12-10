<template >
    <div 
        v-if="Object.keys(groupedAccordeons).length"
        class="flex flex-col gap-3 w-full"
    >
        <div 
            v-for="(groupKey, index) in sortedGroupKeys" 
            :key="groupKey"
            class="accordion-group flex flex-col gap-3 w-full"
        >
            <component
                :is="titleTag"
                :class="[
                    titleCustomClass,
                    { 'mt-4': index !== 0 }
                ]"
            >
                {{ groupKey }}
            </component>
            <Accordion :items="groupedAccordeons[groupKey] ?? []" />
        </div>
    </div>
    
</template>

<script setup lang="ts">
// Props
const props = defineProps({
    items: {
        type: Array as PropType<AccordionItem[]>,
        required: true
    },
    defaultGroupName: {
        type: String as PropType<string>,
        default: 'Group title'
    },
    defaultGroupPosition: {
        type: String as PropType<OrderPosition>,
        default: OrderPosition.START,
        validator: (value: OrderPosition) => Object.values(OrderPosition).includes(value),
    },
    titleCustomClass: {
        type: String as PropType<string>,
        default: 'font-semibold text-lg text-text-neutral-subtle'
    },
    titleTag: {
        type: String as PropType<'h3' | 'h4' | 'h5' | 'h6'>,
        default: 'h3',
        validator: (value: string) => ['h3', 'h4', 'h5', 'h6'].includes(value),
    },
})

// Groups accordion items by their `group` property
const groupedAccordeons = computed(() => {
    return props.items.reduce((acc, item) => {
        const groupKey = item.group || props.defaultGroupName
        if (!acc[groupKey]) {
            acc[groupKey] = []
        }
        acc[groupKey].push(item)
        return acc
    }, {} as Record<string, AccordionItem[]>)
})

// Sorts the group keys based on the `defaultGroupPosition` prop
const sortedGroupKeys = computed(() => {
    const keys = Object.keys(groupedAccordeons.value)

    const compare = (a: string, b: string) => {
        if (a === props.defaultGroupName) return props.defaultGroupPosition === OrderPosition.START ? -1 : 1
        if (b === props.defaultGroupName) return props.defaultGroupPosition === OrderPosition.START ? 1 : -1
        return 0
    }

    return keys.sort(compare)
})

</script>
