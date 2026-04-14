export const utilList: UtilPortfolioItem[] = [
    // COUNTERS
    {
        isSectionTitle: true,
        title: 'Counters',
    },
    {
        title: 'getStackCounterContent',
        to: `/${DocsAppSlug.DOCS}/${DocsAppSlug.UTILS}/get-stack-counter-content`,
        description: 'Returns the counter content for a stack display based on the number of items, counter type, and item limit.',
    },

    // DATA
    {
        isSectionTitle: true,
        title: 'Data',
    },
    {
        title: 'delay',
        to: `/${DocsAppSlug.DOCS}/${DocsAppSlug.UTILS}/delay`,
        description: 'Creates a promise that resolves after a specified delay in milliseconds.',
    },
    {
        title: 'getPaginatedData',
        to: `/${DocsAppSlug.DOCS}/${DocsAppSlug.UTILS}/get-paginated-data`,
        description: 'Returns a paginated subset of an array.',
    },
    {
        title: 'convertToSelectOptions',
        to: `/${DocsAppSlug.DOCS}/${DocsAppSlug.UTILS}/convert-to-select-options`,
        description: 'Converts an array of objects into SelectOption[] by mapping specified keys or transformation functions.',
    },

    // DATES
    {
        isSectionTitle: true,
        title: 'Dates',
    },
    {
        title: 'formatLocalizedDateTime',
        to: `/${DocsAppSlug.DOCS}/${DocsAppSlug.UTILS}/format-localized-date-time`,
        description: 'Formats a date (ISO string or timestamp) into a localized full date with optional time.',
    },
    {
        title: 'formatLocalizedDate',
        to: `/${DocsAppSlug.DOCS}/${DocsAppSlug.UTILS}/format-localized-date`,
        description: 'Formats a date string (YYYY-MM-DD or ISO 8601) into a localized full date.',
    },

    // ENCODING
    {
        isSectionTitle: true,
        title: 'Encoding',
    },
    {
        title: 'encodeSvgToDataURI',
        to: `/${DocsAppSlug.DOCS}/${DocsAppSlug.UTILS}/encode-svg-to-data-uri`,
        description: 'Encodes an SVG string to a Data URI.',
    },

    // ERRORS
    {
        isSectionTitle: true,
        title: 'Errors',
    },
    {
        title: 'getEnvErrorMessage',
        to: `/${DocsAppSlug.DOCS}/${DocsAppSlug.UTILS}/get-env-error-message`,
        description: 'Returns an error message depending on the environment.',
    },

    // EVENTS
    {
        isSectionTitle: true,
        title: 'Events',
    },
    {
        title: 'copyToClipboard',
        to: `/${DocsAppSlug.DOCS}/${DocsAppSlug.UTILS}/copy-to-clipboard`,
        description: 'Copies text to the clipboard.',
    },

    // FORM FILTERS
    {
        isSectionTitle: true,
        title: 'Form filters',
    },
    {
        title: 'filterAlphabetic',
        to: `/${DocsAppSlug.DOCS}/${DocsAppSlug.UTILS}/filter-alphabetic`,
        description: 'Filters out non-alphabetic characters from a given string.',
    },

    // FORM VALIDATION
    {
        isSectionTitle: true,
        title: 'Form validation',
    },
    {
        title: 'validateField',
        to: `/${DocsAppSlug.DOCS}/${DocsAppSlug.UTILS}/validate-field`,
        description: 'Validates whether a given value is present (not null, undefined, or empty string).',
    },
    {
        title: 'validateEmail',
        to: `/${DocsAppSlug.DOCS}/${DocsAppSlug.UTILS}/validate-email`,
        description: 'Validates whether a given value is a valid email address.',
    },
    {
        title: 'validatePasswordMatch',
        to: `/${DocsAppSlug.DOCS}/${DocsAppSlug.UTILS}/validate-password-match`,
        description: 'Validates that two password values match.',
    },
    {
        title: 'validateDateRange',
        to: `/${DocsAppSlug.DOCS}/${DocsAppSlug.UTILS}/validate-date-range`,
        description: 'Validates whether a given date range is valid.',
    },
    {
        title: 'validateUrl',
        to: `/${DocsAppSlug.DOCS}/${DocsAppSlug.UTILS}/validate-url`,
        description: 'Validates whether a given value is a valid URL.',
    },
    {
        title: 'validateBooleanField',
        to: `/${DocsAppSlug.DOCS}/${DocsAppSlug.UTILS}/validate-boolean-field`,
        description: 'Validates whether a given boolean field is true.',
    },
    {
        title: 'validateArrayField',
        to: `/${DocsAppSlug.DOCS}/${DocsAppSlug.UTILS}/validate-array-field`,
        description: 'Validates whether a given array field is not empty.',
    },

    // NUMBERS
    {
        isSectionTitle: true,
        title: 'Numbers',
    },
    {
        title: 'formatNumberWithThousands',
        to: `/${DocsAppSlug.DOCS}/${DocsAppSlug.UTILS}/format-number-with-thousands`,
        description: 'Formats a number into a string with thousands separators using Intl locale rules.',
    },

    // PASSWORDS
    {
        isSectionTitle: true,
        title: 'Passwords',
    },
    {
        title: 'evaluateSecurePasswordConditions',
        to: `/${DocsAppSlug.DOCS}/${DocsAppSlug.UTILS}/evaluate-secure-password-conditions`,
        description: 'Evaluates secure password conditions.',
    },
    {
        title: 'isSecurePassword',
        to: `/${DocsAppSlug.DOCS}/${DocsAppSlug.UTILS}/is-secure-password`,
        description: 'Checks if all secure password conditions are fulfilled.',
    },
    {
        title: 'generateSecurePassword',
        to: `/${DocsAppSlug.DOCS}/${DocsAppSlug.UTILS}/generate-secure-password`,
        description: 'Generates a secure password that meets specified security requirements.',
    },

    // RATINGS
    {
        isSectionTitle: true,
        title: 'Ratings',
    },
    {
        title: 'getRatingIndicator',
        to: `/${DocsAppSlug.DOCS}/${DocsAppSlug.UTILS}/get-rating-indicator`,
        description: 'Returns an array of MDI icon names representing a indicator rating.',
    },

    // STRINGS
    {
        isSectionTitle: true,
        title: 'Strings',
    },
    {
        title: 'trimText',
        to: `/${DocsAppSlug.DOCS}/${DocsAppSlug.UTILS}/trim-text`,
        description: 'Trims leading and trailing whitespace from a string.',
    },
    {
        title: 'convertStringIntoSlugFormat',
        to: `/${DocsAppSlug.DOCS}/${DocsAppSlug.UTILS}/convert-string-into-slug-format`,
        description: 'Converts a string into a URL-friendly slug format.',
    },
    {
        title: 'lowercaseFirstLetter',
        to: `/${DocsAppSlug.DOCS}/${DocsAppSlug.UTILS}/lowercase-first-letter`,
        description: 'Converts the first letter of a string to lowercase while keeping the rest unchanged.',
    },
    {
        title: 'uppercaseFirstLetter',
        to: `/${DocsAppSlug.DOCS}/${DocsAppSlug.UTILS}/uppercase-first-letter`,
        description: 'Converts the first letter of a string to uppercase while keeping the rest unchanged.',
    },
    {
        title: 'getCreditCardLastFourNumbers',
        to: `/${DocsAppSlug.DOCS}/${DocsAppSlug.UTILS}/get-credit-card-last-four-numbers`,
        description: 'Extracts the last four digits from a given credit card number.',
    },
    {
        title: 'getFullName',
        to: `/${DocsAppSlug.DOCS}/${DocsAppSlug.UTILS}/get-full-name`,
        description: 'Returns the full name of a user by combining first and last names.',
    },
    {
        title: 'getInitials',
        to: `/${DocsAppSlug.DOCS}/${DocsAppSlug.UTILS}/get-initials`,
        description: 'Extracts initials from a full name string.',
    },

    // USERS
    {
        isSectionTitle: true,
        title: 'Users',
    },
    {
        title: 'generateUsername',
        to: `/${DocsAppSlug.DOCS}/${DocsAppSlug.UTILS}/generate-username`,
        description: 'Generates a unique username based on the user\'s first name and last names.',
    },
    {
        title: 'getUserDisplayName',
        to: `/${DocsAppSlug.DOCS}/${DocsAppSlug.UTILS}/get-user-display-name`,
        description: 'Generates a display name using the first name and only the first last name.',
    }
]
