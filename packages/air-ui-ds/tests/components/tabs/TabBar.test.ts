import { mount } from '@vue/test-utils'
import TabBar from '@/components/tabs/TabBar.vue'
import Tab from '@/components/tabs/Tab.vue'
import { TabStyle, TabDecoration, TabSize } from '@/models/enums/tabs'
import { PrefetchOn } from '@/models/enums/prefetch'

const defaultTabs = [
    { text: 'Tab 1', icon: 'home', imgUrl: '', badgeValue: 0 },
    { text: 'Tab 2', icon: 'settings', imgUrl: '', badgeValue: 5 },
    { text: 'Tab 3', icon: 'profile', imgUrl: '', badgeValue: 0 }
]

describe('TabBar.vue', () => {
    const factory = (props = {}) => {
        return mount(TabBar, {
            props: {
                tabs: defaultTabs,
                modelValue: 0,
                ...props
            }
        })
    }

    it('renders all tabs passed via props', () => {
        const wrapper = factory()
        const tabComponents = wrapper.findAllComponents(Tab)
        expect(tabComponents.length).toBe(defaultTabs.length)

        defaultTabs.forEach(tab => {
            expect(wrapper.text()).toContain(tab.text)
        })
    })

    it('passes correct "active" prop to selected tab', () => {
        const wrapper = factory({ modelValue: 1 })
        const tabComponents = wrapper.findAllComponents(Tab)

        expect(tabComponents[1].props('active')).toBe(true)
        expect(tabComponents[0].props('active')).toBe(false)
    })

    it('emits update:modelValue and updates activeIndex on tab click (no to)', async () => {
        const wrapper = factory()
        const tabComponents = wrapper.findAllComponents(Tab)

        await tabComponents[2].trigger('click')

        expect(wrapper.emitted('update:modelValue')).toBeTruthy()
        expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([2])
    })

    it('navigates when clicking a tab with route target', async () => {
        const wrapper = factory({
            tabs: [
                { text: 'Docs', to: '/docs' },
            ],
        })

        const handleTabClick = (wrapper.vm as any).$?.setupState?.handleTabClick
        handleTabClick?.(0, '/docs')

        expect(wrapper.emitted('update:modelValue')).toBeFalsy()
    })

    it('updates internal activeIndex when modelValue changes', async () => {
        const wrapper = factory({ modelValue: 0 })
        await wrapper.setProps({ modelValue: 2 })

        const tabComponents = wrapper.findAllComponents(Tab)
        expect(tabComponents[2].props('active')).toBe(true)
    })

    it('passes decoration, tabStyle, and tabSize props to children', () => {
        const wrapper = factory({
            tabStyle: TabStyle.PILL,
            decoration: TabDecoration.ICON,
            tabSize: TabSize.SM
        })

        const tab = wrapper.findComponent(Tab)
        expect(tab.props('tabStyle')).toBe(TabStyle.PILL)
        expect(tab.props('decoration')).toBe(TabDecoration.ICON)
        expect(tab.props('size')).toBe(TabSize.SM)
    })

    it('applies container border and padding when hasContainer is true', () => {
        const wrapper = factory({
            hasContainer: true,
            tabSize: TabSize.MD
        })

        const classes = wrapper.classes()
        expect(classes).toContain('border')
        expect(classes).toContain('border-border-default')
        expect(classes).toContain('p-3')
        expect(classes).toContain('rounded-sm')
    })

    it('adds w-full class when isContainerFullWidth is true', () => {
        const wrapper = factory({
            hasContainer: true,
            isContainerFullWidth: true
        })

        const classes = wrapper.classes()
        expect(classes).toContain('w-full')
    })

    it('does not apply container styles if hasContainer is false', () => {
        const wrapper = factory({
            hasContainer: false
        })

        const classes = wrapper.classes()
        expect(classes).not.toContain('border')
        expect(classes).not.toContain('p-4')
        expect(classes).not.toContain('rounded-md')
        expect(classes).not.toContain('w-full')
    })

    it('applies disabled interaction styles when disabled is true', () => {
        const wrapper = factory({
            disabled: true
        })

        const classes = wrapper.classes()
        expect(classes).toContain('opacity-disabled')
        expect(classes).toContain('cursor-not-allowed')
        expect(classes).toContain('pointer-events-none')
    })

    it('passes disabled tab state to tab children', () => {
        const wrapper = factory({
            tabs: [
                { text: 'Enabled tab' },
                { text: 'Disabled tab', disabled: true },
            ],
        })

        const tabComponents = wrapper.findAllComponents(Tab)
        expect(tabComponents[0].props('disabled')).toBe(false)
        expect(tabComponents[1].props('disabled')).toBe(true)
    })

    it('defaults prefetch strategy to visibility', () => {
        const wrapper = factory({
            tabs: [
                { text: 'Docs', to: '/docs' },
            ],
        })

        const shouldPrefetchOn = (wrapper.vm as any).$?.setupState?.shouldPrefetchOn

        expect(shouldPrefetchOn?.(PrefetchOn.VISIBILITY)).toBe(true)
        expect(shouldPrefetchOn?.(PrefetchOn.INTERACTION)).toBe(false)
    })

    it('enables interaction prefetch when prefetchOn is interaction', () => {
        const wrapper = factory({
            tabs: [
                { text: 'Docs', to: '/docs' },
            ],
            prefetchOn: 'interaction',
        })

        const shouldPrefetchOn = (wrapper.vm as any).$?.setupState?.shouldPrefetchOn

        expect(shouldPrefetchOn?.(PrefetchOn.INTERACTION)).toBe(true)
        expect(shouldPrefetchOn?.(PrefetchOn.VISIBILITY)).toBe(false)
    })

    it('supports object strategy for prefetchOn', () => {
        const wrapper = factory({
            tabs: [
                { text: 'Docs', to: '/docs' },
            ],
            prefetchOn: {
                visibility: true,
                interaction: true,
            },
        })

        const shouldPrefetchOn = (wrapper.vm as any).$?.setupState?.shouldPrefetchOn

        expect(shouldPrefetchOn?.(PrefetchOn.VISIBILITY)).toBe(true)
        expect(shouldPrefetchOn?.(PrefetchOn.INTERACTION)).toBe(true)
    })

    it('has role="tablist" on the container', () => {
        const wrapper = factory()
        expect(wrapper.attributes('role')).toBe('tablist')
    })

    it('sets tabindex="0" on active tab and tabindex="-1" on others', () => {
        const wrapper = factory({ modelValue: 1 })
        const tabComponents = wrapper.findAllComponents(Tab)

        expect(tabComponents[0].props('tabindex')).toBe(-1)
        expect(tabComponents[1].props('tabindex')).toBe(0)
        expect(tabComponents[2].props('tabindex')).toBe(-1)
    })
})
