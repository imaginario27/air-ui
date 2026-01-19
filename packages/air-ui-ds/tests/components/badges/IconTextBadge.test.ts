import { mount } from '@vue/test-utils'
import IconTextBadge from '@/components/badges/IconTextBadge.vue'
import IconBadge from '@/components/badges/IconBadge.vue'
import Icon from '@/components/icons/Icon.vue'
import { ColorAccent } from '@/models/enums/colors'

const factory = (props: Partial<InstanceType<typeof IconTextBadge>['$props']> = {}) => {
    return mount(IconTextBadge, {
        props,
        global: {
            components: {
                IconBadge,
                Icon
            }
        }
    })
}

describe('IconTextBadge.vue', () => {
    it('renders the text passed via props', () => {
        const wrapper = factory({ text: 'Hello Badge' })
        expect(wrapper.text()).toContain('Hello Badge')
    })

    it('renders the IconBadge and Icon components with correct props', () => {
        const wrapper = factory({ icon: 'mdi:check', color: ColorAccent.SUCCESS })

        const iconBadge = wrapper.findComponent(IconBadge)
        expect(iconBadge.exists()).toBe(true)
        expect(iconBadge.props('icon')).toBe('mdi:check')
        expect(iconBadge.props('color')).toBe(ColorAccent.SUCCESS)

        const icon = wrapper.findComponent(Icon)
        expect(icon.exists()).toBe(true)
        expect(icon.props('name')).toBe('mdi:check')
    })

    it('applies the correct text color class based on color prop', () => {
        const colorClassMap = {
            [ColorAccent.NEUTRAL]: 'text-text-neutral-subtle',
            [ColorAccent.SUCCESS]: 'text-text-success',
            [ColorAccent.WARNING]: 'text-text-warning',
            [ColorAccent.DANGER]: 'text-text-danger',
            [ColorAccent.INFO]: 'text-text-info',
            [ColorAccent.PRIMARY_BRAND]: 'text-text-primary-brand-default',
            [ColorAccent.SECONDARY_BRAND]: 'text-text-secondary-brand-default'
        }

        for (const color of Object.values(ColorAccent)) {
            const wrapper = factory({ color, text: `Color ${color}` })

            // Find span by text content, not just tag name
            const span = wrapper.findAll('span').find(el => el.text().includes(`Color ${color}`))
            expect(span).toBeTruthy()
            expect(span!.classes()).toContain(colorClassMap[color])
        }
    })

    it('renders default props correctly when none are provided', () => {
        const wrapper = factory()

        expect(wrapper.text()).toContain('Badge text')

        const iconBadge = wrapper.findComponent(IconBadge)
        expect(iconBadge.props('icon')).toBe('mdi:help')
        expect(iconBadge.props('color')).toBe(ColorAccent.NEUTRAL)

        const icon = wrapper.findComponent(Icon)
        expect(icon.props('name')).toBe('mdi:help')

        const span = wrapper.findAll('span').find(el => el.text() === 'Badge text')
        expect(span).toBeTruthy()
        expect(span!.classes()).toContain('text-text-neutral-subtle')
    })
})
