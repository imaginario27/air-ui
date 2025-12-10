<template>
    <div :class="['flex flex-col', 'w-full', 'gap-2']">
        <!-- Label -->
        <label
            v-if="label"
            :for="id"
            :class="['text-sm', 'font-semibold', 'text-left', hasError && 'text-text-error']"
        >
            {{ label }}
        </label>

        <!-- Dropzone Container -->
        <div class="flex w-full gap-4">
            <div
                v-if="showPreview && previewImageUrl && selectedFiles.length === 0"
                :class="[
                    'flex flex-col items-center gap-2',
                    'border border-border-default rounded-lg p-2',
                    'bg-background-neutral-subtle',
                    previewContainerClasses,
                ]"
            >
                <img
                    :src="previewImageUrl"
                    :alt="label || 'Preview'"
                    class="w-full h-full object-cover rounded-md"
                >
            </div>

            <div
                :class="[
                    'flex flex-col gap-2',
                    showPreview && previewImageUrl && selectedFiles.length === 0
                        ? 'flex-1'
                        : 'w-full',
                ]"
            >
                <Vue3Dropzone
                    :key="dropzoneKey"
                    v-model="selectedFiles"
                    :multiple
                    :accept="normalizedAccept"
                    :maxFileSize
                    :maxFiles
                    :disabled
                    :height="selectedFiles.length === 0 ? 'auto' : undefined"
                    :class="['w-full']"
                    @error="handleError"
                >
                    <template #placeholder-img>
                        <MdiIcon
                            :icon="icon"
                            preserveAspectRatio="xMidYMid meet"
                            class="min-w-[40px] min-h-[40px] aspect-square text-icon-default"
                        />
                    </template>
                    <template #title>
                        <p class="text-center text-sm text-text-default font-medium">
                            {{ computedTitleText }}
                        </p>
                    </template>
                    <template #button="{ fileInput }">
                        <div class="w-full flex justify-center my-4">
                            <ActionButton
                                :text="computedButtonText"
                                :styleType="ButtonStyleType.PRIMARY_BRAND_SOFT"
                                :disabled="disabled"
                                @click="fileInput?.click()"
                            />
                        </div>
                    </template>
                    <template #description>
                        <p class="text-xs text-text-neutral-subtle text-center">
                            {{ acceptedFileTypes }} {{ upToText }} {{ maxFileSize }}MB
                        </p>
                    </template>
                </Vue3Dropzone>

                <!-- Help Text -->
                <p
                    v-if="hasError || helpText"
                    :class="[
                        'text-xs text-left',
                        hasError ? 'text-text-error' : 'text-text-neutral-subtle',
                    ]"
                >
                    {{ hasError ? error : helpText }}
                </p>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
// Imports
import Vue3Dropzone from '@jaxtheprime/vue3-dropzone'
import '@jaxtheprime/vue3-dropzone/dist/style.css'

// Props
const props = defineProps({
    id: {
        type: String as PropType<string>,
        required: true,
    },
    label: String as PropType<string>,
    title: {
        type: String as PropType<string>,
        default: undefined,
    },
    helpText: String as PropType<string>,
    icon: {
        type: String as PropType<any>,
        default: 'mdiUploadOutline',
    },
    buttonText: String as PropType<string>,
    upToText: {
        type: String as PropType<string>,
        default: 'up to',
    },
    modelValue: {
        type: Array as () => File[],
        default: () => [],
    },
    validator: {
        type: Function as PropType<(value: unknown) => string | null>,
        default: () => null,
    },
    error: {
        type: String as PropType<string>,
        default: '',
    },
    disabled: {
        type: Boolean as PropType<boolean>,
        default: false,
    },
    required: {
        type: Boolean as PropType<boolean>,
        default: false,
    },
    multiple: {
        type: Boolean as PropType<boolean>,
        default: false,
    },
    accept: {
        type: [String, Array] as PropType<string | string[]>,
        default: () => ['application/pdf'],
    },
    maxFileSize: {
        type: Number as PropType<number>,
        default: 5,
    },
    maxFiles: {
        type: Number as PropType<number>,
        default: 1,
    },
    fileUploadErrorMessage: {
        type: String as PropType<string>,
        default: 'The size or format of one ore more files is incorrect.',
    },
    showPreview: {
        type: Boolean as PropType<boolean>,
        default: false,
    },
    previewImageUrl: String as PropType<string>,
    previewContainerClasses: {
        type: String as PropType<string>,
        default: 'w-[120px] h-[120px] min-w-[120px]',
    },
})

// Emits
const emit = defineEmits(['update:modelValue', 'update:error'])

// States
const dropzoneKey = ref(0) // Used to re-render the Dropzone if invalid filetype is passed

// Composables
const validationMode = useInjectedValidationMode()

// Initialize toast
const { $toast } = useNuxtApp()

// Computed
const hasError = computed(() => props.error !== '')

// Converts Array of strings into a string
const normalizedAccept = computed(() => {
    return Array.isArray(props.accept) ? props.accept.join(',') : props.accept
})

// Used for description
const acceptedFileTypes = computed(() => {
    return (Array.isArray(props.accept) ? props.accept : [props.accept])
        .map(ext => {
            const match = ext.match(/\/([a-zA-Z0-9]+)/)

            // If matched, return the extracted file extension, otherwise use full type
            return match?.[1]?.toUpperCase() || ext.toUpperCase()
        })
        .join(', ')
})

const computedTitleText = computed(() => {
    if (props.showPreview && props.previewImageUrl && selectedFiles.value.length === 0) {
        return props.title || 'Upload a new file to replace current one'
    }

    if (!props.title) {
        if (props.multiple) return 'Drag & drop files here or click to upload'
        else return 'Drag & drop a file here or click to upload'
    } else return props.title
})

const computedButtonText = computed(() => {
    if (props.showPreview && props.previewImageUrl && selectedFiles.value.length === 0) {
        return props.buttonText || 'Replace file'
    }

    if (!props.buttonText) {
        if (props.multiple) return 'Upload files'
        else return 'Upload a file'
    } else return props.buttonText
})

const selectedFiles = computed({
    get: () => props.modelValue,
    set: (newFiles: File[]) => {
        emit('update:modelValue', newFiles)

        if (props.required) {
            runValidation()
        }

        if (newFiles.length === 0) {
            dropzoneKey.value++ // This forces Vue3Dropzone to re-render
        }
    },
})

// Handlers
const handleError = (error: File[]) => {
    if (error) {
        $toast.error(props.fileUploadErrorMessage, { toastId: 'files-error' })
    }
}


// Validation logic
const runValidation = () => {
    if (!props.required || !props.validator) return

    const result = props.validator(props.modelValue)

    emit('update:error', result ?? '')
}


watch(selectedFiles, newFiles => {
    if (props.required && selectedFiles && validationMode.value === FormValidationMode.BLUR) {
        runValidation()
    }

    const hasInvalidFile = newFiles.some(file => {
        const actualFile = (file as any).file || file

        const isMimeAccepted = Array.isArray(props.accept)
            ? props.accept.includes(actualFile.type)
            : actualFile.type === props.accept

        return !isMimeAccepted
    })

    // If one file is invalid, clears the selected files and forces Dropzone re-render
    if (hasInvalidFile) {
        emit('update:modelValue', [])
        dropzoneKey.value++
    }
})
</script>
