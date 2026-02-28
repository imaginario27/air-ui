<template>
    <Drawer 
        v-model="showDrawer"
        :direction="currentDirection"
    >
        <ContentPlaceholder 
            text="Insert content here" 
            :class="currentDirection === Direction.LEFT || currentDirection === Direction.RIGHT ? 'h-full' : 'h-[200px]'"
        />
    </Drawer>
        
    <div class="flex gap-2 flex-wrap justify-center">
        <ActionButton 
            :styleType="ButtonStyleType.NEUTRAL_FILLED"
            text="Open left drawer"
            icon="mdi:arrow-left"
            :iconPosition="IconPosition.LEFT"
            @click="handleShowDrawer(Direction.LEFT)"
        />

        <ActionButton 
            :styleType="ButtonStyleType.NEUTRAL_FILLED"
            text="Open right drawer"
            icon="mdi:arrow-right"
            :iconPosition="IconPosition.LEFT"
            @click="handleShowDrawer(Direction.RIGHT)"
        />

        <ActionButton 
            :styleType="ButtonStyleType.NEUTRAL_FILLED"
            text="Open top drawer"
            icon="mdi:arrow-up"
            :iconPosition="IconPosition.LEFT"
            @click="handleShowDrawer(Direction.TOP)"
        />

        <ActionButton 
            :styleType="ButtonStyleType.NEUTRAL_FILLED"
            text="Open bottom drawer"
            icon="mdi:arrow-down"
            :iconPosition="IconPosition.LEFT"
            @click="handleShowDrawer(Direction.BOTTOM)"
        />
    </div>
</template>
<script setup lang="ts">
// States
const showDrawer = ref(false)
const currentDirection = ref(Direction.RIGHT)

// Handlers
const handleShowDrawer = (direction: Direction) => {
    currentDirection.value = direction
    showDrawer.value = true
}
</script>