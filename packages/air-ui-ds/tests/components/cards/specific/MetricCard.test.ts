import { mount } from '@vue/test-utils'
import MetricCard from '@/components/cards/specific/MetricCard.vue'
import { DashboardMetricCardStyle, DashboardMetricTrendDirection } from '@/models/enums/metrics'
import { ColorAccent } from '@/models/enums/colors'
import { IconContainerShape, IconContainerStyleType } from '@/models/enums/icons'
import Icon from '~/components/icons/Icon.vue'
import ContainedIcon from '~/components/icons/ContainedIcon.vue'

const factory = (props: Record<string, unknown> = {}, options: Record<string, unknown> = {}) => {
    return mount(MetricCard, {
        props,
        global: {
            stubs: {
                Card: {
                    template: '<div><slot /></div>'
                }
            }
        },
        ...options
    })
}

describe('MetricCard.vue', () => {
    it('renders the component properly', () => {
        const wrapper = factory()
        expect(wrapper.exists()).toBe(true)
    })

    it('renders default title and amount', () => {
        const wrapper = factory()
        expect(wrapper.text()).toContain('Metric title')
        expect(wrapper.text()).toContain('0')
    })

    it('does not render description when not provided', () => {
        const wrapper = factory()
        const paragraphs = wrapper.findAll('p')
        const descriptionParagraph = paragraphs.find((p) => p.classes().includes('text-sm') && !p.classes().includes('font-semibold'))
        expect(descriptionParagraph).toBeUndefined()
    })

    it('renders description when provided', () => {
        const wrapper = factory({ description: 'Last 30 days' })
        expect(wrapper.text()).toContain('Last 30 days')
    })

    it('renders a custom title, amount and description', () => {
        const wrapper = factory({
            title: 'Revenue',
            amount: 1327,
            description: 'Last 30 days'
        })
        expect(wrapper.text()).toContain('Revenue')
        expect(wrapper.text()).toContain('1327')
        expect(wrapper.text()).toContain('Last 30 days')
    })

    it('renders the unit when provided', () => {
        const wrapper = factory({ amount: 80, unit: 'month' })
        expect(wrapper.text()).toContain('/month')
    })

    it('does not render the unit when not provided', () => {
        const wrapper = factory()
        expect(wrapper.text()).not.toContain('/')
    })

    it('renders the featured description when provided', () => {
        const wrapper = factory({ featuredDescription: 'Highlighted note' })
        expect(wrapper.text()).toContain('Highlighted note')
    })

    it('does not render an icon when icon prop is not provided', () => {
        const wrapper = factory()
        expect(wrapper.findComponent(ContainedIcon).exists()).toBe(false)
    })

    it('renders ContainedIcon for soft and default style types', () => {
        const wrapper = factory({
            icon: 'mdi:chart-line',
            styleType: DashboardMetricCardStyle.PRIMARY_BRAND_SOFT
        })

        const contained = wrapper.findComponent(ContainedIcon)
        expect(contained.exists()).toBe(true)
        expect(contained.props('icon')).toBe('mdi:chart-line')
        expect(contained.props('shape')).toBe(IconContainerShape.SQUARE)
        expect(contained.props('styleType')).toBe(IconContainerStyleType.FILLED)
        expect(contained.props('color')).toBe(ColorAccent.PRIMARY_BRAND)
    })

    it('renders a plain Icon for filled style types', () => {
        const wrapper = factory({
            icon: 'mdi:chart-line',
            styleType: DashboardMetricCardStyle.NEUTRAL_FILLED
        })

        expect(wrapper.findComponent(ContainedIcon).exists()).toBe(false)
        const icons = wrapper.findAllComponents(Icon)
        expect(icons.some((i) => i.props('name') === 'mdi:chart-line')).toBe(true)
    })

    it('uses defaultStyleIconColor only when styleType is DEFAULT', () => {
        const wrapper = factory({
            icon: 'mdi:chart-line',
            styleType: DashboardMetricCardStyle.DEFAULT,
            defaultStyleIconColor: ColorAccent.SUCCESS
        })

        expect(wrapper.findComponent(ContainedIcon).props('color')).toBe(ColorAccent.SUCCESS)
    })

    it('uses defaultStyleIconContainerType when styleType is DEFAULT', () => {
        const wrapper = factory({
            icon: 'mdi:chart-line',
            styleType: DashboardMetricCardStyle.DEFAULT,
            defaultStyleIconContainerType: IconContainerStyleType.FLAT
        })

        expect(wrapper.findComponent(ContainedIcon).props('styleType')).toBe(IconContainerStyleType.FLAT)
    })

    it('ignores defaultStyleIconContainerType when styleType is a soft variant', () => {
        const wrapper = factory({
            icon: 'mdi:chart-line',
            styleType: DashboardMetricCardStyle.PRIMARY_BRAND_SOFT,
            defaultStyleIconContainerType: IconContainerStyleType.FLAT
        })

        expect(wrapper.findComponent(ContainedIcon).props('styleType')).toBe(IconContainerStyleType.FILLED)
    })

    it('uses iconContainerShape when styleType is DEFAULT', () => {
        const wrapper = factory({
            icon: 'mdi:chart-line',
            styleType: DashboardMetricCardStyle.DEFAULT,
            iconContainerShape: IconContainerShape.SQUARE
        })

        expect(wrapper.findComponent(ContainedIcon).props('shape')).toBe(IconContainerShape.SQUARE)
    })

    it('ignores iconContainerShape when styleType is a soft variant', () => {
        const wrapper = factory({
            icon: 'mdi:chart-line',
            styleType: DashboardMetricCardStyle.PRIMARY_BRAND_SOFT,
            iconContainerShape: IconContainerShape.CIRCLE
        })

        expect(wrapper.findComponent(ContainedIcon).props('shape')).toBe(IconContainerShape.SQUARE)
    })

    it.each([
        [DashboardMetricCardStyle.DEFAULT, 'bg-background-container-surface'],
        [DashboardMetricCardStyle.PRIMARY_BRAND_FILLED, 'bg-background-primary-brand-default'],
        [DashboardMetricCardStyle.PRIMARY_BRAND_SOFT, 'bg-background-primary-brand-soft'],
        [DashboardMetricCardStyle.SECONDARY_BRAND_FILLED, 'bg-background-secondary-brand-default'],
        [DashboardMetricCardStyle.SECONDARY_BRAND_SOFT, 'bg-background-secondary-brand-soft'],
        [DashboardMetricCardStyle.NEUTRAL_FILLED, 'bg-background-neutral-bold'],
        [DashboardMetricCardStyle.NEUTRAL_SOFT, 'bg-background-neutral-subtler'],
    ])('applies the correct container class for styleType %s', (styleType, expectedClass) => {
        const wrapper = factory({ styleType })
        expect(wrapper.html()).toContain(expectedClass)
    })

    it('applies the custom filled color class when styleType is CUSTOM_FILLED', () => {
        const wrapper = factory({
            styleType: DashboardMetricCardStyle.CUSTOM_FILLED,
            customFilledColorClass: 'bg-background-[#123456]'
        })
        expect(wrapper.html()).toContain('bg-background-[#123456]')
    })

    it('does not render the trend when trend prop is not provided', () => {
        const wrapper = factory()
        expect(wrapper.find('.mt-0\\.5').exists()).toBe(false)
    })

    it.each([
        [DashboardMetricTrendDirection.UP, 'mdi:arrow-up'],
        [DashboardMetricTrendDirection.DOWN, 'mdi:arrow-down'],
        [DashboardMetricTrendDirection.NEUTRAL, 'mdi:minus'],
    ])('renders the correct trend icon for direction %s', (trendDirection, expectedIcon) => {
        const wrapper = factory({ trend: '+12%', trendDirection })
        const icons = wrapper.findAllComponents(Icon)
        expect(icons.some((i) => i.props('name') === expectedIcon)).toBe(true)
    })

    it('applies success trend color for UP trend on non-filled styles', () => {
        const wrapper = factory({
            trend: '+12%',
            trendDirection: DashboardMetricTrendDirection.UP,
            styleType: DashboardMetricCardStyle.DEFAULT
        })
        expect(wrapper.html()).toContain('text-text-success')
    })

    it('applies error trend color for DOWN trend on non-filled styles', () => {
        const wrapper = factory({
            trend: '-5%',
            trendDirection: DashboardMetricTrendDirection.DOWN,
            styleType: DashboardMetricCardStyle.DEFAULT
        })
        expect(wrapper.html()).toContain('text-text-error')
    })

    it('applies on-filled trend color for any trend direction on filled styles', () => {
        const wrapper = factory({
            trend: '-5%',
            trendDirection: DashboardMetricTrendDirection.DOWN,
            styleType: DashboardMetricCardStyle.PRIMARY_BRAND_FILLED
        })
        expect(wrapper.html()).toContain('text-text-neutral-on-filled')
    })
})
