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

        <!-- Rules rows -->
        <div class="flex flex-col gap-2">
            <div
                v-for="(rule, index) in rules"
                :key="`rule-${index}`"
                :class="[
                    'grid grid-cols-1 md:grid-cols-[1fr_1fr_1fr_auto]',
                    'gap-2 items-center',
                    'mb-4 md:mb-0',
                    rowGridClass,
                ]"
            >
                <SelectField
                    :id="`${id}-item-${index}`"
                    :ariaLabel="`${itemFieldAriaLabel} ${index + 1}`"
                    :modelValue="rule.item"
                    :options="itemOptions"
                    :placeholder="itemPlaceholder"
                    :disabled
                    @update:model-value="value => updateRule(index, 'item', value)"
                />

                <SelectField
                    :id="`${id}-operator-${index}`"
                    :ariaLabel="`${operatorFieldAriaLabel} ${index + 1}`"
                    :modelValue="rule.operator"
                    :options="getFilteredOperators(getRuleInputType(rule))"
                    :placeholder="operatorPlaceholder"
                    :disabled
                    @update:model-value="value => updateRule(index, 'operator', value)"
                />

                <InputField
                    :id="`${id}-value-${index}`"
                    :ariaLabel="`${valueFieldAriaLabel} ${index + 1}`"
                    :modelValue="rule.value"
                    :type="getRuleInputType(rule)"
                    :placeholder="valuePlaceholder"
                    :disabled
                    @update:model-value="value => updateRule(index, 'value', value)"
                    @keydown.enter.prevent="handleValueEnterKey(index)"
                />

                <ActionIconButton
                    :id="`${id}-action-${index}`"
                    :icon="getRowActionIcon(index)"
                    :ariaLabel="index === rules.length - 1 ? addRuleAriaLabel : removeRuleAriaLabel"
                    :styleType="getActionButtonStyle(index)"
                    :size="ButtonSize.MD"
                    :disabled="isActionDisabled(index)"
                    class="hidden md:flex"
                    @click="handleRowAction(index)"
                />

                <!-- Mobile action button -->
                <ActionButton
                    :id="`${id}-action-${index}`"
                    :text="index === rules.length - 1 ? mobileBtnAddText : mobileBtnRemoveText"
                    :icon="getRowActionIcon(index)"
                    :iconPosition="IconPosition.LEFT"
                    :styleType="getActionButtonStyle(index)"
                    :size="ButtonSize.MD"
                    :disabled="isActionDisabled(index)"
                    class="flex md:hidden"
                    @click="handleRowAction(index)"
                />
            </div>
        </div>

        <!-- Help Text -->
        <p
            v-if="hasError || helpText"
            :class="[
                'text-xs text-left',
                hasError ? 'text-text-error' : 'text-text-neutral-subtle',
            ]"
        >
            {{ hasError ? error : helpText }}
        </p>
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
    helpText: String as PropType<string>,
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

const rules = computed(() => {
    if (!props.modelValue.length) {
        return [createEmptyRule()]
    }

    return props.modelValue
})

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
    const nextRules = rules.value.map((rule, currentIndex) => {
        if (currentIndex !== index) return { ...rule }

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

    emit('update:modelValue', nextRules)
}

const addRule = () => {
    if (isMaxRulesReached.value) {
        return
    }

    const nextRules = [...rules.value.map(rule => ({ ...rule })), createEmptyRule()]
    emit('update:modelValue', nextRules)
}

const removeRule = (index: number) => {
    const nextRules = rules.value.filter((_, currentIndex) => currentIndex !== index)

    if (!nextRules.length) {
        emit('update:modelValue', [createEmptyRule()])
        return
    }

    emit('update:modelValue', nextRules)
}

const handleValueEnterKey = (index: number) => {
    if (index === rules.value.length - 1 && !props.disabled && !isMaxRulesReached.value) {
        addRule()
    }
}

const handleRowAction = (index: number) => {
    if (index === rules.value.length - 1) {
        addRule()
        return
    }

    removeRule(index)
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
