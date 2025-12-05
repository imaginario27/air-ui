<template>
    <div class="w-full flex flex-col gap-4">
        <div
            v-for="(item, index) in items"
            :key="index"
            class="flex items-start gap-4"
        >
            <!-- Content slot -->
            <div class="flex-grow">
                <slot
                    :item="item"
                    :index="index"
                />
            </div>

            <!-- Action buttons -->
            <div class="flex flex-col items-center gap-2 mt-2">
                <!-- Add button (show only for last item) -->
                <ActionIconButton
                    v-if="index === items.length - 1"
                    :styleType="ButtonStyleType.NEUTRAL_OUTLINED"
                    icon="mdiPlusCircleOutline"
                    :size="ButtonSize.SM"
                    @click="addItem"
                />

                <!-- Delete button (show for all except when there's only one item) -->
                <ActionIconButton
                    v-if="items.length > 1"
                    :styleType="ButtonStyleType.DELETE_SOFT"
                    icon="mdiMinusCircleOutline"
                    :size="ButtonSize.SM"
                    @click="removeItem(index)"
                />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
const props = defineProps({
    modelValue: {
        type: Array,
        default: () => [],
    },
    defaultValue: {
        type: Object,
        default: () => ({}),
    },
})

const emit = defineEmits(['update:modelValue'])

// Local items state
const items = ref([...props.modelValue])

// CORREGIDO: Flag para evitar bucles infinitos
const isUpdatingFromParent = ref(false)

// CORREGIDO: Watch para cambios externos con protección
watch(
    () => props.modelValue,
    (newValue) => {
        if (!isUpdatingFromParent.value) {
            items.value = [...newValue]
        }
    },
    { deep: true }
)

// CORREGIDO: Watch para cambios internos con protección
watch(
    items,
    (newValue) => {
        isUpdatingFromParent.value = true
        emit('update:modelValue', newValue)
        nextTick(() => {
            isUpdatingFromParent.value = false
        })
    },
    { deep: true }
)

// Add new item
const addItem = () => {
    // CORREGIDO: Crear una copia profunda del defaultValue
    const newItem = JSON.parse(JSON.stringify(props.defaultValue))
    items.value.push(newItem)
}

// Remove item at index
const removeItem = (index: number) => {
    if (items.value.length > 1) {
        items.value.splice(index, 1)
    }
}

// CORREGIDO: Inicialización más segura
if (props.modelValue.length === 0) {
    // Solo inicializar si no hay datos del padre
    nextTick(() => {
        if (items.value.length === 0) {
            addItem()
        }
    })
} else {
    items.value = [...props.modelValue]
}
</script>
