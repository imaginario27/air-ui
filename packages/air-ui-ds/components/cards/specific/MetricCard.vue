<template>
    <Card :class="['gap-5!', 'relative', containerClass]">
        <div
            v-if="backgroundIcon"
            :class="['absolute', 'right-4', 'flex', 'pointer-events-none', 'opacity-20', backgroundIconPositionClass, backgroundIconContainerClass]"
            aria-hidden="true"
        >
            <Icon
                :name="backgroundIcon"
                :iconClass="backgroundIconFinalClass"
            />
        </div>

        <CardHeader :class="cardHeaderClass">
            <template v-if="icon && iconPosition === MetricCardIconPosition.LEFT">
                <Icon
                    v-if="
                        styleType === MetricCardStyle.NEUTRAL_FILLED ||
                        styleType === MetricCardStyle.PRIMARY_BRAND_FILLED ||
                        styleType === MetricCardStyle.SECONDARY_BRAND_FILLED ||
                        styleType === MetricCardStyle.CUSTOM_FILLED
                    "
                    :name="icon"
                    :class="textColorClass"
                    :size="iconSize"
                />
                <ContainedIcon
                    v-else
                    :icon
                    :size="iconContainerSize"
                    :color="iconColor"
                    :styleType="containedIconStyleType"
                    :shape="containedIconShape"
                />
            </template>

            <CardTitle
                :title
                :class="textColorClass"
            />

            <template v-if="icon && iconPosition === MetricCardIconPosition.RIGHT">
                <Icon
                    v-if="
                        styleType === MetricCardStyle.NEUTRAL_FILLED ||
                        styleType === MetricCardStyle.PRIMARY_BRAND_FILLED ||
                        styleType === MetricCardStyle.SECONDARY_BRAND_FILLED ||
                        styleType === MetricCardStyle.CUSTOM_FILLED
                    "
                    :name="icon"
                    :class="textColorClass"
                    :size="iconSize"
                />
                <ContainedIcon
                    v-else
                    :icon
                    :size="iconContainerSize"
                    :color="iconColor"
                    :styleType="containedIconStyleType"
                    :shape="containedIconShape"
                />
            </template>
        </CardHeader>
        <CardBody :class="['flex', 'gap-2!', cardBodyClass]">
            <div :class="['flex', 'items-end', 'gap-1', textColorClass]">
                <span :class="['text-3xl', 'font-semibold', amountClass]">
                    {{ amount }}
                </span>

                <span
                    v-if="unit"
                    :class="['text-lg', 'font-semibold', unitClass]"
                >
                    {{ unit }}
                </span>
            </div>

            <div :class="['flex', 'flex-col', 'gap-0.5', descriptionWrapperClass]">
                <p
                    v-if="featuredDescription"
                    :class="['text-sm', 'font-semibold', textColorClass, featuredDescriptionClass]"
                >
                    {{ featuredDescription }}
                </p>

                <p
                    v-if="description"
                    :class="['text-sm', styleType === MetricCardStyle.DEFAULT ? 'text-text-neutral-subtle' : textColorClass, descriptionClass]"
                >
                    {{ description }}
                </p>
            </div>

            <div
                v-if="trend"
                :class="['flex', 'items-center', 'gap-1', trendTextColorClass, trendWrapperClass]"
            >
                <Icon
                    :name="trendIcon"
                    :size="trendIconSize"
                />

                <span :class="['text-sm', 'mt-0.5', trendTextClass]">
                    {{ trend }}
                </span>
            </div>
        </CardBody>
    </Card>
</template>

