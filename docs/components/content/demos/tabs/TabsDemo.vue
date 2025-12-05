<template>
    <TabsContainer>
        <TabBar 
            v-model="activeTabIndex"
            :tabs
        />
            <TabContent v-if="activeTabIndex === 0">
                <ContentPlaceholder text="Content 1"/>
            </TabContent>
            <TabContent v-else-if="activeTabIndex === 1">
                <ContentPlaceholder text="Content 2"/>
            </TabContent>
            <TabContent v-else-if="activeTabIndex === 2">
                <ContentPlaceholder text="Content 3"/>
            </TabContent>
    </TabsContainer>
</template>
<script setup lang="ts">
// States
const activeTabIndex = ref(0)

// Data
const tabs: TabItem[] = [
    { 
        text: 'Tab 1',
    },
    { 
        text: 'Tab 2',
    },
    { 
        text: 'Tab 3',
    },
]
</script>