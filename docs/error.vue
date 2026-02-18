<template>
    <ErrorDisplay :statusCode="error?.status ?? -1" />
</template>

<script setup lang="ts">
const error = useError()
</script>