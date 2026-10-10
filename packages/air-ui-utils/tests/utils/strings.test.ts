import { trimText, cleanImageAlt } from '../../utils/strings'

describe('cleanImageAlt', () => {
    it('strips a leading "image of" prefix', () => {
        expect(cleanImageAlt('Image of a calm landscape')).toBe('a calm landscape')
        expect(cleanImageAlt('Imagen de un paisaje')).toBe('un paisaje')
    })

    it('strips a trailing "image" suffix', () => {
        expect(cleanImageAlt('Company logo image')).toBe('Company logo')
    })

    it('keeps the original when stripping would leave nothing', () => {
        expect(cleanImageAlt('Image')).toBe('Image')
    })

    it('returns an empty string for missing alt text', () => {
        expect(cleanImageAlt(undefined)).toBe('')
        expect(cleanImageAlt(null)).toBe('')
    })
})

describe('trimText', () => {
    it('returns the original text when within maxLength', () => {
        const result = trimText('Short text', 20)

        expect(result).toBe('Short text')
    })

    it('throws when inputString is not a string', () => {
        expect(() => trimText(123 as unknown as string, 10)).toThrow('The inputString parameter must be a text string')
    })

    it('throws when maxLength is negative', () => {
        expect(() => trimText('Some text', -1)).toThrow('The maxLength parameter must be a non-negative number')
    })

    it('trims the text and appends "..." when no readMoreLink is provided', () => {
        const result = trimText('Lorem ipsum dolor sit amet', 10)

        expect(result).toBe('Lorem ipsu...')
    })

    it('appends a "Read more" link in link mode when readMoreLink is provided', () => {
        const result = trimText('Lorem ipsum dolor sit amet', 10, 'Read more', '/article')

        expect(result).toBe('Lorem ipsu... <a href="/article" target="_blank" rel="noopener noreferrer" class="text-text-primary hover:text-text-hover">(Read more)</a>')
    })

    it('ignores readMoreLink when readMoreType is toggle', () => {
        const result = trimText('Lorem ipsum dolor sit amet', 10, 'Read more', '/article', 'toggle')

        expect(result).toBe('Lorem ipsu...')
    })

    it('returns the trimmed text in toggle mode when isExpanded is false', () => {
        const result = trimText('Lorem ipsum dolor sit amet', 10, 'Read more', undefined, 'toggle', false)

        expect(result).toBe('Lorem ipsu...')
    })

    it('returns the full text in toggle mode when isExpanded is true', () => {
        const result = trimText('Lorem ipsum dolor sit amet', 10, 'Read more', undefined, 'toggle', true)

        expect(result).toBe('Lorem ipsum dolor sit amet')
    })
})
