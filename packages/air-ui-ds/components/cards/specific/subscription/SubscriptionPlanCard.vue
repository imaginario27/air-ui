<template>
    <Card 
        :class="[
            '!gap-5', 
            'lg:py-7 lg:px-8',
        ]"
    >
        <CardHeader class="!flex-col !justify-normal !gap-3 relative">
            <template v-if="isFeatured && !isActive">
                <div class="w-full flex justify-between gap-3">
                    <CardTitle 
                        :title="capitalizeFirstLetter(title)" 
                        class="text-text-primary-brand-default"
                    />
                    <Badge 
                        v-if="isFeatured" 
                        :text="featuredBadgeText" 
                        :color="ColorAccent.PRIMARY_BRAND"
                    />
                </div>
            </template>

            <template v-else>
                <CardTitle :title="capitalizeFirstLetter(title)" class="text-text-primary-brand-default"/>
            </template>     

            <span class="text-4xl font-semibold">
                {{ computedAmount }}{{ currencySymbol }}<span class="text-text-neutral-subtle font-normal text-lg">/{{ computedPeriodicity }}</span>
            </span>

            <MdiIcon 
                v-if="isActive && !isFeatured"
                icon="mdiCheckCircle"
                size="24"
                preserveAspectRatio="xMidYMid meet"
                class="active-icon absolute top-0 right-0 text-icon-primary-brand-active"
            />
        </CardHeader>

        <CardBody class="h-full">
            <div class="flex flex-col gap-7 flex-grow mb-4">
                <p v-if="description" class="text-sm">
                    {{ description }}
                </p>
                <List 
                    v-if="features.length" 
                    :hasSeparator="hasFeatureListSeparator"
                    :class="[!hasFeatureListSeparator && 'gap-5']"
                >
                    <ListItem 
                        v-for="feature in features" :key="feature"
                        icon="mdiCheck"
                        :spaced="hasFeatureListSeparator"
                    >
                        {{ feature }}
                    </ListItem>
                </List>
            </div>

            <div 
                :class="[
                    'mt-auto flex',
                    alignClass
                ]"
            >
                <ActionButton 
                    v-if="!isActive && showSelectButton"
                    :text="selectButtonText"
                    :styleType="isFeatured ? featuredButtonStyle : buttonStyle"
                    class="w-full md:w-auto"
                />
            </div>
        </CardBody>
    </Card>
</template>
<script setup lang="ts">
// Props
const props = defineProps({
    isActive: {
        type: Boolean as PropType<boolean>,
        default: false
    },
    isFeatured: {
        type: Boolean as PropType<boolean>,
        default: false
    },
    title: {
        type: String as PropType<string>,
        default: 'Plan name'
    },
    description: String as PropType<string>,
    monthlyAmount: {
        type: Number as PropType<number>,
        default: 0
    },
    yearlyAmount: {
        type: Number as PropType<number>,
        default: 0
    },
    currencySymbol: {
        type: String as PropType<string>,
        default: '€'
    },
    featuredBadgeText: {
        type: String as PropType<string>,
        default: 'Recommended'
    },
    features: {
        type: Array as PropType<Array<string>>,
        default: () => [
            'Feature 1',
            'Feature 2', 
            'Feature 3'
        ]
    },
    hasFeatureListSeparator: {
        type: Boolean as PropType<boolean>,
        default: false
    },
    isYearly: {
        type: Boolean as PropType<boolean>,
        default: false
    },
    monthlyText: {
        type: String as PropType<string>,
        default: 'monthly'
    },
    yearlyText: {
        type: String as PropType<string>,
        default: 'yearly'
    },
    showSelectButton: {
        type: Boolean as PropType<boolean>,
        default: true
    },
    selectButtonText: {
        type: String as PropType<string>,
        default: 'Get started today'
    },
    alignSelectButton: {
        type: String as PropType<Align>,
        default: Align.CENTER,
        validator: (value: Align) => Object.values(Align).includes(value),
    },
    buttonStyle: {
        type: String as PropType<ButtonStyleType>,
        default: ButtonStyleType.NEUTRAL_FILLED,
        validator: (value: ButtonStyleType) => Object.values(ButtonStyleType).includes(value),
    },
    featuredButtonStyle: {
        type: String as PropType<ButtonStyleType>,
        default: ButtonStyleType.PRIMARY_BRAND_FILLED,
        validator: (value: ButtonStyleType) => Object.values(ButtonStyleType).includes(value),
    },
})

// Emits
defineEmits(['update:modelValue'])

// Computed classes
const alignClass = computed(() => {
    const alignVariant: Record<Align, string> = {
        [Align.LEFT]: "justify-start",
        [Align.CENTER]: "justify-center",
        [Align.RIGHT]: "justify-end",
    }

    return alignVariant[props.alignSelectButton as Align] || "justify-center"
})

// Computed functions
const computedAmount = computed(() => {
    return props.isYearly 
        ? props.yearlyAmount : props.monthlyAmount
})

const computedPeriodicity = computed(() => props.isYearly ? props.yearlyText : props.monthlyText)
</script>