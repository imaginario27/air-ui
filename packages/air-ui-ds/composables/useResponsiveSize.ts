import { toValue, type MaybeRefOrGetter } from 'vue'

interface SizeClasses {
    base: string
    md: string
}

type SizeAxis = Partial<Record<ButtonSize, SizeClasses>>

// Tailwind only generates literal class names, so each value has its plain and its `md:` version spelled out.
const icon16: SizeClasses = {
    base: 'w-[16px] h-[16px] min-w-[16px] min-h-[16px]',
    md: 'md:w-[16px] md:h-[16px] md:min-w-[16px] md:min-h-[16px]',
}
const icon20: SizeClasses = {
    base: 'w-[20px] h-[20px] min-w-[20px] min-h-[20px]',
    md: 'md:w-[20px] md:h-[20px] md:min-w-[20px] md:min-h-[20px]',
}
const icon24: SizeClasses = {
    base: 'w-[24px] h-[24px] min-w-[24px] min-h-[24px]',
    md: 'md:w-[24px] md:h-[24px] md:min-w-[24px] md:min-h-[24px]',
}
const textXs: SizeClasses = { base: 'text-xs', md: 'md:text-xs' }
const textSm: SizeClasses = { base: 'text-sm', md: 'md:text-sm' }
const textBase: SizeClasses = { base: 'text-base', md: 'md:text-base' }
const gap1: SizeClasses = { base: 'gap-1', md: 'md:gap-1' }
const gap15: SizeClasses = { base: 'gap-1.5', md: 'md:gap-1.5' }
const gap2: SizeClasses = { base: 'gap-2', md: 'md:gap-2' }

const heightAxis: SizeAxis = {
    [ButtonSize.XS]: { base: 'h-[24px]', md: 'md:h-[24px]' },
    [ButtonSize.SM]: { base: 'h-[28px]', md: 'md:h-[28px]' },
    [ButtonSize.MD]: { base: 'h-[32px]', md: 'md:h-[32px]' },
    [ButtonSize.LG]: { base: 'h-[36px]', md: 'md:h-[36px]' },
    [ButtonSize.XL]: { base: 'h-[40px]', md: 'md:h-[40px]' },
    [ButtonSize.XXL]: { base: 'h-[48px]', md: 'md:h-[48px]' },
}

const squareAxis: SizeAxis = {
    [ButtonSize.XS]: { base: 'w-[24px] h-[24px]', md: 'md:w-[24px] md:h-[24px]' },
    [ButtonSize.SM]: { base: 'w-[28px] h-[28px]', md: 'md:w-[28px] md:h-[28px]' },
    [ButtonSize.MD]: { base: 'w-[32px] h-[32px]', md: 'md:w-[32px] md:h-[32px]' },
    [ButtonSize.LG]: { base: 'w-[36px] h-[36px]', md: 'md:w-[36px] md:h-[36px]' },
    [ButtonSize.XL]: { base: 'w-[40px] h-[40px]', md: 'md:w-[40px] md:h-[40px]' },
    [ButtonSize.XXL]: { base: 'w-[48px] h-[48px]', md: 'md:w-[48px] md:h-[48px]' },
}

const iconAxis: SizeAxis = {
    [ButtonSize.XS]: icon16,
    [ButtonSize.SM]: icon16,
    [ButtonSize.MD]: icon16,
    [ButtonSize.LG]: icon20,
    [ButtonSize.XL]: icon20,
    [ButtonSize.XXL]: icon24,
}

const textAxis: SizeAxis = {
    [ButtonSize.XS]: textXs,
    [ButtonSize.SM]: textSm,
    [ButtonSize.MD]: textSm,
    [ButtonSize.LG]: textSm,
    [ButtonSize.XL]: textSm,
    [ButtonSize.XXL]: textBase,
}

const gapAxis: SizeAxis = {
    [ButtonSize.XS]: gap1,
    [ButtonSize.SM]: gap15,
    [ButtonSize.MD]: gap2,
    [ButtonSize.LG]: gap2,
    [ButtonSize.XL]: gap2,
    [ButtonSize.XXL]: gap2,
}

