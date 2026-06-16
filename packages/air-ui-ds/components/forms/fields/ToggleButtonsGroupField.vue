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

        <!-- Help Text (top) -->
        <HelpText
            v-if="helpTextPosition === Position.TOP"
            :text="helpText"
        />

        <ToggleButtonGroup
            :id
            :ariaLabel="!label ? ariaLabel : label"
            :buttons
            :modelValue
            :groupStyle
            :disabled
            :onlyIcon
            @update:modelValue="emit('update:modelValue', $event)"
        />

        <!-- Help Text (bottom) -->
        <HelpText
            v-if="helpTextPosition === Position.BOTTOM"
            :text="helpText"
        />
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
    ariaLabel: String as PropType<string>,
    helpText: String as PropType<string>,
    helpTextPosition: {
        type: String as PropType<Position>,
        default: Position.BOTTOM,
        validator: (value: Position) => Object.values(Position).includes(value),
    },
    buttons: Array as PropType<ToggleButton[] | ToggleIconButton[]>,
    onlyIcon: {
        type: Boolean as PropType<boolean>, 
        default: false, 
    },
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
