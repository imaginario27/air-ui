<template>
    <div 
        :class="[
            'w-full', 
            'flex', 
            'gap-2', 
            'py-2 px-3', 
            'cursor-pointer',
            !modelValue && 'bg-background-neutral-subtlest'
        ]" 

        @click="onItemClick"
    >
        <!-- Icon -->
        <ContainedIcon
            v-if="icon && isIconContained"
            :icon="icon"
            :size="containedIconSize"
            :color="iconColor"
            :shape="containedIconShape"
            :styleType="containedStyleType"
        />
        <Icon
            v-else-if="icon && !isIconContained"
            :name="icon"
            :size="iconSize"
            :color="iconColor"
        />

        <!-- Content -->
        <slot name="content" />

        <component
            :is="to ? NuxtLink : 'div'"
            v-if="!$slots.content"
            :to="to || undefined"
            class="w-full flex flex-col gap-3"
        >
            <div class="w-full flex flex-col gap-1">
                <span class="text-xs font-semibold text-text-neutral-subtle">
                    {{ title }}
                </span>

                <slot name="description" />

                <p v-if="!$slots.description" class="text-sm text-text-default">
                    {{ description }}
                </p>
            </div>

            <div class="w-full flex gap-5">
                <div class="flex gap-1">
                    <Icon
                        :name="timeAgoIcon"
                        :size="IconSize.XS"
                    />
                    <span class="text-xs text-text-neutral-subtle">
                        {{ timeAgo }}
                    </span>
                </div>
                <div class="flex gap-1">
                    <Icon
                        :name="authorIcon"
                        :size="IconSize.XS"
                    />
                    <span class="text-xs text-text-neutral-subtle">
                        {{ author }}
                    </span>
                </div>
            </div>
        </component>

        <ActionIconButton
            :icon="removeItemIcon"
            :size="ButtonSize.XS"
            :styleType="ButtonStyleType.NEUTRAL_TRANSPARENT"
            :ariaLabel="removeAriaLabel"
            @click.stop="$emit('remove')"
        />
    </div>
</template>
<script setup lang="ts">
import { NuxtLink } from '#components'

const props = defineProps({
    modelValue: {
        type: Boolean as PropType<boolean>,
        default: false,
    },
    icon: String as PropType<string>,
    iconColor: {
        type: String as PropType<ColorAccent>,
        default: ColorAccent.NEUTRAL,
        validator: (value: ColorAccent) => Object.values(ColorAccent).includes(value),
    },
    iconSize: {
        type: String as PropType<IconSize>,
        default: IconSize.MD,
        validator: (value: IconSize) => Object.values(IconSize).includes(value),
    },
    isIconContained: {
        type: Boolean as PropType<boolean>,
        default: true,
    },
    containedStyleType: {
        type: String as PropType<IconContainerStyleType>,
        default: IconContainerStyleType.FLAT,
        validator: (value: IconContainerStyleType) => Object.values(IconContainerStyleType).includes(value),
    },
    containedIconShape: {
        type: String as PropType<IconContainerShape>,
        default: IconContainerShape.CIRCLE,
        validator: (value: IconContainerShape) => Object.values(IconContainerShape).includes(value),
    },
    containedIconSize: {
        type: String as PropType<IconContainerSize>,
        default: IconContainerSize.XL,
        validator: (value: IconContainerSize) => Object.values(IconContainerSize).includes(value),
    },
    to: String as PropType<string>,
    title: {
        type: String as PropType<string>,
        default: 'Title',
    },
    description: {
        type: String as PropType<string>,
        default: 'Description',
    },
    timeAgo: {
        type: String as PropType<string>,
        default: 'Time ago',
    },
    timeAgoIcon: {
        type: String as PropType<string>,
        default: 'mdi:clock-time-four-outline',
    },
    author: {
        type: String as PropType<string>,
        default: 'Author',
    },
    authorIcon: {
        type: String as PropType<string>,
        default: 'mdi:account-outline',
    },
    removeItemIcon: {
        type: String as PropType<string>,
        default: 'mdi:close',
    },
    removeAriaLabel: {
        type: String as PropType<string>,
        default: 'Remove notification',
    },
})

const emit = defineEmits(['update:modelValue', 'remove'])

function onItemClick() {
    if (!props.modelValue) {
        emit('update:modelValue', true)
    }
}
</script>
