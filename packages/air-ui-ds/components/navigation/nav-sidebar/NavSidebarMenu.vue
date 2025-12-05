<template>
    <nav
        :class="[
            'flex',
            'flex-col',
            'gap-1',
            'w-full',
            'px-6',
            'overflow-y-auto',
        ]"
    >
        <slot />
    </nav>
</template>