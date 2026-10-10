const aspectRatioClasses: Record<AspectRatio, string> = {
    [AspectRatio.AR_1_1]: 'aspect-[1/1]',
    [AspectRatio.AR_4_3]: 'aspect-[4/3]',
    [AspectRatio.AR_3_2]: 'aspect-[3/2]',
    [AspectRatio.AR_16_9]: 'aspect-[16/9]',
    [AspectRatio.AR_3_4]: 'aspect-[3/4]',
    [AspectRatio.AR_4_5]: 'aspect-[4/5]',
    [AspectRatio.AR_2_3]: 'aspect-[2/3]',
}

/**
 * Resolves the Tailwind `aspect-[w/h]` class for an `AspectRatio`.
 * Returns `undefined` when no ratio is given, so the element keeps its natural size.
 */
export const useAspectRatioClass = (aspectRatio: MaybeRefOrGetter<AspectRatio | undefined>) =>
    computed(() => {
        const ratio = toValue(aspectRatio)
        return ratio ? aspectRatioClasses[ratio] : undefined
    })
