import type { UploadApiResponse, UploadApiErrorResponse } from 'cloudinary'
import { getCloudinary } from './cloudinary'

export const uploadFeedbackImage = async (
    file: {
        data: Buffer
        filename?: string
        type?: string
    },
) => {
    const cloudinary = getCloudinary()

    const originalName = file.filename || 'screenshot'

    const normalizedName = originalName
        .replace(/\.[^/.]+$/, '')
        .replace(/\s+/g, '-')
        .replace(/[^a-zA-Z0-9_-]/g, '')
        .toLowerCase()

    return await new Promise<UploadApiResponse>((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
            {
                folder: 'air_ui/feedback_screenshots',
                resource_type: 'image',

                public_id: `${Date.now()}-${normalizedName}`,

                use_filename: true,
                unique_filename: false,
                overwrite: true,

                tags: ['feedback', 'docs'],
            },
            (error?: UploadApiErrorResponse, result?: UploadApiResponse) => {
                if (error) {
                    reject(error)
                    return
                }

                if (!result) {
                    reject(new Error('Image upload failed'))
                    return
                }

                resolve(result)
            },
        )

        stream.end(file.data)
    })
}