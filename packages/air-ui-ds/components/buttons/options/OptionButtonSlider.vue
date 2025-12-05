<template>
    <div class="relative overflow-hidden">
        <!-- Sombras difuminadas laterales -->
        <div class="pointer-events-none absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-white/90 to-transparent z-10"></div>
        <div class="pointer-events-none absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-white/90 to-transparent z-10"></div>

        <!-- Carrusel de botones -->
        <div
            ref="carousel"
            class="flex gap-3 overflow-x-auto no-scrollbar px-2 py-1 cursor-grab active:cursor-grabbing select-none"
            @mousedown="startDrag"
            @mousemove="onDrag"
            @mouseup="stopDrag"
            @mouseleave="stopDrag"
        >
            <OptionButton
                v-for="(button, index) in displayButtons"
                :key="index"
                :active="isButtonActive(button)"
                :text="button.text"
                :size="button.size"
                :icon="button.icon"
                :iconPosition="button.iconPosition"
                :disabled="button.disabled"
                :styleType="getButtonStyleType(button)"
                @click="handleButtonClick(button)"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const props = defineProps({
    modelValue: {
        type: [String, Array] as PropType<string | string[]>,
        default: 'button-1',
    },
    buttons: {
        type: Array as PropType<OptionButton[]>,
        default: () => [],
    },
    styleType: String as PropType<ButtonStyleType>,
    size: String as PropType<ButtonSize>,
    isMultiple: {
        type: Boolean,
        default: false,
    },
    hasAllButton: {
        type: Boolean,
        default: false,
    },
    allButtonText: {
        type: String,
        default: 'All',
    },
    allButtonValue: {
        type: String,
        default: 'all',
    },
})

const emit = defineEmits(['update:modelValue'])

const allButton = computed<OptionButton>(() => ({
    text: props.allButtonText,
    value: props.allButtonValue,
    size: props.size,
    action: () => {},
}))

const displayButtons = computed(() => {
    return props.hasAllButton ? [allButton.value, ...props.buttons] : props.buttons
})

const isButtonActive = (button: OptionButton) => {
    if (props.isMultiple) {
        if (button.value === props.allButtonValue) {
            if (!Array.isArray(props.modelValue)) return false
            return (
                props.modelValue.length === 0 ||
                props.modelValue.length === props.buttons.length
            )
        }

        return Array.isArray(props.modelValue) && props.modelValue.includes(button.value)
    }

    return button.value === props.modelValue
}

// NUEVO: Determinar el estilo del botón según si está activo
const getButtonStyleType = (button: OptionButton) => {
    return isButtonActive(button) 
        ? ButtonStyleType.PRIMARY_BRAND_FILLED 
        : ButtonStyleType.PRIMARY_BRAND_SOFT
}

const handleButtonClick = (button: OptionButton) => {
    button?.action?.()

    if (props.isMultiple) {
        if (button.value === props.allButtonValue) {
            const allValues = props.buttons.map(b => b.value)
            const selected = props.modelValue as string[]
            const isAllSelected = selected.length === allValues.length
            emit('update:modelValue', isAllSelected ? [] : allValues)
        } else if (Array.isArray(props.modelValue)) {
            const isActive = props.modelValue.includes(button.value)
            const updated = isActive
                ? props.modelValue.filter(v => v !== button.value)
                : [...props.modelValue, button.value]
            emit('update:modelValue', updated)
        }
    } else {
        emit('update:modelValue', button.value)
    }
}

const carousel = ref<HTMLElement | null>(null)
let isDragging = false
let startX = 0
let scrollLeft = 0

const startDrag = (e: MouseEvent) => {
    if (!carousel.value) return
    isDragging = true
    startX = e.pageX - carousel.value.offsetLeft
    scrollLeft = carousel.value.scrollLeft
}

const onDrag = (e: MouseEvent) => {
    if (!isDragging || !carousel.value) return
    const x = e.pageX - carousel.value.offsetLeft
    const walk = (x - startX) * 1.5
    carousel.value.scrollLeft = scrollLeft - walk
}

const stopDrag = () => {
    isDragging = false
}
</script>

<style scoped>
/* Ocultar scroll nativo */
.no-scrollbar::-webkit-scrollbar {
    display: none;
}
.no-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
}
</style>
