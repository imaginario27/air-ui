
import { PageTitleFormat } from '../../air-ui-ds/models/enums/pages'

/**
 * Generates a formatted page title based on the specified format.
 *
 * @param {string} pageTitle - The main title of the page.
 * @param {string} appName - The name of the app.
 * @param {PageTitleFormat} [format=PageTitleFormat.FULL] - The format of the title, defaulting to FULL.
 * @returns {string} The formatted page title.
 */
export const pageTitle = (
    pageTitle = 'Page title', 
    appName = 'App name', 
    format: PageTitleFormat = PageTitleFormat.FULL
) => {
    return format === PageTitleFormat.FULL 
        ? `${pageTitle} | ${appName}` 
        : pageTitle
}