import { mount } from '@vue/test-utils'
import { defineComponent, h, ref } from 'vue'
import FileUploadField from '~/components/forms/fields/FileUploadField.vue'
import { Position } from '@/models/enums/positions'

vi.mock('~/composables/useFormValidationMode', () => ({
    useInjectedValidationMode: () => ref('blur')
}))

const DropzoneStub = defineComponent({
    name: 'Dropzone',
    props: {
        modelValue: {
            type: Array,
            default: () => [],
        },
        totalProgress: {
            type: Number,
            default: 0,
        },
        transparent: {
            type: Boolean,
            default: false,
        },
    },
    emits: [
        'update:modelValue',
        'update:totalProgress',
        'error',
        'file-added',
        'file-removed',
        'clear-all',
    ],
    setup(_, { slots, attrs }) {
        return () => h('div', { 'data-test': 'dropzone', ...attrs }, slots.default?.())
    },
})

const factory = (props: Record<string, unknown> = {}) => {
    return mount(FileUploadField, {
        props: {
            id: 'file-upload',
            ...props,
        },
        global: {
            stubs: {
                Dropzone: DropzoneStub,
            },
        },
    })
}

describe('FileUploadField.vue', () => {
    it('renders label when provided', () => {
        const wrapper = factory({ label: 'Upload your file' })
        const label = wrapper.find('label')

        expect(label.exists()).toBe(true)
        expect(label.text()).toBe('Upload your file')
    })

    it('renders helpText when there is no error', () => {
        const wrapper = factory({
            helpText: 'PDF or DOC only',
            error: '',
        })

        expect(wrapper.text()).toContain('PDF or DOC only')
    })

    it('renders help text at top position when helpTextPosition is top', () => {
        const wrapper = factory({ label: 'Upload', helpText: 'PDF only', helpTextPosition: Position.TOP })
        const help = wrapper.find('p.text-xs')
        expect(help.exists()).toBe(true)
        expect(help.text()).toBe('PDF only')
        // help text appears before the dropzone container
        const children = Array.from(wrapper.element.children)
        const helpIdx = children.findIndex(el => el.classList.contains('text-xs'))
        const dropzoneContainerIdx = children.findIndex(el => el.classList.contains('flex') && el.classList.contains('w-full'))
        expect(helpIdx).toBeGreaterThan(-1)
        expect(helpIdx).toBeLessThan(dropzoneContainerIdx)
    })

    it('renders error message when error prop is set', () => {
        const wrapper = factory({ error: 'Invalid file' })

        expect(wrapper.text()).toContain('Invalid file')
    })

    it('renders preview image when showPreview and previewImageUrl are set', () => {
        const wrapper = factory({
            showPreview: true,
            previewImageUrl: 'https://example.com/preview.jpg',
            modelValue: [],
            label: 'Upload image',
        })

        const image = wrapper.find('img')
        expect(image.exists()).toBe(true)
        expect(image.attributes('src')).toBe('https://example.com/preview.jpg')
    })

    it('emits update:modelValue when Dropzone emits update:modelValue', async () => {
        const wrapper = factory()
        const dropzone = wrapper.findComponent({ name: 'Dropzone' })

        const file = new File(['x'], 'sample.pdf', { type: 'application/pdf' })
        await dropzone.vm.$emit('update:modelValue', [file])

        const emits = wrapper.emitted('update:modelValue')
        expect(emits).toBeTruthy()
        expect((emits?.[0]?.[0] as File[])[0]).toBeInstanceOf(File)
    })

    it('emits update:totalProgress when Dropzone updates total progress', async () => {
        const wrapper = factory()
        const dropzone = wrapper.findComponent({ name: 'Dropzone' })

        await dropzone.vm.$emit('update:totalProgress', 42)

        const emits = wrapper.emitted('update:totalProgress')
        expect(emits).toBeTruthy()
        expect(emits?.[0]?.[0]).toBe(42)
    })

    it('re-emits Dropzone events', async () => {
        const wrapper = factory()
        const dropzone = wrapper.findComponent({ name: 'Dropzone' })
        const file = new File(['x'], 'sample.pdf', { type: 'application/pdf' })

        await dropzone.vm.$emit('file-added', file)
        await dropzone.vm.$emit('file-removed', file)
        await dropzone.vm.$emit('clear-all', [])

        expect(wrapper.emitted('file-added')).toBeTruthy()
        expect(wrapper.emitted('file-removed')).toBeTruthy()
        expect(wrapper.emitted('clear-all')).toBeTruthy()
    })

    it('runs validation and emits update:error when required', async () => {
        const validator = vi.fn(() => 'Field is required')
        const wrapper = factory({
            required: true,
            validator,
            modelValue: [],
        })

        const dropzone = wrapper.findComponent({ name: 'Dropzone' })
        const file = new File(['x'], 'sample.pdf', { type: 'application/pdf' })

        await dropzone.vm.$emit('update:modelValue', [file])

        expect(validator).toHaveBeenCalled()
        expect(wrapper.emitted('update:error')).toBeTruthy()
    })

    it('forwards aria-label to Dropzone when visual label is hidden', () => {
        const wrapper = factory({
            label: '',
            ariaLabel: 'Upload contract files',
        })

        const dropzone = wrapper.find('[data-test="dropzone"]')
        expect(dropzone.attributes('aria-label')).toBe('Upload contract files')
    })

    it('uses ariaLabel as preview image alt when label is hidden', () => {
        const wrapper = factory({
            label: '',
            ariaLabel: 'Company logo uploader',
            showPreview: true,
            previewImageUrl: 'https://example.com/logo.jpg',
            modelValue: [],
        })

        const image = wrapper.find('img')
        expect(image.exists()).toBe(true)
        expect(image.attributes('alt')).toBe('Company logo uploader')
    })

    it('forwards retryAriaLabel to Dropzone', () => {
        const wrapper = factory({ retryAriaLabel: 'Reintentar' })
        const dropzone = wrapper.find('[data-test="dropzone"]')
        expect(dropzone.attributes('retryarialabel')).toBe('Reintentar')
    })

    it('forwards removeAriaLabel to Dropzone', () => {
        const wrapper = factory({ removeAriaLabel: 'Eliminar' })
        const dropzone = wrapper.find('[data-test="dropzone"]')
        expect(dropzone.attributes('removearialabel')).toBe('Eliminar')
    })

    it('forwards transparent prop to Dropzone', () => {
        const wrapper = factory({ transparent: true })
        const dropzone = wrapper.findComponent({ name: 'Dropzone' })
        expect(dropzone.props('transparent')).toBe(true)
    })

    it('passes transparent false by default to Dropzone', () => {
        const wrapper = factory()
        const dropzone = wrapper.findComponent({ name: 'Dropzone' })
        expect(dropzone.props('transparent')).toBe(false)
    })
})
