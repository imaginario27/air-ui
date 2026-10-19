<template>
    <div
        :class="[
            'w-full flex items-center gap-3',
            'py-2.5 pl-3 pr-2',
            'rounded-md',
            'cursor-pointer',
            'transition-colors duration-150',
            'hover:bg-background-neutral-subtler',
            '[.dark_&]:hover:bg-background-surface',
        ]"
        @click="emit('item-clicked')"
    >
        <span
            :class="[
                'flex items-center justify-center shrink-0',
                'w-8 h-8',
                'rounded-lg border',
                'bg-background-surface border-border-default',
            ]"
        >
            <Icon name="mdi:history" iconClass="w-[18px] h-[18px]" />
        </span>

        <span class="flex flex-col min-w-0 flex-1">
            <span class="truncate text-sm font-semibold">
                {{ text }}
            </span>
            <span v-if="breadcrumbs" class="truncate text-xs text-text-neutral-subtle">
                {{ breadcrumbs }}
            </span>
        </span>

        <ActionIconButton
            icon="mdi:close"
            :size="ButtonSize.SM"
            :styleType="ButtonStyleType.NEUTRAL_TRANSPARENT"
            class="shrink-0"
            @click.stop="emit('remove-item')"
        />
    </div>
</template>

<script setup lang="ts">
// Props
defineProps({
    text: {
        type: String as PropType<string>,
        default: 'Result text',
    },
    breadcrumbs: String as PropType<string>,
})

// Emits
const emit = defineEmits(['remove-item', 'item-clicked'])
</script>
