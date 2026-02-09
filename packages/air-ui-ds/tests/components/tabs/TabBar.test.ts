import { mount } from '@vue/test-utils'
import TabBar from '@/components/tabs/TabBar.vue'
import Tab from '@/components/tabs/Tab.vue'
import { TabStyle, TabDecoration, TabSize } from '@/models/enums/tabs'

// Mock navigateTo
vi.mock('nuxt/app', () => ({
    navigateTo: vi.fn()
}))

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
})
