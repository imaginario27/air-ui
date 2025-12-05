<template>
    <Card>
        <CardHeader>
            <CardTitle 
                :title="!isPlanCancelled ? title : 'Plan canceled'" 
                :class="{ 'text-text-danger': isPlanCancelled }"
            />
            <p 
                v-if="!isPlanCancelled"
                class="text-sm" 
            >
                Your next invoice is <strong>{{ nextPaymentAmount }}{{ currencySymbol }}</strong> 
                and will be sent on {{ nextPaymentDate }}.
            </p>
            <p 
                v-else-if="isPlanCancelled"
                class="text-sm" 
            >
                Your plan will switch to FREE on {{ nextPaymentDate }}.
            </p>
        </CardHeader>
        <CardBody>
            <div class="flex gap-column-gap justify-between items-end">
                <div class="flex flex-col">
                    <span class="text-2xl font-semibold">{{ planName.toUpperCase() }}</span>
                    <p 
                        v-if="!isPlanCancelled"
                        class="text-xs text-text-secondary"
                    >
                        {{ planDescription }}
                    </p>
                </div>
                <div class="flex gap-3 flex-col md:flex-row">
                    <ActionButton 
                        :text="changePlanButtonText"
                        :styleType="ButtonStyleType.PRIMARY_BRAND_FILLED"
                        :actionType="ButtonActionType.LINK"
                        :to="changePlanLink"
                        class="w-full md:w-auto"
                    />
                    <ActionButton 
                        v-if="!isPlanCancelled"
                        :text="cancelButtonText"
                        class="w-full md:w-auto"
                        @click="emit('cancel')"
                    />
                    <ActionButton 
                        v-if="isPlanCancelled"
                        text="Undo cancellation"
                        class="w-full md:w-auto"
                        @click="emit('undoCancellation')"
                    />
                </div>
            </div>
        </CardBody>
    </Card>
</template>
<script setup lang="ts">
// Props
defineProps({
    title: {
        type: String as PropType<string>,
        default: 'Current Active Plan'
    },
    nextPaymentAmount: {
        type: Number as PropType<number>,
        default: 0
    },
    nextPaymentDate: {
        type: String as PropType<string>,
        default: '_'
    },
    currencySymbol: {
        type: String as PropType<string>,
        default: '€'
    },
    planName: {
        type: String as PropType<string>,
        default: 'Plan name'
    },
    planDescription: {
        type: String as PropType<string>,
        default: 'Cancel whenever you want'
    },
    changePlanLink: {
        type: String as PropType<string>,
        default: '/'
    },
    changePlanButtonText: {
        type: String as PropType<string>,
        default: 'Change plan'
    },
    cancelButtonText: {
        type: String as PropType<string>,
        default: 'Cancel subscription'
    },
    isPlanCancelled: {
        type: Boolean as PropType<boolean>,
        default: false,
    }   
})

// Emits
const emit = defineEmits(['cancel', 'undoCancellation'])
</script>