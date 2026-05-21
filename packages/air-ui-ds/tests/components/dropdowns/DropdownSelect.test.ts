import { mount } from '@vue/test-utils'
import DropdownSelect from '@/components/dropdowns/DropdownSelect.vue'
import Icon from '@/components/icons/Icon.vue'
import User from '@/components/users/User.vue'
import ActionIconButton from '@/components/buttons/ActionIconButton.vue'
import { SelectType } from '@/models/enums/selects'
import { nextTick } from 'vue'

vi.mock('@/assets/images/placeholders/missing-image-placeholder.png', () => ({
    default: '/mocked/missing-image.png'
}))

const options = [
    { text: 'Option 1', value: '1' },
    { text: 'Option 2', value: '2' },
    { text: 'Option 3', value: '3' }
]

const factory = (props: Record<string, any> = {}) => {
    return mount(DropdownSelect, {
        props: {
            options,
            ...props
        },
        global: {
            stubs: {
                DropdownSelectItem: {
                    template: '<div class="stubbed-item" @click="$emit(`click`)">{{ text }}</div>',
                    props: [
                        'text',
                        'icon',
                        'customIcon',
                        'userDisplayName',
                        'userProfileImg',
                        'imgUrl',
                        'alt',
                        'helpText',
                        'isSelected',
                        'activeStyle',
                        'to',
                        'isExternal',
                        'type',
                        'disabled'
                    ]
                },
                DropdownSectionItem: {
                    template: '<div class="stubbed-section-item">{{ text }}</div>',
                    props: ['text', 'icon']
                },
                DropdownMenu: {
                    template: `
                        <div>
                            <slot name="activator" :onClick="() => {}" :isOpen="true" />
                            <slot name="items" :onClose="() => {}" />
                        </div>
                    `
                },
                User: {
                    template: '<div class="stubbed-user" />'
                },
                Icon
            }
        }
    })
}

