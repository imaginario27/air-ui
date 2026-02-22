<template>
    <div class="relative w-full">
        <div 
            :class="[ 
                'flex',
                'items-center',
                'border-b-2 border-border-neutral-subtle',
                'pl-3 pr-4',
                'h-[56px]'
            ]"
        >
            <!-- Search Icon -->
            <Icon 
                name="mdi:magnify" 
                :size="IconSize.LG"
            />
            
            <!-- Search Input -->
            <input 
                type="text" 
                :value="modelValue" 
                placeholder="Search" 
                :class="[ 
                    'w-full',
                    'p-2 ',
                    'text-sm text-text-default',
                    'bg-transparent',
                    'focus:outline-none',
                ]" 
                @input="emitUpdate"
            >

            <!-- Close Button -->
            <ActionIconButton 
                icon="mdi:close"
                :size="ButtonSize.MD"
                @click="closeModal"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
// Props
defineProps({
    modelValue: String as PropType<string>,
})

// Emits
const emit = defineEmits(['update:modelValue', 'close'])

const emitUpdate = (event: Event) => {
    const target = event.target as HTMLInputElement | null
    if (target !== null) {
        emit('update:modelValue', target.value)
    }
}

// Handlers
const closeModal = () => {
   emit('close')
}
</script>
