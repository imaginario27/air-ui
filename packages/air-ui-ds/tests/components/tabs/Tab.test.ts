import { mount } from '@vue/test-utils'
import Tab from '@/components/tabs/Tab.vue'
import Badge from '@/components/badges/Badge.vue'
import { TabStyle, TabDecoration } from '@/models/enums/tabs'
import { BadgeStyle, BadgeShape } from '@/models/enums/badges'
import { ColorAccent } from '@/models/enums/colors'
import { nextTick } from 'vue'

vi.mock('@/assets/images/placeholders/missing-image-placeholder.png', () => ({
    default: '/mocked/missing-image.png'
}))

const factory = (props: Partial<InstanceType<typeof Tab>['$props']> = {}) => {
    return mount(Tab, {
        props: {
            text: 'Dashboard',
            tabStyle: TabStyle.UNDERLINE,
            decoration: TabDecoration.NONE,
            active: false,
            ...props
        },
        global: {
            stubs: {
                MdiIcon: {
                    name: 'MdiIcon',
                    template: '<div class="mdi-icon" />'
                }
            }
        }
    })
}

describe('Tab.vue', () => {
    it('renders tab text', () => {
        const wrapper = factory()
        expect(wrapper.text()).toContain('Dashboard')
    })

    it('applies underline style when tabStyle is UNDERLINE', () => {
        const wrapper = factory({ tabStyle: TabStyle.UNDERLINE })
        const classes = wrapper.classes()
        expect(classes).toContain('flex')
        expect(classes).toContain('border-b-2')
    })

    it('renders icon when decoration is ICON', () => {
        const wrapper = factory({ decoration: TabDecoration.ICON })
        expect(wrapper.find('.mdi-icon').exists()).toBe(true)
    })

    it('renders image when decoration is IMAGE', async () => {
        const wrapper = factory({
            decoration: TabDecoration.IMAGE,
            imgUrl: '/test.png'
        })

        await nextTick()

        const img = wrapper.find('img')
        expect(img.exists()).toBe(true)
        expect(img.attributes('src')).toBe('/test.png')
        expect(img.attributes('alt')).toBe('Tab decoration')
    })

    it('renders fallback image when image load fails', async () => {
        const wrapper = factory({
            decoration: TabDecoration.IMAGE,
            imgUrl: '/broken.png'
        })

        const img = wrapper.find('img')
        await img.trigger('error')

        await nextTick()

        const fallbackImg = wrapper.find('img')
        expect(fallbackImg.attributes('src')).toBe('/mocked/missing-image.png')
    })

    it('renders badge when badgeValue is provided', () => {
        const wrapper = factory({ badgeValue: '5' })
        const badge = wrapper.findComponent(Badge)
        expect(badge.exists()).toBe(true)
        expect(badge.text()).toContain('5')
    })

    it('renders number badgeValue as string', () => {
        const wrapper = factory({ badgeValue: 9 })
        const badge = wrapper.findComponent(Badge)
        expect(badge.exists()).toBe(true)
        expect(badge.text()).toContain('9')
    })

    it('does not render badge when badgeValue is null or undefined', () => {
        expect(factory({ badgeValue: undefined }).findComponent(Badge).exists()).toBe(false)
        expect(factory({}).findComponent(Badge).exists()).toBe(false)
    })

    it('applies correct classes when active is true (PILL style)', () => {
        const wrapper = factory({
            tabStyle: TabStyle.PILL,
            active: true
        })
        expect(wrapper.classes()).toContain('bg-background-primary-brand-subtle-active')
        expect(wrapper.classes()).toContain('text-text-primary-brand-active')
    })

    it('applies correct classes for PILL_MONOCRHOME inactive', () => {
        const wrapper = factory({
            tabStyle: TabStyle.PILL_MONOCRHOME,
            active: false
        })
        expect(wrapper.classes()).toContain('hover:text-text-neutral-on-monochrome-hover-bg')
    })

    it('badge gets correct style and color when active is true', () => {
        const wrapper = factory({
            badgeValue: 'New',
            active: true
        })
        const badge = wrapper.findComponent(Badge)
        expect(badge.props('styleType')).toBe(BadgeStyle.FILLED)
        expect(badge.props('color')).toBe(ColorAccent.PRIMARY_BRAND)
        expect(badge.props('shape')).toBe(BadgeShape.PILL)
    })

    it('badge gets correct style and color when active is false', () => {
        const wrapper = factory({
            badgeValue: 'New',
            active: false,
            tabStyle: TabStyle.UNDERLINE
        })
        const badge = wrapper.findComponent(Badge)
        expect(badge.props('styleType')).toBe(BadgeStyle.FLAT)
        expect(badge.props('color')).toBe(ColorAccent.NEUTRAL)
    })
})
