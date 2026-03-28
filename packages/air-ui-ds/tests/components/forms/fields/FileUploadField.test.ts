import { mount } from '@vue/test-utils'
import FileUploadField from '~/components/forms/fields/FileUploadField.vue'
import { ref } from 'vue'

// Mock composable for validation mode
vi.mock('~/composables/useFormValidationMode', () => ({
    useInjectedValidationMode: () => ref('blur')
}))

// Stub the Vue3Dropzone dependency
vi.mock('@jaxtheprime/vue3-dropzone', () => ({
    default: {
        name: 'Vue3Dropzone',
        template: `
            <div data-test="dropzone">
                <slot name="title" />
                <slot name="description" />
                <slot name="button" :fileInput="{}" />
            </div>
        `,
        props: ['modelValue', 'disabled'],
        emits: ['update:modelValue', 'error']
    }
}))

// Factory function for test setup
const factory = (props: Record<string, any> = {}) => {
    return mount(FileUploadField, {
        props: {
            id: 'file-upload',
            ...props
        }
    })
}

describe('FileUploadField.vue', () => {
    it('renders label when provided', () => {
        const wrapper = factory({ label: 'Upload your file' })
        const label = wrapper.find('label')
        expect(label.exists()).toBe(true)
        expect(label.text()).toBe('Upload your file')
    })

    it('renders helpText when provided and no error', () => {
        const wrapper = factory({
            helpText: 'PDF or doc only',
            error: ''
        })

        const help = wrapper
            .findAll('p.text-xs')
            .find(p => p.classes().includes('text-left'))

        expect(help).toBeDefined()
        expect(help!.text()).toBe('PDF or doc only')
    })

    it('renders error message when error prop is set', () => {
        const wrapper = factory({
            error: 'File type not supported'
        })
        const error = wrapper.find('p.text-xs.text-text-error')
        expect(error.exists()).toBe(true)
        expect(error.text()).toBe('File type not supported')
    })

    it('renders preview image when showPreview & previewImageUrl & no selectedFiles', () => {
        const wrapper = factory({
            showPreview: true,
            previewImageUrl: 'http://example.com/preview.jpg',
            modelValue: [],
            label: 'Upload Document'
        })
        const img = wrapper.find('img')
        expect(img.exists()).toBe(true)
        expect(img.attributes('src')).toBe('http://example.com/preview.jpg')
        expect(img.attributes('alt')).toBe('Upload Document')
    })

    it('renders dropzone stub when no preview or when selected files exist', () => {
        const wrapper = factory({
            showPreview: false,
            modelValue: []
        })
        const dropzone = wrapper.findComponent({ name: 'Vue3Dropzone' })
        expect(dropzone.exists()).toBe(true)
    })

    it('emits update:modelValue when dropzone emits new files', async () => {
        const wrapper = factory()
        const dropzone = wrapper.findComponent({ name: 'Vue3Dropzone' })

        const file = new File(['hello'], 'test.pdf', { type: 'application/pdf' })
        await dropzone.vm.$emit('update:modelValue', [file])

        const emits = wrapper.emitted('update:modelValue')
        expect(emits).toBeTruthy()
        expect(emits![0][0][0]).toBeInstanceOf(File)
    })

    it('validates when required and emits update:error on invalid', async () => {
        const validator = vi.fn(() => 'Invalid file')
        const wrapper = factory({
            validator,
            required: true,
            modelValue: []
        })

        await wrapper.setProps({ modelValue: [new File(['x'], 'file.pdf', { type: 'application/pdf' })] })

        expect(validator).toHaveBeenCalled()
        const emits = wrapper.emitted('update:error')
        expect(emits).toBeTruthy()
        expect(emits![0][0]).toBe('Invalid file')
    })

    it('displays accepted file types description', () => {
        const wrapper = factory({
            accept: ['application/pdf', 'application/msword']
        })

        const desc = wrapper.find('p.text-xs.text-text-neutral-subtle')
        expect(desc.exists()).toBe(true)
        expect(desc.text()).toContain('PDF')
        expect(desc.text()).toContain('MSWORD')
    })

    it('emits update:modelValue even when disabled', async () => {
        const wrapper = factory({ disabled: true })
        const dropzone = wrapper.findComponent({ name: 'Vue3Dropzone' })
        const file = new File(['x'], 'a.pdf', { type: 'application/pdf' })

        await dropzone.vm.$emit('update:modelValue', [file])

        const emits = wrapper.emitted('update:modelValue')
        expect(emits).toBeTruthy()
        expect(emits![0][0][0]).toBeInstanceOf(File)
    })

    describe('accept — MIME type validation', () => {
        it('accepts a file with a matching exact MIME type', async () => {
            const wrapper = factory({ accept: ['application/pdf'], modelValue: [] })

            await wrapper.setProps({
                modelValue: [new File(['data'], 'file.pdf', { type: 'application/pdf' })]
            })

            const clearEmit = wrapper.emitted('update:modelValue')?.find(call => (call[0] as File[]).length === 0)
            expect(clearEmit).toBeUndefined()
        })

        it('rejects a file with a non-matching exact MIME type', async () => {
            const wrapper = factory({ accept: ['application/pdf'], modelValue: [] })

            await wrapper.setProps({
                modelValue: [new File(['data'], 'file.docx', { type: 'application/msword' })]
            })

            const clearEmit = wrapper.emitted('update:modelValue')?.find(call => (call[0] as File[]).length === 0)
            expect(clearEmit).toBeDefined()
        })

        it('accepts a file matching a wildcard MIME type (image/*)', async () => {
            const wrapper = factory({ accept: ['image/*'], modelValue: [] })

            await wrapper.setProps({
                modelValue: [new File(['data'], 'photo.jpg', { type: 'image/jpeg' })]
            })

            const clearEmit = wrapper.emitted('update:modelValue')?.find(call => (call[0] as File[]).length === 0)
            expect(clearEmit).toBeUndefined()
        })

        it('rejects a file that does not match a wildcard MIME type (image/*)', async () => {
            const wrapper = factory({ accept: ['image/*'], modelValue: [] })

            await wrapper.setProps({
                modelValue: [new File(['data'], 'doc.pdf', { type: 'application/pdf' })]
            })

            const clearEmit = wrapper.emitted('update:modelValue')?.find(call => (call[0] as File[]).length === 0)
            expect(clearEmit).toBeDefined()
        })
    })

    describe('accept — file extension validation', () => {
        it('accepts a file matching by extension (.kml with empty MIME type)', async () => {
            const wrapper = factory({ accept: ['.kml'], modelValue: [] })

            await wrapper.setProps({
                modelValue: [new File(['<?xml'], 'map.kml', { type: '' })]
            })

            const clearEmit = wrapper.emitted('update:modelValue')?.find(call => (call[0] as File[]).length === 0)
            expect(clearEmit).toBeUndefined()
        })

        it('rejects a file with wrong extension when accept is extension-based', async () => {
            const wrapper = factory({ accept: ['.kml'], modelValue: [] })

            await wrapper.setProps({
                modelValue: [new File(['data'], 'track.gpx', { type: '' })]
            })

            const clearEmit = wrapper.emitted('update:modelValue')?.find(call => (call[0] as File[]).length === 0)
            expect(clearEmit).toBeDefined()
        })

        it('accepts a GeoJSON file by extension with empty MIME type', async () => {
            const wrapper = factory({ accept: ['.geojson'], modelValue: [] })

            await wrapper.setProps({
                modelValue: [new File(['{}'], 'data.geojson', { type: '' })]
            })

            const clearEmit = wrapper.emitted('update:modelValue')?.find(call => (call[0] as File[]).length === 0)
            expect(clearEmit).toBeUndefined()
        })

        it('accepts a file matching one of the mixed accept entries', async () => {
            const wrapper = factory({ accept: ['.kml', 'application/pdf'], modelValue: [] })

            await wrapper.setProps({
                modelValue: [new File(['data'], 'file.pdf', { type: 'application/pdf' })]
            })

            const clearEmit = wrapper.emitted('update:modelValue')?.find(call => (call[0] as File[]).length === 0)
            expect(clearEmit).toBeUndefined()
        })

        it('rejects a file that does not match any accept entry in a mixed list', async () => {
            const wrapper = factory({ accept: ['.kml', 'application/pdf'], modelValue: [] })

            await wrapper.setProps({
                modelValue: [new File(['data'], 'video.mp4', { type: 'video/mp4' })]
            })

            const clearEmit = wrapper.emitted('update:modelValue')?.find(call => (call[0] as File[]).length === 0)
            expect(clearEmit).toBeDefined()
        })
    })

    describe('acceptedFileTypes — description label formatting', () => {
        it('formats file extensions without dot in uppercase', () => {
            const wrapper = factory({ accept: ['.kml', '.geojson', '.gpx'] })
            const desc = wrapper.find('p.text-xs.text-text-neutral-subtle')
            expect(desc.text()).toContain('KML')
            expect(desc.text()).toContain('GEOJSON')
            expect(desc.text()).toContain('GPX')
        })

        it('extracts the MIME subtype for standard MIME types', () => {
            const wrapper = factory({ accept: ['application/pdf', 'image/png'] })
            const desc = wrapper.find('p.text-xs.text-text-neutral-subtle')
            expect(desc.text()).toContain('PDF')
            expect(desc.text()).toContain('PNG')
        })

        it('strips the vendor prefix from a vendor MIME type', () => {
            const wrapper = factory({ accept: ['application/vnd.google-earth.kml+xml'] })
            const desc = wrapper.find('p.text-xs.text-text-neutral-subtle')
            expect(desc.text()).toContain('KML+XML')
        })

        it('displays the type prefix (not *) for wildcard MIME types', () => {
            const wrapper = factory({ accept: ['application/pdf', 'image/*', 'video/*'] })
            const desc = wrapper.find('p.text-xs.text-text-neutral-subtle')
            expect(desc.text()).toContain('PDF')
            expect(desc.text()).toContain('IMAGE')
            expect(desc.text()).toContain('VIDEO')
            expect(desc.text()).not.toContain('*')
        })

        it('displays the default allFilesTypeText when accept is *', () => {
            const wrapper = factory({ accept: '*' })
            const desc = wrapper.find('p.text-xs.text-text-neutral-subtle')
            expect(desc.text()).toContain('All file types')
        })

        it('displays a custom allFilesTypeText when accept is * and allFilesTypeText is set', () => {
            const wrapper = factory({ accept: '*', allFilesTypeText: 'Any file format' })
            const desc = wrapper.find('p.text-xs.text-text-neutral-subtle')
            expect(desc.text()).toContain('Any file format')
        })

        it('displays the default allFilesTypeText when accept list contains *', () => {
            const wrapper = factory({ accept: ['*'] })
            const desc = wrapper.find('p.text-xs.text-text-neutral-subtle')
            expect(desc.text()).toContain('All file types')
        })
    })
})
