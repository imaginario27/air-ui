<template>
    <div 
        :class="[ 
            'flex flex-col', 
            'w-full', 
            'gap-2' 
        ]"
    >
        <!-- Label -->
        <label 
            v-if="label"
            :for="id" 
            :class="[ 
                'text-sm', 
                'font-semibold', 
                'text-left'
            ]"
        >
            {{ label }}
        </label>

        <ToggleButtonGroup 
            :buttons
            :modelValue
            :groupStyle
            :disabled
            @update:modelValue="emit('update:modelValue', $event)"
        />

        <!-- Help Text -->
        <p 
            v-if="helpText"
            :class="[ 
                'text-xs text-left', 
                'text-text-neutral-subtler' 
            ]" 
        >
            {{ helpText }}
        </p>
    </div>
</template>

<script setup lang="ts">
// Props
defineProps({
    id: { 
        type: String as PropType<string>, 
        required: true,
    },
    label: String as PropType<string>,
    helpText: String as PropType<string>,
    buttons: Array as PropType<ToggleButton[]>,
    modelValue: {
        type: String as PropType<string>,
        required: true,
    },
    groupStyle: String as PropType<ToggleButtonGroupStyle>,
    disabled: {
        type: Boolean as PropType<boolean>,
        default: false,
    },
})

// Emits
const emit = defineEmits(['update:modelValue'])
</script>
