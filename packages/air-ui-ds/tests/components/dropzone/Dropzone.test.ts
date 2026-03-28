import { mount } from '@vue/test-utils'
import { defineComponent, h } from 'vue'
import Dropzone from '~/components/dropzone/Dropzone.vue'
import { FileSelectStrategy } from '~/models/enums/formFields'

const ActionButtonStub = defineComponent({
    name: 'ActionButton',
    props: {
        text: {
            type: String,
            default: '',
        },
    },
    emits: ['click'],
    setup(props, { emit }) {
        return () => h('button', {
            'data-test': `action-button-${props.text}`,
            onClick: (event: MouseEvent) => emit('click', event),
        }, props.text)
    },
})

const ActionIconButtonStub = defineComponent({
    name: 'ActionIconButton',
    emits: ['click'],
    setup(_, { emit }) {
        return () => h('button', {
            'data-test': 'action-icon-button',
            onClick: (event: MouseEvent) => emit('click', event),
        })
    },
})

const createFile = (name: string, type: string, sizeInBytes = 1024) => {
    const content = new Uint8Array(sizeInBytes)
    return new File([content], name, { type })
}

const setInputFiles = async (wrapper: ReturnType<typeof factory>, files: File[]) => {
    const input = wrapper.find('input[type="file"]')

    Object.defineProperty(input.element, 'files', {
        value: files,
        configurable: true,
    })

    await input.trigger('change')
}

const factory = (props: Record<string, unknown> = {}) => {
    return mount(Dropzone, {
        props: {
            modelValue: [],
            ...props,
        },
        global: {
            stubs: {
                Icon: true,
                ActionButton: ActionButtonStub,
                ActionIconButton: ActionIconButtonStub,
            },
        },
    })
}

describe('Dropzone.vue', () => {
    beforeAll(() => {
        vi.stubGlobal('URL', {
            createObjectURL: vi.fn(() => 'blob:preview'),
            revokeObjectURL: vi.fn(),
        })
    })

    it('renders default title and description', () => {
        const wrapper = factory()

        expect(wrapper.text()).toContain('Drag and drop a file here')
        expect(wrapper.text()).toContain('All file types up to 5MB')
    })

    it('emits update:modelValue when selecting valid files', async () => {
        const wrapper = factory({
            accept: ['application/pdf'],
        })

        const file = createFile('document.pdf', 'application/pdf')
        await setInputFiles(wrapper, [file])

        const emits = wrapper.emitted('update:modelValue')
        expect(emits).toBeTruthy()
        expect((emits?.[0]?.[0] as File[])[0]).toBeInstanceOf(File)
    })

    it('emits error for invalid file type', async () => {
        const wrapper = factory({
            accept: ['application/pdf'],
            fileUploadErrorMessage: 'Invalid file',
        })

        const file = createFile('image.png', 'image/png')
        await setInputFiles(wrapper, [file])

        const emits = wrapper.emitted('error')
        expect(emits).toBeTruthy()
        expect(emits?.[0]?.[0]).toBe('Invalid file')
    })

    it('respects replace strategy for dialog selection', async () => {
        const first = createFile('first.pdf', 'application/pdf')
        const second = createFile('second.pdf', 'application/pdf')

        const wrapper = factory({
            multiple: true,
            selectFileStrategy: FileSelectStrategy.REPLACE,
            modelValue: [first],
            accept: ['application/pdf'],
            maxFiles: 2,
        })

        await setInputFiles(wrapper, [second])

        const emits = wrapper.emitted('update:modelValue')
        const latestEvent = emits?.at(-1)
        const latest = latestEvent?.at(0) as File[]

        expect(latest).toHaveLength(1)
        expect(latest[0]?.name).toBe('second.pdf')
    })

    it('merges files when strategy is merge', async () => {
        const first = createFile('first.pdf', 'application/pdf')
        const second = createFile('second.pdf', 'application/pdf')

        const wrapper = factory({
            multiple: true,
            selectFileStrategy: FileSelectStrategy.MERGE,
            modelValue: [first],
            accept: ['application/pdf'],
            maxFiles: 5,
        })

        await setInputFiles(wrapper, [second])

        const emits = wrapper.emitted('update:modelValue')
        const latestEvent = emits?.at(-1)
        const latest = latestEvent?.at(0) as File[]

        expect(latest).toHaveLength(2)
        expect(latest[0]?.name).toBe('first.pdf')
        expect(latest[1]?.name).toBe('second.pdf')
    })

    it('emits file-removed when removing a selected file', async () => {
        const file = createFile('remove.pdf', 'application/pdf')
        const wrapper = factory({ modelValue: [file] })

        const removeButton = wrapper.findComponent({ name: 'ActionIconButton' })
        expect(removeButton.exists()).toBe(true)
        await removeButton.trigger('click')

        const emits = wrapper.emitted('file-removed')
        expect(emits).toBeTruthy()
        expect((emits?.[0]?.[0] as File).name).toBe('remove.pdf')
    })

    it('shows clear all button only when allowed and files exist', async () => {
        const file = createFile('clear.pdf', 'application/pdf')
        const wrapper = factory({
            modelValue: [file],
            showClearAllButton: true,
            useServerUpload: false,
        })

        expect(wrapper.find('[data-test="action-button-Clear all"]').exists()).toBe(true)

        await wrapper.setProps({ useServerUpload: true })
        expect(wrapper.find('[data-test="action-button-Clear all"]').exists()).toBe(false)
    })
})
