import { mount } from '@vue/test-utils'
import { shouldFlipVertically, useAutoFlip } from '~/composables/useAutoFlip'

describe('shouldFlipVertically', () => {
    const viewportHeight = 800

    it('keeps a panel below when it fits', () => {
        expect(shouldFlipVertically(Position.BOTTOM, { top: 100, bottom: 136 }, 300, 4, viewportHeight)).toBe(false)
    })

    it('flips a panel below to the top when it does not fit and there is more room above', () => {
        expect(shouldFlipVertically(Position.BOTTOM, { top: 700, bottom: 736 }, 300, 4, viewportHeight)).toBe(true)
    })

    it('keeps a panel below when it does not fit but there is more room below than above', () => {
        expect(shouldFlipVertically(Position.BOTTOM, { top: 100, bottom: 136 }, 700, 4, viewportHeight)).toBe(false)
    })

    it('flips a panel above to the bottom when it does not fit and there is more room below', () => {
        expect(shouldFlipVertically(Position.TOP, { top: 100, bottom: 136 }, 300, 4, viewportHeight)).toBe(true)
    })

    it('keeps a panel above when it fits', () => {
        expect(shouldFlipVertically(Position.TOP, { top: 500, bottom: 536 }, 300, 4, viewportHeight)).toBe(false)
    })
})

describe('useAutoFlip', () => {
    const mountWithPanel = (options: { position?: Position; isEnabled?: boolean; anchorTop: number }) => {
        const isOpen = ref(false)

        const wrapper = mount(
            defineComponent({
                setup() {
                    const panel = ref<HTMLElement | null>(null)
                    const { resolvedPosition } = useAutoFlip(
                        panel,
                        () => options.position ?? Position.BOTTOM,
                        () => options.isEnabled ?? true,
                        isOpen,
                    )

                    return { panel, resolvedPosition, isOpen }
                },
                template: '<div data-anchor><div v-if="isOpen" ref="panel" /></div>',
            }),
            { attachTo: document.body },
        )

        const anchor = wrapper.find('[data-anchor]').element as HTMLElement
        anchor.getBoundingClientRect = () => ({ top: options.anchorTop, bottom: options.anchorTop + 36 }) as DOMRect
        Object.defineProperty(HTMLElement.prototype, 'offsetHeight', { configurable: true, value: 300 })

        return { wrapper, isOpen }
    }

    afterEach(() => {
        Reflect.deleteProperty(HTMLElement.prototype, 'offsetHeight')
    })

    it('resolves to the position it was given while it is closed', () => {
        const { wrapper } = mountWithPanel({ anchorTop: 700 })

        expect((wrapper.vm as any).resolvedPosition).toBe(Position.BOTTOM)
    })

    it('flips to the top when the panel does not fit below', async () => {
        const { wrapper, isOpen } = mountWithPanel({ anchorTop: window.innerHeight - 60 })

        isOpen.value = true
        await nextTick()
        await nextTick()

        expect((wrapper.vm as any).resolvedPosition).toBe(Position.TOP)
    })

    it('does not flip when it is disabled', async () => {
        const { wrapper, isOpen } = mountWithPanel({ anchorTop: window.innerHeight - 60, isEnabled: false })

        isOpen.value = true
        await nextTick()
        await nextTick()

        expect((wrapper.vm as any).resolvedPosition).toBe(Position.BOTTOM)
    })
})
