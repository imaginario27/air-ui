<template>
    <nav class="nav-menu flex gap-8 px-6">
        <NavMenuItem 
            v-for="item in menuItems" :key="item.text" 
            :text="item.text"    
            :to="item.to"
            :detectActive
        />
    </nav>
</template>
<script setup lang="ts">
// Props
defineProps({
    menuItems: {
        type: Array as PropType<MenuItem[]>,
        default: () => [
            {
                'text': 'Menu item 1',
                'to': '/',
            },
            {
                'text': 'Menu item 2',
                'to': '/',
            },
            {
                'text': 'Menu item 3',
                'to': '/',
            },
        ],
    }, 
    detectActive: {
        type: Boolean as PropType<boolean>,
        default: true,
    },
})
</script>