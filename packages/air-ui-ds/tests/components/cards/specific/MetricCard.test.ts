import { mount } from '@vue/test-utils'
import MetricCard from '@/components/cards/specific/MetricCard.vue'
import { MetricCardStyle, MetricTrendDirection, MetricCardIconPosition, MetricCardBackgroundIconPosition } from '@/models/enums/metrics'
import { ColorAccent } from '@/models/enums/colors'
import { IconContainerShape, IconContainerSize, IconContainerStyleType, IconSize } from '@/models/enums/icons'
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
        expect(wrapper.text()).toContain('month')
    })

    it('does not render the unit when not provided', () => {
        const wrapper = factory()
        expect(wrapper.text()).not.toContain('month')
    })

    it('renders the featured description when provided', () => {
        const wrapper = factory({ featuredDescription: 'Highlighted note' })
        expect(wrapper.text()).toContain('Highlighted note')
    })

    it('does not render an icon when icon prop is not provided', () => {
        const wrapper = factory()
        expect(wrapper.findComponent(ContainedIcon).exists()).toBe(false)
    })

    it('does not render the background icon when backgroundIcon is not provided', () => {
        const wrapper = factory()
        expect(wrapper.find('[aria-hidden="true"]').exists()).toBe(false)
    })

    it('renders the background icon when backgroundIcon is provided', () => {
        const wrapper = factory({ backgroundIcon: 'mdi:earth' })
        const bg = wrapper.find('[aria-hidden="true"]')
        expect(bg.exists()).toBe(true)
        const icon = bg.findComponent(Icon)
        expect(icon.props('name')).toBe('mdi:earth')
    })

    it('applies opacity-20 to the background icon wrapper', () => {
        const wrapper = factory({ backgroundIcon: 'mdi:earth' })
        expect(wrapper.find('[aria-hidden="true"]').classes()).toContain('opacity-20')
    })

    it.each([
        [MetricCardBackgroundIconPosition.TOP, 'top-4', 'items-start'],
        [MetricCardBackgroundIconPosition.MIDDLE, 'inset-y-0', 'items-center'],
        [MetricCardBackgroundIconPosition.BOTTOM, 'bottom-4', 'items-end'],
    ])('applies correct position classes for backgroundIconPosition %s', (position, posClass, alignClass) => {
        const wrapper = factory({ backgroundIcon: 'mdi:earth', backgroundIconPosition: position })
        const bg = wrapper.find('[aria-hidden="true"]')
        expect(bg.classes()).toContain(posClass)
        expect(bg.classes()).toContain(alignClass)
    })

    it('appends backgroundIconContainerClass to the background icon wrapper', () => {
        const wrapper = factory({ backgroundIcon: 'mdi:earth', backgroundIconContainerClass: 'opacity-10' })
        expect(wrapper.find('[aria-hidden="true"]').classes()).toContain('opacity-10')
    })

    it('appends backgroundIconClass to the background icon iconClass', () => {
        const wrapper = factory({ backgroundIcon: 'mdi:earth', backgroundIconClass: 'rotate-12' })
        const bg = wrapper.find('[aria-hidden="true"]')
        const icon = bg.findComponent(Icon)
        expect((icon.props('iconClass') as string[]).includes('rotate-12')).toBe(true)
    })

    it('uses text-text-neutral-subtle for background icon on DEFAULT styleType', () => {
        const wrapper = factory({ backgroundIcon: 'mdi:earth', styleType: MetricCardStyle.DEFAULT })
        const icon = wrapper.find('[aria-hidden="true"]').findComponent(Icon)
        expect((icon.props('iconClass') as string[]).includes('text-text-neutral-subtle')).toBe(true)
    })

    it('uses textColorClass for background icon on non-DEFAULT styleType', () => {
        const wrapper = factory({ backgroundIcon: 'mdi:earth', styleType: MetricCardStyle.PRIMARY_BRAND_FILLED })
        const icon = wrapper.find('[aria-hidden="true"]').findComponent(Icon)
        expect((icon.props('iconClass') as string[]).includes('text-text-neutral-on-filled')).toBe(true)
    })

    it('renders icon before title when iconPosition is LEFT', () => {
        const wrapper = factory({ icon: 'mdi:chart-line', iconPosition: MetricCardIconPosition.LEFT })
        const html = wrapper.html()
        const iconIndex = html.indexOf('mdi:chart-line')
        const titleIndex = html.indexOf('Metric title')
        expect(iconIndex).toBeLessThan(titleIndex)
    })

    it('renders icon after title when iconPosition is RIGHT', () => {
        const wrapper = factory({ icon: 'mdi:chart-line', iconPosition: MetricCardIconPosition.RIGHT })
        const html = wrapper.html()
        const iconIndex = html.lastIndexOf('mdi:chart-line')
        const titleIndex = html.indexOf('Metric title')
        expect(iconIndex).toBeGreaterThan(titleIndex)
    })

    it('passes iconSize as size to plain Icon on filled styles', () => {
        const wrapper = factory({
            icon: 'mdi:chart-line',
            styleType: MetricCardStyle.NEUTRAL_FILLED,
            iconSize: IconSize.LG
        })
        const icons = wrapper.findAllComponents(Icon)
        const iconEl = icons.find((i) => i.props('name') === 'mdi:chart-line')
        expect(iconEl?.props('size')).toBe(IconSize.LG)
    })

    it('passes iconContainerSize to ContainedIcon on RIGHT position', () => {
        const wrapper = factory({
            icon: 'mdi:chart-line',
            iconPosition: MetricCardIconPosition.RIGHT,
            iconContainerSize: IconContainerSize.MD
        })
        expect(wrapper.findComponent(ContainedIcon).props('size')).toBe(IconContainerSize.MD)
    })

    it('defaults ContainedIcon size to SM on RIGHT position', () => {
        const wrapper = factory({
            icon: 'mdi:chart-line',
            iconPosition: MetricCardIconPosition.RIGHT
        })
        expect(wrapper.findComponent(ContainedIcon).props('size')).toBe(IconContainerSize.SM)
    })

    it('renders ContainedIcon for soft and default style types', () => {
        const wrapper = factory({
            icon: 'mdi:chart-line',
            styleType: MetricCardStyle.PRIMARY_BRAND_SOFT
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
            styleType: MetricCardStyle.NEUTRAL_FILLED
        })

        expect(wrapper.findComponent(ContainedIcon).exists()).toBe(false)
        const icons = wrapper.findAllComponents(Icon)
        expect(icons.some((i) => i.props('name') === 'mdi:chart-line')).toBe(true)
    })

    it('uses defaultStyleIconColor only when styleType is DEFAULT', () => {
        const wrapper = factory({
            icon: 'mdi:chart-line',
            styleType: MetricCardStyle.DEFAULT,
            defaultStyleIconColor: ColorAccent.SUCCESS
        })

        expect(wrapper.findComponent(ContainedIcon).props('color')).toBe(ColorAccent.SUCCESS)
    })

    it('uses defaultStyleIconContainerType when styleType is DEFAULT', () => {
        const wrapper = factory({
            icon: 'mdi:chart-line',
            styleType: MetricCardStyle.DEFAULT,
            defaultStyleIconContainerType: IconContainerStyleType.FLAT
        })

        expect(wrapper.findComponent(ContainedIcon).props('styleType')).toBe(IconContainerStyleType.FLAT)
    })

    it('ignores defaultStyleIconContainerType when styleType is a soft variant', () => {
        const wrapper = factory({
            icon: 'mdi:chart-line',
            styleType: MetricCardStyle.PRIMARY_BRAND_SOFT,
            defaultStyleIconContainerType: IconContainerStyleType.FLAT
        })

        expect(wrapper.findComponent(ContainedIcon).props('styleType')).toBe(IconContainerStyleType.FILLED)
    })

    it('uses iconContainerShape when styleType is DEFAULT', () => {
        const wrapper = factory({
            icon: 'mdi:chart-line',
            styleType: MetricCardStyle.DEFAULT,
            iconContainerShape: IconContainerShape.SQUARE
        })

        expect(wrapper.findComponent(ContainedIcon).props('shape')).toBe(IconContainerShape.SQUARE)
    })

    it('ignores iconContainerShape when styleType is a soft variant', () => {
        const wrapper = factory({
            icon: 'mdi:chart-line',
            styleType: MetricCardStyle.PRIMARY_BRAND_SOFT,
            iconContainerShape: IconContainerShape.CIRCLE
        })

        expect(wrapper.findComponent(ContainedIcon).props('shape')).toBe(IconContainerShape.SQUARE)
    })

    it.each([
        [MetricCardStyle.DEFAULT, 'bg-background-container-surface'],
        [MetricCardStyle.PRIMARY_BRAND_FILLED, 'bg-background-primary-brand-default'],
        [MetricCardStyle.PRIMARY_BRAND_SOFT, 'bg-background-primary-brand-soft'],
        [MetricCardStyle.SECONDARY_BRAND_FILLED, 'bg-background-secondary-brand-default'],
        [MetricCardStyle.SECONDARY_BRAND_SOFT, 'bg-background-secondary-brand-soft'],
        [MetricCardStyle.NEUTRAL_FILLED, 'bg-background-neutral-bold'],
        [MetricCardStyle.NEUTRAL_SOFT, 'bg-background-neutral-subtler'],
    ])('applies the correct container class for styleType %s', (styleType, expectedClass) => {
        const wrapper = factory({ styleType })
        expect(wrapper.html()).toContain(expectedClass)
    })

    it('applies the custom filled color class when styleType is CUSTOM_FILLED', () => {
        const wrapper = factory({
            styleType: MetricCardStyle.CUSTOM_FILLED,
            customFilledColorClass: 'bg-background-[#123456]'
        })
        expect(wrapper.html()).toContain('bg-background-[#123456]')
    })

    it('does not render the trend when trend prop is not provided', () => {
        const wrapper = factory()
        expect(wrapper.find(String.raw`.mt-0\.5`).exists()).toBe(false)
    })

    it.each([
        [MetricTrendDirection.UP, 'mdi:arrow-up'],
        [MetricTrendDirection.DOWN, 'mdi:arrow-down'],
        [MetricTrendDirection.NEUTRAL, 'mdi:minus'],
    ])('renders the correct trend icon for direction %s', (trendDirection, expectedIcon) => {
        const wrapper = factory({ trend: '+12%', trendDirection })
        const icons = wrapper.findAllComponents(Icon)
        expect(icons.some((i) => i.props('name') === expectedIcon)).toBe(true)
    })

    it('applies success trend color for UP trend on non-filled styles', () => {
        const wrapper = factory({
            trend: '+12%',
            trendDirection: MetricTrendDirection.UP,
            styleType: MetricCardStyle.DEFAULT
        })
        expect(wrapper.html()).toContain('text-text-success')
    })

    it('applies error trend color for DOWN trend on non-filled styles', () => {
        const wrapper = factory({
            trend: '-5%',
            trendDirection: MetricTrendDirection.DOWN,
            styleType: MetricCardStyle.DEFAULT
        })
        expect(wrapper.html()).toContain('text-text-error')
    })

    it('applies on-filled trend color for any trend direction on filled styles', () => {
        const wrapper = factory({
            trend: '-5%',
            trendDirection: MetricTrendDirection.DOWN,
            styleType: MetricCardStyle.PRIMARY_BRAND_FILLED
        })
        expect(wrapper.html()).toContain('text-text-neutral-on-filled')
    })

    it('applies neutral-subtle trend color for NEUTRAL trend on non-filled styles', () => {
        const wrapper = factory({
            trend: '0%',
            trendDirection: MetricTrendDirection.NEUTRAL,
            styleType: MetricCardStyle.DEFAULT
        })
        expect(wrapper.html()).toContain('text-text-neutral-subtle')
    })

    it('applies trendIconSize to trend Icon', () => {
        const wrapper = factory({ trend: '+12%', trendIconSize: IconSize.MD })
        const icons = wrapper.findAllComponents(Icon)
        const trendIcon = icons.find((i) => ['mdi:arrow-up', 'mdi:arrow-down', 'mdi:minus'].includes(i.props('name')))
        expect(trendIcon?.props('size')).toBe(IconSize.MD)
    })

    it('applies cardHeaderClass to CardHeader', () => {
        const wrapper = factory({ cardHeaderClass: 'custom-header-class' })
        expect(wrapper.html()).toContain('custom-header-class')
    })

    it('applies cardBodyClass to CardBody', () => {
        const wrapper = factory({ cardBodyClass: 'custom-body-class' })
        expect(wrapper.html()).toContain('custom-body-class')
    })

    it('applies amountClass to amount span', () => {
        const wrapper = factory({ amountClass: 'text-4xl' })
        const amountSpan = wrapper.findAll('span').find((s) => s.classes().includes('text-3xl'))
        expect(amountSpan?.classes()).toContain('text-4xl')
    })

    it('applies unitClass to unit span', () => {
        const wrapper = factory({ unit: 'month', unitClass: 'text-base' })
        const unitSpan = wrapper.findAll('span').find((s) => s.text().includes('month'))
        expect(unitSpan?.classes()).toContain('text-base')
    })

    it('applies descriptionWrapperClass to description wrapper', () => {
        const wrapper = factory({ description: 'Last 30 days', descriptionWrapperClass: 'custom-wrapper-class' })
        expect(wrapper.html()).toContain('custom-wrapper-class')
    })

    it('applies featuredDescriptionClass to featured description paragraph', () => {
        const wrapper = factory({ featuredDescription: 'Highlighted', featuredDescriptionClass: 'font-bold' })
        const p = wrapper.findAll('p').find((el) => el.text() === 'Highlighted')
        expect(p?.classes()).toContain('font-bold')
    })

    it('applies descriptionClass to description paragraph', () => {
        const wrapper = factory({ description: 'Last 30 days', descriptionClass: 'text-muted' })
        const p = wrapper.findAll('p').find((el) => el.text() === 'Last 30 days')
        expect(p?.classes()).toContain('text-muted')
    })

    it('applies trendWrapperClass to trend wrapper', () => {
        const wrapper = factory({ trend: '+12%', trendWrapperClass: 'custom-trend-wrapper' })
        expect(wrapper.html()).toContain('custom-trend-wrapper')
    })

    it('applies trendTextClass to trend text span', () => {
        const wrapper = factory({ trend: '+12%', trendTextClass: 'font-bold' })
        const trendSpan = wrapper.findAll('span').find((s) => s.text() === '+12%')
        expect(trendSpan?.classes()).toContain('font-bold')
    })

    it('passes iconContainerSize to ContainedIcon on LEFT position', () => {
        const wrapper = factory({
            icon: 'mdi:chart-line',
            iconPosition: MetricCardIconPosition.LEFT,
            iconContainerSize: IconContainerSize.MD
        })
        expect(wrapper.findComponent(ContainedIcon).props('size')).toBe(IconContainerSize.MD)
    })

    it('defaults ContainedIcon size to SM on LEFT position', () => {
        const wrapper = factory({
            icon: 'mdi:chart-line',
            iconPosition: MetricCardIconPosition.LEFT
        })
        expect(wrapper.findComponent(ContainedIcon).props('size')).toBe(IconContainerSize.SM)
    })

    it('renders the rightTop slot when iconPosition is LEFT', () => {
        const wrapper = factory({ iconPosition: MetricCardIconPosition.LEFT }, {
            slots: { rightTop: '<span class="right-top-content">Badge</span>' }
        })
        expect(wrapper.find('.right-top-content').exists()).toBe(true)
    })

    it('does not render the rightTop slot when iconPosition is RIGHT', () => {
        const wrapper = factory({ iconPosition: MetricCardIconPosition.RIGHT }, {
            slots: { rightTop: '<span class="right-top-content">Badge</span>' }
        })
        expect(wrapper.find('.right-top-content').exists()).toBe(false)
    })

    it('does not render the rightTop slot content when not provided', () => {
        const wrapper = factory({ iconPosition: MetricCardIconPosition.LEFT })
        expect(wrapper.find('.right-top-content').exists()).toBe(false)
    })

    it('renders the footer slot when provided', () => {
        const wrapper = factory({}, {
            slots: { footer: '<span class="footer-content">Footer</span>' }
        })
        expect(wrapper.find('.footer-content').exists()).toBe(true)
    })

    it('does not render the footer wrapper when footer slot is not provided', () => {
        const wrapper = factory()
        expect(wrapper.find('.footer-content').exists()).toBe(false)
    })
})
