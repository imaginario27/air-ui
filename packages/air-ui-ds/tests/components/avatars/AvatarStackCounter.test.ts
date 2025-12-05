import { mount } from '@vue/test-utils'
import AvatarStackCounter from '@/components/avatars/AvatarStackCounter.vue'
import { AvatarShape, AvatarStackSize } from '@/models/enums/avatars'

describe('AvatarStackCounter', () => {
    const factory = (props = {}) => {
        return mount(AvatarStackCounter, {
            props,
        })
    }

    it('renders default text and classes', () => {
        const wrapper = factory()
        
        expect(wrapper.text()).toBe('...')
        expect(wrapper.classes()).toContain('flex')
        expect(wrapper.classes()).toContain('justify-center')
        expect(wrapper.classes()).toContain('items-center')
    })

    it('applies circle shape class by default', () => {
        const wrapper = factory()

        expect(wrapper.classes()).toContain('rounded-full')
    })

    it('applies square shape class when shape is set to SQUARE', () => {
        const wrapper = factory({ shape: AvatarShape.SQUARE })

        expect(wrapper.classes()).toContain('rounded-md')
    })

    it('applies correct size classes based on size prop', () => {
        const wrapperXS = factory({ size: AvatarStackSize.XS })
        expect(wrapperXS.classes()).toContain('w-[24px]')
        expect(wrapperXS.classes()).toContain('h-[24px]')

        const wrapperSM = factory({ size: AvatarStackSize.SM })
        expect(wrapperSM.classes()).toContain('w-[32px]')
        expect(wrapperSM.classes()).toContain('h-[32px]')

        const wrapperMD = factory({ size: AvatarStackSize.MD })
        expect(wrapperMD.classes()).toContain('w-[36px]')
        expect(wrapperMD.classes()).toContain('h-[36px]')
    })

    it('applies correct text size class based on size prop', () => {
        const wrapperXS = factory({ size: AvatarStackSize.XS })
        expect(wrapperXS.find('span').classes()).toContain('text-xs')

        const wrapperSM = factory({ size: AvatarStackSize.SM })
        expect(wrapperSM.find('span').classes()).toContain('text-sm')

        const wrapperMD = factory({ size: AvatarStackSize.MD })
        expect(wrapperMD.find('span').classes()).toContain('text-md')
    })

    it('renders custom text when provided', () => {
        const wrapper = factory({ text: '+5' })
        expect(wrapper.text()).toBe('+5')
    })

})
