import { useAspectRatioClass } from '@/composables/useAspectRatioClass'

describe('useAspectRatioClass', () => {
    it('maps every aspect ratio to its Tailwind class', () => {
        const expected: Record<AspectRatio, string> = {
            [AspectRatio.AR_1_1]: 'aspect-[1/1]',
            [AspectRatio.AR_4_3]: 'aspect-[4/3]',
            [AspectRatio.AR_3_2]: 'aspect-[3/2]',
            [AspectRatio.AR_16_9]: 'aspect-[16/9]',
            [AspectRatio.AR_3_4]: 'aspect-[3/4]',
            [AspectRatio.AR_4_5]: 'aspect-[4/5]',
            [AspectRatio.AR_2_3]: 'aspect-[2/3]',
        }

        Object.entries(expected).forEach(([ratio, className]) => {
            expect(useAspectRatioClass(ratio as AspectRatio).value).toBe(className)
        })
    })

    it('returns undefined without a ratio', () => {
        expect(useAspectRatioClass(undefined).value).toBeUndefined()
    })

    it('reacts to getter changes', () => {
        const ratio = ref<AspectRatio | undefined>(AspectRatio.AR_1_1)
        const className = useAspectRatioClass(() => ratio.value)

        ratio.value = AspectRatio.AR_16_9

        expect(className.value).toBe('aspect-[16/9]')
    })
})
