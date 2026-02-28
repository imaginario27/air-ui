<template>
    <th
        :scope
        :class="[
            ...headerClass
        ]"
        @click="scope === TableHeaderCellScope.ROW && handleNavigation()"
    >
        <div class="w-full flex items-center gap-2">
            <slot />

            <ActionIconButton 
                v-if="sorteable && scope === TableHeaderCellScope.COL"
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
const props = defineProps({
    scope : {
        type: String as PropType<TableHeaderCellScope>,
        default: TableHeaderCellScope.COL,
        validator: (value: TableHeaderCellScope) => Object.values(TableHeaderCellScope).includes(value),
    },
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
    fitToContent: {
        type: Boolean as PropType<boolean>,
        default: false,
    },
    to: String as PropType<string>,
})

// Computed classes
const headerClass = computed(() => {
    const variants = {
        [TableHeaderCellScope.COL]: [
            'px-3',
            'py-3.5',
            'border-b',
            'border-border-neutral-subtle',
            'font-semibold',
            'text-sm',
            'whitespace-nowrap',
        ],
        [TableHeaderCellScope.ROW]: [
            'px-3',
            'py-3.5',
            'border-t',
            'border-border-neutral-subtle',
            'text-sm',
            props.fitToContent ? 'w-[1%]' : 'w-auto',
            props.to ? 'hover:cursor-pointer' : undefined
        ],
    }
    return variants[props.scope as TableHeaderCellScope] || 'rounded'
})

// Navigation handler
const handleNavigation = () => {
    if (props.to) {
        navigateTo(props.to)
    }
}
</script>
