<template>
    <transition
        enter-active-class="transition-all duration-300 ease-in-out"
        enter-from-class="max-h-0 opacity-0"
        enter-to-class="max-h-96 opacity-100"
        leave-active-class="transition-all duration-300 ease-in-out"
        leave-from-class="max-h-96 opacity-100"
        leave-to-class="max-h-0 opacity-0"
    >
        <div class="overflow-hidden">
            <slot></slot>
        </div>
    </transition>
</template>
