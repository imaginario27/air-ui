<template>
    <div class="relative dark pre-shiki-wrapper">
        <CopyButton
            :textToCopy="rawCode"
            :size="ButtonSize.SM"
            icon="mdi:content-copy"
            iconClass="!text-white"
            :class="[
                'absolute',
                'right-0',
                'top-0',
                'm-4',
                'z-10',
            ]"
        />

        <pre
            ref="preRef"
            v-bind="$attrs"
            :class="[
                'dark', // Forces the dark theme
                'bg-background-neutral-subtlest',
                'border',
                'border-border-default/60',
                'px-4',
                'py-2',
                'my-4',
                'text-sm',
                'font-mono',
                'overflow-x-auto',
                'border-none',
                'rounded-md',
            ]"
        > <slot /> </pre>
    </div>
</template>
<script setup lang="ts">
const preRef = ref<HTMLElement | null>(null)

const rawCode = computed(() => {
    if (!preRef.value) return ''
    return preRef.value.querySelector('code')?.innerText ?? ''
})
</script>