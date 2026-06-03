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
                'text-left',
            ]"
        >
            {{ label }}
        </label>

        <template v-if="!$slots.default">
            <template v-if="!isEmpty">
                <div 
                    v-if="text"
                    class="flex gap-2 items-center"
                >
                    <p 
                        :class="[
                            'text-sm',
                        ]"
                    >
                        {{ text }}
                    </p>

                    <ActionIconButton 
                        v-if="hasCopyToClipboardButton"
                        icon="mdi:content-copy"
                        :size="ButtonSize.XS"
                        :ariaLabel="copyButtonAriaLabel"
                        @click="handleCopyToClipboard"
                    />
                </div>
            </template>
            <template v-else>
                <p 
                    :class="[
                        'text-sm text-text-neutral-subtle',
                    ]"
                >
                    {{ emptyText }}
                </p>
            </template>
        </template>

        <!-- Slot for other type of items -->
        <slot />
       
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
// Props
const props = defineProps({
    id: { 
        type: String as PropType<string>, 
        required: true, 
    },
    label: String as PropType<string>,
    ariaLabel: String as PropType<string>,
    text: [String, Number] as PropType<string | number>,
    emptyText: {
        type: String as PropType<string>,
        default: 'Not defined'
    },
    helpText: String as PropType<string>,
    hasCopyToClipboardButton: {
        type: Boolean as PropType<boolean>,
        default: false
    },
    copyToClipboardMessage: {
        type: String as PropType<string>,
        default: 'Copied to clipboard'
    },
    copyToClipboardErrorMessage: {
        type: String as PropType<string>,
        default: 'Failed to copy to clipboard'
    },
})

// Computed
const isEmpty = computed(() => {
    return props.text === '' || props.text === null || props.text === undefined || props.text === 0
})

const copyButtonAriaLabel = computed(() => {
    if (props.ariaLabel) {
        return props.ariaLabel
    }

    if (props.label) {
        return `Copy ${props.label}`
    }

    return 'Copy value'
})

// Toast
const { $toast } = useNuxtApp()

// Methods
const handleCopyToClipboard = async () => {
    const success = await copyToClipboard(props.text?.toString() ?? '')

    if (success) {
        $toast.success(props.copyToClipboardMessage, { toastId: 'clipboard-success' })
    } else {
        $toast.error(props.copyToClipboardErrorMessage, { toastId: 'clipboard-error' })
    }
}
</script>
