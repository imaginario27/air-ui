<template>
    <div 
        :class="[
            'flex',
            'flex-col',
            'w-full',
            'gap-3',
            hasSidePadding && 'px-content-side-padding-mobile md:px-content-side-padding',
            'pt-12',
            'pb-8',
            hasSeparator && 'border-b border-border-default'
        ]"
    >
        <NavLink 
            v-if="hasGoBackLink"
            :text="goBackText"
            :iconPosition="IconPosition.LEFT"
            :to="goBackLink"
            icon="mdiKeyboardBackspace"
            class="mb-2"
        />

        <Breadcrumbs 
            v-if="type === PageTitleType.WITH_BREADCRUMBS"
        />

        <Overtitle 
            v-if="type === PageTitleType.WITH_OVERTITLE"
            :title="overtitle ? overtitle : pageOvertitle.toString()"
            :class="overtitleClass"
            :isUppercase="isOverTitleUppercase"
        />

        <h1 
            :class="[
                'text-3xl md:text-4xl', 
                'font-semibold',
                'leading-tight',
                'text-text-default',
            ]"
        >
            {{ title ? title : pageTitle }}
        </h1>

        <p 
            v-if="showDescription && (pageDescription || description)"
            class="text-text-neutral-subtle text-lg max-w-[800px]"
        >
            {{ description ? description : pageDescription }}
        </p>
    </div>
</template>
<script setup lang="ts">
// Props
defineProps({
    type: {
        type: String as PropType<PageTitleType>,
        default: PageTitleType.SIMPLE,
        validator: (value: PageTitleType) => Object.values(PageTitleType).includes(value),
    },
    title: String as PropType<string>,
    overtitle: String as PropType<string>,
    isOverTitleUppercase: Boolean as PropType<boolean>,
    overtitleClass: String as PropType<string>,
    showDescription: {
        type: Boolean as PropType<boolean>,
        default: true,
    },
    description: String as PropType<string>,
    hasGoBackLink: {
        type: Boolean as PropType<boolean>,
        default: false,
    },
    goBackText: {
        type: String as PropType<string>,
        default: 'Go back',
    },
    goBackLink: {
        type: String as PropType<string>,
        default: '',
    },
    hasSeparator: {
        type: Boolean as PropType<boolean>,
        default: true,
    },
    hasSidePadding: {
        type: Boolean as PropType<boolean>,
        default: true,
    },
})

// Page title
const route = useRoute()
const pageTitle = ref(route.meta.title || 'Page title')
const pageOvertitle = ref(route.meta.overtitle || 'Overtitle')
const pageDescription = ref(route.meta.description)

// Watchers
watch(() => route.meta.title, (newTitle) => {
    pageTitle.value = newTitle || 'Page title'
})

watch(() => route.meta.overtitle, (newOvertitle) => {
    pageOvertitle.value = newOvertitle || 'Overtitle'
})

watch(() => route.meta.description, (newDescription) => {
    pageDescription.value = newDescription || 'Page description'
})
</script>