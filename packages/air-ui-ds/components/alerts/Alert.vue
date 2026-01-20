<template>
    <div 
        :class="[
            'w-full',
            'flex gap-3',
            description === undefined || description === '' ? 'px-4 py-2' : 'p-4',
            'rounded-lg',
            'border',
            containerClass,
        ]"
    >
        <template v-if="description">
            <Icon 
                :name="iconType" 
                :iconClass="iconColorClass" 
            />
            
            <div 
                :class="[
                    'w-full flex flex-col gap-2',
                    textColorClass,
                ]"
            >
                <span class="text-sm font-semibold"
                >
                    {{ title }}
                </span>
                <p v-html="description" class="text-sm" />
    
                <div
                    v-if="buttons?.length"
                    class="flex gap-6"
                >
                    <AlertButton 
                        v-for="(button, index) in buttons" :key="`text-${index}`"
                        :type
                        :actionType="button.actionType"
                        :text="button.text"
                        :icon="button.icon"
                        :iconPosition="button.iconPosition"
                        :disabled="button.disabled"
                        :to="button.to"
                        :isExternal="button.isExternal"
                    />
                </div>
            </div>
        </template>

        <template v-else>
            <div class="w-full flex gap-3">
                <div class="w-full flex gap-3 pt-1.5">
                    <Icon 
                        :name="iconType" 
                        :iconClass="iconColorClass" 
                    />
                    <span :class="['text-sm font-semibold', textColorClass]">
                        {{ title  }}
                    </span>
                </div>

                <div class="flex gap-3">
                    <div
                        v-if="buttons?.length"
                        class="flex gap-4"
                    >
                        <AlertButton 
                            v-for="(button, index) in buttons" :key="`text-${index}`"
                            :type
                            :actionType="button.actionType"
                            :text="button.text"
                            :icon="button.icon"
                            :iconPosition="button.iconPosition"
                            :disabled="button.disabled"
                            :to="button.to"
                            :isExternal="button.isExternal"
                            :callback="button.callback"
                        />
                    </div>

                    <AlertIconButton 
                        v-if="hasCloseButton"
                        :type
                        icon="mdi:close"
                        @click="$emit('close')"
                    />
                </div>
            </div>
        </template>
    </div>
</template>
<script setup lang="ts">
// Props
const props = defineProps({
    type: {
        type: String as PropType<AlertType>,
        default: AlertType.WARNING,
        validator: (value: AlertType) => Object.values(AlertType).includes(value),
    },
    icon: String as PropType<string>,
    title: {
        type: String as PropType<string>,
        default: 'Title',
    },
    description: String as PropType<string>,
    buttons: Array as PropType<AlertButton[]>,
    hasCloseButton: {
        type: Boolean as PropType<boolean>,
        default: true,
    },
})

// Emits
defineEmits(['close'])

// Computed classes
const containerClass = computed(() => {
    const variant = {
        [AlertType.WARNING]: 'bg-background-warning-subtler border-border-warning',
        [AlertType.DANGER]: 'bg-background-danger-subtler border-border-danger',
        [AlertType.SUCCESS]: 'bg-background-success-subtler border-border-success',
        [AlertType.INFO]: 'bg-background-info-subtler border-border-info',
    }
    return variant[props.type as AlertType] || 'bg-background-warning-subtler border-border-warning'
})

const textColorClass = computed(() => {
    const variant = {
        [AlertType.WARNING]: 'text-text-warning-on-bg',
        [AlertType.DANGER]: 'text-icon-danger',
        [AlertType.SUCCESS]: 'text-text-success',
        [AlertType.INFO]: 'text-text-info',
    }
    return variant[props.type as AlertType] || 'text-text-warning-on-bg'
})

const iconColorClass = computed(() => {
    const variant = {
        [AlertType.WARNING]: '!text-icon-warning-on-bg',
        [AlertType.DANGER]: '!text-icon-danger',
        [AlertType.SUCCESS]: '!text-icon-success',
        [AlertType.INFO]: '!text-icon-info',
    }
    return variant[props.type as AlertType] || '!text-icon-warning-on-bg'
})

const iconType = computed(() => {
    const variant = {
        [AlertType.WARNING]: 'mdi:alert-outline',
        [AlertType.DANGER]: 'mdi:close-octagon-outline',
        [AlertType.SUCCESS]: 'mdi:check-circle-outline',
        [AlertType.INFO]: 'mdi:information-outline',
    }
    return variant[props.type as AlertType] as string || 'mdi:alert-outline'
})

</script>