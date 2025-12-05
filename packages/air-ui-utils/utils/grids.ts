/**
 * Generates Tailwind CSS grid class string based on column settings for mobile and desktop breakpoints.
 *
 * @param cols - Number of columns for large screens (typically 2, 3, or 4).
 * @param tabletCols - Number of columns for mobile screens (typically 2).
 * @param mobileCols - Number of columns for mobile screens (typically 1 or 2).
 * @param gapClass - Tailwind gap utility class to control spacing between grid items (default is 'gap-6').
 * @returns A string of Tailwind utility classes to control the grid layout responsively.
 *
 */
export const getGridClasses = (
    cols: number, 
    tabletCols: number, 
    mobileCols: number,
    gapClass = 'gap-6'
): string => {
    const baseClasses = 'grid w-full'

    const mobileColsMapping: Record<number, string> = {
        1: 'grid-cols-1',
        2: 'grid-cols-2',
        3: 'grid-cols-3',
        4: 'grid-cols-4',
    }

    const tabletColsMapping: Record<number, string> = {
        1: 'sm:grid-cols-1',
        2: 'sm:grid-cols-2',
        3: 'sm:grid-cols-3',
        4: 'sm:grid-cols-4',
    }

    const colsMapping: Record<number, string> = {
        1: 'lg:grid-cols-1',
        2: 'lg:grid-cols-2',
        3: 'lg:grid-cols-3',
        4: 'lg:grid-cols-4',
        5: 'lg:grid-cols-5',
        6: 'lg:grid-cols-6',
    }

    const mobileClass = mobileColsMapping[mobileCols] ?? 'grid-cols-1'
    const tabletClass = tabletColsMapping[tabletCols] ?? 'sm:grid-cols-2'
    const desktopClass = colsMapping[cols] ?? 'lg:grid-cols-3'

    return `${baseClasses} ${gapClass} ${mobileClass} ${tabletClass} ${desktopClass}`
}
