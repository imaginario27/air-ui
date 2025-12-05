<template>
    <Card
        :class="[
            'lg:py-7 lg:px-8',
        ]"
    >
        <CardBody class="sm:flex-row">
            <!-- Left column -->
            <div class="w-full sm:w-1/2 md:w-2/3 flex flex-col gap-5">
                <div class="w-full flex flex-col gap-3">
                    <CardTitle :title class="text-2xl"/>
                    <p>
                        {{ description }}
                    </p>
                </div>

                <List :layout="ListLayout.GRID" :cols="2">
                    <ListItem 
                        v-for="item in features" :key="item"
                        icon="mdiCheck"
                    >
                        {{ item }}
                    </ListItem>
                </List>
            </div>

            <!-- Right column -->
            <div 
                :class="[
                    'w-full sm:w-1/2 md:w-1/3',
                    'bg-background-neutral-subtlest-on-container-surface',
                    'flex flex-col gap-5 p-8',
                    'justify-center',
                    'items-center',
                    'rounded-lg',
                    'mt-4 md:mt-0',
                ]"
            >
                <!-- Header -->
                <div class="w-full flex flex-col gap-3 text-center">
                    <span 
                        v-if="overtitle"
                        class="font-semibold"
                    >
                        {{ overtitle }}
                    </span>

                    <span class="text-4xl font-semibold">
                        {{ price }}
                    </span>
                </div>

                <!-- CTA -->
                <div class="w-full flex justify-center">
                    <ActionButton 
                        :styleType="ButtonStyleType.PRIMARY_BRAND_FILLED"
                        :text="buttonText"
                        @click="emit('click')"
                    />
                </div>

                <!-- Extra info -->
                <div class="text-neutral-subtle text-xs">
                    <slot name="additionalInfo" />
                </div>         
            </div>
        </CardBody>
    </Card>
</template>
<script setup lang="ts">
defineProps({
    title: {
        type: String as PropType<string>,
        default: 'Plan name'
    },
    description: {
        type: String as PropType<string>,
        default: 'Plan description'
    },
    features: {
        type: Array as PropType<Array<string>>,
        default: () => [
            'Feature 1',
            'Feature 2',
            'Feature 3',
            'Feature 4',
            'Feature 5',
            'Feature 6',
            'Feature 7',
            'Feature 8'
        ],
    },
    overtitle: String as PropType<string>,
    price: {
        type: String as PropType<string>,
        default: '0€'
    },
    buttonText: {
        type: String as PropType<string>,
        default: 'Get started today'
    },
})

// Emits
const emit = defineEmits(['click'])
</script>