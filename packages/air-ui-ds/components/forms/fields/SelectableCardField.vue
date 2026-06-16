<template>
    <div class="w-full flex flex-col gap-2">
        <!-- Label -->
        <label 
            v-if="label"
            :for="id"
            :class="[
                'text-sm',
                'font-semibold',
                'text-left',
                hasError ? 'text-text-error' : undefined,
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

        <Loading
            v-if="showLoadingState && isLoading" 
            :isLoading
            :loadingText
            :spinnerSize="LoadingSpinnerSize.XS"
        />
        
        <template v-if="!isLoading">

            <!-- Card Options -->
            <Grid 
                :cols="gridDesktopCols" 
                :tabletCols="gridTabletCols" 
                :mobileCols="gridMobileCols" 
                :gapClass="gridGapClass"
            >
                <SelectableCard
                    v-for="(option, index) in options"
                    :key="index"
                    :modelValue="isSelected(option.value)"
                    :selectMode
                    :title="option.title"
                    :titleClass
                    :description="option.description"
                    :descriptionClass
                    :checkIcon
                    :icon="option.icon"
                    :containedIconShape
                    :containedIconStyleType
                    :layoutAlign
                    :disabled="option.disabled || disabled"
                    :buttonSize
                    :hasSecondaryBtn="option.hasSecondaryBtn || hasSecondaryBtn"
                    :secondaryBtnText="option.secondaryBtnText || secondaryBtnText"
                    :secondaryBtnStyleType
                    :secondaryBtnIconPosition="option.secondaryBtnIconPosition || secondaryBtnIconPosition"
                    :secondaryBtnIcon="option.secondaryBtnIcon || secondaryBtnIcon"
                    :selectBtnStyleType
                    :selectBtnIconPosition
                    :selectBtnIcon
                    :selectText
                    :selectedText
                    :hasFooter
                    :footerContentAlign
                    :isHoverable="selectMode === CardSelectionMode.CARD"
                    :hasShadow
                    @update:modelValue="() => toggleOption(option.value)"
                    @buttonClick="option.secondaryBtnCallback"
                />
            </Grid>
    
            <!-- Help Text (bottom) -->
            <HelpText
                v-if="helpTextPosition === Position.BOTTOM"
                :text="helpText"
                :error="error"
            />
        </template>
    </div>
</template>

<script setup lang="ts">
// Local types
type SelectableCardValue = string | boolean

// Props
const props = defineProps({
    id: {
        type: String as PropType<string>,
        required: true,
    },
    label: String as PropType<string>,
    options: {
        type: Array as PropType<Array<SelectableCardOption>>,
        required: true,
    },
    modelValue: {
        type: [String, Boolean, Array, null] as PropType<
            SelectableCardValue | null | Array<SelectableCardValue>
        >,
        required: true,
    },
    multiple: {
        type: Boolean as PropType<boolean>,
        default: false,
    },
    selectMode: {
        type: String as PropType<CardSelectionMode>,
        default: CardSelectionMode.CARD,
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
    showLoadingState: {
        type: Boolean as PropType<boolean>,
        default: false,
    },
    isLoading: {
        type: Boolean as PropType<boolean>,
        default: false,
    },
    loadingText: {
        type: String as PropType<string>,
        default: 'Loading'
    },
    titleClass: String as PropType<string>,
    descriptionClass: String as PropType<string>,
    checkIcon: {
        type: String as PropType<string>,
        default: 'mdi:check-circle-outline',
    },
    containedIconShape: {
        type: String as PropType<IconContainerShape>,
        default: IconContainerShape.SQUARE,
        validator: (value: IconContainerShape) => Object.values(IconContainerShape).includes(value),
    },
    containedIconStyleType: {
        type: String as PropType<IconContainerStyleType>,
        default: IconContainerStyleType.FLAT,
        validator: (value: IconContainerStyleType) => Object.values(IconContainerStyleType).includes(value),
    },
    layoutAlign: {
        type: String as PropType<Align.LEFT | Align.CENTER>,
        default: Align.LEFT,
        validator: (value: Align) => [Align.LEFT, Align.CENTER].includes(value),
    },
    buttonSize: {
        type: String as PropType<ButtonSize>,
        default: ButtonSize.LG,
        validator: (value: ButtonSize) => Object.values(ButtonSize).includes(value),
    },
    hasSecondaryBtn: {
        type: Boolean as PropType<boolean>,
        default: true,
    },
    secondaryBtnText: {
        type: String as PropType<string>,
        default: 'Details',
    },
    secondaryBtnStyleType: {
        type: String as PropType<ButtonStyleType>,
        default: ButtonStyleType.NEUTRAL_OUTLINED,
        validator: (value: ButtonStyleType) => Object.values(ButtonStyleType).includes(value),
    },
    secondaryBtnIconPosition: {
        type: String as PropType<IconPosition>,
        default: IconPosition.NONE,
        validator: (value: IconPosition) => Object.values(IconPosition).includes(value),
    },
    secondaryBtnIcon: {
        type: String as PropType<string>,
        default: 'mdi:arrow-right',
    },
    selectBtnStyleType: {
        type: String as PropType<ButtonStyleType>,
        default: ButtonStyleType.NEUTRAL_FILLED,
        validator: (value: ButtonStyleType) => Object.values(ButtonStyleType).includes(value),
    },
    selectBtnIconPosition: {
        type: String as PropType<IconPosition>,
        default: IconPosition.NONE,
        validator: (value: IconPosition) => Object.values(IconPosition).includes(value),
    },
    selectBtnIcon: {
        type: String as PropType<string>,
        default: 'mdi:arrow-right',
    },
    selectText: {
        type: String as PropType<string>,
        default: 'Select',
    },
    selectedText: {
        type: String as PropType<string>,
        default: 'Selected',
    },
    hasFooter: {
        type: Boolean as PropType<boolean>,
        default: true,
    },
    footerContentAlign: {
        type: String as PropType<Align>,
        default: Align.RIGHT,
        validator: (value: Align) => Object.values(Align).includes(value),
    },
    isHoverable: {
        type: Boolean as PropType<boolean>,
        default: true,
    },
    hasShadow: {
        type: Boolean as PropType<boolean>,
        default: true,
    },
    gridDesktopCols: {
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
        default: 'gap-6',
    },
})

// Emits
const emit = defineEmits(['update:modelValue', 'update:error', 'buttonClick'])

// Composables
const validationMode = useInjectedValidationMode()

// Computed
const hasError = computed(() => props.error !== '')

// Selection checker
const isSelected = (value: SelectableCardValue) => {
    if (props.multiple) {
        return Array.isArray(props.modelValue) && props.modelValue.includes(value)
    }

    return props.modelValue === value
}

// Toggle selection
const toggleOption = (value: SelectableCardValue) => {
    let newValue: SelectableCardValue | null | Array<SelectableCardValue>

    if (props.multiple) {
        const current = Array.isArray(props.modelValue)
            ? [...props.modelValue]
            : []

        const index = current.indexOf(value)

        if (index >= 0) {
            current.splice(index, 1)
        } else {
            current.push(value)
        }

        newValue = current
    } else {
        newValue = props.modelValue === value ? null : value
    }

    emit('update:modelValue', newValue)
    runValidation(newValue)
}

// Validation
const runValidation = (value: unknown = props.modelValue) => {
    if (!props.required || !props.validator || validationMode.value !== FormValidationMode.BLUR) return

    const result = props.validator(value)
    emit('update:error', result ?? '')
}

// Watch model changes
watch(
    () => props.modelValue,
    () => {
        runValidation()
    },
)
</script>
