<template>
    <Card 
        :hasShadow
        :class="[
            'lg:p-5',
            selectMode === CardSelectionMode.CARD && isHoverable && 
                'hover:border-border-neutral-hover cursor-pointer transition-shadow duration-300',
            modelValue && '!border-border-primary-brand-active',
            disabled && 'opacity-disabled cursor-not-allowed',
        ]"
        @click="handleCardClick"
    >
        <CardHeader 
            :class="[
                '!flex-col gap-5', 
                layoutAlign === Align.CENTER && 'items-center',
                'relative',
            ]"
        >
            <ContainedIcon 
                v-if="icon"
                :icon
                :shape="containedIconShape"
                :styleType="containedIconStyleType"
                :color="containedIconColor"
                :size="IconContainerSize.LG"
            />
            <CardTitle 
                :title 
                :class="[
                    layoutAlign === Align.CENTER && 'text-center',
                    titleClass,
                ]"
            />

            <Icon 
                v-if="modelValue"
                :name="checkIcon"
                class="absolute top-0 right-0"
                iconClass="text-icon-primary-brand-active"
            />
        </CardHeader>

        <CardBody class="flex-1">
            <p 
                v-if="!$slots.default"
                :class="[
                    'text-sm', 
                    'text-text-neutral-subtle',
                    layoutAlign === Align.CENTER && 'text-center',
                    descriptionClass,
                ]"
            >
                {{ description }}
            </p>

            <slot />
        </CardBody>

        <CardFooter 
            v-if="hasFooter || selectMode === CardSelectionMode.BUTTON"
            :hasBorder="false" 
            :class="footerContentAlignClass"
        >
            <CardActions 
                v-if="!$slots.footer" 
                :class="footerContentAlignClass"
            >
                <template v-if="!$slots.actions">
                    <ActionButton
                        v-if="hasSecondaryBtn"
                        :text="secondaryBtnText"
                        :iconPosition="secondaryBtnIconPosition"
                        :icon="secondaryBtnIcon"
                        :size="buttonSize"
                        :styleType="secondaryBtnStyleType"
                        isMobileFullWidth
                        :disabled
                        @click="handleButtonClick"
                    />

                    <ActionButton
                        v-if="selectMode === CardSelectionMode.BUTTON"
                        :text="modelValue ? selectedText : selectText"
                        :iconPosition="selectBtnIconPosition"
                        :icon="selectBtnIcon"
                        :size="buttonSize"
                        :styleType="selectBtnStyleType"
                        isMobileFullWidth
                        :disabled
                        @click="handleSelectBtnClick"
                    />
                </template>
            </CardActions>

            <slot name="footer" />
        </CardFooter>
    </Card>
</template>

<script setup lang="ts">
// Props
const props = defineProps({
    modelValue: {
        type: Boolean as PropType<boolean>,
        default: false,
    },
    selectMode: {
        type: String as PropType<CardSelectionMode>,
        default: CardSelectionMode.CARD,
        validator: (value: CardSelectionMode) => Object.values(CardSelectionMode).includes(value),
    },
    title: {
        type: String as PropType<string>,
        default: 'Title',
    },
    titleClass: String as PropType<string>,
    description: {
        type: String as PropType<string>,
        default: 'Description',
    },
    descriptionClass: String as PropType<string>,
    checkIcon: {
        type: String as PropType<string>,
        default: 'mdi:check-circle-outline',
    },
    icon: String as PropType<string>,
    containedIconShape: {
        type: String as PropType<IconContainerShape>,
        default: IconContainerShape.SQUARE,
        validator: (value: IconContainerShape) => Object.values(IconContainerShape).includes(value),
    },
    containedIconStyleType: {
        type: String as PropType<IconContainerStyleType>,
        default: IconContainerStyleType.FLAT,
        validator: (value: IconContainerStyleType) => Object.values(IconContainerStyleType).includes(value),
    },
    containedIconColor: {
        type: String as PropType<ColorAccent>,
        default: ColorAccent.SECONDARY_BRAND,
        validator: (value: ColorAccent) => Object.values(ColorAccent).includes(value),
    },
    layoutAlign: {
        type: String as PropType<Align.LEFT | Align.CENTER>,
        default: Align.LEFT,
        validator: (value: Align) => [Align.LEFT, Align.CENTER].includes(value),
    },
    buttonSize: {
        type: String as PropType<ButtonSize>,
        default: ButtonSize.LG,
        validator: (value: ButtonSize) => Object.values(ButtonSize).includes(value),
    },
    hasSecondaryBtn: {
        type: Boolean as PropType<boolean>,
        default: true,
    },
    secondaryBtnText: {
        type: String as PropType<string>,
        default: 'Details',
    },
    secondaryBtnStyleType: {
        type: String as PropType<ButtonStyleType>,
        default: ButtonStyleType.NEUTRAL_OUTLINED,
        validator: (value: ButtonStyleType) => Object.values(ButtonStyleType).includes(value),
    },
    secondaryBtnIconPosition: {
        type: String as PropType<IconPosition>,
        default: IconPosition.NONE,
        validator: (value: IconPosition) => Object.values(IconPosition).includes(value),
    },
    secondaryBtnIcon: {
        type: String as PropType<string>,
        default: 'mdi:arrow-right',
    },
    selectBtnStyleType: {
        type: String as PropType<ButtonStyleType>,
        default: ButtonStyleType.NEUTRAL_FILLED,
        validator: (value: ButtonStyleType) => Object.values(ButtonStyleType).includes(value),
    },
    selectBtnIconPosition: {
        type: String as PropType<IconPosition>,
        default: IconPosition.NONE,
        validator: (value: IconPosition) => Object.values(IconPosition).includes(value),
    },
    selectBtnIcon: {
        type: String as PropType<string>,
        default: 'mdi:arrow-right',
    },
    selectText: {
        type: String as PropType<string>,
        default: 'Select',
    },
    selectedText: {
        type: String as PropType<string>,
        default: 'Selected',
    },
    hasFooter: {
        type: Boolean as PropType<boolean>,
        default: true,
    },
    footerContentAlign: {
        type: String as PropType<Align>,
        default: Align.RIGHT,
        validator: (value: Align) => Object.values(Align).includes(value),
    },
    isHoverable: {
        type: Boolean as PropType<boolean>,
        default: true,
    },
    hasShadow: {
        type: Boolean as PropType<boolean>,
        default: true,
    },
    disabled: {
        type: Boolean as PropType<boolean>,
        default: false,
    },
})

// Emits
const emit = defineEmits(['update:modelValue', 'buttonClick'])

// Methods
const handleCardClick = (event: MouseEvent) => {
    if (props.selectMode !== CardSelectionMode.CARD) return

    const path = event.composedPath?.()
    const isInsideButton = path?.some((el: any) => el?.tagName === 'BUTTON')

    if (!isInsideButton) {
        emit('update:modelValue', !props.modelValue)
    }
}

const handleButtonClick = (event: Event | undefined) => {
    if (event && typeof event.stopPropagation === 'function') {
        event.stopPropagation()
    }
    emit('buttonClick')
}

const handleSelectBtnClick = (event: Event | undefined) => {
    if (event && typeof event.stopPropagation === 'function') {
        event.stopPropagation()
    }
    emit('update:modelValue', !props.modelValue)
}

// Computed classes
const footerContentAlignClass = computed(() => {
    const alignVariant: Record<Align, string> = {
        [Align.LEFT]: 'justify-start',
        [Align.CENTER]: 'justify-center',
        [Align.RIGHT]: 'justify-end',
    }

    return alignVariant[props.footerContentAlign as Align] || 'justify-end'
})
</script>
