<template>
    <div class="w-full flex flex-col gap-2">
        <!-- Label -->
        <div
            v-if="label"
            :class="[
                'text-sm',
                'font-semibold',
                'text-left',
                hasError ? 'text-text-error' : undefined
            ]"
        >
            {{ label }}
        </div>

        <!-- Help Text or Error Message (top) -->
        <HelpText
            v-if="helpTextPosition === Position.TOP"
            :text="helpText"
            :error="error"
        />

        <Grid
            v-if="layout === ListLayout.GRID"
            :cols="gridCols"
            :tabletCols="gridTabletCols"
            :mobileCols="gridMobileCols"
            :gapClass="gridGapClass"
        >
            <CheckboxField
                v-for="option in options"
                :id="option.id.toString()"
                :key="option.id"
                :modelValue="isChecked(option.value)"
                :label="option.label"
                :ariaLabel="option.ariaLabel"
                :required
                :disabled="option.disabled ? option.disabled : disabled"
                :helpText="option.helpText"
                :inverse="inverse"
                @update:model-value="handleChange(option.value, $event)"
            />
        </Grid>

        <div
            v-else
            :class="[
                orientation === Orientation.VERTICAL
                    ? ['flex flex-col gap-4', listClass]
                    : ['flex flex-wrap gap-6', listClass]
            ]"
        >
            <div
                v-for="option in options"
                :key="option.id"
                :class="orientation === Orientation.HORIZONTAL ? 'w-fit' : 'w-full'"
            >
                <CheckboxField
                    :id="option.id.toString()"
                    :modelValue="isChecked(option.value)"
                    :label="option.label"
                    :ariaLabel="option.ariaLabel"
                    :required
                    :disabled="option.disabled ? option.disabled : disabled"
                    :helpText="option.helpText"
                    :inverse="inverse"
                    @update:model-value="handleChange(option.value, $event)"
                />
            </div>
        </div>

        <!-- Help Text or Error Message (bottom) -->
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
    label: String as PropType<string>,
    options: {
        type: Array as PropType<CheckboxOption[]>,
        required: true,
        validator: (value: CheckboxOption[]) =>
            value.every((option) => option.id !== undefined && option.value !== undefined && (option.label !== undefined || option.ariaLabel !== undefined)),
    },
    modelValue: {
        type: Array as PropType<(string | number | boolean)[]>,
        required: true,
    },
    validator: {
        type: Function as PropType<(value: unknown) => string | null>,
        default: () => null,
    },
    error: {
        type: String as PropType<string>,
        default: '',
    },
    required: {
        type: Boolean as PropType<boolean>,
        default: false,
    },
    disabled: {
        type: Boolean as PropType<boolean>,
        default: false,
    },
    helpText: String as PropType<string>,
    helpTextPosition: {
        type: String as PropType<Position>,
        default: Position.BOTTOM,
        validator: (value: Position) => Object.values(Position).includes(value),
    },
    inverse: {
        type: Boolean as PropType<boolean>,
        default: false,
    },
    orientation: {
        type: String as PropType<Orientation>,
        default: Orientation.VERTICAL,
        validator: (value: Orientation) => Object.values(Orientation).includes(value),
    },
    layout: {
        type: String as PropType<ListLayout>,
        default: ListLayout.LIST,
        validator: (value: ListLayout) => Object.values(ListLayout).includes(value),
    },
    gridCols: {
        type: Number as PropType<number>,
        default: 3,
    },
    gridTabletCols: {
        type: Number as PropType<number>,
        default: 2,
    },
    gridMobileCols: {
        type: Number as PropType<number>,
        default: 1,
    },
    gridGapClass: {
        type: String as PropType<string>,
        default: 'gap-4',
    },
    listClass: String as PropType<string>,
})

// Emits
const emit = defineEmits(['update:modelValue', 'update:error'])

// Composables
const validationMode = useInjectedValidationMode()

// States
const hasError = computed(() => props.error !== '')

// Methods
const isChecked = (value: string | number | boolean) => props.modelValue.includes(value)

const handleChange = (value: string | number | boolean, checked: boolean) => {
    const updated = checked
        ? [...props.modelValue, value]
        : props.modelValue.filter(v => v !== value)

    emit('update:modelValue', updated)
    runValidation(updated)
}

const runValidation = (value: unknown = props.modelValue) => {
    if (!props.required || !props.validator || validationMode.value !== FormValidationMode.BLUR) return

    const result = props.validator(value)
    emit('update:error', result ?? '')
}
</script>
