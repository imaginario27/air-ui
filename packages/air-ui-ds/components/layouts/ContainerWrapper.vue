<template>
    <div
        :class="[
            'flex',
            'flex-col',
            'gap-6',
            'bg-white',
            'py-4 md:py-8'
        ]"
    >
        <slot></slot>
    </div>
</template>