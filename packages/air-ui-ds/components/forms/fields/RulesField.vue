<template>
    <div :class="['flex flex-col', 'w-full', 'gap-2']">
        <!-- Label -->
        <label
            v-if="label"
            :for="id"
            :class="[
                'text-sm',
                'font-semibold',
                'text-left',
                hasError && 'text-text-error',
            ]"
        >
            {{ label }}
        </label>

        <!-- Help Text (top) -->
        <HelpText
            v-if="helpTextPosition === Position.TOP"
            :text="helpText"
            :error="error"
        />

        <!-- Rules rows -->
        <div class="flex flex-col gap-2">
            <template v-for="(rule, index) in rules" :key="`rule-${index}`">
                <!-- Drop placeholder -->
                <DragPlaceholder
                    v-if="sortingType === RulesFieldSortingType.DRAG && draggedIndex !== null && dragOverIndex === index && draggedIndex !== index"
                    aria-hidden="true"
                    :text="dragPlaceholderText"
                    :showText="showDragPlaceholderText"
                    :textClass="dragPlaceholderClass"
                    class="hidden md:grid h-10 mb-4 md:mb-0"
                    @dragover.prevent="handleDragOver(index, $event)"
                    @drop.prevent="handleDrop(index, $event)"
                />

                <div
                    :class="[
                        'grid grid-cols-1',
                        sortingType === RulesFieldSortingType.DRAG
                            ? 'md:grid-cols-[auto_1fr_1fr_1fr_auto]'
                            : 'md:grid-cols-[1fr_1fr_1fr_auto]',
                        'gap-2 items-center',
                        'mb-4 md:mb-0',
                        rowGridClass,
                    ]"
                    @dragover.prevent="handleDragOver(index, $event)"
                    @drop.prevent="handleDrop(index, $event)"
                >
                    <!-- Drag handle -->
                    <button
                        v-if="sortingType === RulesFieldSortingType.DRAG && isSortableRow(index)"
                        type="button"
                        :draggable="!disabled"
                        :aria-label="dragHandleAriaLabel"
                        :disabled="disabled"
                        :class="[
                            'hidden md:flex',
                            'items-center justify-center',
                            'bg-transparent border-0 p-0',
                            'cursor-grab active:cursor-grabbing',
                            'text-icon-neutral-default',
                            'disabled:cursor-not-allowed',
                        ]"
                        @dragstart="handleDragStart(index, $event)"
                        @dragend="handleDragEnd"
                        @keydown="handleDragHandleKeydown(index, $event)"
                    >
                        <Icon :name="dragHandleIcon" iconClass="w-[16px] h-[16px]" />
                    </button>
                    <div v-else-if="sortingType === RulesFieldSortingType.DRAG" class="hidden md:block" />

                    <SelectField
                        :id="`${id}-item-${index}`"
                        :ariaLabel="`${itemFieldAriaLabel} ${index + 1}`"
                        :modelValue="rule.item"
                        :options="itemOptions"
                        :placeholder="itemPlaceholder"
                        :disabled
                        :transparent="transparentInputs"
                        @update:model-value="value => updateRule(index, 'item', value)"
                    />

                    <SelectField
                        :id="`${id}-operator-${index}`"
                        :ariaLabel="`${operatorFieldAriaLabel} ${index + 1}`"
                        :modelValue="rule.operator"
                        :options="getFilteredOperators(getRuleInputType(rule))"
                        :placeholder="operatorPlaceholder"
                        :disabled
                        :transparent="transparentInputs"
                        @update:model-value="value => updateRule(index, 'operator', value)"
                    />

                    <InputField
                        :id="`${id}-value-${index}`"
                        :ariaLabel="`${valueFieldAriaLabel} ${index + 1}`"
                        :modelValue="rule.value"
                        :type="getRuleInputType(rule)"
                        :placeholder="valuePlaceholder"
                        :disabled
                        :transparent="transparentInputs"
                        @update:model-value="value => updateRule(index, 'value', value)"
                        @keydown.enter.prevent="handleValueEnterKey(index)"
                    />

                    <div class="hidden md:flex items-center gap-1">
                        <ActionIconButton
                            v-if="sortingType === RulesFieldSortingType.BUTTONS && isSortableRow(index)"
                            :id="`${id}-move-up-${index}`"
                            :icon="moveUpIcon"
                            :ariaLabel="moveUpAriaLabel"
                            :styleType="ButtonStyleType.NEUTRAL_TRANSPARENT"
                            :size="ButtonSize.SM"
                            :disabled="isMoveUpDisabled(index)"
                            @click="moveRuleUp(index)"
                        />

                        <ActionIconButton
                            v-if="sortingType === RulesFieldSortingType.BUTTONS && isSortableRow(index)"
                            :id="`${id}-move-down-${index}`"
                            :icon="moveDownIcon"
                            :ariaLabel="moveDownAriaLabel"
                            :styleType="ButtonStyleType.NEUTRAL_TRANSPARENT"
                            :size="ButtonSize.SM"
                            :disabled="isMoveDownDisabled(index)"
                            @click="moveRuleDown(index)"
                        />

                        <ActionIconButton
                            :id="`${id}-action-${index}`"
                            :icon="getRowActionIcon(index)"
                            :ariaLabel="index === rules.length - 1 ? addRuleAriaLabel : removeRuleAriaLabel"
                            :styleType="getActionButtonStyle(index)"
                            :size="ButtonSize.MD"
                            :disabled="isActionDisabled(index)"
                            @click="handleRowAction(index)"
                        />
                    </div>

                    <!-- Mobile action buttons -->
                    <div class="flex md:hidden items-center gap-1">
                        <ActionIconButton
                            v-if="(sortingType === RulesFieldSortingType.BUTTONS || sortingType === RulesFieldSortingType.DRAG) && isSortableRow(index)"
                            :id="`${id}-move-up-mobile-${index}`"
                            :icon="moveUpIcon"
                            :ariaLabel="moveUpAriaLabel"
                            :styleType="ButtonStyleType.NEUTRAL_TRANSPARENT"
                            :size="ButtonSize.SM"
                            :disabled="isMoveUpDisabled(index)"
                            @click="moveRuleUp(index)"
                        />

                        <ActionIconButton
                            v-if="(sortingType === RulesFieldSortingType.BUTTONS || sortingType === RulesFieldSortingType.DRAG) && isSortableRow(index)"
                            :id="`${id}-move-down-mobile-${index}`"
                            :icon="moveDownIcon"
                            :ariaLabel="moveDownAriaLabel"
                            :styleType="ButtonStyleType.NEUTRAL_TRANSPARENT"
                            :size="ButtonSize.SM"
                            :disabled="isMoveDownDisabled(index)"
                            @click="moveRuleDown(index)"
                        />

                        <ActionButton
                            :id="`${id}-action-${index}`"
                            :text="index === rules.length - 1 ? mobileBtnAddText : mobileBtnRemoveText"
                            :icon="getRowActionIcon(index)"
                            :iconPosition="IconPosition.LEFT"
                            :styleType="getActionButtonStyle(index)"
                            :size="ButtonSize.MD"
                            :disabled="isActionDisabled(index)"
                            class="grow"
                            @click="handleRowAction(index)"
                        />
                    </div>
                </div>
            </template>
        </div>

        <!-- Help Text (bottom) -->
        <HelpText
            v-if="helpTextPosition === Position.BOTTOM"
            :text="helpText"
            :error="error"
        />
    </div>
