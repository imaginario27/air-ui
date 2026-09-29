const dsConfig = reactive<DesignSystemConfig>({
    forms: {
        optionalLabelText: () => '(optional)',
    },
})

export const useDSConfig = () => dsConfig
