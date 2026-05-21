<template>
    <Card class="px-0 py-5 shadow-xl">
        <CardBody class="px-5">
            <Rating
                :modelValue="ratingValue"
                :color="ratingStarColor"
            />
            <p class="text-sm">
                {{ text }}
            </p>
            <Author 
                v-if="!isDivided" 
                :name="displayName"
                :role
                :imgUrl
            />
        </CardBody>
        <CardFooter 
            v-if="isDivided"
            class="px-5"
        >
            <Author 
                :name="displayName"
                :role
                :imgUrl
            />
        </CardFooter>
    </Card>
</template>
<script setup lang="ts">
// Props
defineProps({
    displayName: {
        type: String as PropType<string>,
        default: 'John Doe'
    },
    role: String as PropType<string>,
    imgUrl: String as PropType<string>,
    text: {
        type: String as PropType<string>,
        default: 'Text'
    },
    ratingValue: {
        type: Number as PropType<number>,
        default: 0
    },
    ratingStarColor: {
        type: String as PropType<RatingItemColor>,
        default: RatingItemColor.GOLD, 
        validator: (value: RatingItemColor) => Object.values(RatingItemColor).includes(value),
    },
    isDivided: {
        type: Boolean as PropType<boolean>,
        default: false
    },
})
</script>