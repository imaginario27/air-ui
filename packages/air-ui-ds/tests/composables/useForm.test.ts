import { useForm } from '@/composables/useForm'
import { FormValidationMode } from '@/models/enums/formValidations'
import { useFormValidationMode } from '@/composables/useFormValidationMode'

vi.mock('@/composables/useFormValidationMode', () => ({
    useFormValidationMode: vi.fn()
}))

describe('useForm', () => {
    const mockValidationMode = {
        currentFormValidationMode: ref(FormValidationMode.SUBMIT)
    }

    beforeEach(() => {
        vi.resetAllMocks()
        ;(useFormValidationMode as vi.Mock).mockReturnValue(mockValidationMode)
    })

    it('initializes with default validation mode', () => {
        const formData = reactive({ name: '' })
        useForm({
            formData,
            requiredFields: ['name'],
            requiredFieldMessage: 'Required'
        })

        expect(mockValidationMode.currentFormValidationMode.value).toBe(FormValidationMode.SUBMIT)
    })

    it('sets validation mode from options', () => {
        const formData = reactive({ name: '' })
        useForm({
            formData,
            requiredFields: ['name'],
            requiredFieldMessage: 'Required',
            validateOn: FormValidationMode.BLUR
        })

        expect(mockValidationMode.currentFormValidationMode.value).toBe(FormValidationMode.BLUR)
    })

    it('validates required field with empty string', () => {
        const formData = reactive({ name: '' })
        const { formErrors, validateFormFields } = useForm({
            formData,
            requiredFields: ['name'],
            requiredFieldMessage: 'Required'
        })

        const isValid = validateFormFields()

        expect(isValid).toBe(false)
        expect(formErrors.name).toBe('Required')
        expect(mockValidationMode.currentFormValidationMode.value).toBe(FormValidationMode.BLUR)
    })

    it('validates required field with null value', () => {
        const formData = reactive({ age: null })
        const { formErrors, validateFormFields } = useForm({
            formData,
            requiredFields: ['age'],
            requiredFieldMessage: 'Required'
        })

        const isValid = validateFormFields()

        expect(isValid).toBe(false)
        expect(formErrors.age).toBe('Required')
    })

    it('validates with custom validator', () => {
        const formData = reactive({ email: 'invalid' })
        const validator = (val: unknown) => (val === 'valid@example.com' ? null : 'Invalid email')

        const { formErrors, validateFormFields } = useForm({
            formData,
            requiredFields: ['email'],
            requiredFieldMessage: 'Required',
            validators: {
                email: validator
            }
        })

        const isValid = validateFormFields()

        expect(isValid).toBe(false)
        expect(formErrors.email).toBe('Invalid email')
    })

    it('returns true when all fields are valid', () => {
        const formData = reactive({ name: 'John' })
        const { formErrors, validateFormFields } = useForm({
            formData,
            requiredFields: ['name'],
            requiredFieldMessage: 'Required'
        })

        const isValid = validateFormFields()

        expect(isValid).toBe(true)
        expect(formErrors.name).toBe('')
    })

    it('validates nested fields', () => {
        const formData = reactive({ user: { email: '' } })
        const { formErrors, validateFormFields } = useForm({
            formData,
            requiredFields: ['user.email'],
            requiredFieldMessage: 'Required'
        })

        const isValid = validateFormFields()

        expect(isValid).toBe(false)

        // Safe cast after narrowing
        const userErrors = formErrors.user as unknown as Record<string, string>
        expect(userErrors.email).toBe('Required')
    })
    
    it('resets all field types', () => {
        const formData = reactive({
            str: 'hello',
            num: 42,
            bool: true,
            arr: [1, 2, 3],
            obj: { nested: 'value' }
        })

        const { resetForm } = useForm({
            formData,
            requiredFields: [],
            requiredFieldMessage: 'Required'
        })

        resetForm()

        expect(formData.str).toBe('')
        expect(formData.num).toBe(0)
        expect(formData.bool).toBe(false)
        expect(formData.arr).toEqual([])
        expect(formData.obj.nested).toBe('')
    })

    it('resets nested objects recursively', () => {
        const formData = reactive({
            user: {
                name: 'John',
                profile: {
                    email: 'john@example.com'
                }
            }
        })

        const { resetForm } = useForm({
            formData,
            requiredFields: [],
            requiredFieldMessage: 'Required'
        })

        resetForm()

        expect(formData.user.name).toBe('')
        expect(formData.user.profile.email).toBe('')
    })

    it('clears all form errors on reset', () => {
        const formData = reactive({ name: '' })
        const { formErrors, validateFormFields, resetForm } = useForm({
            formData,
            requiredFields: ['name'],
            requiredFieldMessage: 'Required'
        })

        validateFormFields()
        expect(formErrors.name).toBe('Required')

        resetForm()
        expect(formErrors.name).toBe('')
    })

    it('updates validation mode on reset', () => {
        const formData = reactive({ name: '' })
        const { resetForm } = useForm({
            formData,
            requiredFields: ['name'],
            requiredFieldMessage: 'Required',
            validateOn: FormValidationMode.BLUR
        })

        mockValidationMode.currentFormValidationMode.value = FormValidationMode.SUBMIT
        resetForm()

        expect(mockValidationMode.currentFormValidationMode.value).toBe(FormValidationMode.BLUR)
    })

    it('validates a single field', () => {
        const formData = reactive({ email: '' })
        const { validateField } = useForm({
            formData,
            requiredFields: ['email'],
            requiredFieldMessage: 'Required'
        })

        const error = validateField('email')
        expect(error).toBe('Required')
    })
})
