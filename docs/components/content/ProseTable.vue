<template>
    <table 
        :class="[
            'docs-table',
            'w-full',
            'border-collapse',
            'text-left',
            'text-base',
        ]"
    >
        <slot />
    </table>
</template>