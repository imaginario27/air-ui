import { FormValidationMode } from '@/models/enums/formValidations'
import { useFormValidationMode } from '@/composables/useFormValidationMode'

export const useForm = <
    T extends Record<string, any>
>(options: {
    formData: T,
    requiredFields: string[],
    requiredFieldMessage?: string,
    validators?: Partial<Record<string, (value: unknown) => string | null>>,
    validateOn?: FormValidationMode,
}) => {
    const { currentFormValidationMode } = useFormValidationMode()

    const formErrors = reactive({}) as Record<string, string>

    currentFormValidationMode.value = options.validateOn ?? FormValidationMode.SUBMIT

    const setDeep = (obj: Record<string, any>, path: string, value: any) => {
        const keys = path.split('.')
        const lastKey = keys.pop()!
        const target = keys.reduce((o, k) => (o[k] ??= {}), obj)
        target[lastKey] = value
    }

    const getDeep = (obj: Record<string, any>, path: string) => {
        return path.split('.').reduce((o, k) => o?.[k], obj)
    }

    const validateField = (fieldPath: string): string => {
        const value = getDeep(options.formData, fieldPath)
        const validator = options.validators?.[fieldPath]

        if (validator) {
            const result = validator(value)
            return result || ''
        }

        if (
            value === undefined ||
            value === null ||
            (typeof value === 'string' && (value as string).trim() === '')
        ) {
            return options.requiredFieldMessage ?? 'This field is required'
        }

        return ''
    }

    const validateFormFields = (): boolean => {
        let isValid = true

        for (const fieldPath of options.requiredFields) {
            const error = validateField(fieldPath)
            setDeep(formErrors, fieldPath, error)

            if (error) {
                isValid = false
            }
        }

        if (!isValid) {
            currentFormValidationMode.value = FormValidationMode.BLUR
        }

        return isValid
    }

    const resetForm = () => {
        const formData = options.formData as Record<string, any>

        const resetValue = (value: unknown): unknown => {
            if (Array.isArray(value)) {
                value.splice(0, value.length)
                return value
            }

            switch (typeof value) {
                case 'string':
                    return ''
                case 'number':
                    return 0
                case 'boolean':
                    return false
                case 'object':
                    if (value !== null) {
                        resetObject(value)
                    }
                    return value
                default:
                    return ''
            }
        }

        const resetObject = (obj: Record<string, any>) => {
            for (const key of Object.keys(obj)) {
                const value = obj[key]

                if (Array.isArray(value)) {
                    value.splice(0, value.length) 
                } else if (typeof value === 'object' && value !== null) {
                    resetObject(value) 
                } else {
                    obj[key] = resetValue(value)
                }
            }
        }

        for (const key of Object.keys(formData)) {
            const value = formData[key]

            if (Array.isArray(value)) {
                value.splice(0, value.length) 
            } else if (typeof value === 'object' && value !== null) {
                resetObject(value)
            } else {
                formData[key] = resetValue(value)
            }
        }

        for (const key of Object.keys(formErrors)) {
            setDeep(formErrors, key, '')
        }

        currentFormValidationMode.value = options.validateOn ?? FormValidationMode.SUBMIT
    }

    return {
        formErrors,
        resetForm,
        validateFormFields,
        validateField,
    }
}
