import { mount } from '@vue/test-utils'
import TabBar from '@/components/tabs/TabBar.vue'
import Tab from '@/components/tabs/Tab.vue'

const defaultTabs = [
    { text: 'Tab 1', icon: 'home', imgUrl: '', badgeValue: 0 },
    { text: 'Tab 2', icon: 'settings', imgUrl: '', badgeValue: 5 },
    { text: 'Tab 3', icon: 'profile', imgUrl: '', badgeValue: 0 }
]

describe('TabBar', () => {
    const factory = (props = {}) => {
        return mount(TabBar, {
            props: {
                tabs: defaultTabs,
                modelValue: 0,
                ...props
            },
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

    it('marks the correct tab as active based on modelValue', () => {
        const wrapper = factory({ modelValue: 1 })
        const tabComponents = wrapper.findAllComponents(Tab)
        expect(tabComponents[1].props('active')).toBe(true)
    })

    it('emits update:modelValue and updates activeIndex on click when no "to" provided', async () => {
        const wrapper = factory()
        const tabComponents = wrapper.findAllComponents(Tab)

        await tabComponents[1].trigger('click')

        expect(wrapper.emitted('update:modelValue')).toBeTruthy()
        expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([1])
    })

    it('updates activeIndex when modelValue prop changes', async () => {
        const wrapper = factory({ modelValue: 0 })
        await wrapper.setProps({ modelValue: 2 })
        const tabComponents = wrapper.findAllComponents(Tab)
        expect(tabComponents[2].props('active')).toBe(true)
    })
})
