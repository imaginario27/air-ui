<template>
    <Card :class="['gap-5!', containerClass]">
        <CardHeader>
            <template v-if="icon">
                <Icon
                    v-if="
                        styleType === DashboardMetricCardStyle.NEUTRAL_FILLED ||
                        styleType === DashboardMetricCardStyle.PRIMARY_BRAND_FILLED ||
                        styleType === DashboardMetricCardStyle.SECONDARY_BRAND_FILLED ||
                        styleType === DashboardMetricCardStyle.CUSTOM_FILLED
                    "
                    :name="icon"
                    :class="textColorClass"
                />
                <ContainedIcon
                    v-else
                    :icon
                    :iconSize="IconSize.SM"
                    :color="iconColor"
                    :styleType="containedIconStyleType"
                    :shape="containedIconShape"
                    class="w-6! h-6! min-w-6! min-h-6!"
                />
            </template>

            <CardTitle
                :title
                :class="textColorClass"
            />
        </CardHeader>
        <CardBody class="flex flex-col! gap-2!">
            <div :class="['flex', 'items-end', 'gap-1', textColorClass]">
                <span class="text-3xl font-semibold">
                    {{ amount }}
                </span>

                <span
                    v-if="unit"
                    class="text-lg font-semibold"
                >
                    /{{ unit }}
                </span>
            </div>

            <div class="flex flex-col gap-0.5">
                <p
                    v-if="featuredDescription"
                    :class="['text-sm', 'font-semibold', textColorClass]"
                >
                    {{ featuredDescription }}
                </p>

                <p
                    v-if="description"
                    :class="['text-sm', styleType === DashboardMetricCardStyle.DEFAULT ? 'text-text-neutral-subtle' : textColorClass]"
                >
                    {{ description }}
                </p>
            </div>

            <div
                v-if="trend"
                :class="['flex', 'items-center', 'gap-1', trendTextColorClass]"
            >
                <Icon
                    :name="trendIcon"
                    :size="IconSize.SM"
                />

                <span class="text-sm mt-0.5">
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
        type: String as PropType<DashboardMetricCardStyle>,
        default: DashboardMetricCardStyle.DEFAULT,
        validator: (value: DashboardMetricCardStyle) => Object.values(DashboardMetricCardStyle).includes(value),
    },
    title: {
        type: String as PropType<string>,
        default: "Metric title",
    },
    icon: String as PropType<string>,
    iconContainerShape: {
        type: String as PropType<IconContainerShape>,
        default: IconContainerShape.SQUARE,
        validator: (value: IconContainerShape) => Object.values(IconContainerShape).includes(value),
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
        type: String as PropType<DashboardMetricTrendDirection>,
        default: DashboardMetricTrendDirection.UP,
        validator: (value: DashboardMetricTrendDirection) => Object.values(DashboardMetricTrendDirection).includes(value),
    },
    customFilledColorClass: {
        type: String as PropType<string>,
        default: "bg-background-neutral-bold",
    },
});

// Computed
const trendIcon = computed(() => {
    const variant: Record<DashboardMetricTrendDirection, string> = {
        [DashboardMetricTrendDirection.UP]: "mdi:arrow-up",
        [DashboardMetricTrendDirection.DOWN]: "mdi:arrow-down",
        [DashboardMetricTrendDirection.NEUTRAL]: "mdi:minus",
    };

    return variant[props.trendDirection as DashboardMetricTrendDirection] || "mdi:arrow-up";
});

const containerClass = computed(() => {
    const variant: Record<DashboardMetricCardStyle, string> = {
        [DashboardMetricCardStyle.DEFAULT]: "bg-background-container-surface",
        [DashboardMetricCardStyle.PRIMARY_BRAND_FILLED]: "bg-background-primary-brand-default border-border-primary-brand-default dark",
        [DashboardMetricCardStyle.PRIMARY_BRAND_SOFT]: "bg-background-primary-brand-soft",
        [DashboardMetricCardStyle.SECONDARY_BRAND_FILLED]: "bg-background-secondary-brand-default border-border-secondary-brand dark",
        [DashboardMetricCardStyle.SECONDARY_BRAND_SOFT]: "bg-background-secondary-brand-soft",
        [DashboardMetricCardStyle.NEUTRAL_FILLED]: "bg-background-neutral-bold dark",
        [DashboardMetricCardStyle.NEUTRAL_SOFT]: "bg-background-neutral-subtler",
        [DashboardMetricCardStyle.CUSTOM_FILLED]: props.customFilledColorClass,
    };

    return variant[props.styleType as DashboardMetricCardStyle] || "bg-background-container-surface";
});