<script setup lang="ts">
// Props
const props = defineProps({
    styleType: {
        type: String as PropType<MetricCardStyle>,
        default: MetricCardStyle.DEFAULT,
        validator: (value: MetricCardStyle) => Object.values(MetricCardStyle).includes(value),
    },
    title: {
        type: String as PropType<string>,
        default: "Metric title",
    },
    icon: String as PropType<string>,
    backgroundIcon: String as PropType<string>,
    backgroundIconPosition: {
        type: String as PropType<MetricCardBackgroundIconPosition>,
        default: MetricCardBackgroundIconPosition.MIDDLE,
        validator: (value: MetricCardBackgroundIconPosition) => Object.values(MetricCardBackgroundIconPosition).includes(value),
    },
    backgroundIconContainerClass: String as PropType<string>,
    backgroundIconClass: String as PropType<string>,
    iconContainerShape: {
        type: String as PropType<IconContainerShape>,
        default: IconContainerShape.SQUARE,
        validator: (value: IconContainerShape) => Object.values(IconContainerShape).includes(value),
    },
    iconContainerSize: {
        type: String as PropType<IconContainerSize>,
        default: IconContainerSize.SM,
        validator: (value: IconContainerSize) => Object.values(IconContainerSize).includes(value),
    },
    iconSize: {
        type: String as PropType<IconSize>,
        default: IconSize.MD,
        validator: (value: IconSize) => Object.values(IconSize).includes(value),
    },
    iconPosition: {
        type: String as PropType<MetricCardIconPosition>,
        default: MetricCardIconPosition.LEFT,
        validator: (value: MetricCardIconPosition) => Object.values(MetricCardIconPosition).includes(value),
    },
    defaultStyleIconColor: {
        type: String as PropType<ColorAccent>,
        default: ColorAccent.NEUTRAL,
        validator: (value: ColorAccent) => Object.values(ColorAccent).includes(value),
    },
    defaultStyleIconContainerType: {
        type: String as PropType<IconContainerStyleType>,
        default: IconContainerStyleType.FILLED,
        validator: (value: IconContainerStyleType) => Object.values(IconContainerStyleType).includes(value),
    },
    amount: {
        type: [String, Number] as PropType<string | number>,
        default: 0,
    },
    unit: String as PropType<string>,
    featuredDescription: String as PropType<string>,
    description: String as PropType<string>,
    trend: String as PropType<string>,
    trendDirection: {
        type: String as PropType<MetricTrendDirection>,
        default: MetricTrendDirection.UP,
        validator: (value: MetricTrendDirection) => Object.values(MetricTrendDirection).includes(value),
    },
    trendIconSize: {
        type: String as PropType<IconSize>,
        default: IconSize.SM,
        validator: (value: IconSize) => Object.values(IconSize).includes(value),
    },
    customFilledColorClass: {
        type: String as PropType<string>,
        default: "bg-background-neutral-bold",
    },
    cardHeaderClass: String as PropType<string>,
    cardBodyClass: String as PropType<string>,
    cardTitleClass: String as PropType<string>,
    amountClass: String as PropType<string>,
    unitClass: String as PropType<string>,
    descriptionWrapperClass: String as PropType<string>,
    featuredDescriptionClass: String as PropType<string>,
    descriptionClass: String as PropType<string>,
    trendWrapperClass: String as PropType<string>,
    trendTextClass: String as PropType<string>,
});

// Computed
const trendIcon = computed(() => {
    const variant: Record<MetricTrendDirection, string> = {
        [MetricTrendDirection.UP]: "mdi:arrow-up",
        [MetricTrendDirection.DOWN]: "mdi:arrow-down",
        [MetricTrendDirection.NEUTRAL]: "mdi:minus",
    };

    return variant[props.trendDirection as MetricTrendDirection] || "mdi:arrow-up";
});

const containerClass = computed(() => {
    const variant: Record<MetricCardStyle, string> = {
        [MetricCardStyle.DEFAULT]: "bg-background-container-surface",
        [MetricCardStyle.PRIMARY_BRAND_FILLED]: "bg-background-primary-brand-default border-border-primary-brand-default dark",
        [MetricCardStyle.PRIMARY_BRAND_SOFT]: "bg-background-primary-brand-soft",
        [MetricCardStyle.SECONDARY_BRAND_FILLED]: "bg-background-secondary-brand-default border-border-secondary-brand dark",
        [MetricCardStyle.SECONDARY_BRAND_SOFT]: "bg-background-secondary-brand-soft",
        [MetricCardStyle.NEUTRAL_FILLED]: "bg-background-neutral-bold dark",
        [MetricCardStyle.NEUTRAL_SOFT]: "bg-background-neutral-subtler",
        [MetricCardStyle.CUSTOM_FILLED]: props.customFilledColorClass,
    };

    return variant[props.styleType as MetricCardStyle] || "bg-background-container-surface";
});

const containedIconStyleType = computed(() => {
    if (props.styleType === MetricCardStyle.DEFAULT) {
        return props.defaultStyleIconContainerType;
    }

    return IconContainerStyleType.FILLED;
});

const containedIconShape = computed(() => {
    if (props.styleType === MetricCardStyle.DEFAULT) {
        return props.iconContainerShape;
    }

    return IconContainerShape.SQUARE;
});

