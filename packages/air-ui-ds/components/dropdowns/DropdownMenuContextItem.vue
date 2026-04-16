<template>
    <component
        :is="dynamicComponent"
        v-bind="{
            ...componentProps,
            ...$attrs,
            ...(actionType === DropdownActionType.ACTION ? { onClick: emitClick } : {})
        }"
        :class="[
            'flex flex-col justify-center w-full px-2.5',
            'text-sm hover:bg-background-neutral-hover-subtle hover:cursor-pointer',
            sizeClass,
            typeClass,
            hasSeparator ? 'border-b border-border-default' : undefined,
            helpText ? 'py-2' : undefined,
            disabled && 'opacity-disabled cursor-not-allowed pointer-events-none',
        ]"
    >
        <div class="flex items-center gap-2.5 w-full">
            <Icon
                v-if="icon && (type === DropdownItemType.ICON || type === DropdownItemType.DANGER_ICON)"
                :name="icon"
                :iconClass="iconColorClass"
            />

            <template v-if="type === DropdownItemType.IMAGE">
                <img
                    v-if="imgUrl && isImageLoaded"
                    :src="imgUrl"
                    :alt
                    class="w-[20px] h-[20px] rounded"
                    @load="handleImageLoad"
                    @error="handleImageError"
                >
                <img
                    v-else
                    :src="missingImagePlaceholder"
                    :alt
                    class="w-[20px] h-[20px] rounded"
                >
            </template>

            <span v-if="type !== DropdownItemType.USER" class="text-sm leading-5">
                {{ text }}
            </span>

            <User
                v-if="userDisplayName && type === DropdownItemType.USER"
                :displayName="userDisplayName"
                :imgUrl="userProfileImg"
                :size="AvatarSize.XS"
            />

            <div v-if="kbdItems.length || hasNestedLevels" class="ml-auto flex items-center gap-1.5 pl-3">
                <Kbd
                    v-for="(kbdItem, index) in kbdItems"
                    :key="`${kbdItem}-${index}`"
                    :text="kbdItem"
                />

                <Icon
                    v-if="hasNestedLevels"
                    name="mdi:chevron-right"
                    iconClass="text-icon-neutral-subtle"
                />
            </div>
        </div>

        <p v-if="helpText" class="text-xs text-text-neutral-subtle mt-1.5">
            {{ helpText }}
        </p>
    </component>
</template>

<script setup lang="ts">
// Imports
import missingImagePlaceholder from '@/assets/images/placeholders/missing-image-placeholder.png'
import { NuxtLink } from '#components'

defineOptions({
    inheritAttrs: false,
})

// Props
const props = defineProps({
    actionType: {
        type: String as PropType<DropdownActionType>,
        default: DropdownActionType.LINK,
        validator: (value: DropdownActionType) => Object.values(DropdownActionType).includes(value),
    },
    text: {
        type: String as PropType<string>,
        default: 'Menu item text',
    },
    icon: {
        type: String as PropType<string>,
        default: 'mdi:help',
    },
    size: {
        type: String as PropType<DropdownItemSize>,
        default: DropdownItemSize.MD,
        validator: (value: DropdownItemSize) => Object.values(DropdownItemSize).includes(value),
    },
    type: {
        type: String as PropType<DropdownItemType>,
        default: DropdownItemType.TEXT,
        validator: (value: DropdownItemType) => Object.values(DropdownItemType).includes(value),
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
    to: {
        type: String as PropType<string>,
        default: '/',
    },
    isExternal: {
        type: Boolean as PropType<boolean>,
        default: false,
    },
    hasSeparator: {
        type: Boolean as PropType<boolean>,
        default: false,
    },
    disabled: {
        type: Boolean as PropType<boolean>,
        default: false,
    },
    hasNestedLevels: {
        type: Boolean as PropType<boolean>,
        default: false,
    },
    kbd: {
        type: [String, Array] as PropType<string | string[]>,
        default: undefined,
    },
    prefetchOn: {
        type: [String, Object] as PropType<PrefetchOnStrategy>,
        default: PrefetchOn.VISIBILITY,
    },
})

// States
const isImageLoaded = ref(true)

// Emits
const emit = defineEmits(['click', 'close'])

// Methods
const emitClick = () => {
    if (props.disabled) return

    if (props.actionType === DropdownActionType.ACTION) {
        emit('click')
        emit('close')
    }
}

const handleImageLoad = () => {
    isImageLoaded.value = true
}

const handleImageError = () => {
    isImageLoaded.value = false
}

// Computed classes
const sizeClass = computed(() => {
    const sizeVariant = {
        [DropdownItemSize.MD]: 'min-h-[32px]',
        [DropdownItemSize.LG]: 'min-h-[36px]',
    }

    return sizeVariant[props.size as DropdownItemSize] || 'min-h-[32px]'
})

const typeClass = computed(() => {
    const typeVariant = {
        [DropdownItemType.DANGER_ICON]: 'text-text-delete',
        [DropdownItemType.DANGER_TEXT]: 'text-text-delete',
        [DropdownItemType.TEXT]: 'text-text-default',
        [DropdownItemType.ICON]: 'text-text-default',
        [DropdownItemType.IMAGE]: 'text-text-default',
        [DropdownItemType.USER]: 'text-text-default',
    }

    return typeVariant[props.type as DropdownItemType] || 'text-text-default'
})

const iconColorClass = computed(() => {
    const colorVariant = {
        [DropdownItemType.DANGER_ICON]: 'text-icon-delete',
        [DropdownItemType.DANGER_TEXT]: 'text-icon-delete',
        [DropdownItemType.TEXT]: 'text-icon-neutral-subtle',
        [DropdownItemType.ICON]: 'text-icon-neutral-subtle',
        [DropdownItemType.IMAGE]: undefined,
        [DropdownItemType.USER]: undefined,
    }

    return colorVariant[props.type as DropdownItemType] || 'text-icon-neutral-subtle'
})

const kbdItems = computed(() => {
    if (!props.kbd) return []
    return Array.isArray(props.kbd) ? props.kbd : [props.kbd]
})

const dynamicComponent = computed(() => {
    switch (props.actionType) {
        case DropdownActionType.LINK:
            return NuxtLink
        case DropdownActionType.ACTION:
            return 'div'
        default:
            return 'div'
    }
})

const componentProps = computed(() => {
    if (props.actionType === DropdownActionType.LINK) {
        return {
            to: props.to,
            target: props.isExternal ? '_blank' : '_self',
            rel: props.isExternal ? 'noopener noreferrer' : undefined,
            external: props.isExternal,
            prefetchOn: props.prefetchOn,
        }
    }

    return {}
})
</script>