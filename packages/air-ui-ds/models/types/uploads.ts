export type UploadStatusType = 'idle' | 'uploading' | 'success' | 'error'

export type UploadMeta = {
    status: UploadStatusType
    progress: number
    serverId?: string
}