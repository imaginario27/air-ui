import { flushPromises } from '@vue/test-utils'
import { mockNuxtImport, mountSuspended } from '@nuxt/test-utils/runtime'
import ComponentCode from '@/components/content/ComponentCode.vue'

mockNuxtImport('useDocsShikiHighlighter', () => {
    return async () => ({
        codeToHtml: (code: string) => code
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;'),
    })
})

const toBlob = vi.hoisted(() => vi.fn())

vi.mock('html-to-image', () => ({ toBlob }))

const flush = async () => {
    await flushPromises()
    await flushPromises()
}

const showCode = async (wrapper: Awaited<ReturnType<typeof mountSuspended>>) => {
    await wrapper.find('input#show-code').trigger('change')
    await flush()

    await vi.waitFor(async () => {
        await flushPromises()
        expect(wrapper.find('.component-code-pre').text().length).toBeGreaterThan(0)
    })
}

describe('ComponentCode.vue', () => {
    it('renders the generated code for the initial props', async () => {
        const wrapper = await mountSuspended(ComponentCode, {
            props: {
                srcDir: 'kbds/Kbd.vue',
                props: { text: 'Enter' },
            },
        })
        await flush()

        await showCode(wrapper)

        expect(wrapper.text()).toContain('Enter')
    })

    it('regenerates the displayed code when a playground prop changes', async () => {
        const wrapper = await mountSuspended(ComponentCode, {
            props: {
                srcDir: 'kbds/Kbd.vue',
                props: { text: 'Enter' },
            },
        })
        await flush()

        // Reveal the code panel
        await showCode(wrapper)

        expect(wrapper.text()).toContain('Enter')

        // Reveal the playground and edit the "text" prop
        await wrapper.find('input#show-playground').trigger('change')
        await flush()

        await wrapper.find('input#playground-text').setValue('Space')
        await flush()

        expect(wrapper.text()).toContain('Space')
        expect(wrapper.text()).not.toContain('Enter')
    })

    it('shows a fallback message when the component cannot be resolved', async () => {
        const wrapper = await mountSuspended(ComponentCode, {
            props: {
                srcDir: 'does-not/Exist.vue',
            },
        })
        await flush()

        expect(wrapper.text()).toContain('Component not found: does-not/Exist.vue')
    })

    it('hides the "View code" switch when the code preview is disabled', async () => {
        const wrapper = await mountSuspended(ComponentCode, {
            props: {
                srcDir: 'kbds/Kbd.vue',
                props: { text: 'Enter' },
                isCodePreviewEnabled: false,
            },
        })
        await flush()

        expect(wrapper.find('input#show-code').exists()).toBe(false)
    })

    it('hides the "Show playground" switch when there are no playground props', async () => {
        const wrapper = await mountSuspended(ComponentCode, {
            props: {
                srcDir: 'kbds/Kbd.vue',
            },
        })
        await flush()

        expect(wrapper.find('input#show-playground').exists()).toBe(false)
    })

    it('binds enum props to their enum key instead of the raw string value', async () => {
        const wrapper = await mountSuspended(ComponentCode, {
            props: {
                srcDir: 'alerts/Alert.vue',
                props: { type: 'info' },
                enums: { type: 'AlertType' },
            },
        })
        await flush()

        await showCode(wrapper)

        expect(wrapper.text()).toContain('AlertType.INFO')
        expect(wrapper.text()).not.toContain('type="info"')
    })

    it('includes the provided emits handler in the generated code', async () => {
        const wrapper = await mountSuspended(ComponentCode, {
            props: {
                srcDir: 'alerts/Alert.vue',
                props: { type: 'info' },
                emits: { close: "() => console.log('Close alert')" },
            },
        })
        await flush()

        await showCode(wrapper)

        expect(wrapper.text()).toContain('@close')
        expect(wrapper.text()).toContain("console.log('Close alert')")
    })

    it('externalizes a prop into a <script setup> ref binding', async () => {
        const wrapper = await mountSuspended(ComponentCode, {
            props: {
                srcDir: 'kbds/Kbd.vue',
                props: { text: 'Enter' },
                external: ['text'],
                externalTypes: ['string'],
            },
        })
        await flush()

        await showCode(wrapper)

        expect(wrapper.text()).toContain('const text = ref')
        expect(wrapper.text()).toContain(':text="text"')
    })

    it('resolves components from the docs source when componentSource is "docs"', async () => {
        const designSystemWrapper = await mountSuspended(ComponentCode, {
            props: {
                srcDir: 'content/ProseCode.vue',
                componentSource: 'design-system',
            },
        })
        await flush()

        expect(designSystemWrapper.text()).toContain('Component not found: content/ProseCode.vue')

        const docsWrapper = await mountSuspended(ComponentCode, {
            props: {
                srcDir: 'content/ProseCode.vue',
                componentSource: 'docs',
            },
        })
        await flush()

        expect(docsWrapper.text()).not.toContain('Component not found')
    })

    it('renders the original component source when renderOriginalCode is enabled', async () => {
        const fullWrapper = await mountSuspended(ComponentCode, {
            props: {
                srcDir: 'kbds/Kbd.vue',
                props: { text: 'Enter' },
                renderOriginalCode: 'full',
            },
        })
        await flush()
        await showCode(fullWrapper)

        expect(fullWrapper.text()).toContain('defineProps')
        expect(fullWrapper.text()).toContain('<kbd')

        const templateWrapper = await mountSuspended(ComponentCode, {
            props: {
                srcDir: 'kbds/Kbd.vue',
                props: { text: 'Enter' },
                renderOriginalCode: 'template',
            },
        })
        await flush()
        await showCode(templateWrapper)

        expect(templateWrapper.text()).toContain('<kbd')
        expect(templateWrapper.text()).not.toContain('defineProps')
    })

    describe('image export', () => {
        const downloadButton = 'button[aria-label="Download component as PNG"]'
        const copyButton = 'button[aria-label="Copy component as image"]'

        const mountPreview = async (extraProps: Record<string, unknown> = {}) => {
            const wrapper = await mountSuspended(ComponentCode, {
                props: {
                    srcDir: 'kbds/Kbd.vue',
                    props: { text: 'Enter' },
                    ...extraProps,
                },
            })
            await flush()

            return wrapper
        }

        beforeEach(() => {
            toBlob.mockReset()
            toBlob.mockResolvedValue(new Blob(['png'], { type: 'image/png' }))
            URL.createObjectURL = vi.fn(() => 'blob:preview')
            URL.revokeObjectURL = vi.fn()
        })

        it('shows the download and copy buttons in the preview by default', async () => {
            const wrapper = await mountPreview()

            expect(wrapper.find(downloadButton).exists()).toBe(true)
            expect(wrapper.find(copyButton).exists()).toBe(true)
        })

        it('hides both buttons when enableExport is false', async () => {
            const wrapper = await mountPreview({ enableExport: false })

            expect(wrapper.find(downloadButton).exists()).toBe(false)
            expect(wrapper.find(copyButton).exists()).toBe(false)
        })

        it('hides both buttons while the code view is shown', async () => {
            const wrapper = await mountPreview()

            await showCode(wrapper)

            expect(wrapper.find(downloadButton).exists()).toBe(false)
            expect(wrapper.find(copyButton).exists()).toBe(false)
        })

        it('downloads the rendered component as a PNG named after it', async () => {
            const click = vi.spyOn(HTMLAnchorElement.prototype, 'click').mockImplementation(() => {})
            const wrapper = await mountPreview()

            await wrapper.find(downloadButton).trigger('click')
            await vi.waitFor(() => expect(click).toHaveBeenCalled())

            expect(toBlob).toHaveBeenCalledTimes(1)
            expect(toBlob.mock.calls[0]![1]).toMatchObject({ pixelRatio: 2 })
            expect(click.mock.contexts[0]).toMatchObject({ download: 'kbd.png' })

            click.mockRestore()
        })

        it('copies the rendered component to the clipboard as an image', async () => {
            const write = vi.fn().mockResolvedValue(undefined)
            vi.stubGlobal('ClipboardItem', class { constructor(public items: Record<string, Blob>) {} })
            Object.defineProperty(navigator, 'clipboard', { value: { write }, configurable: true })
            const wrapper = await mountPreview()

            await wrapper.find(copyButton).trigger('click')
            await vi.waitFor(() => expect(write).toHaveBeenCalledTimes(1))

            const [items] = write.mock.calls[0]![0]
            expect(Object.keys(items.items)).toEqual(['image/png'])

            vi.unstubAllGlobals()
        })
    })
})
