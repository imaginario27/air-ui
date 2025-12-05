import { mount } from '@vue/test-utils'
import AvatarStack from '@/components/avatars/AvatarStack.vue'
import Avatar from '@/components/avatars/Avatar.vue'
import AvatarStackCounter from '@/components/avatars/AvatarStackCounter.vue'
import { StackCounterType } from '@/models/enums/counters'

describe('AvatarStack', () => {
    const factory = (props: Partial<InstanceType<typeof AvatarStack>['$props']> = {}) => {
        return mount(AvatarStack, {
            props,
            global: {
                components: {
                    Avatar,
                    AvatarStackCounter
                }
            }
        })
    }

    it('renders all avatars when itemsLimit is not finite', () => {
        const items = [
            { displayName: 'John Doe' },
            { displayName: 'Jane Smith' }
        ]
        const wrapper = factory({ items, itemsLimit: null })

        expect(wrapper.findAllComponents(Avatar)).toHaveLength(2)
        expect(wrapper.findComponent(AvatarStackCounter).exists()).toBe(false)
    })

    it('renders filtered avatars based on itemsLimit', () => {
        const items = [
            { displayName: 'John Doe' },
            { displayName: 'Jane Smith' },
            { displayName: 'Alex Brown' },
            { displayName: 'Chris Green' },
            { displayName: 'Pat White' }
        ]
        const wrapper = factory({ items, itemsLimit: 3 })

        expect(wrapper.findAllComponents(Avatar)).toHaveLength(3)
        expect(wrapper.findComponent(AvatarStackCounter).exists()).toBe(true)
    })

    it('does not render counter when avatars are within itemsLimit', () => {
        const items = [
            { displayName: 'John Doe' },
            { displayName: 'Jane Smith' }
        ]
        const wrapper = factory({ items, itemsLimit: 4 })

        expect(wrapper.findAllComponents(Avatar)).toHaveLength(2)
        expect(wrapper.findComponent(AvatarStackCounter).exists()).toBe(false)
    })

    it('shows "+x" counter when counterType is COUNTER', () => {
        const items = Array.from({ length: 6 }, (_, i) => ({ displayName: `Person ${i}` }))
        const wrapper = factory({ items, itemsLimit: 4, counterType: StackCounterType.COUNTER })

        const counter = wrapper.findComponent(AvatarStackCounter)
        expect(counter.exists()).toBe(true)
        expect(counter.text()).toBe('+2')
    })

    it('caps counter at "+9" if additional avatars are more than 9', () => {
        const items = Array.from({ length: 20 }, (_, i) => ({ displayName: `Person ${i}` }))
        const wrapper = factory({ items, itemsLimit: 4, counterType: StackCounterType.COUNTER })

        const counter = wrapper.findComponent(AvatarStackCounter)
        expect(counter.exists()).toBe(true)
        expect(counter.text()).toBe('+9')
    })

    it('shows ellipsis "..." when counterType is ELLIPSIS', () => {
        const items = Array.from({ length: 10 }, (_, i) => ({ displayName: `Person ${i}` }))
        const wrapper = factory({ items, itemsLimit: 4, counterType: StackCounterType.ELLIPSIS })

        const counter = wrapper.findComponent(AvatarStackCounter)
        expect(counter.exists()).toBe(true)
        expect(counter.text()).toBe('...')
    })

    it('does not render counter when items are empty', () => {
        const wrapper = factory({ items: [], itemsLimit: null, counterType: StackCounterType.ELLIPSIS })

        expect(wrapper.findAllComponents(Avatar)).toHaveLength(0)
        expect(wrapper.findComponent(AvatarStackCounter).exists()).toBe(false)
    })

    it('does not render counter if itemsLimit is not a finite number', () => {
        const items = Array.from({ length: 5 }, (_, i) => ({ displayName: `Person ${i}` }))
        const wrapper = factory({ items, itemsLimit: NaN })

        expect(wrapper.findComponent(AvatarStackCounter).exists()).toBe(false)
    })

    it('applies correct classes for overlapping avatars', () => {
        const items = [
            { displayName: 'User 1' },
            { displayName: 'User 2' },
            { displayName: 'User 3' }
        ]
        const wrapper = factory({ items, itemsLimit: 3 })

        const avatars = wrapper.findAllComponents(Avatar)
        expect(avatars[0].classes()).not.toContain('-ml-4')
        expect(avatars[1].classes()).toContain('-ml-4')
        expect(avatars[2].classes()).toContain('-ml-4')
    })

    it('adds hover class when avatar is hovered and isInteractive is true', async () => {
        const items = [
            { displayName: 'Hover User 1' },
            { displayName: 'Hover User 2' }
        ]
        const wrapper = factory({ items, isInteractive: true })

        const avatars = wrapper.findAllComponents(Avatar)
        await avatars[1].trigger('mouseenter')

        expect(avatars[1].classes()).toContain('border-border-primary-brand-hover')

        await avatars[1].trigger('mouseleave')
        // After mouse leave, it should revert to neutral border
        expect(avatars[1].classes()).toContain('!border-border-neutral-stacked')
    })

    it('does not apply hover class if isInteractive is false', async () => {
        const items = [
            { displayName: 'Non-Hover User 1' },
            { displayName: 'Non-Hover User 2' }
        ]
        const wrapper = factory({ items, isInteractive: false })

        const avatars = wrapper.findAllComponents(Avatar)
        await avatars[1].trigger('mouseenter')

        expect(avatars[1].classes()).toContain('!border-border-neutral-stacked')
    })
})