const containedIconStyleType = computed(() => {
    if (props.styleType === DashboardMetricCardStyle.DEFAULT) {
        return props.defaultStyleIconContainerType;
    }

    return IconContainerStyleType.FILLED;
});

const containedIconShape = computed(() => {
    if (props.styleType === DashboardMetricCardStyle.DEFAULT) {
        return props.iconContainerShape;
    }

    return IconContainerShape.SQUARE;
});

const iconColor = computed(() => {
    if (props.defaultStyleIconColor && props.styleType === DashboardMetricCardStyle.DEFAULT) {
        return props.defaultStyleIconColor;
    }

    const variant: Record<DashboardMetricCardStyle, ColorAccent> = {
        [DashboardMetricCardStyle.DEFAULT]: ColorAccent.NEUTRAL,
        [DashboardMetricCardStyle.PRIMARY_BRAND_FILLED]: ColorAccent.PRIMARY_BRAND,
        [DashboardMetricCardStyle.PRIMARY_BRAND_SOFT]: ColorAccent.PRIMARY_BRAND,
        [DashboardMetricCardStyle.SECONDARY_BRAND_FILLED]: ColorAccent.SECONDARY_BRAND,
        [DashboardMetricCardStyle.SECONDARY_BRAND_SOFT]: ColorAccent.SECONDARY_BRAND,
        [DashboardMetricCardStyle.NEUTRAL_FILLED]: ColorAccent.NEUTRAL,
        [DashboardMetricCardStyle.NEUTRAL_SOFT]: ColorAccent.NEUTRAL,
        [DashboardMetricCardStyle.CUSTOM_FILLED]: ColorAccent.NEUTRAL,
    };

    return variant[props.styleType as DashboardMetricCardStyle] || ColorAccent.NEUTRAL;
});

const textColorClass = computed(() => {
    const variant: Record<DashboardMetricCardStyle, string> = {
        [DashboardMetricCardStyle.DEFAULT]: "text-text-neutral-default",
        [DashboardMetricCardStyle.PRIMARY_BRAND_FILLED]: "text-text-neutral-on-filled",
        [DashboardMetricCardStyle.PRIMARY_BRAND_SOFT]: "text-text-primary-brand-on-soft-bg",
        [DashboardMetricCardStyle.SECONDARY_BRAND_FILLED]: "text-text-neutral-on-filled",
        [DashboardMetricCardStyle.SECONDARY_BRAND_SOFT]: "text-text-secondary-brand-on-soft-bg",
        [DashboardMetricCardStyle.NEUTRAL_FILLED]: "text-text-neutral-on-filled",
        [DashboardMetricCardStyle.NEUTRAL_SOFT]: "text-text-neutral-on-neutral-bg",
        [DashboardMetricCardStyle.CUSTOM_FILLED]: "text-text-neutral-on-filled",
    };

    return variant[props.styleType as DashboardMetricCardStyle] || "text-text-neutral-default";
});

const isFilledStyle = computed(() => {
    return [
        DashboardMetricCardStyle.PRIMARY_BRAND_FILLED,
        DashboardMetricCardStyle.SECONDARY_BRAND_FILLED,
        DashboardMetricCardStyle.NEUTRAL_FILLED,
        DashboardMetricCardStyle.CUSTOM_FILLED,
    ].includes(props.styleType as DashboardMetricCardStyle);
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

const trendTextColorClass = computed(() => {
    const variant: Record<DashboardMetricTrendDirection, string> = {
        [DashboardMetricTrendDirection.UP]: trendUpClass.value,
        [DashboardMetricTrendDirection.DOWN]: trendDownClass.value,
        [DashboardMetricTrendDirection.NEUTRAL]: trendNeutralClass.value,
    };

    return variant[props.trendDirection as DashboardMetricTrendDirection] || trendUpClass.value;
});
</script>
