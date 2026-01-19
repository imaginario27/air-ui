import { mount } from '@vue/test-utils'
import StepIndicator from '@/components/steppers/StepIndicator.vue'
import Icon from '@/components/icons/Icon.vue'
import { StepIndicatorType, StepStatus, StepIndicatorSize } from '@/models/enums/steppers'

describe('StepIndicator.vue', () => {
    const defaultProps = {
        step: 2,
        stepIcon: 'mdi:account',
        completedIcon: 'mdi:check',
        isHovered: false
    }

    const factory = (props = {}) => {
        return mount(StepIndicator, {
            props: {
                ...defaultProps,
                ...props
            },
            global: {
                stubs: {
                    Icon: {
                        name: 'Icon',
                        props: ['name', 'iconClass'],
                        template: '<div class="icon-stub" />'
                    }
                }
            }
        })
    }

    it('renders step number when status is NONE and type is NUMBER', () => {
        const wrapper = factory({
            status: StepStatus.NONE,
            type: StepIndicatorType.NUMBER
        })

        expect(wrapper.text()).toContain('2')
        expect(wrapper.findComponent(Icon).exists()).toBe(false)
    })

    it('renders icon when status is NONE and type is ICON', () => {
        const wrapper = factory({
            status: StepStatus.NONE,
            type: StepIndicatorType.ICON
        })

        const icon = wrapper.findComponent(Icon)
        expect(icon.exists()).toBe(true)
        expect(icon.props('name')).toBe('mdi:account')
    })

    it('applies background class for status NONE', () => {
        const wrapper = factory({ status: StepStatus.NONE })
        const rootDiv = wrapper.find('div')
        expect(rootDiv.classes()).toContain('bg-background-neutral-subtle')
        expect(rootDiv.classes()).not.toContain('border-border-default')
    })

    it('renders step number when status is INACTIVE and type is NUMBER', () => {
        const wrapper = factory({
            status: StepStatus.INACTIVE,
            type: StepIndicatorType.NUMBER
        })

        expect(wrapper.text()).toContain('2')
        expect(wrapper.findComponent(Icon).exists()).toBe(false)
    })

    it('renders icon when status is INACTIVE and type is ICON', () => {
        const wrapper = factory({
            status: StepStatus.INACTIVE,
            type: StepIndicatorType.ICON
        })

        const icon = wrapper.findComponent(Icon)
        expect(icon.exists()).toBe(true)
        expect(icon.props('name')).toBe('mdi:account')
    })

    it('renders step number when status is CURRENT and type is NUMBER', () => {
        const wrapper = factory({
            status: StepStatus.CURRENT,
            type: StepIndicatorType.NUMBER
        })

        expect(wrapper.text()).toContain('2')
    })

    it('renders icon when status is CURRENT and type is ICON', () => {
        const wrapper = factory({
            status: StepStatus.CURRENT,
            type: StepIndicatorType.ICON
        })

        const icon = wrapper.findComponent(Icon)
        expect(icon.exists()).toBe(true)
        expect(icon.props('name')).toBe('mdi:account')
    })

    it('renders empty circle when status is CURRENT and type is EMPTY', () => {
        const wrapper = factory({
            status: StepStatus.CURRENT,
            type: StepIndicatorType.EMPTY
        })

        const circle = wrapper.find('div > span > div.rounded-full')
        expect(circle.exists()).toBe(true)
    })

    it('renders completed icon when status is COMPLETED', () => {
        const wrapper = factory({ status: StepStatus.COMPLETED })

        const icon = wrapper.findComponent(Icon)
        expect(icon.exists()).toBe(true)
        expect(icon.props('name')).toBe('mdi:check')

        const rootDiv = wrapper.find('div')
        expect(rootDiv.classes()).toContain('bg-background-primary-brand-default')
    })

    it('applies hover class for text and border when hovered and not COMPLETED', () => {
        const wrapper = factory({
            status: StepStatus.CURRENT,
            isHovered: true
        })

        const rootDiv = wrapper.find('div')
        expect(rootDiv.classes()).toContain('border-border-primary-brand-hover')

        const span = wrapper.find('span')
        expect(span.classes()).toContain('text-text-primary-brand-hover')
    })

    it('does not apply hover styles when status is COMPLETED even if hovered', () => {
        const wrapper = factory({
            status: StepStatus.COMPLETED,
            isHovered: true
        })

        const rootDiv = wrapper.find('div')
        expect(rootDiv.classes()).toContain('border-border-primary-brand-active')
        expect(rootDiv.classes()).not.toContain('border-border-primary-brand-hover')
    })

    it('uses correct icon size classes based on component size', () => {
        const wrapper = factory({
            status: StepStatus.CURRENT,
            type: StepIndicatorType.ICON,
            size: StepIndicatorSize.LG
        })

        const icon = wrapper.findComponent(Icon)
        const iconClass = icon.props('iconClass')

        const normalizedClass = Array.isArray(iconClass) ? iconClass.join(' ') : iconClass

        expect(normalizedClass).toContain('w-[20px]')
        expect(normalizedClass).toContain('h-[20px]')
    })

    it('uses correct container size classes', () => {
        const wrapper = factory({
            size: StepIndicatorSize.MD
        })

        const rootDiv = wrapper.find('div')
        expect(rootDiv.classes()).toContain('w-[32px]')
        expect(rootDiv.classes()).toContain('h-[32px]')
    })

    it('falls back to default size classes if invalid size is provided', () => {
        const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})

        const wrapper = factory({
            // @ts-expect-error intentionally invalid
            size: 'INVALID'
        })

        const rootDiv = wrapper.find('div')
        expect(rootDiv.classes()).toContain('w-[40px]')
        expect(rootDiv.classes()).toContain('h-[40px]')

        warnSpy.mockRestore()
    })

    it('applies circle hover color when type is EMPTY and hovered', () => {
        const wrapper = factory({
            type: StepIndicatorType.EMPTY,
            status: StepStatus.CURRENT,
            isHovered: true
        })

        const circle = wrapper.find('div > span > div.rounded-full')
        expect(circle.classes()).toContain('bg-text-primary-brand-hover')
    })

    it('applies correct background class for COMPLETED', () => {
        const wrapper = factory({
            status: StepStatus.COMPLETED
        })

        const rootDiv = wrapper.find('div')
        expect(rootDiv.classes()).toContain('bg-background-primary-brand-default')
    })

    it('applies correct background class for NONE', () => {
        const wrapper = factory({
            status: StepStatus.NONE
        })

        const rootDiv = wrapper.find('div')
        expect(rootDiv.classes()).toContain('bg-background-neutral-subtle')
    })
})
