export const utilList: UtilPortfolioItem[] = [
    // COUNTERS
    {
        isSectionTitle: true,
        title: 'Counters',
    },
    {
        title: 'getStackCounterContent',
        to: `/${AppSlug.DOCS}/${AppSlug.UTILS}/get-stack-counter-content`,
        description: 'Returns the counter content for a stack display based on the number of items, counter type, and item limit.',
    },

    // DATA
    {
        isSectionTitle: true,
        title: 'Data',
    },
    {
        title: 'delay',
        to: `/${AppSlug.DOCS}/${AppSlug.UTILS}/delay`,
        description: 'Creates a promise that resolves after a specified delay in milliseconds.',
    },
    {
        title: 'getPaginatedData',
        to: `/${AppSlug.DOCS}/${AppSlug.UTILS}/get-paginated-data`,
        description: 'Returns a paginated subset of an array.',
    },
    {
        title: 'convertToSelectOptions',
        to: `/${AppSlug.DOCS}/${AppSlug.UTILS}/convert-to-select-options`,
        description: 'Converts an array of objects into SelectOption[] by mapping specified keys or transformation functions.',
    },

    // DATES
    {
        isSectionTitle: true,
        title: 'Dates',
    },
    {
        title: 'formatLocalizedDateTime',
        to: `/${AppSlug.DOCS}/${AppSlug.UTILS}/format-localized-date-time`,
        description: 'Formats a date (ISO string or timestamp) into a localized full date with optional time.',
    },
    {
        title: 'formatLocalizedDate',
        to: `/${AppSlug.DOCS}/${AppSlug.UTILS}/format-localized-date`,
        description: 'Formats a date string (YYYY-MM-DD or ISO 8601) into a localized full date.',
    },

    // ENCODING
    {
        isSectionTitle: true,
        title: 'Encoding',
    },
    {
        title: 'encodeSvgToDataURI',
        to: `/${AppSlug.DOCS}/${AppSlug.UTILS}/encode-svg-to-data-uri`,
        description: 'Encodes an SVG string to a Data URI.',
    },

    // ERRORS
    {
        isSectionTitle: true,
        title: 'Errors',
    },
    {
        title: 'getEnvErrorMessage',
        to: `/${AppSlug.DOCS}/${AppSlug.UTILS}/get-env-error-message`,
        description: 'Returns an error message depending on the environment.',
    },

    // EVENTS
    {
        isSectionTitle: true,
        title: 'Events',
    },
    {
        title: 'copyToClipboard',
        to: `/${AppSlug.DOCS}/${AppSlug.UTILS}/copy-to-clipboard`,
        description: 'Copies text to the clipboard.',
    },

    // FORM FILTERS
    {
        isSectionTitle: true,
        title: 'Form filters',
    },
    {
        title: 'filterAlphabetic',
        to: `/${AppSlug.DOCS}/${AppSlug.UTILS}/filter-alphabetic`,
        description: 'Filters out non-alphabetic characters from a given string.',
    },

    // FORM VALIDATION
    {
        isSectionTitle: true,
        title: 'Form validation',
    },
    {
        title: 'validateField',
        to: `/${AppSlug.DOCS}/${AppSlug.UTILS}/validate-field`,
        description: 'Validates whether a given value is present (not null, undefined, or empty string).',
    },
    {
        title: 'validateEmail',
        to: `/${AppSlug.DOCS}/${AppSlug.UTILS}/validate-email`,
        description: 'Validates whether a given value is a valid email address.',
    },
    {
        title: 'validatePasswordMatch',
        to: `/${AppSlug.DOCS}/${AppSlug.UTILS}/validate-password-match`,
        description: 'Validates that two password values match.',
    },
    {
        title: 'validateDateRange',
        to: `/${AppSlug.DOCS}/${AppSlug.UTILS}/validate-date-range`,
        description: 'Validates whether a given date range is valid.',
    },
    {
        title: 'validateUrl',
        to: `/${AppSlug.DOCS}/${AppSlug.UTILS}/validate-url`,
        description: 'Validates whether a given value is a valid URL.',
    },
    {
        title: 'validateBooleanField',
        to: `/${AppSlug.DOCS}/${AppSlug.UTILS}/validate-boolean-field`,
        description: 'Validates whether a given boolean field is true.',
    },
    {
        title: 'validateArrayField',
        to: `/${AppSlug.DOCS}/${AppSlug.UTILS}/validate-array-field`,
        description: 'Validates whether a given array field is not empty.',
    },

    // NUMBERS
    {
        isSectionTitle: true,
        title: 'Numbers',
    },
    {
        title: 'formatNumberWithThousands',
        to: `/${AppSlug.DOCS}/${AppSlug.UTILS}/format-number-with-thousands`,
        description: 'Formats a number into a string with thousands separators using Intl locale rules.',
    },

    // PASSWORDS
    {
        isSectionTitle: true,
        title: 'Passwords',
    },
    {
        title: 'evaluateSecurePasswordConditions',
        to: `/${AppSlug.DOCS}/${AppSlug.UTILS}/evaluate-secure-password-conditions`,
        description: 'Evaluates secure password conditions.',
    },
    {
        title: 'isSecurePassword',
        to: `/${AppSlug.DOCS}/${AppSlug.UTILS}/is-secure-password`,
        description: 'Checks if all secure password conditions are fulfilled.',
    },
    {
        title: 'generateSecurePassword',
        to: `/${AppSlug.DOCS}/${AppSlug.UTILS}/generate-secure-password`,
        description: 'Generates a secure password that meets specified security requirements.',
    },

    // RATINGS
    {
        isSectionTitle: true,
        title: 'Ratings',
    },
    {
        title: 'getRatingIndicator',
        to: `/${AppSlug.DOCS}/${AppSlug.UTILS}/get-rating-indicator`,
        description: 'Returns an array of MDI icon names representing a indicator rating.',
    },

    // STRINGS
    {
        isSectionTitle: true,
        title: 'Strings',
    },
    {
        title: 'trimText',
        to: `/${AppSlug.DOCS}/${AppSlug.UTILS}/trim-text`,
        description: 'Trims leading and trailing whitespace from a string.',
    },
    {
        title: 'convertStringIntoSlugFormat',
        to: `/${AppSlug.DOCS}/${AppSlug.UTILS}/convert-string-into-slug-format`,
        description: 'Converts a string into a URL-friendly slug format.',
    },
    {
        title: 'lowercaseFirstLetter',
        to: `/${AppSlug.DOCS}/${AppSlug.UTILS}/lowercase-first-letter`,
        description: 'Converts the first letter of a string to lowercase while keeping the rest unchanged.',
    },
    {
        title: 'uppercaseFirstLetter',
        to: `/${AppSlug.DOCS}/${AppSlug.UTILS}/uppercase-first-letter`,
        description: 'Converts the first letter of a string to uppercase while keeping the rest unchanged.',
    },
    {
        title: 'getCreditCardLastFourNumbers',
        to: `/${AppSlug.DOCS}/${AppSlug.UTILS}/get-credit-card-last-four-numbers`,
        description: 'Extracts the last four digits from a given credit card number.',
    },
    {
        title: 'getFullName',
        to: `/${AppSlug.DOCS}/${AppSlug.UTILS}/get-full-name`,
        description: 'Returns the full name of a user by combining first and last names.',
    },
    {
        title: 'getInitials',
        to: `/${AppSlug.DOCS}/${AppSlug.UTILS}/get-initials`,
        description: 'Extracts initials from a full name string.',
    },

    // USERS
    {
        isSectionTitle: true,
        title: 'Users',
    },
    {
        title: 'generateUsername',
        to: `/${AppSlug.DOCS}/${AppSlug.UTILS}/generate-username`,
        description: 'Generates a unique username based on the user\'s first name and last names.',
    },
    {
        title: 'getUserDisplayName',
        to: `/${AppSlug.DOCS}/${AppSlug.UTILS}/get-user-display-name`,
        description: 'Generates a display name using the first name and only the first last name.',
    }
]
