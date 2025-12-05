<template>
    <form 
        class="w-full flex flex-col gap-4" 
        @submit="handleSubmit"
        @reset="handleReset"
    >
        <slot />
    </form>
</template>

<script setup lang="ts">
// Imports
const emit = defineEmits(['submit', 'reset'])

// Handlers
const handleSubmit = (event: Event) => {
    event.preventDefault()
    emit('submit') 
}

const handleReset = (event: Event) => {
    event.preventDefault()
    emit('reset')
}
</script>