</template>

<script setup lang="ts">
// Props
const props = defineProps({
    id: {
        type: String as PropType<string>,
        required: true,
    },
    label: String as PropType<string>,
    itemFieldAriaLabel: {
        type: String as PropType<string>,
        default: 'Rule item',
    },
    operatorFieldAriaLabel: {
        type: String as PropType<string>,
        default: 'Rule operator',
    },
    valueFieldAriaLabel: {
        type: String as PropType<string>,
        default: 'Rule value',
    },
    addRuleAriaLabel: {
        type: String as PropType<string>,
        default: 'Add rule',
    },
    removeRuleAriaLabel: {
        type: String as PropType<string>,
        default: 'Remove rule',
    },
    sortingType: {
        type: String as PropType<RulesFieldSortingType>,
        default: RulesFieldSortingType.NONE,
        validator: (value: RulesFieldSortingType) => Object.values(RulesFieldSortingType).includes(value),
    },
    moveUpAriaLabel: {
        type: String as PropType<string>,
        default: 'Move rule up',
    },
    moveDownAriaLabel: {
        type: String as PropType<string>,
        default: 'Move rule down',
    },
    dragHandleAriaLabel: {
        type: String as PropType<string>,
        default: 'Drag to reorder rule',
    },
    moveUpIcon: {
        type: String as PropType<string>,
        default: 'mdi:arrow-up',
    },
    moveDownIcon: {
        type: String as PropType<string>,
        default: 'mdi:arrow-down',
    },
    dragHandleIcon: {
        type: String as PropType<string>,
        default: 'mdi:drag-vertical',
    },
    dragPlaceholderText: {
        type: String as PropType<string>,
        default: 'Drop here',
    },
    showDragPlaceholderText: {
        type: Boolean as PropType<boolean>,
        default: true,
    },
    dragPlaceholderClass: String as PropType<string>,
    helpText: String as PropType<string>,
    helpTextPosition: {
        type: String as PropType<Position>,
        default: Position.BOTTOM,
        validator: (value: Position) => Object.values(Position).includes(value),
    },
    itemOptions: {
        type: Array as PropType<SelectOption[]>,
        default: () => [],
    },
    operatorOptions: {
        type: Array as PropType<SelectOption[]>,
        default: () => [],
    },
    modelValue: {
        type: Array as PropType<RuleItem[]>,
        default: () => [],
    },
    itemPlaceholder: {
        type: String as PropType<string>,
        default: 'Select item',
    },
    operatorPlaceholder: {
        type: String as PropType<string>,
        default: 'Select operator',
    },
    valuePlaceholder: {
        type: String as PropType<string>,
        default: 'Enter value',
    },
    addIcon: {
        type: String as PropType<string>,
        default: 'mdi:plus-circle-outline',
    },
    removeIcon: {
        type: String as PropType<string>,
        default: 'mdi:minus-circle-outline',
    },
    mobileBtnAddText: {
        type: String as PropType<string>,
        default: 'Add rule',
    },
    mobileBtnRemoveText: {
        type: String as PropType<string>,
        default: 'Remove rule',
    },
    validator: {
        type: Function as PropType<(value: RuleItem[]) => string | null>,
        default: () => null,
    },
    error: {
        type: String as PropType<string>,
        default: '',
    },
    disabled: {
        type: Boolean as PropType<boolean>,
        default: false,
    },
    required: {
        type: Boolean as PropType<boolean>,
        default: false,
    },
    maxRules: Number as PropType<number | undefined>,
    rowGridClass: String as PropType<string>,
    transparentInputs: {
        type: Boolean as PropType<boolean>,
        default: false,
    },
})

