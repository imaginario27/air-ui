<template>
    <Card class="!py-6">
        <CardHeader class="!justify-center items-center flex-col gap-4">
            <!-- Icon -->
            <ContainedIcon 
                :icon
                :color="ColorAccent.PRIMARY_BRAND"
            />
            
            <!-- Title -->
            <h4 class="font-semibold">
                {{ title }}
            </h4>
        </CardHeader>
        <CardBody>
            <div class="flex flex-col w-full text-center items-center gap-6">
                <p class="text-sm text-text-neutral-subtle">
                    {{ description }}
                </p>
                <div class="w-full flex justify-center">
                    <ActionButton 
                        :styleType="ButtonStyleType.NEUTRAL_TRANSPARENT"
                        :actionType="ButtonActionType.LINK"
                        :iconPosition="IconPosition.RIGHT"
                        :icon="buttonIcon"
                        :to
                        :text="buttonText"
                    />
                </div>
            </div>
        </CardBody>
    </Card>
</template>
<script setup lang="ts">
// Props
defineProps({
    icon: {
        type: String as PropType<any>,
        default: 'mdiHelp'
    },
    title: {
        type: String as PropType<string>,
        default: 'Title'
    },
    description: {
        type: String as PropType<string>,
        default: 'Description'
    },
    to: {
        type: String as PropType<string>,
        default: '/'
    },
    buttonText: {
        type: String as PropType<string>,
        default: 'Learn more' 
    },
    buttonIcon: {
        type: String as PropType<any>,
        default: 'mdiArrowRight'
    },
})
</script>