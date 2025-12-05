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
})