// Emits
const emit = defineEmits(['update:modelValue', 'update:error'])

// Composables
const validationMode = useInjectedValidationMode()

// Computed
const hasError = computed(() => props.error !== '')

const createEmptyRule = (): RuleItem => ({
    item: null,
    operator: null,
    value: '',
    type: 'text',
})

const cloneRules = (list: RuleItem[]): RuleItem[] => list.map(rule => ({ ...rule }))

const normalizeRules = (list: RuleItem[]): RuleItem[] => {
    return list.length ? cloneRules(list) : [createEmptyRule()]
}

// Local draft state: edits to item/operator/value only sync to the parent
// via emit on add, remove, or Enter — not on every keystroke/selection.
const localRules = ref<RuleItem[]>(normalizeRules(props.modelValue))

watch(
    () => props.modelValue,
    value => {
        localRules.value = normalizeRules(value)
    },
    { deep: true }
)

const rules = computed(() => localRules.value)

// Drag state
const draggedIndex = ref<number | null>(null)
const dragOverIndex = ref<number | null>(null)

const normalizedMaxRules = computed<number | null>(() => {
    if (typeof props.maxRules !== 'number') {
        return null
    }

    const max = Math.floor(props.maxRules)
    return max > 0 ? max : null
})

const isMaxRulesReached = computed(() => {
    if (normalizedMaxRules.value === null) {
        return false
    }

    return rules.value.length >= normalizedMaxRules.value
})

// Methods
const getRowActionIcon = (index: number) => {
    if (index === rules.value.length - 1) {
        return props.addIcon
    }

    return props.removeIcon
}

const getActionButtonStyle = (index: number) => {
    if (index === rules.value.length - 1) {
        return ButtonStyleType.NEUTRAL_TRANSPARENT
    }

    return ButtonStyleType.DELETE_TRANSPARENT
}

const isActionDisabled = (index: number): boolean => {
    if (props.disabled) {
        return true
    }

    const isLastRow = index === rules.value.length - 1
    if (!isLastRow) {
        return false
    }

    return isMaxRulesReached.value
}

const getRuleInputType = (rule: RuleItem): AllowedInputType => {
    return rule.type ?? 'text'
}

const getFilteredOperators = (rowType: AllowedInputType): SelectOption[] => {
    return props.operatorOptions.filter(option => 
        !option.applicableTypes || option.applicableTypes.includes(rowType)
    )
}

const isAllowedInputType = (value: unknown): value is AllowedInputType => {
    return [
        'color',
        'email',
        'number',
        'password',
        'tel',
        'text',
        'url',
        'date',
        'datetime-local',
        'time',
        'month',
        'week',
    ].includes(String(value))
}

const resolveRuleTypeFromItem = (itemValue: RuleValue): AllowedInputType => {
    if (isAllowedInputType(itemValue)) {
        return itemValue
    }

    const matchedOption = props.itemOptions.find(option => option.value === itemValue)
    if (matchedOption?.inputType) {
        return matchedOption.inputType
    }

    return 'text'
}

