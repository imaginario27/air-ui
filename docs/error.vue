<template>
    <div
        :class="[
            'w-full',
            'px-content-side-padding',
            'py-[10vw] md:py-[20vw]',
            'flex',
            'flex-col',
            'gap-4',
            'items-center',
            'justify-center',
        ]"
    >
        <ContainedIcon
            :color="ColorAccent.DANGER"
            icon="mdiAlertCircleOutline"
            :size="IconContainerSize.XXL"
        />

        <div class="flex flex-col gap-4 items-center w-full max-w-[600px]">
            <Heading
                :title="error.statusCode === 404 ? 'Page not found' : error.statusCode.toString()"
                :align="Align.CENTER"
                :size="HeadingSize.MD"
            />
            <p class="text-text-neutral-subtle font-semibold text-center leading-6">
                {{
                    error.statusCode === 404
                        ? "The page you are looking for does not exist or may have been moved. Please try with another page."
                        : getEnvErrorMessage(
                              error.message ?? "Something went wrong on our end. Please try again later.",
                              "Something went wrong on our end. Please try again later.",
                          )
                }}
            </p>
        </div>

        <div :class="['w-full', 'flex', 'gap-3', 'mt-6', 'items-center', 'justify-center', 'flex-col', 'md:flex-row']">
            <ActionButton
                :actionType="ButtonActionType.LINK"
                text="Back to home page"
                class="w-full md:w-auto"
                icon="mdiHomeOutline"
                :iconPosition="IconPosition.LEFT"
                to="/"
            />
        </div>
    </div>
</template>
<script setup lang="ts">
// Imports
import type { NuxtError } from "#app"

// Props
const props = defineProps({
    error: {
        type: Object as PropType<NuxtError>,
        required: true,
    },
})

// Computed
const pageTitleText = computed(() => (props.error.statusCode === 404 ? "Page not found" : String(props.error.statusCode)))

// Dynamically set the page title with a watcher (only for error page)
watchEffect(() => {
    document.title = pageTitle(pageTitleText.value, App.NAME)
})
</script>
