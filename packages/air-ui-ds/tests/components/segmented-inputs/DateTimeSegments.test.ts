import { mount, type DOMWrapper } from '@vue/test-utils'
import { nextTick } from 'vue'
import DateTimeSegments from '@/components/segmented-inputs/DateTimeSegments.vue'
import { DateSegmentsType, HourFormat } from '@/models/enums/calendars'

const factory = (props: Record<string, any> = {}) =>
    mount(DateTimeSegments, {
        props: { id: 'date', ...props },
        attachTo: document.body,
    })

type Wrapper = ReturnType<typeof factory>

const segments = (wrapper: Wrapper) => wrapper.findAll('input')
const values = (wrapper: Wrapper) => segments(wrapper).map((input) => input.element.value)
const placeholders = (wrapper: Wrapper) => segments(wrapper).map((input) => input.attributes('placeholder'))
const emitted = (wrapper: Wrapper) => wrapper.emitted('update:modelValue')?.map(([value]) => value)

const typeInto = async (input: DOMWrapper<HTMLInputElement>, text: string) => {
    for (const char of text) {
        input.element.dispatchEvent(
            new InputEvent('beforeinput', { data: char, inputType: 'insertText', bubbles: true, cancelable: true }),
        )
    }
    await nextTick()
}

describe('DateTimeSegments.vue', () => {
    afterEach(() => {
        document.body.innerHTML = ''
    })

    describe('pattern', () => {
        it.each([
            ['en-US', ['mm', 'dd', 'yyyy']],
            ['es-ES', ['dd', 'mm', 'yyyy']],
            ['ja-JP', ['yyyy', 'mm', 'dd']],
        ])('orders the segments of a date in %s', (locale, expected) => {
            expect(placeholders(factory({ locale }))).toEqual(expected)
        })

        it('shows the separators between the segments', () => {
            expect(factory({ locale: 'es-ES' }).text()).toContain('/')
            expect(factory({ locale: 'de-DE' }).text()).toContain('.')
        })

        it('writes a month and a week', () => {
            expect(placeholders(factory({ type: DateSegmentsType.MONTH }))).toEqual(['mm', 'yyyy'])

            const week = factory({ type: DateSegmentsType.WEEK })
            expect(placeholders(week)).toEqual(['ww', 'yyyy'])
            expect(week.text()).toContain('Week')
        })

        it('writes a time with the day period in a 12 hour clock', () => {
            expect(placeholders(factory({ type: DateSegmentsType.TIME }))).toEqual(['hh', 'mm', '--'])
        })

        it('writes a time without the day period in a 24 hour clock', () => {
            expect(placeholders(factory({ type: DateSegmentsType.TIME, locale: 'es-ES' }))).toEqual(['hh', 'mm'])
            expect(placeholders(factory({ type: DateSegmentsType.TIME, hourFormat: HourFormat.HOURS_24 }))).toEqual([
                'hh',
                'mm',
            ])
        })

        it('adds the seconds', () => {
            const wrapper = factory({ type: DateSegmentsType.TIME, locale: 'es-ES', hasSeconds: true })

            expect(placeholders(wrapper)).toEqual(['hh', 'mm', 'ss'])
        })

        it('writes a date and a time', () => {
            const wrapper = factory({ type: DateSegmentsType.DATETIME_LOCAL, locale: 'es-ES' })

            expect(placeholders(wrapper)).toEqual(['dd', 'mm', 'yyyy', 'hh', 'mm'])
        })

        it('names each segment for assistive technology', () => {
            const wrapper = factory({ ariaLabel: 'Birth date' })

            expect(wrapper.element.tagName).toBe('FIELDSET')
            expect(wrapper.attributes('aria-label')).toBe('Birth date')
            expect(segments(wrapper).map((input) => input.attributes('aria-label'))).toEqual(['Month', 'Day', 'Year'])
        })

        it('puts the id on the first segment', () => {
            const wrapper = factory({ id: 'birth' })

            expect(segments(wrapper)[0]!.attributes('id')).toBe('birth')
            expect(segments(wrapper)[1]!.attributes('id')).toBeUndefined()
        })
    })

    it('takes the classes of its parent on the root, and sets no text size', () => {
        const wrapper = mount(DateTimeSegments, { props: { id: 'date' }, attrs: { class: 'text-base' } })

        expect(wrapper.classes()).toContain('text-base')
        expect(wrapper.classes()).not.toContain('text-sm')
    })

    describe('value', () => {
        it('shows the segments of the value', () => {
            expect(values(factory({ modelValue: '2026-10-15' }))).toEqual(['10', '15', '2026'])
            expect(values(factory({ modelValue: '2026-10-15', locale: 'es-ES' }))).toEqual(['15', '10', '2026'])
        })

        it('shows the time of a 12 hour clock with the day period', () => {
            const wrapper = factory({ type: DateSegmentsType.TIME, modelValue: '19:30' })

            expect(values(wrapper)).toEqual(['07', '30', 'PM'])
        })

        it('shows nothing for a value that is not real', () => {
            expect(values(factory({ modelValue: '2026-02-31' }))).toEqual(['', '', ''])
        })

        it('follows the value when it changes outside', async () => {
            const wrapper = factory({ modelValue: '2026-10-15' })

            await wrapper.setProps({ modelValue: '2027-01-02' })
            expect(values(wrapper)).toEqual(['01', '02', '2027'])

            await wrapper.setProps({ modelValue: null })
            expect(values(wrapper)).toEqual(['', '', ''])
        })
    })

    describe('typing', () => {
        it('emits the value once the date is complete', async () => {
            const wrapper = factory()
            const [month, day, year] = segments(wrapper)

            await typeInto(month!, '10')
            await typeInto(day!, '15')
            expect(emitted(wrapper)).toBeUndefined()

            await typeInto(year!, '2026')
            expect(emitted(wrapper)).toEqual(['2026-10-15'])
            expect(values(wrapper)).toEqual(['10', '15', '2026'])
        })

        it('completes a segment when no other digit could follow', async () => {
            const wrapper = factory()
            const [month, day] = segments(wrapper)

            await typeInto(month!, '5')
            expect(values(wrapper)[0]).toBe('05')

            await typeInto(day!, '4')
            expect(values(wrapper)[1]).toBe('04')
        })

        it('waits for the second digit when it could still be valid', async () => {
            const wrapper = factory()
            const [month] = segments(wrapper)

            await typeInto(month!, '1')
            expect(values(wrapper)[0]).toBe('1')

            await typeInto(month!, '2')
            expect(values(wrapper)[0]).toBe('12')
        })

        it('starts over when a digit makes the number too big', async () => {
            const wrapper = factory()
            const [month] = segments(wrapper)

            await typeInto(month!, '1')
            await typeInto(month!, '5')

            expect(values(wrapper)[0]).toBe('05')
        })

        it('replaces the number when typing in a segment that already has one', async () => {
            const wrapper = factory({ modelValue: '2026-10-15' })
            const [month] = segments(wrapper)

            await month!.trigger('focus')
            await typeInto(month!, '03')

            expect(emitted(wrapper)).toEqual(['2026-03-15'])
        })

        it('moves on with a separator', async () => {
            const wrapper = factory()
            const [month] = segments(wrapper)

            await typeInto(month!, '1')
            await typeInto(month!, '/')

            expect(values(wrapper)[0]).toBe('01')
        })

        it('ignores letters in a number', async () => {
            const wrapper = factory()
            const [month] = segments(wrapper)

            await typeInto(month!, 'a')

            expect(values(wrapper)[0]).toBe('')
        })

        it('does not emit a date that is not real, and marks it as invalid', async () => {
            const wrapper = factory()
            const [month, day, year] = segments(wrapper)

            await typeInto(month!, '02')
            await typeInto(day!, '30')
            await typeInto(year!, '2026')

            expect(emitted(wrapper)).toBeUndefined()
            expect(year!.attributes('aria-invalid')).toBe('true')
        })

        it('limits the day to the days of the month', async () => {
            const wrapper = factory({ modelValue: '2026-02-10' })
            const [, day] = segments(wrapper)

            await day!.trigger('focus')
            await typeInto(day!, '3')

            expect(values(wrapper)[1]).toBe('03')
        })

        it('does not emit a value that is not allowed', async () => {
            const wrapper = factory({ isAllowed: (value: string) => value >= '2026-10-10' })
            const [month, day, year] = segments(wrapper)

            await typeInto(month!, '10')
            await typeInto(day!, '05')
            await typeInto(year!, '2026')

            expect(emitted(wrapper)).toBeUndefined()
            expect(year!.attributes('aria-invalid')).toBe('true')
        })

        it('types the day period with its first letter', async () => {
            const wrapper = factory({ type: DateSegmentsType.TIME })
            const [hour, minute, dayPeriod] = segments(wrapper)

            await typeInto(hour!, '07')
            await typeInto(minute!, '30')
            await typeInto(dayPeriod!, 'p')

            expect(values(wrapper)).toEqual(['07', '30', 'PM'])
            expect(emitted(wrapper)).toEqual(['19:30'])
        })

        it('writes the hours of a 12 hour clock from 1 to 12', async () => {
            const wrapper = factory({ type: DateSegmentsType.TIME })
            const [hour] = segments(wrapper)

            await typeInto(hour!, '0')
            await typeInto(hour!, '0')

            expect(values(wrapper)[0]).toBe('0')
        })

        it('types the seconds', async () => {
            const wrapper = factory({ type: DateSegmentsType.TIME, locale: 'es-ES', hasSeconds: true })
            const [hour, minute, second] = segments(wrapper)

            await typeInto(hour!, '19')
            await typeInto(minute!, '30')
            await typeInto(second!, '45')

            expect(emitted(wrapper)).toEqual(['19:30:45'])
        })

        it('types a date and a time', async () => {
            const wrapper = factory({ type: DateSegmentsType.DATETIME_LOCAL, locale: 'es-ES' })
            const [day, month, year, hour, minute] = segments(wrapper)

            await typeInto(day!, '15')
            await typeInto(month!, '10')
            await typeInto(year!, '2026')
            await typeInto(hour!, '19')
            await typeInto(minute!, '30')

            expect(emitted(wrapper)).toEqual(['2026-10-15T19:30'])
        })

        it('does nothing when it is disabled or read only', async () => {
            for (const props of [{ disabled: true }, { readonly: true }]) {
                const wrapper = factory(props)
                await typeInto(segments(wrapper)[0]!, '10')

                expect(values(wrapper)[0]).toBe('')
            }
        })
    })

    describe('keyboard', () => {
        it('steps the segment with the arrows', async () => {
            const wrapper = factory({ modelValue: '2026-10-15' })
            const [month] = segments(wrapper)

            await month!.trigger('keydown', { key: 'ArrowUp' })
            expect(values(wrapper)[0]).toBe('11')
            expect(emitted(wrapper)).toEqual(['2026-11-15'])

            await month!.trigger('keydown', { key: 'ArrowDown' })
            expect(values(wrapper)[0]).toBe('10')
        })

        it('goes round at the ends of the range', async () => {
            const wrapper = factory({ modelValue: '2026-12-15' })
            const [month] = segments(wrapper)

            await month!.trigger('keydown', { key: 'ArrowUp' })

            expect(values(wrapper)[0]).toBe('01')
        })

        it('starts from the lowest or the highest number in an empty segment', async () => {
            const wrapper = factory()
            const [month, day] = segments(wrapper)

            await month!.trigger('keydown', { key: 'ArrowUp' })
            await day!.trigger('keydown', { key: 'ArrowDown' })

            expect(values(wrapper).slice(0, 2)).toEqual(['01', '31'])
        })

        it('starts the year from the current one', async () => {
            const wrapper = factory()
            const year = segments(wrapper)[2]!

            await year.trigger('keydown', { key: 'ArrowUp' })

            expect(values(wrapper)[2]).toBe(String(new Date().getFullYear()))
        })

        it('toggles the day period with the arrows', async () => {
            const wrapper = factory({ type: DateSegmentsType.TIME, modelValue: '19:30' })
            const dayPeriod = segments(wrapper)[2]!

            await dayPeriod.trigger('keydown', { key: 'ArrowUp' })

            expect(values(wrapper)[2]).toBe('AM')
            expect(emitted(wrapper)).toEqual(['07:30'])
        })

        it('clears the segment and the value with Backspace', async () => {
            const wrapper = factory({ modelValue: '2026-10-15' })
            const [month] = segments(wrapper)

            await month!.trigger('keydown', { key: 'Backspace' })

            expect(values(wrapper)).toEqual(['', '15', '2026'])
            expect(emitted(wrapper)).toEqual([''])
        })

        it('clears the segment with the delete input of a mobile keyboard', async () => {
            const wrapper = factory({ modelValue: '2026-10-15' })
            const [month] = segments(wrapper)

            month!.element.dispatchEvent(
                new InputEvent('beforeinput', { inputType: 'deleteContentBackward', bubbles: true, cancelable: true }),
            )
            await nextTick()

            expect(values(wrapper)[0]).toBe('')
        })

        it('moves between segments with ArrowLeft and ArrowRight', async () => {
            const wrapper = factory()
            const [month, day] = segments(wrapper)

            await month!.trigger('keydown', { key: 'ArrowRight' })
            expect(document.activeElement).toBe(day!.element)

            await day!.trigger('keydown', { key: 'ArrowLeft' })
            expect(document.activeElement).toBe(month!.element)
        })

        it('moves to the next segment when one is complete', async () => {
            const wrapper = factory()
            const [month, day] = segments(wrapper)

            await typeInto(month!, '10')

            expect(document.activeElement).toBe(day!.element)
        })

        it('asks to open the picker with Alt and ArrowDown', async () => {
            const wrapper = factory({ modelValue: '2026-10-15' })

            await segments(wrapper)[0]!.trigger('keydown', { key: 'ArrowDown', altKey: true })

            expect(wrapper.emitted('open')).toHaveLength(1)
            expect(values(wrapper)[0]).toBe('10')
        })

        it('does not step a read only input', async () => {
            const wrapper = factory({ modelValue: '2026-10-15', readonly: true })

            await segments(wrapper)[0]!.trigger('keydown', { key: 'ArrowUp' })

            expect(values(wrapper)[0]).toBe('10')
        })

        it('leaves the shortcuts of the browser alone', async () => {
            const wrapper = factory({ modelValue: '2026-10-15' })

            await segments(wrapper)[0]!.trigger('keydown', { key: 'ArrowUp', ctrlKey: true })

            expect(values(wrapper)[0]).toBe('10')
        })
    })

    describe('paste', () => {
        it('fills the segments with an ISO value', async () => {
            const wrapper = factory()

            await segments(wrapper)[0]!.trigger('paste', { clipboardData: { getData: () => '2026-10-15' } })

            expect(values(wrapper)).toEqual(['10', '15', '2026'])
            expect(emitted(wrapper)).toEqual(['2026-10-15'])
        })

        it('ignores text that is not a value of the type', async () => {
            const wrapper = factory()

            await segments(wrapper)[0]!.trigger('paste', { clipboardData: { getData: () => 'tomorrow' } })

            expect(values(wrapper)).toEqual(['', '', ''])
        })
    })

    describe('focus', () => {
        it('emits focus when a segment is focused and blur when the focus leaves the input', async () => {
            const wrapper = factory()
            const [month, day] = segments(wrapper)

            await month!.trigger('focusin')
            expect(wrapper.emitted('focus')).toHaveLength(1)

            await month!.trigger('focusout', { relatedTarget: day!.element })
            expect(wrapper.emitted('blur')).toBeUndefined()

            await day!.trigger('focusout', { relatedTarget: document.body })
            expect(wrapper.emitted('blur')).toHaveLength(1)
        })

        it('focuses the first segment from outside', () => {
            const wrapper = factory()

            ;(wrapper.vm as unknown as { focus: () => void }).focus()

            expect(document.activeElement).toBe(segments(wrapper)[0]!.element)
        })
    })
})