describe('DropdownSelect.vue', () => {
    it('renders the component properly', () => {
        const wrapper = factory()
        expect(wrapper.exists()).toBe(true)
    })

    it('displays the selected option text when modelValue is set', () => {
        const wrapper = factory({ modelValue: '2' })
        expect(wrapper.text()).toContain('Option 2')
    })

    it('renders the first option when modelValue is null (fallback behavior)', () => {
        const wrapper = factory({ modelValue: null })
        expect(wrapper.text()).toContain('Option 1')
    })

    it('emits update:modelValue when option is clicked', async () => {
        const wrapper = factory()
        await wrapper.find('.select-box').trigger('click')
        const option = wrapper.findAll('.stubbed-item')[1]
        await option.trigger('click')

        expect(wrapper.emitted('update:modelValue')).toBeTruthy()
        expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['2'])
    })

    it('handles multiple selection with deselect', async () => {
        const wrapper = factory({
            multiple: true,
            modelValue: ['1']
        })

        await wrapper.find('.select-box').trigger('click')
        const option = wrapper.findAll('.stubbed-item')[0]
        await option.trigger('click')

        expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([[]])
    })

    it('adds option in multiple selection mode', async () => {
        const wrapper = factory({
            multiple: true,
            modelValue: []
        })

        await wrapper.find('.select-box').trigger('click')
        const option = wrapper.findAll('.stubbed-item')[1]
        await option.trigger('click')

        expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([['2']])
    })

    it('does not allow interaction when disabled', async () => {
        const wrapper = factory({ disabled: true })
        await wrapper.find('.select-box').trigger('click')

        expect(wrapper.emitted('update:modelValue')).toBeFalsy()
    })

    it('filters options when search is enabled', async () => {
        const wrapper = factory({ filterable: true })
        await wrapper.find('.select-box').trigger('click')

        const searchInput = wrapper.find('input[type="text"]')
        await searchInput.setValue('Option 2')

        const filtered = (wrapper.vm as any).filteredOptions
        expect(filtered.length).toBe(1)
        expect(filtered[0].text).toBe('Option 2')
    })

    it('shows loading spinner and text when isLoading is true', () => {
        const wrapper = factory({ isLoading: true })
        expect(wrapper.text()).toContain('Loading options...')
    })

    it('renders icon when type is ICON', async () => {
        const iconOptions = [
            { text: 'With Icon', value: 'icon-1', icon: 'mdi:star' }
        ]

        const wrapper = factory({
            options: iconOptions,
            modelValue: 'icon-1',
            type: SelectType.ICON
        })

        await nextTick()

        const icon = wrapper.findComponent(Icon)
        expect(icon.exists()).toBe(true)
        expect(icon.props('name')).toBe('mdi:star')
    })

    it('renders custom image when type is IMAGE', async () => {
        const imgOptions = [
            { text: 'With Img', value: 'img-1', imgUrl: 'path/to/img.png', alt: 'Alt text' }
        ]

        const wrapper = factory({
            options: imgOptions,
            modelValue: 'img-1',
            type: SelectType.IMAGE
        })

        await nextTick()

        const img = wrapper.find('img')
        expect(img.exists()).toBe(true)
        expect(img.attributes('src')).toBe('path/to/img.png')
        expect(img.attributes('alt')).toBe('Alt text')
    })

    it('renders fallback image when image load fails', async () => {
        const imgOptions = [
            { text: 'With Img', value: 'img-1', imgUrl: 'broken.png', alt: 'fallback alt' }
        ]

        const wrapper = factory({
            options: imgOptions,
            modelValue: 'img-1',
            type: SelectType.IMAGE
        })

        await nextTick()

        const img = wrapper.find('img')
        await img.trigger('error')
        await nextTick()

        const fallbackImg = wrapper.find('img')
        expect(fallbackImg.attributes('src')).toBe('/mocked/missing-image.png')
    })

    it('renders user profile when type is USER', async () => {
        const userOptions = [
            { userDisplayName: 'testuser', userProfileImg: 'avatar.png', value: 'user-1' }
        ]

        const wrapper = factory({
            options: userOptions,
            modelValue: 'user-1',
            type: SelectType.USER
        })

        await nextTick()
        expect(wrapper.findComponent(User).exists()).toBe(true)
    })

    it('clears selected options when clear button is clicked', async () => {
        const wrapper = factory({
            multiple: true,
            modelValue: ['1', '2']
        })

        await wrapper.find('.select-box').trigger('click')

        const clearBtn = wrapper.findComponent(ActionIconButton)
        expect(clearBtn.exists()).toBe(true)

        await clearBtn.trigger('click')

        const selected = (wrapper.vm as any).selected
        expect(selected).toEqual([])
    })

    it('renders no results found text when filtering yields no matches', async () => {
        const wrapper = factory({ filterable: true })
        await wrapper.find('.select-box').trigger('click')

        const input = wrapper.find('input[type="text"]')
        await input.setValue('Nonexistent Option')

        expect(wrapper.text()).toContain('No results found')
    })

    it('deselects single option if allowDeselect is true and option is reselected', async () => {
        const wrapper = factory({
            modelValue: '1',
            allowDeselect: true
        })

        await wrapper.find('.select-box').trigger('click')
        const option = wrapper.findAll('.stubbed-item')[0]
        await option.trigger('click')

        expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([null])
    })

    it('does not emit update:modelValue when a disabled option is clicked', async () => {
        const wrapper = factory({
            options: [
                { text: 'Option 1', value: '1' },
                { text: 'Option 2', value: '2', disabled: true },
            ],
        })

        await wrapper.find('.select-box').trigger('click')
        const disabledOption = wrapper.findAll('.stubbed-item')[1]
        await disabledOption!.trigger('click')

        expect(wrapper.emitted('update:modelValue')).toBeFalsy()
    })

    it('renders section title options using DropdownSectionItem', async () => {
        const wrapper = factory({
            options: [
                { sectionTitle: true, text: 'Section A', value: 'section-a' },
                { text: 'Option 1', value: '1' },
            ],
        })

        await wrapper.find('.select-box').trigger('click')
        await nextTick()

        expect(wrapper.find('.stubbed-section-item').exists()).toBe(true)
        expect(wrapper.find('.stubbed-section-item').text()).toContain('Section A')
    })
})