const iconColor = computed(() => {
    if (props.defaultStyleIconColor && props.styleType === MetricCardStyle.DEFAULT) {
        return props.defaultStyleIconColor;
    }

    const variant: Record<MetricCardStyle, ColorAccent> = {
        [MetricCardStyle.DEFAULT]: ColorAccent.NEUTRAL,
        [MetricCardStyle.PRIMARY_BRAND_FILLED]: ColorAccent.PRIMARY_BRAND,
        [MetricCardStyle.PRIMARY_BRAND_SOFT]: ColorAccent.PRIMARY_BRAND,
        [MetricCardStyle.SECONDARY_BRAND_FILLED]: ColorAccent.SECONDARY_BRAND,
        [MetricCardStyle.SECONDARY_BRAND_SOFT]: ColorAccent.SECONDARY_BRAND,
        [MetricCardStyle.NEUTRAL_FILLED]: ColorAccent.NEUTRAL,
        [MetricCardStyle.NEUTRAL_SOFT]: ColorAccent.NEUTRAL,
        [MetricCardStyle.CUSTOM_FILLED]: ColorAccent.NEUTRAL,
    };

    return variant[props.styleType as MetricCardStyle] || ColorAccent.NEUTRAL;
});

const textColorClass = computed(() => {
    const variant: Record<MetricCardStyle, string> = {
        [MetricCardStyle.DEFAULT]: "text-text-neutral-default",
        [MetricCardStyle.PRIMARY_BRAND_FILLED]: "text-text-neutral-on-filled",
        [MetricCardStyle.PRIMARY_BRAND_SOFT]: "text-text-primary-brand-on-soft-bg",
        [MetricCardStyle.SECONDARY_BRAND_FILLED]: "text-text-neutral-on-filled",
        [MetricCardStyle.SECONDARY_BRAND_SOFT]: "text-text-secondary-brand-on-soft-bg",
        [MetricCardStyle.NEUTRAL_FILLED]: "text-text-neutral-on-filled",
        [MetricCardStyle.NEUTRAL_SOFT]: "text-text-neutral-on-neutral-bg",
        [MetricCardStyle.CUSTOM_FILLED]: "text-text-neutral-on-filled",
    };

    return variant[props.styleType as MetricCardStyle] || "text-text-neutral-default";
});

const isFilledStyle = computed(() => {
    return [
        MetricCardStyle.PRIMARY_BRAND_FILLED,
        MetricCardStyle.SECONDARY_BRAND_FILLED,
        MetricCardStyle.NEUTRAL_FILLED,
        MetricCardStyle.CUSTOM_FILLED,
    ].includes(props.styleType as MetricCardStyle);
});

const trendUpClass = computed(() => {
    return isFilledStyle.value ? "text-text-neutral-on-filled" : "text-text-success";
});

const trendDownClass = computed(() => {
    return isFilledStyle.value ? "text-text-neutral-on-filled" : "text-text-error";
});

const trendNeutralClass = computed(() => {
    return isFilledStyle.value ? "text-text-neutral-on-filled" : "text-text-neutral-subtle";
});

const backgroundIconPositionClass = computed(() => {
    const variant: Record<MetricCardBackgroundIconPosition, string> = {
        [MetricCardBackgroundIconPosition.TOP]: 'top-4 items-start',
        [MetricCardBackgroundIconPosition.MIDDLE]: 'inset-y-0 items-center',
        [MetricCardBackgroundIconPosition.BOTTOM]: 'bottom-4 items-end',
    };

    return variant[props.backgroundIconPosition as MetricCardBackgroundIconPosition] || 'inset-y-0 items-center';
});

const backgroundIconColorClass = computed(() => {
    return props.styleType === MetricCardStyle.DEFAULT
        ? 'text-text-neutral-subtle'
        : textColorClass.value;
});

const backgroundIconFinalClass = computed(() => {
    const classes: string[] = ['w-[80px]!', 'h-[80px]!', backgroundIconColorClass.value];
    if (props.backgroundIconClass) classes.push(props.backgroundIconClass);
    return classes;
});

const trendTextColorClass = computed(() => {
    const variant: Record<MetricTrendDirection, string> = {
        [MetricTrendDirection.UP]: trendUpClass.value,
        [MetricTrendDirection.DOWN]: trendDownClass.value,
        [MetricTrendDirection.NEUTRAL]: trendNeutralClass.value,
    };

    return variant[props.trendDirection as MetricTrendDirection] || trendUpClass.value;
});
</script>
