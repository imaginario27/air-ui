import { mount } from '@vue/test-utils'
import Tab from '@/components/tabs/Tab.vue'
import Badge from '@/components/badges/Badge.vue'
import Icon from '@/components/icons/Icon.vue'
import { TabStyle, TabDecoration, TabSize } from '@/models/enums/tabs'
import { BadgeStyle, BadgeShape } from '@/models/enums/badges'
import { ColorAccent } from '@/models/enums/colors'
import { nextTick } from 'vue'

// Mock placeholder image
vi.mock('@/assets/images/placeholders/missing-image-placeholder.png', () => ({
    default: '/mocked/missing-image.png'
}))

const factory = (props: Partial<InstanceType<typeof Tab>['$props']> = {}) => {
    return mount(Tab, {
        props: {
            text: 'Dashboard',
            tabStyle: TabStyle.UNDERLINE,
            decoration: TabDecoration.NONE,
            size: TabSize.LG,
            active: false,
            ...props
        },
        global: {
            stubs: {
                Icon: {
                    name: 'Icon',
                    props: ['name'],
                    template: '<div class="icon-stub" />'
                }
            }
        }
    })
}

describe('Tab.vue', () => {
    it('renders default tab text', () => {
        const wrapper = factory()
        expect(wrapper.text()).toContain('Dashboard')
    })

    it('applies underline style and default size', () => {
        const wrapper = factory({ tabStyle: TabStyle.UNDERLINE })
        const classes = wrapper.classes()
        expect(classes).toContain('border-b-2')
        expect(classes).toContain('min-h-[52px]')
    })

    it('applies pill style and LG size', () => {
        const wrapper = factory({ tabStyle: TabStyle.PILL, size: TabSize.LG })
        const classes = wrapper.classes()
        expect(classes).toContain('rounded')
        expect(classes).toContain('min-h-[40px]')
    })

    it('applies pill style and SM size', () => {
        const wrapper = factory({ tabStyle: TabStyle.PILL, size: TabSize.SM })
        const classes = wrapper.classes()
        expect(classes).toContain('min-h-[32px]')
    })

    it('renders icon when decoration is ICON', () => {
        const wrapper = factory({ decoration: TabDecoration.ICON })
        expect(wrapper.findComponent(Icon).exists()).toBe(true)
    })

    it('renders image when decoration is IMAGE and image loads', async () => {
        const wrapper = factory({
            decoration: TabDecoration.IMAGE,
            imgUrl: '/test.png'
        })

        const img = wrapper.find('img')
        expect(img.exists()).toBe(true)
        expect(img.attributes('src')).toBe('/test.png')
        expect(img.attributes('alt')).toBe('Tab decoration')
    })

    it('renders fallback image when image fails to load', async () => {
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

    it('renders badge when badgeValue is string', () => {
        const wrapper = factory({ badgeValue: '5' })
        const badge = wrapper.findComponent(Badge)
        expect(badge.exists()).toBe(true)
        expect(badge.text()).toContain('5')
    })

    it('renders badge when badgeValue is number', () => {
        const wrapper = factory({ badgeValue: 9 })
        const badge = wrapper.findComponent(Badge)
        expect(badge.exists()).toBe(true)
        expect(badge.text()).toContain('9')
    })

    it('does not render badge when badgeValue is undefined', () => {
        const wrapper = factory({ badgeValue: undefined })
        expect(wrapper.findComponent(Badge).exists()).toBe(false)
    })

    it('does not render badge when badgeValue is null', () => {
        const wrapper = factory({ badgeValue: null as any })
        expect(wrapper.findComponent(Badge).exists()).toBe(false)
    })

    it('applies active styles for PILL style', () => {
        const wrapper = factory({
            tabStyle: TabStyle.PILL,
            active: true
        })

        const classes = wrapper.classes()
        expect(classes).toContain('bg-background-primary-brand-subtle-active')
        expect(classes).toContain('text-text-primary-brand-on-soft-bg')
    })

    it('badge uses correct props when active is true', () => {
        const wrapper = factory({
            badgeValue: 'New',
            active: true
        })
        const badge = wrapper.findComponent(Badge)
        expect(badge.props('styleType')).toBe(BadgeStyle.FILLED)
        expect(badge.props('color')).toBe(ColorAccent.PRIMARY_BRAND)
        expect(badge.props('shape')).toBe(BadgeShape.PILL)
    })

    it('badge uses correct props when active is false', () => {
        const wrapper = factory({
            badgeValue: 'New',
            active: false
        })
        const badge = wrapper.findComponent(Badge)
        expect(badge.props('styleType')).toBe(BadgeStyle.FLAT)
        expect(badge.props('color')).toBe(ColorAccent.NEUTRAL)
    })

    it('defaults to underline style if invalid tabStyle is passed', () => {
        const wrapper = factory({ tabStyle: 'INVALID' as TabStyle })
        const classes = wrapper.classes()
        expect(classes).toContain('border-b-2')
    })

    it('defaults to LG size if invalid size is passed', () => {
        const wrapper = factory({ size: 'UNKNOWN' as TabSize })
        const classes = wrapper.classes()
        expect(classes).toContain('min-h-[52px]')
    })

    it('applies disabled interaction styles when disabled is true', () => {
        const wrapper = factory({ disabled: true })
        const classes = wrapper.classes()

        expect(classes).toContain('opacity-disabled')
        expect(classes).toContain('cursor-not-allowed')
        expect(classes).toContain('pointer-events-none')
    })
})
