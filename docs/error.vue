<template>
    <ErrorDisplay :statusCode="error?.statusCode ?? -1" />
</template>

<script setup lang="ts">
const error = useError()
</script>