const updateRule = (index: number, field: keyof RuleItem, value: RuleValue) => {
    localRules.value = localRules.value.map((rule, currentIndex) => {
        if (currentIndex !== index) return rule

        if (field === 'item') {
            return {
                ...rule,
                item: value,
                value: '',
                type: resolveRuleTypeFromItem(value),
            }
        }

        return {
            ...rule,
            [field]: value,
        }
    })
}

const addRule = () => {
    if (isMaxRulesReached.value) {
        return
    }

    const nextRules = [...cloneRules(localRules.value), createEmptyRule()]
    localRules.value = nextRules
    emit('update:modelValue', nextRules)
}

const removeRule = (index: number) => {
    const nextRules = localRules.value.filter((_, currentIndex) => currentIndex !== index)

    if (!nextRules.length) {
        localRules.value = [createEmptyRule()]
        emit('update:modelValue', [createEmptyRule()])
        return
    }

    localRules.value = nextRules
    emit('update:modelValue', nextRules)
}

const handleValueEnterKey = (index: number) => {
    if (props.disabled) {
        return
    }

    if (index === rules.value.length - 1) {
        if (!isMaxRulesReached.value) {
            addRule()
        }
        return
    }

    emit('update:modelValue', cloneRules(localRules.value))
}

const handleRowAction = (index: number) => {
    if (index === rules.value.length - 1) {
        addRule()
        return
    }

    removeRule(index)
}

// Sorting
const isSortableRow = (index: number): boolean => index < rules.value.length - 1

const isMoveUpDisabled = (index: number): boolean => props.disabled || index <= 0

const isMoveDownDisabled = (index: number): boolean => props.disabled || index >= rules.value.length - 2

const moveRule = (fromIndex: number, toIndex: number) => {
    if (props.disabled || !isSortableRow(fromIndex)) {
        return
    }

    if (toIndex < 0 || toIndex > rules.value.length - 2 || toIndex === fromIndex) {
        return
    }

    const nextRules = cloneRules(localRules.value)
    const movedRule = nextRules.splice(fromIndex, 1)[0]
    if (!movedRule) {
        return
    }
    nextRules.splice(toIndex, 0, movedRule)

    localRules.value = nextRules
    emit('update:modelValue', nextRules)
}

const moveRuleUp = (index: number) => moveRule(index, index - 1)
const moveRuleDown = (index: number) => moveRule(index, index + 1)

const handleDragStart = (index: number, event: DragEvent) => {
    if (props.disabled || !isSortableRow(index)) {
        event.preventDefault()
        return
    }

    draggedIndex.value = index
    dragOverIndex.value = index
    event.dataTransfer?.setData('text/plain', String(index))
    if (event.dataTransfer) {
        event.dataTransfer.effectAllowed = 'move'
    }
}

const handleDragOver = (index: number, event: DragEvent) => {
    if (props.sortingType !== RulesFieldSortingType.DRAG || draggedIndex.value === null) {
        return
    }

    event.preventDefault()

    if (!isSortableRow(index)) {
        return
    }

    dragOverIndex.value = index
}

const handleDrop = (index: number, event: DragEvent) => {
    if (props.sortingType !== RulesFieldSortingType.DRAG || draggedIndex.value === null) {
        return
    }

    event.preventDefault()

    const fromIndex = draggedIndex.value
    // The placeholder renders directly above the hovered row, so the dragged
    // row must land immediately before it. Removing fromIndex first shifts
    // every index after it back by one, so a downward move needs -1 to still
    // land before the hovered row instead of after it.
    const toIndex = index > fromIndex ? index - 1 : index
    moveRule(fromIndex, toIndex)

    draggedIndex.value = null
    dragOverIndex.value = null
}

const handleDragEnd = () => {
    draggedIndex.value = null
    dragOverIndex.value = null
}

const handleDragHandleKeydown = (index: number, event: KeyboardEvent) => {
    if (props.disabled) {
        return
    }

    if (event.key === 'ArrowUp') {
        event.preventDefault()
        moveRuleUp(index)
        return
    }

    if (event.key === 'ArrowDown') {
        event.preventDefault()
        moveRuleDown(index)
    }
}

const runValidation = (value: RuleItem[]) => {
    if (!props.required || !props.validator) return

    const result = props.validator(value)
    emit('update:error', result ?? '')
}

watch(
    () => props.modelValue,
    value => {
        if (validationMode.value === FormValidationMode.BLUR) {
            runValidation(value)
        }
    },
    { deep: true }
)
</script>
