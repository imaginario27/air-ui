<template>
    <div :class="['flex flex-col gap-2 w-full', containerClass]">
        <div
            :class="[
                'w-full',
                'rounded-lg',
                'border-2',
                'border-dashed',
                'transition-colors',
                'duration-200',
                'p-4 sm:p-5',
                'outline-none',
                dropzoneStateClass,
                isDraggingOver &&
                    !disabled &&
                    'border-border-primary-brand-default bg-background-primary-brand-soft/20',
                disabled
                    ? 'cursor-not-allowed opacity-disabled'
                    : 'cursor-pointer',
                dropzoneClass,
            ]"
            @dragenter.prevent="handleDragEnter"
            @dragover.prevent="handleDragOver"
            @dragleave.prevent="handleDragLeave"
            @drop.prevent="handleDrop"
        >
            <input
                ref="fileInputRef"
                type="file"
                class="hidden"
                :multiple="multiple"
                :accept="inputAccept"
                :disabled="disabled"
                @change="handleInputChange"
            >

            <div class="flex flex-col items-center text-center gap-2">
                <Icon
                    :name="icon"
                    :size="IconSize.LG"
                    :iconClass="iconClass"
                />

                <p :class="['text-base font-medium text-text-default', titleClass]">
                    {{ resolvedTitle }}
                </p>

                <p :class="['text-sm text-text-neutral-subtle', descriptionClass]">
                    {{ resolvedDescription }}
                </p>

                <div
                    :class="[
                        'flex',
                        'flex-wrap',
                        'gap-2',
                        'justify-center',
                        'mt-2',
                        actionsClass,
                    ]"
                >
                    <ActionButton
                        v-if="showSelectButton"
                        :text="resolvedSelectButtonText"
                        :styleType="ButtonStyleType.NEUTRAL_FILLED"
                        :disabled="disabled"
                        @click.stop="openFileDialog"
                    />

                    <ActionButton
                        v-if="canShowClearAllButton"
                        :text="clearAllButtonText"
                        :styleType="ButtonStyleType.NEUTRAL_TRANSPARENT"
                        :disabled="disabled"
                        @click.stop="clearAll"
                    />
                </div>
            </div>
        </div>

        <div
            v-if="internalFiles.length"
            :class="[
                'w-full',
                hasListItemsContainerScroll && 'overflow-y-auto',
            ]"
            :style="itemsContainerStyle"
        >
            <div
                :class="[
                    itemsLayout === DropzoneLayout.GRID
                        ? [
                            'grid',
                            'grid-cols-1',
                            'sm:grid-cols-2',
                            'lg:grid-cols-3',
                            'gap-2',
                            gridClass,
                        ]
                        : [
                            'flex',
                            'flex-col',
                            'gap-2',
                            listClass,
                        ],
                ]"
            >
                <article
                    v-for="file in internalFiles"
                    :key="getFileId(file)"
                    :class="[
                        'relative',
                        'border',
                        'border-border-default',
                        'rounded-lg',
                        'bg-background-neutral-subtlest',
                        itemsLayout === DropzoneLayout.GRID
                            ? ['min-h-30', 'overflow-hidden']
                            : ['p-3', 'overflow-visible'],
                        fileItemClass,
                    ]"
                >
                <template v-if="itemsLayout === DropzoneLayout.GRID">
                    <div class="absolute inset-0">
                        <img
                            v-if="getPreviewUrl(file)"
                            :src="getPreviewUrl(file)"
                            :alt="file.name"
                            class="w-full h-full object-cover"
                        >

                        <div
                            v-else
                            class="w-full h-full flex items-center justify-center bg-background-neutral-subtle"
                        >
                            <Icon
                                :name="getFileIcon(file)"
                                :size="IconSize.XXL"
                                :color="ColorAccent.NEUTRAL"
                            />
                        </div>
                    </div>

                    <div
                        :class="[
                            'relative',
                            'z-10',
                            'h-full',
                            'flex',
                            'flex-col',
                            'justify-end',
                            'p-3',
                            'bg-linear-to-t',
                            'from-background-neutral-filled-default/60',
                            'to-transparent',
                        ]"
                    >
                        <p :class="['text-sm text-white truncate', fileNameClass]">
                            {{ file.name }}
                        </p>

                        <p :class="['text-xs text-white/80', fileMetaClass]">
                            {{ getFileLabel(file) }} · {{ formatFileSize(file.size) }}
                        </p>

                        <div class="mt-2 flex items-center justify-between gap-2">
                            <p :class="['text-xs', getUploadStatusClass(file, true)]">
                                {{ getUploadStatusText(file) }}
                            </p>

                            <div class="flex items-center gap-1">
                                <ActionIconButton
                                    v-if="canRetry(file)"
                                    :icon="retryIcon"
                                    :size="ButtonSize.XS"
                                    :styleType="retryButtonStyleType"
                                    :class="retryButtonClass"
                                    :iconClass="normalizedRetryIconClass"
                                    :ariaLabel="retryAriaLabel"
                                    @click.stop="retryUpload(file)"
                                />

                                <ActionIconButton
                                    v-if="!disabled"
                                    :icon="removeIcon"
                                    :size="ButtonSize.XS"
                                    :styleType="removeButtonStyleType"
                                    :class="removeButtonClass"
                                    :iconClass="normalizedRemoveIconClass"
                                    :ariaLabel="removeAriaLabel"
                                    @click.stop="removeFile(file)"
                                />
                            </div>
                        </div>
                    </div>
                </template>

                <template v-else>
                    <div class="flex items-center gap-2">
                        <div
                            :class="[
                                'w-10',
                                'h-10',
                                'rounded-md',
                                'bg-background-neutral-subtle',
                                'flex',
                                'items-center',
                                'justify-center',
                                'overflow-hidden',
                                'shrink-0',
                            ]"
                        >
                            <img
                                v-if="getPreviewUrl(file)"
                                :src="getPreviewUrl(file)"
                                :alt="file.name"
                                class="w-full h-full object-cover"
                            >

                            <Icon
                                v-else
                                :name="getFileIcon(file)"
                                :size="IconSize.LG"
                                :color="ColorAccent.NEUTRAL"
                            />
                        </div>

                        <div class="min-w-0 flex-1">
                            <p :class="['text-sm font-medium text-text-default truncate', fileNameClass]">
                                {{ file.name }}
                            </p>

                            <p :class="['text-xs text-text-neutral-subtle', fileMetaClass]">
                                {{ getFileLabel(file) }} · {{ formatFileSize(file.size) }}
                            </p>

                            <p :class="['text-xs mt-1', getUploadStatusClass(file, false)]">
                                {{ getUploadStatusText(file) }}
                            </p>
                        </div>

                        <div class="flex items-center gap-1">
                            <ActionIconButton
                                v-if="canRetry(file)"
                                :icon="retryIcon"
                                :size="ButtonSize.XS"
                                :styleType="retryButtonStyleType"
                                :class="retryButtonClass"
                                :iconClass="normalizedRetryIconClass"
                                @click.stop="retryUpload(file)"
                            />

                            <ActionIconButton
                                v-if="!disabled"
                                :icon="removeIcon"
                                :size="ButtonSize.XS"
                                :styleType="removeButtonStyleType"
                                :class="removeButtonClass"
                                :iconClass="normalizedRemoveIconClass"
                                @click.stop="removeFile(file)"
                            />
                        </div>
                    </div>
                </template>
                </article>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
