<template>
    <div class="flex flex-col gap-3">
        <Card v-for="(item, index) in items" :key="index">
            <CardBody>
                {{ item }}
            </CardBody>
        </Card>
    </div>
</template>
<script setup lang="ts">
// Data
const items = Array.from({ length: 20 }, (_, i) => `Item ${i + 1}`)
</script>