const paddingSmall: SizeClasses = { base: 'px-3', md: 'md:px-3' }
const paddingLarge: SizeClasses = { base: 'px-4', md: 'md:px-4' }
const paddingAxis: SizeAxis = {
    [ButtonSize.XS]: paddingSmall,
    [ButtonSize.SM]: paddingSmall,
    [ButtonSize.MD]: paddingLarge,
    [ButtonSize.LG]: paddingLarge,
    [ButtonSize.XL]: paddingLarge,
    [ButtonSize.XXL]: paddingLarge,
}

const paddingLeftIconSmall: SizeClasses = { base: 'pl-3 pr-4', md: 'md:pl-3 md:pr-4' }
const paddingLeftIconLarge: SizeClasses = { base: 'pl-4 pr-5', md: 'md:pl-4 md:pr-5' }
const paddingLeftIconAxis: SizeAxis = {
    [ButtonSize.XS]: paddingLeftIconSmall,
    [ButtonSize.SM]: paddingLeftIconSmall,
    [ButtonSize.MD]: paddingLeftIconLarge,
    [ButtonSize.LG]: paddingLeftIconLarge,
    [ButtonSize.XL]: paddingLeftIconLarge,
    [ButtonSize.XXL]: paddingLeftIconLarge,
}

const paddingRightIconSmall: SizeClasses = { base: 'pl-4 pr-3', md: 'md:pl-4 md:pr-3' }
const paddingRightIconLarge: SizeClasses = { base: 'pl-5 pr-4', md: 'md:pl-5 md:pr-4' }
const paddingRightIconAxis: SizeAxis = {
    [ButtonSize.XS]: paddingRightIconSmall,
    [ButtonSize.SM]: paddingRightIconSmall,
    [ButtonSize.MD]: paddingRightIconLarge,
    [ButtonSize.LG]: paddingRightIconLarge,
    [ButtonSize.XL]: paddingRightIconLarge,
    [ButtonSize.XXL]: paddingRightIconLarge,
}

export const useResponsiveSize = (options: {
    size: MaybeRefOrGetter<ButtonSize>
    responsiveSize?: MaybeRefOrGetter<boolean | null | undefined>
    iconPosition?: MaybeRefOrGetter<IconPosition | undefined>
}) => {
    const dsConfig = useDSConfig()

    // The prop wins when set; otherwise the global config decides
    const isResponsive = computed(() => toValue(options.responsiveSize) ?? dsConfig.buttons.responsiveSize)

    const pick = (axis: SizeAxis, fallback: string) => {
        const size = toValue(options.size)
        const own = axis[size]

        if (!own) return fallback

        const mobileSize = dsConfig.buttons.mobileSizeMap[size]
        const mobile = axis[mobileSize]

        // Same class set on every screen, so there is nothing to override at `md`
        if (!isResponsive.value || !mobile || mobileSize === size) return own.base

        return `${mobile.base} ${own.md}`
    }

    const buttonSizeClass = computed(() => pick(heightAxis, 'h-[36px]'))
    const iconButtonSizeClass = computed(() => pick(squareAxis, 'w-[36px] h-[36px]'))
    const iconSizeClass = computed(() => pick(iconAxis, icon20.base))
    const textSizeClass = computed(() => pick(textAxis, 'text-sm'))
    const gapClass = computed(() => pick(gapAxis, 'gap-2'))
    const horizontalPaddingClass = computed(() => {
        const iconPosition = toValue(options.iconPosition)

        if (iconPosition === IconPosition.LEFT) return pick(paddingLeftIconAxis, 'px-3')
        if (iconPosition === IconPosition.RIGHT) return pick(paddingRightIconAxis, 'px-3')
        return pick(paddingAxis, 'px-3')
    })

    return {
        buttonSizeClass,
        iconButtonSizeClass,
        iconSizeClass,
        textSizeClass,
        gapClass,
        horizontalPaddingClass,
    }
}
