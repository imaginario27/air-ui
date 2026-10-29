import { useResponsiveSize } from '@/composables/useResponsiveSize'
import { useDSConfig } from '@/composables/useDSConfig'
import { ButtonSize } from '@/models/enums/buttons'
import { IconPosition } from '@/models/enums/icons'

describe('useResponsiveSize', () => {
    const dsConfig = useDSConfig()
    const defaultMap = { ...dsConfig.buttons.mobileSizeMap }

    afterEach(() => {
        dsConfig.buttons.responsiveSize = false
        Object.assign(dsConfig.buttons.mobileSizeMap, defaultMap)
    })

    it('keeps the plain size classes when responsiveSize is off', () => {
        const { buttonSizeClass, iconSizeClass, textSizeClass, gapClass, horizontalPaddingClass } = useResponsiveSize({
            size: ButtonSize.SM,
        })

        expect(buttonSizeClass.value).toBe('h-[28px]')
        expect(iconSizeClass.value).toBe('w-[16px] h-[16px] min-w-[16px] min-h-[16px]')
        expect(textSizeClass.value).toBe('text-sm')
        expect(gapClass.value).toBe('gap-1.5')
        expect(horizontalPaddingClass.value).toBe('px-3')
    })

    it('uses the mobile size first and the own size from md on when responsiveSize is on', () => {
        const { buttonSizeClass, iconSizeClass, textSizeClass, gapClass, horizontalPaddingClass } = useResponsiveSize({
            size: ButtonSize.XS,
            responsiveSize: true,
        })

        // XS maps to MD on mobile
        expect(buttonSizeClass.value).toBe('h-[32px] md:h-[24px]')
        expect(iconSizeClass.value).toBe(
            'w-[16px] h-[16px] min-w-[16px] min-h-[16px] md:w-[16px] md:h-[16px] md:min-w-[16px] md:min-h-[16px]',
        )
        expect(textSizeClass.value).toBe('text-sm md:text-xs')
        expect(gapClass.value).toBe('gap-2 md:gap-1')
        expect(horizontalPaddingClass.value).toBe('px-4 md:px-3')
    })

    it.each([
        [IconPosition.LEFT, 'pl-4 pr-5 md:pl-3 md:pr-4'],
        [IconPosition.RIGHT, 'pl-5 pr-4 md:pl-4 md:pr-3'],
        [IconPosition.NONE, 'px-4 md:px-3'],
    ])('resolves the padding for icon position %s', (iconPosition, expected) => {
        const { horizontalPaddingClass } = useResponsiveSize({
            size: ButtonSize.SM,
            responsiveSize: true,
            iconPosition,
        })

        expect(horizontalPaddingClass.value).toBe(expected)
    })

    it('resolves the square size for icon buttons', () => {
        const { iconButtonSizeClass } = useResponsiveSize({ size: ButtonSize.SM, responsiveSize: true })

        expect(iconButtonSizeClass.value).toBe('w-[36px] h-[36px] md:w-[28px] md:h-[28px]')
    })

    it.each([ButtonSize.XL, ButtonSize.XXL])('adds no md override when %s maps to itself', (size) => {
        const { buttonSizeClass } = useResponsiveSize({ size, responsiveSize: true })

        expect(buttonSizeClass.value).not.toContain('md:')
    })

    it('follows the global config when the prop is not set', () => {
        const { buttonSizeClass } = useResponsiveSize({ size: ButtonSize.SM, responsiveSize: null })
        expect(buttonSizeClass.value).toBe('h-[28px]')

        dsConfig.buttons.responsiveSize = true
        expect(buttonSizeClass.value).toBe('h-[36px] md:h-[28px]')
    })

    it('lets the prop override the global config', () => {
        dsConfig.buttons.responsiveSize = true
        const { buttonSizeClass } = useResponsiveSize({ size: ButtonSize.SM, responsiveSize: false })

        expect(buttonSizeClass.value).toBe('h-[28px]')
    })

    it('respects a custom mobile size map', () => {
        dsConfig.buttons.mobileSizeMap[ButtonSize.SM] = ButtonSize.XXL
        const { buttonSizeClass } = useResponsiveSize({ size: ButtonSize.SM, responsiveSize: true })

        expect(buttonSizeClass.value).toBe('h-[48px] md:h-[28px]')
    })

    it('reacts to size changes', () => {
        const size = ref(ButtonSize.SM)
        const { buttonSizeClass } = useResponsiveSize({ size, responsiveSize: true })

        size.value = ButtonSize.MD

        expect(buttonSizeClass.value).toBe('h-[36px] md:h-[32px]')
    })
})
