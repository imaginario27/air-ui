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

const flush = async () => {
    await flushPromises()
    await flushPromises()
}

const showCode = async (wrapper: Awaited<ReturnType<typeof mountSuspended>>) => {
    await wrapper.find('input#show-code').trigger('change')
    await flush()
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

        await wrapper.find('input#text').setValue('Space')
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
})
