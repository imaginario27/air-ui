<template>
    <Card class="lg:py-7 lg:px-8 bg-background-neutral-subtlest border-0">
        <CardHeader>
            <CardTitle :title="name"/>
        </CardHeader>
        <CardBody>
            <div 
                v-if="email" 
                class="flex gap-2 items-center text-text-primary-brand-default"
            >
                <MdiIcon
                    icon="mdiAt"
                    size="20"
                    preserveAspectRatio="xMidYMid meet"
                />
                <span class="font-semibold text-sm">
                    {{ email }}
                </span>
            </div>

            <div 
                v-if="phone" 
                class="flex gap-2 items-center text-text-neutral-subtle"
            >
                <MdiIcon
                    icon="mdiPhoneOutline"
                    size="20"
                    preserveAspectRatio="xMidYMid meet"
                />
                <span class="text-sm">
                    {{ phone }}
                </span>
            </div>
        </CardBody>
    </Card>
</template>
<script setup lang="ts">
// Props
defineProps({
    name: {
        type: String as PropType<string>,
        default: 'John Doe'
    },
    email: String as PropType<string>,
    phone: String as PropType<string>,
})
</script>