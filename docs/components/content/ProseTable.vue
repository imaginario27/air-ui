<template>
    <table 
        :class="[
            'docs-table',
            'w-full',
            'border-collapse',
            'text-left',
            'text-sm',
        ]"
    >
        <slot />
    </table>
</template>