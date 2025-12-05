<template>
    <div 
        :class="[
            'flex flex-col',
            'w-full',
            'gap-2',
        ]"
    >
        <!-- Label wrapper -->
        <div class="flex gap-2 justify-between">
            <label
                v-if="label"
                :for="id"
                :class="[
                    'text-sm',
                    'font-semibold',
                    'text-left',
                ]"
            >
                {{ label }}
            </label>

            <!-- Wrapper -->
            <div class="flex items-center gap-2">

                <!-- Ranged slider -->
                <template v-if="type === SliderType.RANGE">
                    <!-- Minimum editable value -->
                    <div class="relative">
                        <input
                            v-if="editingIndex === 0"
                            ref="minInputRef"
                            v-model="editingValue"
                            type="number"
                            :min="min"
                            :max="max"
                            :step="stepSize"
                            :disabled="disabled"
                            :class="[
                                'w-20',
                                'px-2',
                                'py-1',
                                'text-sm',
                                'font-semibold',
                                'text-center',
                                'border',
                                'border-border-primary-brand-default',
                                'rounded',
                                'focus:outline-none',
                                'focus:ring-2',
                                'focus:ring-primary-brand-200',
                                'focus:border-border-primary-brand-default',
                            ]"
                            @blur="stopEditing"
                            @keydown.enter="stopEditing"
                            @keydown.escape="cancelEditing"
                        >
                        <button
                            v-else
                            type="button"
                            :disabled="disabled"
                            :class="[
                                'flex items-center justify-center',
                                'min-w-[64px] px-2 py-1',
                                'text-sm font-semibold',
                                'bg-background-neutral-subtle',
                                'border border-border-default',
                                'rounded',
                                'transition-all duration-200',
                                disabled 
                                    ? 'opacity-50 cursor-not-allowed' 
                                    : 'hover:bg-background-neutral-sublter hover:border-border-primary-brand-default hover:text-text-primary-brand-default cursor-pointer',
                                'focus:outline-none focus:ring-2 focus:ring-primary-brand-200'
                            ]"
                            @click="startEditing(0)"
                            @keydown.enter="startEditing(0)"
                            @keydown.space.prevent="startEditing(0)"
                        >
                            <span>
                                {{ `${currentValuePrefix || ''}${(modelValue as [number, number])[0]}${currentValueSuffix || ''}` }}
                            </span>
                            <MdiIcon 
                                icon="mdiPencil" 
                                size="14px" 
                                preserveAspectRatio="xMidYMid meet"
                                class="ml-1 opacity-60"
                            />
                        </button>
                        
                        <!-- Tooltip -->
                        <div 
                            v-if="!disabled && editingIndex !== 0"
                            :class="[
                                'absolute',
                                '-top-8',
                                'left-1/2',
                                'transform',
                                '-translate-x-1/2',
                                'opacity-0',
                                'group-hover:opacity-100',
                                'transition-opacity',
                                'duration-200',
                                'pointer-events-none',
                            ]"
                        >
                            <div 
                                :class="[
                                    'bg-gray-800',
                                    'text-text-on-filled',
                                    'text-xs',
                                    'px-2',
                                    'py-1',
                                    'rounded',
                                    'whitespace-nowrap',
                                ]"
                            >
                                {{ $t('slider.clickToEdit') }}
                            </div>
                        </div>
                    </div>

                    <span class="text-sm font-semibold text-text-neutral-subtle">
                        -
                    </span>

                    <!-- Maximum editable value -->
                    <div class="relative">
                        <input
                            v-if="editingIndex === 1"
                            ref="maxInputRef"
                            v-model="editingValue"
                            type="number"
                            :min="min"
                            :max="max"
                            :step="stepSize"
                            :disabled="disabled"
                            :class="[
                                'w-20',
                                'px-2',
                                'py-1',
                                'text-sm',
                                'font-semibold',
                                'text-center',
                                'border',
                                'border-border-primary-brand-default',
                                'rounded',
                                'focus:outline-none',
                                'focus:ring-2',
                                'focus:ring-primary-brand-200',
                                'focus:border-border-primary-brand-default',
                            ]"
                            @blur="stopEditing"
                            @keydown.enter="stopEditing"
                            @keydown.escape="cancelEditing"
                        >
                        <button
                            v-else
                            type="button"
                            :disabled="disabled"
                            :class="[
                                'flex items-center justify-center',
                                'min-w-[64px] px-2 py-1',
                                'text-sm font-semibold',
                                'bg-background-neutral-subtle',
                                'border border-border-default',
                                'rounded',
                                'transition-all duration-200',
                                disabled 
                                    ? 'opacity-50 cursor-not-allowed' 
                                    : 'hover:bg-background-neutral-sublter hover:border-border-primary-brand-default hover:text-text-primary-brand-default cursor-pointer',
                                'focus:outline-none focus:ring-2 focus:ring-primary-brand-200'
                            ]"
                            @click="startEditing(1)"
                            @keydown.enter="startEditing(1)"
                            @keydown.space.prevent="startEditing(1)"
                        >
                            <span>{{ `${currentValuePrefix || ''}${(modelValue as [number, number])[1]}${currentValueSuffix || ''}` }}</span>
                            <MdiIcon 
                                icon="mdiPencil" 
                                size="14px" 
                                preserveAspectRatio="xMidYMid meet"
                                class="ml-1 opacity-60"
                            />
                        </button>
                    </div>
                </template>

                <!-- Single slider -->
                <template v-else>
                    <!-- Unique editable slider -->
                    <div class="relative group">
                        <input
                            v-if="editingIndex === 0"
                            ref="singleInputRef"
                            v-model="editingValue"
                            type="number"
                            :min="min"
                            :max="max"
                            :step="stepSize"
                            :disabled="disabled"
                            :class="[
                                'w-24',
                                'px-2',
                                'py-1',
                                'text-sm',
                                'font-semibold',
                                'text-center',
                                'border',
                                'border-border-primary-brand-default',
                                'rounded',
                                'focus:outline-none',
                                'focus:ring-2',
                                'focus:ring-primary-brand-200',
                                'focus:border-border-primary-brand-default',
                            ]"
                            @blur="stopEditing"
                            @keydown.enter="stopEditing"
                            @keydown.escape="cancelEditing"
                        >
                        <button
                            v-else
                            type="button"
                            :disabled="disabled"
                            :class="[
                                'group flex items-center justify-center',
                                'min-w-[80px] px-3 py-1.5',
                                'text-sm font-semibold',
                                'bg-background-neutral-subtle',
                                'border border-border-default',
                                'rounded',
                                'transition-all duration-200',
                                disabled 
                                    ? 'opacity-50 cursor-not-allowed' 
                                    : 'hover:bg-background-neutral-sublter hover:border-border-primary-brand-default hover:text-text-primary-brand-default cursor-pointer hover:shadow-sm',
                                'focus:outline-none focus:ring-2 focus:ring-primary-brand-200'
                            ]"
                            @click="startEditing(0)"
                            @keydown.enter="startEditing(0)"
                            @keydown.space.prevent="startEditing(0)"
                        >
                            <span>
                                {{ `${currentValuePrefix || ''}${modelValue}${currentValueSuffix || ''}` }}
                            </span>
                            <MdiIcon 
                                icon="mdiPencil" 
                                size="14px" 
                                preserveAspectRatio="xMidYMid meet"
                                :class="[
                                    'ml-1',
                                    'opacity-60',
                                    'group-hover:opacity-100',
                                    'transition-opacity',
                                    'duration-200',
                                ]"
                            />
                        </button>
                        
                        <!-- Tooltip de ayuda -->
                        <div 
                            v-if="!disabled && editingIndex !== 0"
                            :class="[
                                'absolute',
                                '-top-8',
                                'left-1/2',
                                'transform',
                                '-translate-x-1/2',
                                'opacity-0',
                                'group-hover:opacity-100',
                                'transition-opacity',
                                'duration-200',
                                'pointer-events-none',
                                'z-10',
                            ]"
                        >
                            <div 
                                :class="[
                                    'bg-gray-800',
                                    'text-white',
                                    'text-xs',
                                    'px-2',
                                    'py-1',
                                    'rounded',
                                    'whitespace-nowrap',
                                ]"
                            >
                                {{ $t('slider.clickToEdit') || 'Click para editar' }}
                            </div>
                        </div>
                    </div>
                </template>
            </div>
        </div>
        
       

        <!-- Slider container -->
        <div
            ref="sliderRef"
            :class="[
                'relative w-full h-4',
                disabled && 'opacity-disabled cursor-not-allowed',
            ]"
        >
            <!-- Base track -->
            <div
                :class="[
                    'absolute',
                    'top-1/2',
                    'left-0',
                    'w-full',
                    'h-[4px]',
                    'bg-background-neutral-sublter',
                    'rounded-full',
                    '-translate-y-1/2',
                ]"
            />

            <!-- Filled track (under thumbs) -->
            <div
                ref="filledTrackRef"
                :class="[
                    'absolute',
                    'top-1/2',
                    'h-[4px]',
                    'bg-background-primary-brand-active',
                    'rounded-full',
                    '-translate-y-1/2',
                ]"
                :style="trackStyle"
            />

            <!-- Thumbs -->
            <template v-for="(val, index) in thumbValues" :key="index">
                <div
                    :class="[
                        'absolute',
                        'top-1/2',
                        'z-1',
                        'w-[20px]',
                        'h-[20px]',
                        'bg-icon-neutral-on-filled-bg',
                        'border-4',
                        'border-border-primary-brand-default',
                        'rounded-full',
                        disabled ? 'cursor-not-allowed' : 'cursor-pointer',
                        '-translate-y-1/2',
                        getThumbAlignClass(val),
                    ]"
                    :style="{ left: `${getThumbPosition(val)}%` }"
                    @mousedown.stop="startDrag(index)"
                >
                    <div
                        v-if="showTooltip"
                        v-show="draggingIndex === index"
                        :class="[
                            'absolute',
                            'bottom-full',
                            'mb-2',
                            'px-2',
                            'py-1',
                            'text-xs',
                            'font-semibold',
                            'text-text-neutral-on-filled',
                            'bg-[rgba(24,41,83,0.7)]',
                            'rounded',
                            getTooltipAlignClass(val),
                        ]"
                    >
                        {{ `${currentValuePrefix || ''}${Math.round(val)}${currentValueSuffix || ''}` }}
                    </div>
                </div>
            </template>
        </div>

        <!-- Range info -->
        <div 
            v-if="showRangeInfo"
            class="flex gap-2 justify-between text-xs text-text-neutral-subtle"
        >
            <span>
                {{ minText }} {{ `${currentValuePrefix || ''}${min}${currentValueSuffix || ''}` }}
            </span>
            <span>
                {{ maxText }} {{ `${currentValuePrefix || ''}${max}${currentValueSuffix || ''}` }}
            </span>
        </div>

        <!-- Help Text -->
        <p
            v-if="helpText"
            :class="[
                'text-xs text-left',
                'text-text-neutral-subtle',
            ]"
        >
            {{ helpText }}
        </p>
    </div>
