<template>
    <Card 
        :class="[
            'lg:py-7 lg:px-8',
        ]"
    >
        <CardHeader :class="['!flex-col', align === Align.CENTER && 'items-center']">
            <ContainedIcon 
                :icon
                :shape="containedIconShape"
                :styleType="containedIconStyleType"
                :color="containedIconColor"
            />
            <CardTitle :title :class="[align === Align.CENTER && 'text-center']"/>
        </CardHeader>
        <CardBody>
            <p :class="['text-sm', align === Align.CENTER && 'text-center']">
                {{ description }}
            </p>
        </CardBody>
    </Card>
</template>
<script setup lang="ts">
// Props
defineProps({
    title: {
        type: String as PropType<string>,
        default: 'Feature title'
    },
    description: {
        type: String as PropType<string>,
        default: 'Feature description'
    },
    icon: {
        type: String as PropType<any>,
        default: 'mdiHelp'
    },
    containedIconShape: {
        type: String as PropType<IconContainerShape>,
        default: IconContainerShape.CIRCLE,
        validator: (value: IconContainerShape) => Object.values(IconContainerShape).includes(value),
    },
    containedIconStyleType: {
        type: String as PropType<IconContainerStyleType>,
        default: IconContainerStyleType.FILLED,
        validator: (value: IconContainerStyleType) => Object.values(IconContainerStyleType).includes(value),
    },
    containedIconColor: {
        type: String as PropType<ColorAccent>,
        default: ColorAccent.SECONDARY_BRAND, 
        validator: (value: ColorAccent) => Object.values(ColorAccent).includes(value),
    },
    align: {
        type: String as PropType<Align.LEFT | Align.CENTER>,
        default: Align.LEFT,
        validator: (value: Align) => [Align.LEFT, Align.CENTER].includes(value),
    }
})
</script>