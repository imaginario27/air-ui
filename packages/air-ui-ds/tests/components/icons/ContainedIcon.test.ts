import { mount } from '@vue/test-utils'
import ContainedIcon from '@/components/icons/ContainedIcon.vue'
import { IconContainerShape, IconContainerSize, IconContainerStyleType, IconType } from '@/models/enums/icons'
import { ColorAccent } from '@/models/enums/colors'

const factory = (props = {}) => {
    return mount(ContainedIcon, {
        props,
        global: {
            stubs: {
                Icon: {
                    name: 'Icon',
                    props: ['icon', 'type', 'mode', 'iconClass'],
                    template: '<div class="mock-icon" />',
                },
            },
        },
    })
}

describe('ContainedIcon.vue', () => {
    it('renders with default props', () => {
        const wrapper = factory()
        const container = wrapper.find('div')
        const icon = wrapper.findComponent({ name: 'Icon' })

        expect(container.classes()).toContain('rounded-full')
        expect(container.classes()).toContain('bg-background-neutral-sublter')
        expect(icon.exists()).toBe(true)
        expect(icon.props('icon')).toBe('mdiHelp')
        expect(icon.props('iconClass')).toContain('text-icon-neutral-subtle-on-subtler-bg')
    })

    it('renders square shape when shape is SQUARE', () => {
        const wrapper = factory({ shape: IconContainerShape.SQUARE })
        const container = wrapper.find('div')
        expect(container.classes()).toContain('rounded-lg')
    })

    it('applies correct background and icon color for each ColorAccent (FLAT)', () => {
        const colorMap = {
            [ColorAccent.NEUTRAL]: {
                bg: 'bg-background-neutral-sublter',
                icon: 'text-icon-neutral-subtle-on-subtler-bg',
            },
            [ColorAccent.SUCCESS]: {
                bg: 'bg-background-success-subtler',
                icon: 'text-icon-success',
            },
            [ColorAccent.WARNING]: {
                bg: 'bg-background-warning-subtler',
                icon: 'text-icon-warning-on-bg',
            },
            [ColorAccent.DANGER]: {
                bg: 'bg-background-danger-subtler',
                icon: 'text-icon-danger',
            },
            [ColorAccent.INFO]: {
                bg: 'bg-background-info-subtler',
                icon: 'text-icon-info',
            },
            [ColorAccent.PRIMARY_BRAND]: {
                bg: 'bg-background-primary-brand-soft',
                icon: 'text-icon-primary-brand-default',
            },
            [ColorAccent.SECONDARY_BRAND]: {
                bg: 'bg-background-secondary-brand-soft',
                icon: 'text-icon-secondary-brand-default',
            },
        }

        for (const color of Object.values(ColorAccent)) {
            const wrapper = factory({
                color,
                styleType: IconContainerStyleType.FLAT,
            })

            const container = wrapper.find('div')
            const icon = wrapper.findComponent({ name: 'Icon' })

            expect(container.classes()).toContain(colorMap[color].bg)
            expect(icon.props('iconClass')).toContain(colorMap[color].icon)
        }
    })

    it('applies correct filled background and icon color (FILLED style)', () => {
        const wrapper = factory({
            color: ColorAccent.DANGER,
            styleType: IconContainerStyleType.FILLED,
        })

        const container = wrapper.find('div')
        const icon = wrapper.findComponent({ name: 'Icon' })

        expect(container.classes()).toContain('bg-background-danger-bold')
        expect(icon.props('iconClass')).toContain('text-icon-neutral-on-filled-bg')
    })

    it('applies correct size classes for container and icon', () => {
        const sizeMap = {
            [IconContainerSize.LG]: {
                container: ['w-[40px]', 'h-[40px]'],
                icon: 'w-[24px]',
            },
            [IconContainerSize.XL]: {
                container: ['w-[48px]', 'h-[48px]'],
                icon: 'w-[24px]',
            },
            [IconContainerSize.XXL]: {
                container: ['w-[56px]', 'h-[56px]'],
                icon: 'w-[40px]',
            },
            [IconContainerSize.XXXL]: {
                container: ['w-[80px]', 'h-[80px]'],
                icon: 'w-[48px]',
            },
        }

        for (const size of Object.values(IconContainerSize)) {
            const wrapper = factory({ size })
            const container = wrapper.find('div')
            const icon = wrapper.findComponent({ name: 'Icon' })

            expect(container.classes()).toEqual(expect.arrayContaining(sizeMap[size].container))
            expect(icon.props('iconClass')).toContain(sizeMap[size].icon)
        }
    })

    it('passes the correct icon prop to Icon', () => {
        const wrapper = factory({ icon: 'mdiAccount' })
        const icon = wrapper.findComponent({ name: 'Icon' })
        expect(icon.props('icon')).toBe('mdiAccount')
    })

    it('forwards type and mode props to Icon', () => {
        const wrapper = factory({ type: IconType.COLLECTION, mode: IconMode.SVG })
        const icon = wrapper.findComponent({ name: 'Icon' })

        expect(icon.props('type')).toBe(IconType.COLLECTION)
        expect(icon.props('mode')).toBe(IconMode.SVG)
    })
})
