<template>
    <ModalDialog v-model="showModal">
        <ContentPlaceholder text="Insert content here" />
    </ModalDialog>
    <ActionButton 
        :styleType="ButtonStyleType.NEUTRAL_FILLED"
        text="Open Modal"
        @click="showModal = true"
    />
</template>
<script setup lang="ts">
const showModal = ref(false)
</script>