</template>

<script setup lang="ts">
// filepath: c:\Users\David\Documents\Trabajo\digis_front_new\components\forms\fields\SliderField.vue

// Props
const props = defineProps({
    id: { 
        type: String as PropType<string>, 
        required: true, 
    },
    label: String as PropType<string>,
    helpText: String as PropType<string>,
    required: { 
        type: Boolean as PropType<boolean>, 
        default: false,
    },
    modelValue: {
        type: [Number, Array] as PropType<number | [number, number]>,
        default: 0,
    },
    type: {
        type: String as PropType<SliderType>,
        default: SliderType.SINGLE,
        validator: (value: SliderType) => Object.values(SliderType).includes(value),
    },
    steps: {
        type: Number as PropType<number>,
        default: 1,
    },
    min: {
        type: Number as PropType<number>,
        default: 0,
    },
    minText: {
        type: String as PropType<string>,
        default: 'Min: ',
    },
    max: {
        type: Number as PropType<number>,
        default: 100,
    },
    maxText: {
        type: String as PropType<string>,
        default: 'Max: ',
    },
    currentValuePrefix: String as PropType<string>,
    currentValueSuffix: String as PropType<string>,
    showTooltip: {
        type: Boolean as PropType<boolean>,
        default: false,
    },
    showRangeInfo: {
        type: Boolean as PropType<boolean>,
        default: true,
    },
    disabled: {
        type: Boolean as PropType<boolean>,
        default: false,
    },
})

