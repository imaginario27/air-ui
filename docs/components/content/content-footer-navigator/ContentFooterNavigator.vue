<template>
    <NuxtLink 
        :to
        class="w-full h-full"
    >
        <div
            :class="[
                'flex flex-col gap-4',
                'border border-border-default',
                'p-8',
                'rounded-md',
                'h-full',
                'hover:bg-background-neutral-hover/40',
                alignClass,
            ]"
        >
            <ContainedIcon 
                :color="ColorAccent.SECONDARY_BRAND"
                :icon
                :size="IconContainerSize.LG"
                class="border border-border-secondary-brand"
            />

            <span class="font-semibold">
                {{ label }}
            </span>

            <p 
                v-if="description"
                class="text-sm text-text-neutral-subtle"
            >
                {{ trimText(description, 80) }}
            </p>
        </div>
    </NuxtLink>
</template>
<script setup lang="ts">
// Props
const props = defineProps({
    label: {
        type: String as PropType<string>,
        default: 'Link label',
    },
    icon: {
        type: String as PropType<string>,
        default: "mdi:help"
    },
    description: String as PropType<string>,
    to: String as PropType<string>,
    iconPosition: {
        type: String as PropType<IconPosition>,
        default: IconPosition.NONE,
        validator: (value: IconPosition) => Object.values(IconPosition).includes(value),
    },
})

// Computed classes
const alignClass = computed(() => {
    if (props.iconPosition === IconPosition.LEFT) return 'items-start text-left'
    if (props.iconPosition === IconPosition.RIGHT) return 'items-end text-right'
    return 'items-start text-left'
})
</script>