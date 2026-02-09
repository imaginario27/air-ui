<template>
    <th
        :class="[
            'px-3',
            'py-3.5',
            'border-b',
            'border-border-neutral-subtle',
            'font-semibold',
            'text-sm',
            'whitespace-nowrap',
        ]"
    >
        <div class="w-full flex items-center gap-2">
            <slot />

            <ActionIconButton 
                v-if="sorteable"
                :size="ButtonSize.XS"
                :icon="sortAsc ? 'mdi:arrow-up' : 'mdi:arrow-down'"
                :styleType="sortKey === columnKey ? ButtonStyleType.NEUTRAL_FILLED : ButtonStyleType.NEUTRAL_OUTLINED"
                @click="onToggleSort && onToggleSort()"
            />
        </div>
    </th>
</template>
<script setup lang="ts">
// Props
defineProps({
    sorteable: {
        type: Boolean as PropType<boolean>,
        default: false,
    },
    sortKey: {
        type: String as PropType<string>,
        default: '',
    },
    columnKey: {
        type: String as PropType<string>,
        default: '',
    },
    sortAsc: {
        type: Boolean as PropType<boolean>,
        default: true,
    },
    onToggleSort: {
        type: Function as PropType<() => void>,
        default: undefined,
    },
})
</script>