// Emits
const emit = defineEmits(['update:modelValue'])

// States
const sliderRef = ref<HTMLElement | null>(null)
const filledTrackRef = ref<HTMLElement | null>(null)
const draggingIndex = ref<number | null>(null)
const sliderWidth = ref(0)
const trackWidth = ref(0)

// AÑADIDO: Estados para la edición de valores
const editingIndex = ref<number | null>(null)
const editingValue = ref<string>('')
const originalValue = ref<number | [number, number]>()

// AÑADIDO: Referencias a los inputs
const minInputRef = ref<HTMLInputElement | null>(null)
const maxInputRef = ref<HTMLInputElement | null>(null)
const singleInputRef = ref<HTMLInputElement | null>(null)

// Computed
const thumbValues = computed(() => {
    return props.type === SliderType.RANGE
        ? (props.modelValue as [number, number])
        : [props.modelValue as number]
})

const stepSize = computed(() => {
    if (props.steps <= 1) return 1
    return (props.max - props.min) / (props.steps - 1)
})

// Methods
const percentage = (value: number) => {
    return ((value - props.min) / (props.max - props.min)) * 100
}

const getThumbAlignClass = (value: number) => {
    const percent = percentage(value)
    if (percent <= 5) return 'left-0'
    if (percent >= 95) return '-translate-x-[20px]'
    return 'left-1/2 -translate-x-1/2'
}

