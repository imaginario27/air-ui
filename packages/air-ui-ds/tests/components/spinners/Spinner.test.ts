import { mount, flushPromises } from '@vue/test-utils'
import Spinner from '@/components/spinners/Spinner.vue'
import { useDSConfig } from '@/composables/useDSConfig'

const loadIconMock = vi.hoisted(() => vi.fn())

vi.mock('@iconify/vue', async (importOriginal) => ({
    ...(await importOriginal<Record<string, unknown>>()),
    loadIcon: loadIconMock,
}))

describe('Spinner', () => {
    beforeEach(() => {
        loadIconMock.mockReset()
        loadIconMock.mockResolvedValue({})
    })

    it('renders with correct classes', () => {
        const wrapper = mount(Spinner)
        const spinner = wrapper.find('output')

        expect(spinner.exists()).toBe(true)
        expect(spinner.classes()).toContain('animate-spin')
        expect(spinner.classes()).toContain('rounded-full')
        expect(spinner.classes()).toContain('h-4')
        expect(spinner.classes()).toContain('w-4')
        expect(spinner.classes()).toContain('border-2')
        expect(spinner.classes()).toContain('border-border-primary-brand-default')
        expect(spinner.classes()).toContain('border-t-transparent')
    })

    it('renders as an <output> element with aria-label for screen readers', () => {
        const wrapper = mount(Spinner)
        const spinner = wrapper.find('output')

        expect(spinner.element.tagName).toBe('OUTPUT')
        expect(spinner.attributes('aria-label')).toBe('Loading')
    })

    it('takes its aria-label from the DS config and lets the prop win', () => {
        const dsConfig = useDSConfig()
        dsConfig.accessibility.spinnerText = () => 'Cargando'

        expect(mount(Spinner).attributes('aria-label')).toBe('Cargando')
        expect(mount(Spinner, { props: { ariaLabel: 'Espera' } }).attributes('aria-label')).toBe('Espera')

        dsConfig.accessibility.spinnerText = () => 'Loading'
    })

    it('does not render an icon for the default RING variant', () => {
        const wrapper = mount(Spinner)

        expect(wrapper.findComponent({ name: 'Icon' }).exists()).toBe(false)
        expect(loadIconMock).not.toHaveBeenCalled()
    })

    it.each([
        [SpinnerVariant.RING_RESIZE, 'svg-spinners:ring-resize'],
        [SpinnerVariant.DOTS_3_BOUNCE, 'svg-spinners:3-dots-bounce'],
        [SpinnerVariant.BARS_SCALE, 'svg-spinners:bars-scale'],
        [SpinnerVariant.RING_180_WITH_BG, 'svg-spinners:180-ring-with-bg'],
    ])('renders the %s variant with the %s icon', async (variant, iconName) => {
        const wrapper = mount(Spinner, { props: { variant } })
        await flushPromises()

        const spinner = wrapper.find('output')
        expect(loadIconMock).toHaveBeenCalledWith(iconName)
        expect(wrapper.findComponent({ name: 'Icon' }).props('name')).toBe(iconName)
        expect(spinner.classes()).toContain('text-border-primary-brand-default')
        expect(spinner.classes()).not.toContain('animate-spin')
        expect(spinner.classes()).not.toContain('border-2')
    })

    it('maps every non-RING variant to an icon that exists in the svg-spinners collection', async () => {
        const { icons } = (await import('@iconify-json/svg-spinners/icons.json')).default as {
            icons: Record<string, unknown>
        }
        const variants = Object.values(SpinnerVariant).filter((v) => v !== SpinnerVariant.RING)

        expect(variants.length).toBe(Object.keys(icons).length)
        for (const variant of variants) {
            expect(icons[variant]).toBeDefined()
        }
    })

    it('renders icon variants as inline SVG so opacity and animations are preserved', async () => {
        const wrapper = mount(Spinner, { props: { variant: SpinnerVariant.RING_180_WITH_BG } })
        await flushPromises()

        expect(wrapper.findComponent({ name: 'Icon' }).props('mode')).toBe(IconMode.SVG)
    })

    it('keeps the icon opacity by default (useOpacity = true)', async () => {
        const wrapper = mount(Spinner, { props: { variant: SpinnerVariant.RING_180_WITH_BG } })
        await flushPromises()

        expect(wrapper.findComponent({ name: 'Icon' }).props('svgCustomize')).toBeUndefined()
    })

    it('strips static opacity but keeps animated opacity when useOpacity is false', async () => {
        const wrapper = mount(Spinner, {
            props: { variant: SpinnerVariant.RING_180_WITH_BG, useOpacity: false },
        })
        await flushPromises()

        const customize = wrapper.findComponent({ name: 'Icon' }).props('svgCustomize') as (svg: string) => string
        const svg = '<path fill="currentColor" d="M0" opacity=".25"/><animate attributeName="opacity" values="1;0"/>'

        expect(customize(svg)).toBe('<path fill="currentColor" d="M0"/><animate attributeName="opacity" values="1;0"/>')
    })

    describe('global config', () => {
        const dsConfig = useDSConfig()

        afterEach(() => {
            dsConfig.spinner.variant = SpinnerVariant.RING
            dsConfig.spinner.useOpacity = true
        })

        it('follows spinner.variant of the DS config when the prop is not set', async () => {
            dsConfig.spinner.variant = SpinnerVariant.BARS_SCALE

            const wrapper = mount(Spinner)
            await flushPromises()

            expect(wrapper.findComponent({ name: 'Icon' }).props('name')).toBe('svg-spinners:bars-scale')
        })

        it('lets the variant prop win over the DS config', async () => {
            dsConfig.spinner.variant = SpinnerVariant.BARS_SCALE

            const wrapper = mount(Spinner, { props: { variant: SpinnerVariant.RING } })
            await flushPromises()

            expect(wrapper.findComponent({ name: 'Icon' }).exists()).toBe(false)
            expect(wrapper.find('output').classes()).toContain('animate-spin')
        })

        it('follows spinner.useOpacity of the DS config and lets the prop win', async () => {
            dsConfig.spinner.variant = SpinnerVariant.RING_180_WITH_BG
            dsConfig.spinner.useOpacity = false

            const fromConfig = mount(Spinner)
            await flushPromises()
            expect(fromConfig.findComponent({ name: 'Icon' }).props('svgCustomize')).toBeTypeOf('function')

            const fromProp = mount(Spinner, { props: { useOpacity: true } })
            await flushPromises()
            expect(fromProp.findComponent({ name: 'Icon' }).props('svgCustomize')).toBeUndefined()
        })
    })

    it('falls back to the CSS ring when the icon cannot be loaded', async () => {
        loadIconMock.mockRejectedValue(new Error('not found'))

        const wrapper = mount(Spinner, { props: { variant: SpinnerVariant.DOTS_3_BOUNCE } })
        await flushPromises()

        const spinner = wrapper.find('output')
        expect(wrapper.findComponent({ name: 'Icon' }).exists()).toBe(false)
        expect(spinner.classes()).toContain('animate-spin')
        expect(spinner.classes()).toContain('border-t-transparent')
    })
})
