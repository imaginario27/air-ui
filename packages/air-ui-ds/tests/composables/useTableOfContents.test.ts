import { mount } from '@vue/test-utils'
import { useTableOfContents } from '@/composables/useTableOfContents'
import { defineComponent, nextTick } from 'vue'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'

// Mock `vue-router`
vi.mock('vue-router', () => ({
    useRoute: () => ({
        path: '/test',
    }),
}))

describe('useTableOfContents', () => {
    let observeMock: vi.Mock
    let disconnectMock: vi.Mock
    let intersectionCallback: IntersectionObserverCallback | null = null

    beforeEach(() => {
        observeMock = vi.fn()
        disconnectMock = vi.fn()
        intersectionCallback = null

        class MockIntersectionObserver {
            constructor(cb: IntersectionObserverCallback) {
                intersectionCallback = cb
            }

            observe = observeMock
            disconnect = disconnectMock
        }

        global.IntersectionObserver = MockIntersectionObserver as unknown as typeof IntersectionObserver

        vi.spyOn(document, 'querySelectorAll').mockImplementation(() => {
            return [
                { id: 'heading-1' },
                { id: 'heading-2' },
            ] as unknown as NodeListOf<Element>
        })
    })

    afterEach(() => {
        vi.restoreAllMocks()
    })

    it('initializes observer and sets first heading as active', async () => {
        const TestComponent = defineComponent({
            setup() {
                return useTableOfContents()
            },
            template: '<div />',
        })

        const wrapper = mount(TestComponent)

        await nextTick()

        expect(document.querySelectorAll).toHaveBeenCalledWith('h2, h3')
        expect(observeMock).toHaveBeenCalledTimes(2)

        const vm = wrapper.vm as unknown as { activeId: string | null }
        expect(vm.activeId).toBe('heading-1')

        wrapper.unmount()
        expect(disconnectMock).toHaveBeenCalled()
    })

    it('updates activeId when heading is intersecting', async () => {
        const TestComponent = defineComponent({
            setup() {
                return useTableOfContents()
            },
            template: '<div />',
        })

        const wrapper = mount(TestComponent)

        await nextTick()

        intersectionCallback?.(
            [
                { isIntersecting: true, target: { id: 'heading-2' } },
            ] as unknown as IntersectionObserverEntry[],
            {} as IntersectionObserver
        )

        await nextTick()

        const vm = wrapper.vm as unknown as { activeId: string | null }
        expect(vm.activeId).toBe('heading-2')

        wrapper.unmount()
    })
})