const getTooltipAlignClass = (value: number) => {
    const percent = percentage(value)
    return percent >= 50 ? '-translate-x-1/2' : ''
}

const getThumbPosition = (value: number) => {
    return percentage(value)
}

const trackStyle = computed(() => {
    if (props.type === SliderType.RANGE) {
        const [start, end] = thumbValues.value
        const startPercent = percentage(start)
        const endPercent = percentage(end)

        return {
            left: `${startPercent}%`,
            width: `${endPercent - startPercent}%`,
        }
    } else {
        const percent = percentage(thumbValues.value[0])
        return {
            left: '0%',
            width: `${percent}%`,
        }
    }
})

const startDrag = (index: number) => {
    if (props.disabled) return

    draggingIndex.value = index
    document.addEventListener('mousemove', onDrag)
    document.addEventListener('mouseup', stopDrag)
}

const onDrag = (event: MouseEvent) => {
    if (draggingIndex.value === null || !sliderRef.value) return

    const rect = sliderRef.value.getBoundingClientRect()
    const percent = (event.clientX - rect.left) / rect.width
    const rawValue = props.min + percent * (props.max - props.min)

    let clamped = Math.max(props.min, Math.min(rawValue, props.max))

    if (props.type === SliderType.SINGLE) {
        const step = stepSize.value
        const stepsFromMin = Math.round((clamped - props.min) / step)
        clamped = props.min + stepsFromMin * step
        clamped = Math.round(clamped)
        emit('update:modelValue', clamped)
    } else {
        // MODIFICADO: Validación para rangos durante el drag
        const range = [...(thumbValues.value as [number, number])]
        const roundedValue = Math.round(clamped)
        
        if (draggingIndex.value === 0) {
            // Arrastrando el thumb mínimo
            range[0] = Math.min(roundedValue, range[1] - 1) // Asegurar que sea menor que el máximo
        } else if (draggingIndex.value === 1) {
            // Arrastrando el thumb máximo
            range[1] = Math.max(roundedValue, range[0] + 1) // Asegurar que sea mayor que el mínimo
        }
        
        emit('update:modelValue', range)
    }
}

const stopDrag = () => {
    draggingIndex.value = null
    document.removeEventListener('mousemove', onDrag)
    document.removeEventListener('mouseup', stopDrag)
}


const cancelEditing = () => {
    editingIndex.value = null
    editingValue.value = ''
    
    // Restaurar el valor original si es necesario
    if (originalValue.value !== undefined) {
        emit('update:modelValue', originalValue.value)
    }
}

onMounted(() => {
    if (sliderRef.value) {
        sliderWidth.value = sliderRef.value.offsetWidth
    }
    if (filledTrackRef.value) {
        trackWidth.value = filledTrackRef.value.offsetWidth
    }
})

watch(() => props.modelValue, () => {
    if (sliderRef.value) {
        sliderWidth.value = sliderRef.value.offsetWidth
    }
    if (filledTrackRef.value) {
        trackWidth.value = filledTrackRef.value.offsetWidth
    }
})

// MODIFICADO: Método startEditing mejorado
const startEditing = (index: number) => {
    if (props.disabled) return
    
    editingIndex.value = index
    originalValue.value = props.type === SliderType.RANGE 
        ? [...(props.modelValue as [number, number])]
        : props.modelValue as number

    if (props.type === SliderType.RANGE) {
        editingValue.value = String((props.modelValue as [number, number])[index])
    } else {
        editingValue.value = String(props.modelValue as number)
    }

    // Focus el input en el siguiente tick
    nextTick(() => {
        if (index === 0 && minInputRef.value) {
            minInputRef.value.focus()
            minInputRef.value.select()
        } else if (index === 1 && maxInputRef.value) {
            maxInputRef.value.focus()
            maxInputRef.value.select()
        } else if (singleInputRef.value) {
            singleInputRef.value.focus()
            singleInputRef.value.select()
        }
    })
}

