<template>
    <div class="flex flex-wrap">
        <Tab 
            v-for="(tab, index) in tabs" 
            :key="index" 
            :text="tab.text" 
            :icon="tab.icon"
            :imgUrl="tab.imgUrl" 
            :badgeValue="tab.badgeValue"
            :active="index === activeIndex" 
            :tabStyle
            :decoration
            @click="handleTabClick(index, tab.to)"
        />
    </div>
</template>

<script setup lang="ts">
// Props
const props = defineProps({
    tabs: {
        type: Array as PropType<TabItem[]>, 
        default: () => [
            { 
                text: 'Tab 1',
            },
            { 
                text: 'Tab 2',
            },
            { 
                text: 'Tab 3',
            },
        ],
    },
    modelValue: {
        type: Number as PropType<number>,
        default: 0,
    },
    tabStyle: String as PropType<TabStyle>,
    decoration: String as PropType<TabDecoration>,
})

// Local
const activeIndex = ref(props.modelValue)

// Emit Event
const emit = defineEmits(['update:modelValue'])

// Methods
const handleTabClick = (index: number, to?: string) => {
    if(to) { // If the to is provided, navigate to the route
        navigateTo(to)
        return
    }

    activeIndex.value = index
    emit('update:modelValue', index)
}

// Watchers
watch(() => props.modelValue, (newVal) => {
    activeIndex.value = newVal
})
</script>
