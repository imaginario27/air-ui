<template>
    <component 
        :is="dynamicComponent"
        v-bind="componentProps"
        :class="[
            'flex flex-col',
            'px-3',
            'text-sm',
            'w-full',
            sizeClass,
            disabled
                ? 'cursor-not-allowed opacity-disabled'
                : 'hover:cursor-pointer',
            !disabled && (isSelected && activeStyle === SelectActiveStyle.FILL ?
                'bg-background-primary-brand-active hover:background-primary-brand-active hover:text-text-neutral-on-filled'
                : 'hover:bg-background-neutral-hover-subtle'),
        ]"
        @click="emitClick"
    >
        <div class="flex justify-between items-center gap-3 w-full">
            <div class="flex items-center gap-3">
                <Icon 
                    v-if="type === SelectType.ICON"
                    :name="icon"
                    :iconClass="[
                        isSelected && activeStyle === SelectActiveStyle.FILL ? '!text-icon-on-filled' : '!text-icon-neutral-subtle'
                    ]"
                />
        
                <template v-if="type === SelectType.IMAGE">
                    <img
                        v-if="imgUrl && isImageLoaded"
                        :src="imgUrl"
                        :alt
                        class="w-[24px] h-[24px] rounded"
                        @load="handleImageLoad"
                        @error="handleImageError"
                    >
                    <img
                        v-else
                        :src="missingImagePlaceholder"
                        :alt
                        class="w-[24px] h-[24px] rounded"
                    >
                </template>

                <span 
                    v-if="type !== SelectType.USER" 
                    :class="[
                        'text-sm text-left',
                        isSelected ? 'font-semibold' : '',
                        isSelected && activeStyle === SelectActiveStyle.FILL 
                            ? 'text-text-neutral-on-filled' : ''
                    ]"
                >
                    {{ text }}
                </span>

                <User 
                    v-if="type === SelectType.USER"
                    :displayName="userDisplayName"
                    :imgUrl="userProfileImg" 
                    :size="AvatarSize.XS"
                    :class="isSelected && activeStyle === SelectActiveStyle.FILL ? '!text-text-neutral-on-filled' : ''"
                />
            </div>
            <Icon 
                v-if="isSelected && activeStyle === SelectActiveStyle.CHECK"
                name="mdi:check"
                iconClass="!text-icon-primary-brand-active"
            />
        </div>
        <p 
            v-if="helpText"
            class="text-xs text-text-neutral-subtle mt-2"
        >
            {{ helpText }}
        </p>
    </component>
</template>

<script setup lang="ts">
// Imports
import missingImagePlaceholder from '@/assets/images/placeholders/missing-image-placeholder.png'

// Props
const props = defineProps({
    text: {
        type: String as PropType<string>,
        default: 'Select menu item',
    },
    icon: {
        type: String as PropType<string>,
        default: 'mdi:help',
    },
    size: {
        type: String as PropType<SelectSize>,
        default: SelectSize.MD,
        validator: (value: SelectSize) => Object.values(SelectSize).includes(value),
    },
    type: {
        type: String as PropType<SelectType>,
        default: SelectType.TEXT,
        validator: (value: SelectType) => Object.values(SelectType).includes(value),
    },
    userDisplayName: {
        type: String as PropType<string>,
        default: 'Test user',
    },
    userProfileImg: String as PropType<string>,
    imgUrl: String as PropType<string>,
    alt: {
        type: String as PropType<string>,
        default: 'Menu item image',
    },
    helpText: String as PropType<string>,
    isSelected: {
        type: Boolean as PropType<boolean>,
        default: false,
    },
    activeStyle: {
        type: String as PropType<SelectActiveStyle>,
        default: SelectActiveStyle.CHECK,
        validator: (value: SelectActiveStyle) => Object.values(SelectActiveStyle).includes(value),
    },
    to: String as PropType<string>,
    isExternal: {
        type: Boolean as PropType<boolean>,
        default: false,
    },
    disabled: {
        type: Boolean as PropType<boolean>,
        default: false,
    },
})

// States
const isImageLoaded = ref(true)

// Emits
const emit = defineEmits(['click'])
const emitClick = (event: MouseEvent) => {
    if (props.disabled) {
        event.preventDefault()
        event.stopPropagation()
        return
    }
    emit('click')
}

// Handlers for image load and error
const handleImageLoad = () => {
    isImageLoaded.value = true
}

const handleImageError = () => {
    isImageLoaded.value = false
}

// Computed 
const sizeClass = computed(() => {
    const sizeVariant = {
        [SelectSize.MD]: 'py-2',
        [SelectSize.LG]: 'py-3',
    }
    return sizeVariant[props.size as SelectSize] || 'py-2'
})

const dynamicComponent = computed(() => {
    return props.to ? 'a': 'div'
})

const componentProps = computed(() => {
    if (props.to) {
        return {
            href: props.to,
            ...(props.isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {}),
        }
    } else {
        return {}
    }
})
</script>
