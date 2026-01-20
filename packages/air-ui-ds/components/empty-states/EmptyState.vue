<template>
    <div
        :class="hasContainer && containerClasses"
    >
        <div 
            :class="[
                'py-3',
                'flex',
                'items-center',
                orientationClass,
            ]"
        >
            <!-- Icon -->
            <Icon 
                v-if="icon"
                :name="icon"
                :iconClass="[
                    hasContainer ? isContainedIconClass : iconClass,
                    iconSizeClass,
                ]"
            />
  
            <div 
                :class="[
                    'flex gap-2 flex-col',
                    'max-w-[400px]',
                    orientation === Orientation.VERTICAL
                        ? 'text-center justify-center'
                        : 'text-center justify-center sm:text-left sm:justify-start',
                ]"
            >
                <span :class="['font-semibold', titleClass && titleClass]">
                    {{ title }}
                </span>
                <p 
                    v-if="description"
                    :class="descriptionClass"
                >
                    {{ description }}
                </p>
            </div>
            
            <div
                v-if="buttonText"
                :class="[
                    orientation === Orientation.VERTICAL ? 'pt-4' : 'pt-4 sm:pt-0 sm:ml-4'
                ]"
            >
                <ActionButton 
                    :text="buttonText"
                    :styleType="buttonStyleType"
                    :icon="buttonIcon"
                    :iconPosition="buttonIconPosition"
                    @click="emitButtonClick"
                />
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">

// Props
const props = defineProps({
    title: {
        type: String as PropType<string>,
        default: 'Ups! No data found',
    },
    description: String as PropType<string>,
    icon: {
        type: String as PropType<string>,
        default: 'mdi:database-alert-outline',
    },
    iconClass: {
        type: String as PropType<string>,
        default: 'text-icon-neutral-sublest',
    },
    titleClass: String as PropType<string>,
    descriptionClass: {
        type: String as PropType<string>,
        default: 'text-sm text-text-neutral-subtle',
    },
    orientation: {
        type: String as PropType<Orientation>,
        default: Orientation.VERTICAL,
        validator: (value: Orientation) => Object.values(Orientation).includes(value),
    },
    buttonText: String as PropType<string>,
    buttonIconPosition: String as PropType<IconPosition>,
    buttonIcon: {
        type: String as PropType<string>,
        default: 'mdi:plus',
    },
    buttonStyleType: {
        type: String as PropType<ButtonStyleType>,
        default: ButtonStyleType.PRIMARY_BRAND_FILLED
    },
    hasContainer: {
        type: Boolean as PropType<boolean>,
        default: false
    },
    containerStyle: {
        type: String as PropType<EmptyPlaceholderContainerStyle>,
        default: EmptyPlaceholderContainerStyle.FILLED_NEUTRAL, 
        validator: (value: EmptyPlaceholderContainerStyle) => Object.values(EmptyPlaceholderContainerStyle).includes(value),
    },
    styledContainerClass: String as PropType<string>,
})

// Emits
const emit = defineEmits(['buttonClick'])
const emitButtonClick = () => {
    emit('buttonClick')
}

// Computed functions
const orientationClass = computed(() => {
    const orientationVariant = {
        [Orientation.VERTICAL]: 'flex-col gap-3',
        [Orientation.HORIZONTAL]: 'flex-col gap-3 sm:flex-row sm:gap-3',
    }
    return orientationVariant[props.orientation as Orientation] || 'flex-col gap-3 sm:flex-row sm:gap-3'
})

const iconSizeClass = computed(() => {
    const iconSize = {
        [Orientation.VERTICAL]: 'w-[40px] h-[40px] min-w-[40px] min-h-[40px]',
        [Orientation.HORIZONTAL]: 'w-[32px] h-[32px] min-w-[32px] min-h-[32px]',
    }
    return iconSize[props.orientation as Orientation] || 'w-[32px] h-[32px] min-w-[32px] min-h-[32px]'
})

const containerClasses = computed(() => {
    return [
        'flex',
        'w-full',
        'justify-center',
        'rounded-md',
        'p-[5vw]',
        customContainerClass.value,
        props.styledContainerClass
    ]
})

const customContainerClass = computed(() => {
    const variant = {
        [EmptyPlaceholderContainerStyle.DASHED]: '!border-2 border-dashed border-border-default',
        [EmptyPlaceholderContainerStyle.FILLED_NEUTRAL]: '!bg-background-neutral-subtlest',
        [EmptyPlaceholderContainerStyle.FILLED_PRIMARY_BRAND]: '!bg-background-primary-brand-soft',

    }
    return variant[props.containerStyle as EmptyPlaceholderContainerStyle] || '!bg-background-neutral-subtlest'
})

const isContainedIconClass = computed(() => {
    const variant = {
        [EmptyPlaceholderContainerStyle.DASHED]: '!text-icon-neutral-subtlest',
        [EmptyPlaceholderContainerStyle.FILLED_NEUTRAL]: '!text-icon-neutral-on-subtlest-bg',
        [EmptyPlaceholderContainerStyle.FILLED_PRIMARY_BRAND]: '!text-icon-neutral-on-primary-brand-soft-bg',

    }
    return variant[props.containerStyle as EmptyPlaceholderContainerStyle] || '!text-icon-neutral-on-subtlest-bg'
})

</script>