
/**
 * Encodes an SVG string to a Data URI.
 *
 * @param {string} svg - The SVG string.
 * @returns {string} The encoded Data URI.
 */
export const encodeSvgToDataURI = (svg: string): string => {
    return `data:image/svg+xml;charset=utf8,${encodeURIComponent(
        svg.replace(
            '<svg',
            svg.includes('xmlns') ? '<svg' : '<svg xmlns="http://www.w3.org/2000/svg"'
        )
    )}`
}
