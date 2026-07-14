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

        <div class="w-full flex flex-col gap-4">
            <template
                v-for="(item, index) in items"
                :key="index"
            >
                <!-- Drop placeholder -->
                <DragPlaceholder
                    v-if="sortingType === RepeatingFieldSortingType.DRAG && draggedIndex !== null && dragOverIndex === index && draggedIndex !== index"
                    aria-hidden="true"
                    :text="dragPlaceholderText"
                    :showText="showDragPlaceholderText"
                    :textClass="dragPlaceholderTextClass"
                    :class="['h-10', dragPlaceholderClass]"
                    @dragover.prevent="handleDragOver(index, $event)"
                    @drop.prevent="handleDrop(index, $event)"
                />

                <div class="flex flex-col gap-2">
                    <div
                        class="flex items-start gap-4"
                        @dragover.prevent="handleDragOver(index, $event)"
                        @drop.prevent="handleDrop(index, $event)"
                    >
                        <!-- Drag handle -->
                        <button
                            v-if="sortingType === RepeatingFieldSortingType.DRAG"
                            type="button"
                            :draggable="!disabled"
                            :aria-label="dragHandleAriaLabel"
                            :disabled="disabled"
                            :class="[
                                'flex items-center justify-center',
                                'bg-transparent border-0 p-0 mt-2',
                                'cursor-move! active:cursor-grabbing!',
                                'text-icon-neutral-default',
                                'disabled:cursor-not-allowed',
                            ]"
                            @dragstart="handleDragStart(index, $event)"
                            @dragend="handleDragEnd"
                            @keydown="handleDragHandleKeydown(index, $event)"
                        >
                            <Icon :name="dragHandleIcon" iconClass="w-[16px] h-[16px]" />
                        </button>

                        <!-- Content slot -->
                        <div class="grow">
                            <slot
                                :id="id"
                                :item="item"
                                :index="index"
                            />
                        </div>

                        <!-- Vertical action buttons (desktop only; actionsOrientation is vertical) -->
                        <div
                            v-if="actionsOrientation === Orientation.VERTICAL"
                            class="hidden md:flex flex-col gap-2"
                        >
                            <ActionIconButton
                                v-if="sortingType === RepeatingFieldSortingType.BUTTONS"
                                :styleType="ButtonStyleType.NEUTRAL_TRANSPARENT"
                                :icon="moveUpIcon"
                                :size="ButtonSize.SM"
                                :ariaLabel="moveUpAriaLabel"
                                :disabled="isMoveUpDisabled(index)"
                                @click="moveItemUp(index)"
                            />

                            <ActionIconButton
                                v-if="sortingType === RepeatingFieldSortingType.BUTTONS"
                                :styleType="ButtonStyleType.NEUTRAL_TRANSPARENT"
                                :icon="moveDownIcon"
                                :size="ButtonSize.SM"
                                :ariaLabel="moveDownAriaLabel"
                                :disabled="isMoveDownDisabled(index)"
                                @click="moveItemDown(index)"
                            />

                            <!-- Add button (show only for last item) -->
                            <ActionIconButton
                                v-if="index === items.length - 1"
                                :styleType="ButtonStyleType.NEUTRAL_OUTLINED"
                                icon="mdi:plus-circle-outline"
                                :size="ButtonSize.SM"
                                :ariaLabel="addItemAriaLabel"
                                :disabled="disabled"
                                @click="addItem"
                            />

                            <!-- Delete button (show for all except when there's only one item) -->
                            <ActionIconButton
                                v-if="items.length > 1"
                                :styleType="ButtonStyleType.DELETE_SOFT"
                                icon="mdi:minus-circle-outline"
                                :size="ButtonSize.SM"
                                :ariaLabel="removeItemAriaLabel"
                                :disabled="disabled"
                                @click="removeItem(index)"
                            />
                        </div>
                    </div>

                    <!-- Horizontal action buttons: always shown when actionsOrientation is horizontal,
                         and as the mobile fallback for the vertical action column above. Buttons stack
                         in a column on mobile and use isMobileFullWidth to span the full row width. -->
                    <div
                        :class="[
                            actionsOrientation === Orientation.HORIZONTAL ? 'flex' : 'flex md:hidden',
                            'flex-col md:flex-row flex-wrap items-stretch md:items-center gap-2',
                        ]"
                    >
                        <ActionButton
                            v-if="sortingType === RepeatingFieldSortingType.BUTTONS"
                            :styleType="ButtonStyleType.NEUTRAL_TRANSPARENT"
                            :text="moveUpButtonText"
                            :icon="moveUpIcon"
                            :iconPosition="IconPosition.LEFT"
                            :size="ButtonSize.MD"
                            :isMobileFullWidth="true"
                            :disabled="isMoveUpDisabled(index)"
                            @click="moveItemUp(index)"
                        />

                        <ActionButton
                            v-if="sortingType === RepeatingFieldSortingType.BUTTONS"
                            :styleType="ButtonStyleType.NEUTRAL_TRANSPARENT"
                            :text="moveDownButtonText"
                            :icon="moveDownIcon"
                            :iconPosition="IconPosition.LEFT"
                            :size="ButtonSize.MD"
                            :isMobileFullWidth="true"
                            :disabled="isMoveDownDisabled(index)"
                            @click="moveItemDown(index)"
                        />

                        <!-- Add button (show only for last item) -->
                        <ActionButton
                            v-if="index === items.length - 1"
                            :styleType="ButtonStyleType.NEUTRAL_OUTLINED"
                            :text="addButtonText"
                            icon="mdi:plus-circle-outline"
                            :iconPosition="IconPosition.LEFT"
                            :size="ButtonSize.MD"
                            :isMobileFullWidth="true"
                            :disabled="disabled"
                            @click="addItem"
                        />

                        <!-- Delete button (show for all except when there's only one item) -->
                        <ActionButton
                            v-if="items.length > 1"
                            :styleType="ButtonStyleType.DELETE_SOFT"
                            :text="removeButtonText"
                            icon="mdi:minus-circle-outline"
                            :iconPosition="IconPosition.LEFT"
                            :size="ButtonSize.MD"
                            :isMobileFullWidth="true"
                            :disabled="disabled"
                            @click="removeItem(index)"
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
const props = defineProps({
    id: {
        type: String as PropType<string>,
        required: true,
    },
    label: String as PropType<string>,
    modelValue: {
        type: Array as PropType<unknown[]>,
        default: () => [],
    },
    defaultValue: {
        type: [Object, Array, String, Number, Boolean] as PropType<unknown>,
        default: () => ({}),
    },
    addItemAriaLabel: {
        type: String as PropType<string>,
        default: 'Add item',
    },
    removeItemAriaLabel: {
        type: String as PropType<string>,
        default: 'Remove item',
    },
    addButtonText: {
        type: String as PropType<string>,
        default: 'Add item',
    },
    removeButtonText: {
        type: String as PropType<string>,
        default: 'Remove item',
    },
    actionsOrientation: {
        type: String as PropType<Orientation>,
        default: Orientation.VERTICAL,
        validator: (value: Orientation) => Object.values(Orientation).includes(value),
    },
    sortingType: {
        type: String as PropType<RepeatingFieldSortingType>,
        default: RepeatingFieldSortingType.NONE,
        validator: (value: RepeatingFieldSortingType) => Object.values(RepeatingFieldSortingType).includes(value),
    },
    moveUpAriaLabel: {
        type: String as PropType<string>,
        default: 'Move item up',
    },
    moveDownAriaLabel: {
        type: String as PropType<string>,
        default: 'Move item down',
    },
    moveUpButtonText: {
        type: String as PropType<string>,
        default: 'Move up',
    },
    moveDownButtonText: {
        type: String as PropType<string>,
        default: 'Move down',
    },
    dragHandleAriaLabel: {
        type: String as PropType<string>,
        default: 'Drag to reorder item',
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
    dragPlaceholderTextClass: String as PropType<string>,
    helpText: String as PropType<string>,
    helpTextPosition: {
        type: String as PropType<Position>,
        default: Position.BOTTOM,
        validator: (value: Position) => Object.values(Position).includes(value),
    },
    error: {
        type: String as PropType<string>,
        default: '',
    },
    required: {
        type: Boolean as PropType<boolean>,
        default: false,
    },
    validator: {
        type: Function as PropType<(value: unknown[]) => string | null>,
        default: () => null,
    },
    disabled: {
        type: Boolean as PropType<boolean>,
        default: false,
    },
})

const emit = defineEmits(['update:modelValue', 'update:error'])

// Composables
const validationMode = useInjectedValidationMode()

// Computed
const hasError = computed(() => props.error !== '')

const cloneValue = <T,>(value: T): T => structuredClone(toRaw(value))

const createDefaultItem = () => cloneValue(props.defaultValue)

const normalizeItems = (list: unknown[]): unknown[] => (list.length ? [...list] : [createDefaultItem()])

// Local draft state: structural edits (add, remove, move) sync to the
// parent via emit; item content is owned by whatever the slot renders.
const localItems = ref<unknown[]>(normalizeItems(props.modelValue))

watch(
    () => props.modelValue,
    value => {
        localItems.value = normalizeItems(value)
    },
    { deep: true }
)

const items = computed(() => localItems.value)

// Drag state
const draggedIndex = ref<number | null>(null)
const dragOverIndex = ref<number | null>(null)

const addItem = () => {
    const nextItems = [...localItems.value, createDefaultItem()]
    localItems.value = nextItems
    emit('update:modelValue', nextItems)
}

const removeItem = (index: number) => {
    if (localItems.value.length <= 1) {
        return
    }

    const nextItems = localItems.value.filter((_, currentIndex) => currentIndex !== index)
    localItems.value = nextItems
    emit('update:modelValue', nextItems)
}

const isMoveUpDisabled = (index: number): boolean => props.disabled || index <= 0

const isMoveDownDisabled = (index: number): boolean => props.disabled || index >= items.value.length - 1

const moveItem = (fromIndex: number, toIndex: number) => {
    if (props.disabled) {
        return
    }

    if (toIndex < 0 || toIndex > items.value.length - 1 || toIndex === fromIndex) {
        return
    }

    const nextItems = [...localItems.value]
    const [movedItem] = nextItems.splice(fromIndex, 1)
    nextItems.splice(toIndex, 0, movedItem)

    localItems.value = nextItems
    emit('update:modelValue', nextItems)
}

const moveItemUp = (index: number) => moveItem(index, index - 1)
const moveItemDown = (index: number) => moveItem(index, index + 1)

const handleDragStart = (index: number, event: DragEvent) => {
    if (props.disabled) {
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
    if (props.sortingType !== RepeatingFieldSortingType.DRAG || draggedIndex.value === null) {
        return
    }

    event.preventDefault()
    dragOverIndex.value = index
}

const handleDrop = (index: number, event: DragEvent) => {
    if (props.sortingType !== RepeatingFieldSortingType.DRAG || draggedIndex.value === null) {
        return
    }

    event.preventDefault()

    const fromIndex = draggedIndex.value
    // The placeholder renders directly above the hovered row, so the dragged
    // row must land immediately before it. Removing fromIndex first shifts
    // every index after it back by one, so a downward move needs -1 to still
    // land before the hovered row instead of after it.
    const toIndex = index > fromIndex ? index - 1 : index
    moveItem(fromIndex, toIndex)

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
        moveItemUp(index)
        return
    }

    if (event.key === 'ArrowDown') {
        event.preventDefault()
        moveItemDown(index)
    }
}

const runValidation = (value: unknown[]) => {
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
