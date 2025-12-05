<template>
    <div 
        :class="[
            'flex',
            'flex-col',
            'gap-3',
            'items-center',
            'justify-center',
            'w-full',
            'max-w-[1440px]',
        ]"
    >
        <slot />
    </div>
</template>