const DEFAULT_FILE_TYPE_ICON_MAP: Record<string, string> = {
    image: 'mdi:file-image-outline',
    video: 'mdi:file-video-outline',
    audio: 'mdi:file-music-outline',
    pdf: 'mdi:file-pdf-box',
    word: 'mdi:file-word-outline',
    excel: 'mdi:file-excel-outline',
    powerpoint: 'mdi:file-powerpoint-outline',
    archive: 'mdi:zip-box-outline',
    geo: 'mdi:map-outline',
    text: 'mdi:file-document-outline',
    default: 'mdi:file-outline',
}

const props = defineProps({
    modelValue: {
        type: Array as PropType<File[]>,
        default: () => [],
    },
    title: {
        type: String as PropType<string>,
        default: 'Drag and drop files here',
    },
    singleFileTitleText: {
        type: String as PropType<string>,
        default: 'Drag and drop a file here',
    },
    description: {
        type: String as PropType<string>,
        default: '',
    },
    icon: {
        type: String as PropType<string>,
        default: 'mdi:cloud-upload-outline',
    },
    buttonText: {
        type: String as PropType<string>,
        default: 'Select files',
    },
    singleFileButtonText: {
        type: String as PropType<string>,
        default: 'Select file',
    },
    upToText: {
        type: String as PropType<string>,
        default: 'up to',
    },
    allFilesTypeText: {
        type: String as PropType<string>,
        default: 'All file types',
    },
    disabled: {
        type: Boolean as PropType<boolean>,
        default: false,
    },
    multiple: {
        type: Boolean as PropType<boolean>,
        default: false,
    },
    accept: {
        type: [String, Array] as PropType<string | string[]>,
        default: '*',
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
    itemsLayout: {
        type: String as PropType<DropzoneLayout>,
        default: DropzoneLayout.LIST,
        validator: (value: DropzoneLayout) => Object.values(DropzoneLayout).includes(value),
    },
    state: {
        type: String as PropType<DropzoneState>,
        default: DropzoneState.DEFAULT,
        validator: (value: DropzoneState) => Object.values(DropzoneState).includes(value),
    },
    selectFileStrategy: {
        type: String as PropType<FileSelectStrategy>,
        default: FileSelectStrategy.MERGE,
        validator: (value: FileSelectStrategy) => Object.values(FileSelectStrategy).includes(value),
    },
    showSelectButton: {
        type: Boolean as PropType<boolean>,
        default: true,
    },
    showClearAllButton: {
        type: Boolean as PropType<boolean>,
        default: true,
    },
    clearAllButtonText: {
        type: String as PropType<string>,
        default: 'Clear all',
    },
    fileTypeIconMap: {
        type: Object as PropType<Record<string, string>>,
        default: () => ({}),
    },
    useServerUpload: {
        type: Boolean as PropType<boolean>,
        default: false,
    },
    uploadUrl: String as PropType<string>,
    deleteUrl: String as PropType<string>,
    uploadHeaders: {
        type: Object as PropType<Record<string, string>>,
        default: () => ({}),
    },
    uploadAdditionalData: {
        type: Object as PropType<Record<string, string | Blob | number | boolean>>,
        default: () => ({}),
    },
    uploadWithCredentials: {
        type: Boolean as PropType<boolean>,
        default: false,
    },
    totalProgress: {
        type: Number as PropType<number>,
        default: 0,
    },

    uploadingStatusText: {
        type: String as PropType<string>,
        default: 'Uploading',
    },
    successStatusText: {
        type: String as PropType<string>,
        default: 'Uploaded',
    },
    errorStatusText: {
        type: String as PropType<string>,
        default: 'Upload failed',
    },
    pendingStatusText: {
        type: String as PropType<string>,
        default: 'Pending',
    },

    retryIcon: {
        type: String as PropType<string>,
        default: 'mdi:refresh',
    },
    removeIcon: {
        type: String as PropType<string>,
        default: 'mdi:close',
    },
    retryButtonStyleType: {
        type: String as PropType<ButtonStyleType>,
        default: ButtonStyleType.NEUTRAL_FILLED,
    },
    removeButtonStyleType: {
        type: String as PropType<ButtonStyleType>,
        default: ButtonStyleType.DELETE_FILLED,
    },
    retryIconClass: [String, Array] as PropType<string | string[]>,
    removeIconClass: [String, Array] as PropType<string | string[]>,
    retryButtonClass: String as PropType<string>,
    removeButtonClass: String as PropType<string>,

    maxItemsContainerHeight: Number as PropType<number>,

    transparent: {
        type: Boolean as PropType<boolean>,
        default: false,
    },

    containerClass: String as PropType<string>,
    dropzoneClass: String as PropType<string>,
    titleClass: String as PropType<string>,
    descriptionClass: String as PropType<string>,
    iconClass: [String, Array] as PropType<string | string[]>,
    actionsClass: String as PropType<string>,
    listClass: String as PropType<string>,
    gridClass: String as PropType<string>,
    fileItemClass: String as PropType<string>,
    fileNameClass: String as PropType<string>,
    fileMetaClass: String as PropType<string>,
    retryAriaLabel: {
        type: String as PropType<string>,
        default: 'Retry upload',
    },
    removeAriaLabel: {
        type: String as PropType<string>,
        default: 'Remove file',
    },
})

const emit = defineEmits([
    'update:modelValue',
    'update:totalProgress',
    'error',
    'file-added',
    'file-removed',
    'clear-all',
])

const fileInputRef = ref<HTMLInputElement | null>(null)
const internalFiles = ref<File[]>([...props.modelValue])
const isDraggingOver = ref(false)
const dragCounter = ref(0)
const fileIdCounter = ref(0)

const fileIdMap = new WeakMap<File, string>()
const previewUrlMap = reactive<Record<string, string>>({})
const uploadMetaMap = reactive<Record<string, UploadMeta>>({})

const iconMap = computed<Record<string, string>>(() => ({
    ...DEFAULT_FILE_TYPE_ICON_MAP,
    ...props.fileTypeIconMap,
}))

const normalizedAcceptList = computed(() => {
    const value = Array.isArray(props.accept) ? props.accept : [props.accept]
    return value.map(item => item.trim().toLowerCase()).filter(Boolean)
})

const inputAccept = computed(() => {
    if (normalizedAcceptList.value.includes('*')) return undefined
    return normalizedAcceptList.value.join(',')
})

const acceptedTypeLabels = computed(() => {
    if (normalizedAcceptList.value.includes('*')) {
        return props.allFilesTypeText
    }

    return normalizedAcceptList.value
        .map(entry => {
            if (entry.startsWith('.')) {
                return entry.slice(1).toUpperCase()
            }

            const [type, subtype] = entry.split('/')
            if (!subtype) return entry.toUpperCase()
            if (subtype === '*') return (type ?? entry).toUpperCase()
            return subtype.replace(/^vnd\.[^.]+\./, '').toUpperCase()
        })
        .join(', ')
})

const resolvedTitle = computed(() => {
    if (props.multiple) return props.title
    return props.singleFileTitleText
})

const resolvedDescription = computed(() => {
    if (props.description) return props.description
    return `${acceptedTypeLabels.value} ${props.upToText} ${props.maxFileSize}MB`
})

const resolvedSelectButtonText = computed(() => {
    if (props.multiple) return props.buttonText
    return props.singleFileButtonText
})

const canShowClearAllButton = computed(() => {
    return (
        props.showClearAllButton &&
        !props.useServerUpload &&
        internalFiles.value.length > 0
    )
})

const hasListItemsContainerScroll = computed(() => {
    return Number.isFinite(props.maxItemsContainerHeight)
        && props.itemsLayout === DropzoneLayout.LIST
})

const normalizedRetryIconClass = computed(() => {
    if (Array.isArray(props.retryIconClass)) {
        return props.retryIconClass.join(' ')
    }

    return props.retryIconClass
})

const normalizedRemoveIconClass = computed(() => {
    if (Array.isArray(props.removeIconClass)) {
        return props.removeIconClass.join(' ')
    }

    return props.removeIconClass
})

const itemsContainerStyle = computed(() => {
    if (!hasListItemsContainerScroll.value) return undefined

    return {
        maxHeight: `${props.maxItemsContainerHeight}px`,
    }
})

const dropzoneStateClass = computed(() => {
    const borderVariants = {
        [DropzoneState.DEFAULT]: 'border-border-default',
        [DropzoneState.INDETERMINATE]: 'border-border-default',
        [DropzoneState.SUCCESS]: 'border-border-success',
        [DropzoneState.ERROR]: 'border-border-error',
    }

    const bgVariants = {
        [DropzoneState.DEFAULT]: 'bg-background-neutral-default',
        [DropzoneState.INDETERMINATE]: 'bg-background-neutral-subtlest',
        [DropzoneState.SUCCESS]: 'bg-background-success-subtlest',
        [DropzoneState.ERROR]: 'bg-background-delete-soft',
    }

    const borderClass = borderVariants[props.state] || borderVariants[DropzoneState.DEFAULT]
    const bgClass = props.transparent ? '' : (bgVariants[props.state] || bgVariants[DropzoneState.DEFAULT])

    return [borderClass, bgClass].filter(Boolean).join(' ')
})

const totalProgressComputed = computed(() => {
    if (internalFiles.value.length === 0) return 0

    const progressList = internalFiles.value.map(file => {
        const fileId = getFileId(file)
        return uploadMetaMap[fileId]?.progress ?? 0
    })

    const sum = progressList.reduce((acc, value) => acc + value, 0)
    return Math.round(sum / progressList.length)
})

const updateModelValue = (nextFiles: File[]) => {
    internalFiles.value = [...nextFiles]
    emit('update:modelValue', [...nextFiles])
}

const normalizeMimeKey = (mime: string) => {
    if (mime.startsWith('image/')) return 'image'
    if (mime.startsWith('video/')) return 'video'
    if (mime.startsWith('audio/')) return 'audio'
    if (mime === 'application/pdf') return 'pdf'
    if (mime.includes('word')) return 'word'
    if (mime.includes('spreadsheet')) return 'excel'
    if (mime.includes('presentation')) return 'powerpoint'
    if (mime.includes('zip') || mime.includes('rar') || mime.includes('7z')) return 'archive'
    if (mime.startsWith('text/')) return 'text'

    return 'default'
}

const normalizeExtensionKey = (extension: string) => {
    if (['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg', 'bmp'].includes(extension)) return 'image'
    if (['mp4', 'mov', 'avi', 'webm'].includes(extension)) return 'video'
    if (['mp3', 'wav', 'ogg', 'aac'].includes(extension)) return 'audio'
    if (extension === 'pdf') return 'pdf'
    if (['doc', 'docx'].includes(extension)) return 'word'
    if (['xls', 'xlsx', 'csv'].includes(extension)) return 'excel'
    if (['ppt', 'pptx'].includes(extension)) return 'powerpoint'
    if (['zip', 'rar', '7z'].includes(extension)) return 'archive'
    if (['kml', 'kmz', 'geojson', 'gpx', 'shp'].includes(extension)) return 'geo'
    if (['txt', 'md', 'rtf'].includes(extension)) return 'text'

    return 'default'
}

const getFileId = (file: File) => {
    const existing = fileIdMap.get(file)
    if (existing) return existing

    const nextId = `dropzone-file-${fileIdCounter.value}`
    fileIdCounter.value += 1
    fileIdMap.set(file, nextId)
    return nextId
}

const ensurePreviewUrl = (file: File) => {
    if (!file.type.startsWith('image/')) return

    const fileId = getFileId(file)
    if (!previewUrlMap[fileId]) {
        previewUrlMap[fileId] = URL.createObjectURL(file)
    }
}

const revokePreviewUrl = (file: File) => {
    const fileId = getFileId(file)
    const previewUrl = previewUrlMap[fileId]

    if (previewUrl) {
        URL.revokeObjectURL(previewUrl)
        Reflect.deleteProperty(previewUrlMap, fileId)
    }
}

const ensureUploadMeta = (file: File) => {
    const fileId = getFileId(file)

    if (!uploadMetaMap[fileId]) {
        uploadMetaMap[fileId] = {
            status: props.useServerUpload ? 'idle' : 'success',
            progress: props.useServerUpload ? 0 : 100,
        }
    }
}

const setUploadMeta = (file: File, meta: Partial<UploadMeta>) => {
    const fileId = getFileId(file)
    const currentMeta = uploadMetaMap[fileId] ?? { status: 'idle', progress: 0 }

    uploadMetaMap[fileId] = {
        ...currentMeta,
        ...meta,
    }
}

const clearUploadMeta = (file: File) => {
    const fileId = getFileId(file)
    Reflect.deleteProperty(uploadMetaMap, fileId)
}

const getUploadStatus = (file: File): UploadStatusType => {
    const fileId = getFileId(file)
    return uploadMetaMap[fileId]?.status ?? 'idle'
}

const getUploadProgress = (file: File) => {
    const fileId = getFileId(file)
    return uploadMetaMap[fileId]?.progress ?? 0
}

const getUploadStatusText = (file: File) => {
    const status = getUploadStatus(file)
    const progress = getUploadProgress(file)

    if (status === 'uploading') {
        return `${props.uploadingStatusText} ${progress}%`
    }

    if (status === 'success') return props.successStatusText
    if (status === 'error') return props.errorStatusText
    return props.pendingStatusText
}

const getUploadStatusClass = (file: File, isOnDarkOverlay: boolean) => {
    const status = getUploadStatus(file)

    if (status === 'uploading') {
        return isOnDarkOverlay ? 'text-white/90' : 'text-text-info'
    }

    if (status === 'success') {
        return isOnDarkOverlay ? 'text-white/90' : 'text-text-success'
    }

    if (status === 'error') {
        return isOnDarkOverlay ? 'text-white' : 'text-text-error'
    }

    return isOnDarkOverlay ? 'text-white/80' : 'text-text-neutral-subtle'
}

const canRetry = (file: File) => {
    return props.useServerUpload && getUploadStatus(file) === 'error' && !props.disabled
}

const getPreviewUrl = (file: File) => {
    const fileId = getFileId(file)
    return previewUrlMap[fileId]
}

const getFileIcon = (file: File) => {
    const extension = file.name.split('.').pop()?.toLowerCase() ?? ''
    const mimeKey = normalizeMimeKey(file.type)
    const extensionKey = normalizeExtensionKey(extension)

    if (extensionKey !== 'default') {
        return iconMap.value[extensionKey] || iconMap.value.default
    }

    return iconMap.value[mimeKey] || iconMap.value.default
}

const getFileLabel = (file: File) => {
    const extension = file.name.split('.').pop()?.toUpperCase() ?? 'FILE'
    return extension
}

const formatFileSize = (bytes: number) => {
    if (bytes <= 0) return '0 B'

    const units = ['B', 'KB', 'MB', 'GB']
    const index = Math.min(
        Math.floor(Math.log(bytes) / Math.log(1024)),
        units.length - 1
    )
    const value = bytes / (1024 ** index)

    return `${value.toFixed(value >= 10 || index === 0 ? 0 : 1)} ${units[index]}`
}

const isAcceptedFile = (file: File) => {
    if (normalizedAcceptList.value.includes('*')) return true

    const extension = `.${file.name.split('.').pop()?.toLowerCase() ?? ''}`

    return normalizedAcceptList.value.some(acceptEntry => {
        if (acceptEntry.startsWith('.')) {
            return acceptEntry === extension
        }

        if (acceptEntry.endsWith('/*')) {
            const wildcardBase = acceptEntry.slice(0, -1)
            return file.type.startsWith(wildcardBase)
        }

        return file.type === acceptEntry
    })
}

const validateFiles = (files: File[]) => {
    const validFiles: File[] = []

    for (const file of files) {
        if (!isAcceptedFile(file)) {
            emit('error', props.fileUploadErrorMessage)
            continue
        }

        const fileSizeInMb = file.size / (1024 * 1024)
        if (fileSizeInMb > props.maxFileSize) {
            emit('error', props.fileUploadErrorMessage)
            continue
        }

        validFiles.push(file)
    }

    return validFiles
}

const buildNextFiles = (incomingFiles: File[]) => {
    const validated = validateFiles(incomingFiles)

    let baseFiles: File[] = []

    if (props.multiple) {
        const shouldReplace = props.selectFileStrategy === FileSelectStrategy.REPLACE
        baseFiles = shouldReplace ? [] : [...internalFiles.value]
    }

    const nextFiles = props.multiple
        ? [...baseFiles, ...validated]
        : validated.slice(0, 1)

    if (nextFiles.length > props.maxFiles) {
        emit('error', props.fileUploadErrorMessage)
        return nextFiles.slice(0, props.maxFiles)
    }

    return nextFiles
}

const uploadFile = async (file: File) => {
    if (!props.useServerUpload) return

    if (!props.uploadUrl) {
        emit('error', 'uploadUrl is required when useServerUpload is enabled.')
        setUploadMeta(file, { status: 'error' })
        return
    }

    if (typeof XMLHttpRequest === 'undefined') {
        emit('error', 'File upload is not supported in this environment.')
        setUploadMeta(file, { status: 'error' })
        return
    }

    await new Promise<void>((resolve) => {
        setUploadMeta(file, {
            status: 'uploading',
            progress: 0,
        })

        const xhr = new XMLHttpRequest()
        xhr.open('POST', props.uploadUrl!, true)
        xhr.withCredentials = props.uploadWithCredentials

        for (const [header, value] of Object.entries(props.uploadHeaders)) {
            xhr.setRequestHeader(header, value)
        }

        xhr.upload.onprogress = (event: ProgressEvent) => {
            if (!event.lengthComputable) return
            const progress = Math.round((event.loaded / event.total) * 100)
            setUploadMeta(file, { progress })
        }

        xhr.onerror = () => {
            setUploadMeta(file, {
                status: 'error',
                progress: 0,
            })
            emit('error', props.fileUploadErrorMessage)
            resolve()
        }

        xhr.onload = () => {
            if (xhr.status < 200 || xhr.status >= 300) {
                setUploadMeta(file, {
                    status: 'error',
                    progress: 0,
                })
                emit('error', props.fileUploadErrorMessage)
                resolve()
                return
            }

            let serverId: string | undefined

            try {
                const parsed = JSON.parse(xhr.responseText)
                serverId = parsed?.id ?? parsed?.fileId ?? parsed?.data?.id
            } catch {
                serverId = undefined
            }

            setUploadMeta(file, {
                status: 'success',
                progress: 100,
                serverId,
            })

            resolve()
        }

        const formData = new FormData()
        formData.append('file', file)

        for (const [key, value] of Object.entries(props.uploadAdditionalData)) {
            if (value instanceof Blob) {
                formData.append(key, value)
                continue
            }

            formData.append(key, String(value))
        }

        xhr.send(formData)
    })
}

const deleteFileOnServer = async (file: File) => {
    if (!props.useServerUpload || !props.deleteUrl) return

    const fileId = getFileId(file)
    const meta = uploadMetaMap[fileId]

    const headers = {
        'Content-Type': 'application/json',
        ...props.uploadHeaders,
    }

    try {
        await fetch(props.deleteUrl, {
            method: 'DELETE',
            headers,
            body: JSON.stringify({
                id: meta?.serverId,
                name: file.name,
                size: file.size,
                type: file.type,
                lastModified: file.lastModified,
            }),
        })
    } catch {
        emit('error', props.fileUploadErrorMessage)
    }
}

const addFiles = async (incomingFiles: File[]) => {
    if (props.disabled || incomingFiles.length === 0) return

    const nextFiles = buildNextFiles(incomingFiles)
    const previousIds = new Set(internalFiles.value.map(file => getFileId(file)))

    for (const file of nextFiles) {
        ensureUploadMeta(file)
        ensurePreviewUrl(file)
    }

    updateModelValue(nextFiles)

    const addedFiles = nextFiles.filter(file => !previousIds.has(getFileId(file)))
    for (const file of addedFiles) {
        emit('file-added', file)

        if (props.useServerUpload) {
            await uploadFile(file)
        } else {
            setUploadMeta(file, {
                status: 'success',
                progress: 100,
            })
        }
    }
}

const openFileDialog = () => {
    if (props.disabled || !props.showSelectButton) return
    fileInputRef.value?.click()
}

const handleInputChange = async (event: Event) => {
    const target = event.target as HTMLInputElement
    const files = Array.from(target.files ?? [])

    await addFiles(files)

    target.value = ''
}

const handleDragEnter = () => {
    if (props.disabled) return
    dragCounter.value += 1
    isDraggingOver.value = true
}

const handleDragOver = () => {
    if (props.disabled) return
    isDraggingOver.value = true
}

const handleDragLeave = () => {
    if (props.disabled) return

    dragCounter.value = Math.max(0, dragCounter.value - 1)
    if (dragCounter.value === 0) {
        isDraggingOver.value = false
    }
}

const handleDrop = async (event: DragEvent) => {
    if (props.disabled) return

    dragCounter.value = 0
    isDraggingOver.value = false

    const files = Array.from(event.dataTransfer?.files ?? [])
    await addFiles(files)
}

const removeFile = async (fileToRemove: File) => {
    if (props.disabled) return

    const nextFiles = internalFiles.value.filter(
        file => getFileId(file) !== getFileId(fileToRemove)
    )

    updateModelValue(nextFiles)
    emit('file-removed', fileToRemove)

    await deleteFileOnServer(fileToRemove)

    revokePreviewUrl(fileToRemove)
    clearUploadMeta(fileToRemove)
}

const retryUpload = async (file: File) => {
    if (!canRetry(file)) return
    await uploadFile(file)
}

const clearAll = () => {
    if (props.disabled || props.useServerUpload || internalFiles.value.length === 0) return

    for (const file of internalFiles.value) {
        revokePreviewUrl(file)
        clearUploadMeta(file)
    }

    updateModelValue([])
    emit('clear-all', [])
}

watch(
    () => props.modelValue,
    (nextFiles) => {
        internalFiles.value = [...nextFiles]

        for (const file of nextFiles) {
            ensureUploadMeta(file)
            ensurePreviewUrl(file)
        }
    },
    { deep: true }
)

watch(
    () => totalProgressComputed.value,
    (value) => {
        emit('update:totalProgress', value)
    },
    { immediate: true }
)

onUnmounted(() => {
    for (const previewUrl of Object.values(previewUrlMap)) {
        URL.revokeObjectURL(previewUrl)
    }
})
</script>
