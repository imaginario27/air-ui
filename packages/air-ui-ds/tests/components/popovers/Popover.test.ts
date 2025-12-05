import { mount } from '@vue/test-utils'
import PopoverCard from '~/components/popovers/Popover.vue'
import Card from '@/components/cards/Card.vue'
import { Trigger } from '@/models/enums/triggers'
import { nextTick } from 'vue'

const factory = (props = {}) => {
    return mount(PopoverCard, {
        props: {
            ...props
        },
        slots: {
            activator: '<button>Activator</button>',
            content: '<div>Popover Content</div>'
        },
        attachTo: document.body
    })
}

describe('PopoverCard', () => {
    it('renders activator slot', () => {
        const wrapper = factory()
        expect(wrapper.html()).toContain('Activator')
    })

    it('does not show popover initially', () => {
        const wrapper = factory()
        expect(wrapper.findComponent(Card).exists()).toBe(false)
    })

    it('opens popover on hover when trigger is hover', async () => {
        const wrapper = factory({ trigger: Trigger.HOVER })
        await wrapper.find('.popover-activator').trigger('mouseenter')
        await nextTick()
        expect(wrapper.findComponent(Card).exists()).toBe(true)
    })

    it('closes popover on mouseleave after delay when trigger is hover', async () => {
        vi.useFakeTimers()
        const wrapper = factory({ trigger: Trigger.HOVER })
        await wrapper.find('.popover-activator').trigger('mouseenter')
        await nextTick()
        expect(wrapper.findComponent(Card).exists()).toBe(true)

        await wrapper.find('.popover-activator').trigger('mouseleave')
        vi.advanceTimersByTime(200)
        await nextTick()
        expect(wrapper.findComponent(Card).exists()).toBe(false)
        vi.useRealTimers()
    })

    it('toggles popover on click when trigger is click', async () => {
        const wrapper = factory({ trigger: Trigger.CLICK })
        await wrapper.find('.popover-activator').trigger('click')
        await nextTick()
        expect(wrapper.findComponent(Card).exists()).toBe(true)

        await wrapper.find('.popover-activator').trigger('click')
        await nextTick()
        expect(wrapper.findComponent(Card).exists()).toBe(false)
    })    
})
