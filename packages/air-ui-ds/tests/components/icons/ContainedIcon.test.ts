import { mount } from '@vue/test-utils'
import ContainedIcon from '@/components/icons/ContainedIcon.vue'
import { IconContainerShape, IconContainerSize, IconContainerStyleType } from '@/models/enums/icons'
import { ColorAccent } from '@/models/enums/colors'
import { MdiIcon } from '#components' 

const factory = (props = {}) => {
    return mount(ContainedIcon, {
        props,
    })
}

describe('ContainedIcon.vue', () => {
    it('renders with default props', () => {
        const wrapper = factory()
        const container = wrapper.find('div')
        const icon = wrapper.findComponent(MdiIcon)

        expect(container.classes()).toContain('rounded-full')
        expect(container.classes()).toContain('bg-background-neutral-sublter')
        expect(icon.exists()).toBe(true)
        expect(icon.props('icon')).toBe('mdiHelp')
        expect(icon.classes()).toContain('text-icon-neutral-subtle-on-subtler-bg')
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
                icon: 'text-icon-neutral-subtle-on-subtler-bg'
            },
            [ColorAccent.SUCCESS]: {
                bg: 'bg-background-success-subtler',
                icon: 'text-icon-success'
            },
            [ColorAccent.WARNING]: {
                bg: 'bg-background-warning-subtler',
                icon: 'text-icon-warning-on-bg'
            },
            [ColorAccent.DANGER]: {
                bg: 'bg-background-danger-subtler',
                icon: 'text-icon-danger'
            },
            [ColorAccent.INFO]: {
                bg: 'bg-background-info-subtler',
                icon: 'text-icon-info'
            },
            [ColorAccent.PRIMARY_BRAND]: {
                bg: 'bg-background-primary-brand-soft',
                icon: 'text-icon-primary-brand-default'
            },
            [ColorAccent.SECONDARY_BRAND]: {
                bg: 'bg-background-secondary-brand-soft',
                icon: 'text-icon-secondary-brand-default'
            }
        }

        for (const color of Object.values(ColorAccent)) {
            const wrapper = factory({ color, styleType: IconContainerStyleType.FLAT })
            const container = wrapper.find('div')
            const mdiIcon = wrapper.findComponent(MdiIcon)

            expect(container.classes()).toContain(colorMap[color].bg)
            expect(mdiIcon.classes()).toContain(colorMap[color].icon)
        }
    })

    it('applies correct filled background and icon color (FILLED style)', () => {
        const wrapper = factory({
            color: ColorAccent.DANGER,
            styleType: IconContainerStyleType.FILLED
        })

        const container = wrapper.find('div')
        const mdiIcon = wrapper.findComponent(MdiIcon)

        expect(container.classes()).toContain('bg-background-danger-bold')
        expect(mdiIcon.classes()).toContain('text-icon-neutral-on-filled-bg')
    })

    it('applies correct size classes for container and icon', () => {
        const sizeMap = {
            [IconContainerSize.LG]: { classes: ['w-[40px]', 'h-[40px]'], iconSize: '24' },
            [IconContainerSize.XL]: { classes: ['w-[48px]', 'h-[48px]'], iconSize: '24' },
            [IconContainerSize.XXL]: { classes: ['w-[56px]', 'h-[56px]'], iconSize: '40' },
            [IconContainerSize.XXXL]: { classes: ['w-[80px]', 'h-[80px]'], iconSize: '48' }
        }

        for (const size of Object.values(IconContainerSize)) {
            const wrapper = factory({ size })
            const container = wrapper.find('div')
            const mdiIcon = wrapper.findComponent(MdiIcon)

            expect(container.classes()).toEqual(expect.arrayContaining(sizeMap[size].classes))
            expect(mdiIcon.props('size')).toBe(sizeMap[size].iconSize)
        }
    })

    it('passes the correct icon prop to MdiIcon', () => {
        const wrapper = factory({ icon: 'mdiAccount' })
        const mdiIcon = wrapper.findComponent(MdiIcon)
        expect(mdiIcon.props('icon')).toBe('mdiAccount')
    })
})