// MODIFICADO: Método stopEditing con mejor feedback
const stopEditing = () => {
    if (editingIndex.value === null) return

    const newValue = parseFloat(editingValue.value)
    
    // Validar que el valor esté dentro del rango permitido
    if (isNaN(newValue) || newValue < props.min || newValue > props.max) {
        showEditingError('Valor fuera del rango permitido')
        return
    }

    // Aplicar el step si está definido
    let adjustedValue = newValue
    if (props.steps > 1) {
        const step = stepSize.value
        const stepsFromMin = Math.round((newValue - props.min) / step)
        adjustedValue = props.min + stepsFromMin * step
    }

    // AÑADIDO: Validación específica para rangos
    if (props.type === SliderType.RANGE) {
        const currentRange = [...(props.modelValue as [number, number])]
        
        if (editingIndex.value === 0) {
            // Editando valor mínimo - debe ser menor que el máximo
            if (adjustedValue >= currentRange[1]) {
                showEditingError('El valor mínimo debe ser menor que el máximo')
                return
            }
        } else if (editingIndex.value === 1) {
            // Editando valor máximo - debe ser mayor que el mínimo
            if (adjustedValue <= currentRange[0]) {
                showEditingError('El valor máximo debe ser mayor que el mínimo')
                return
            }
        }
        
        // Si llegamos aquí, el valor es válido
        currentRange[editingIndex.value] = adjustedValue
        emit('update:modelValue', currentRange)
    } else {
        // Para slider simple, solo actualizar el valor
        emit('update:modelValue', adjustedValue)
    }

    // Limpiar estado de edición
    editingIndex.value = null
    editingValue.value = ''
}

// AÑADIDO: Función para mostrar errores de edición
const showEditingError = (message: string) => {
    const inputElement = editingIndex.value === 0 ? minInputRef.value : 
                        editingIndex.value === 1 ? maxInputRef.value : 
                        singleInputRef.value
    
    if (inputElement) {
        // Mostrar error visual
        inputElement.classList.add('border-red-500', 'bg-red-50')
        
        // Crear tooltip de error temporal
        const errorTooltip = document.createElement('div')
        errorTooltip.className = 'absolute -top-8 left-1/2 transform -translate-x-1/2 bg-red-600 text-white text-xs px-2 py-1 rounded whitespace-nowrap z-20'
        errorTooltip.textContent = message
        
        const container = inputElement.parentElement
        if (container) {
            container.style.position = 'relative'
            container.appendChild(errorTooltip)
        }
        
        // Limpiar después de 3 segundos
        setTimeout(() => {
            inputElement.classList.remove('border-red-500', 'bg-red-50')
            if (errorTooltip.parentElement) {
                errorTooltip.parentElement.removeChild(errorTooltip)
            }
        }, 3000)
    }
    
    // Restaurar valor original después de un momento
    setTimeout(() => {
        cancelEditing()
    }, 1500)
}

// AÑADIDO: Función para validar el rango completo
const validateRange = (range: [number, number]): [number, number] => {
    let [min, max] = range
    
    // Asegurar que estén dentro de los límites
    min = Math.max(props.min, Math.min(min, props.max))
    max = Math.max(props.min, Math.min(max, props.max))
    
    // Asegurar que el máximo sea mayor que el mínimo
    if (max <= min) {
        max = min + 1
        // Si el máximo excede el límite, ajustar el mínimo
        if (max > props.max) {
            max = props.max
            min = max - 1
        }
    }
    
    return [min, max]
}

// AÑADIDO: Watcher para validar cambios externos en el modelValue
watch(() => props.modelValue, (newValue) => {
    if (props.type === SliderType.RANGE && Array.isArray(newValue)) {
        const validatedRange = validateRange(newValue as [number, number])
        
        // Solo emitir si hay cambios
        if (validatedRange[0] !== newValue[0] || validatedRange[1] !== newValue[1]) {
            nextTick(() => {
                emit('update:modelValue', validatedRange)
            })
        }
    }
}, { deep: true })
</script>