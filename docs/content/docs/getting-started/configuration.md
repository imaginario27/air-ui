## AirUI configuration

AirUI exposes a small set of behaviors as shared, reactive configuration instead of hardcoding them inside each component. This lets you set a value once for your whole project rather than repeating the same prop on every component instance.

There are two config composables, one per package:

- `useDSConfig` (from `@imaginario27/air-ui-ds`): text used by components, grouped under `forms`, `actions`, `common`, `loaders`, `tables`, `pagination`, `navigation`, `cards`, `notifications`, `treeView`, `accessibility`, `gallery`, `lightbox`, `calendar`, `timePicker` and `slides`, the default glow of cards, modals, buttons and inputs, grouped under `glow`, and the mobile size of buttons, under `buttons`.
- `useUtilsConfig` (from `@imaginario27/air-ui-utils`): messages used by the framework-agnostic form validators in `air-ui-utils`, grouped under `validation`, and a few shared texts of its helpers, grouped under `common`.

<br/>

Both return the same reactive object everywhere they're called. Setting a value from anywhere in your app updates it everywhere it's used, since it's shared, reactive state. A prop passed explicitly to a component always wins over its matching global config value.

```ts
const dsConfig = useDSConfig()

dsConfig.forms.optionalLabelText = () => 'Optional'
```

### Global plugin setup

Set overrides in a Nuxt plugin so they apply once, before any AirUI component renders. `useDSConfig` and `useUtilsConfig` are auto-imported, just like AirUI's components and composables.

Text values are resolver functions (`() => string`). A plain string works fine, as in the two examples below. If your project uses an i18n library, point the resolver at its translation function instead, as shown further down in Translations, to stay reactive to locale changes.

#### Register the plugin

The config plugin only runs if it is added to the `plugins` list in your `nuxt.config.ts`. Without it, none of the overrides below are applied and the components keep their default values.

```ts
// nuxt.config.ts
export default defineNuxtConfig({
    plugins: ['~/plugins/air-ui-config'],
})
```

#### DS config options

```ts
// plugins/air-ui-config.ts
export default defineNuxtPlugin(() => {
    const dsConfig = useDSConfig()

    /* Form fields customizations */
    Object.assign(dsConfig.forms, {
        optionalLabelText: () => '(optional)',
        selectPlaceholderText: () => 'Select an option',
        searchText: () => 'Search...',
        noResultsText: () => 'No results found',
        loadingOptionsText: () => 'Loading options...',
        clearSelectionText: () => 'Clear selection',
        clearSearchText: () => 'Clear search',
        togglePasswordVisibilityText: () => 'Toggle password visibility',
        suffixActionText: () => 'Suffix action',
        sliderMinText: () => 'Min: ',
        sliderMaxText: () => 'Max: ',
        signHereText: () => 'Sign here',
        clearSignatureText: () => 'Clear signature',
        tagsPlaceholderText: () => 'Enter values separated by commas',
    })

    Object.assign(dsConfig.forms.fileUpload, {
        dragDropText: () => 'Drag and drop files here',
        selectFilesText: () => 'Select files',
        uploadingText: () => 'Uploading',
        uploadedText: () => 'Uploaded',
        uploadFailedText: () => 'Upload failed',
        removeFileText: () => 'Remove file',
        selectFileText: () => 'Select file',
        dragDropSingleText: () => 'Drag and drop a file here',
        replaceFileText: () => 'Replace file',
        replaceDescriptionText: () => 'Upload a new file to replace current one',
        allFileTypesText: () => 'All file types',
        upToText: () => 'up to',
        invalidFilesText: () => 'The size or format of one or more files is incorrect.',
        pendingText: () => 'Pending',
        retryUploadText: () => 'Retry upload',
    })

    /* Text used by the RepeaterField */
    Object.assign(dsConfig.forms.repeater, {
        addText: () => 'Add item',
        removeText: () => 'Remove item',
        moveUpAriaText: () => 'Move item up',
        moveDownAriaText: () => 'Move item down',
        moveUpText: () => 'Move up',
        moveDownText: () => 'Move down',
        dragHandleAriaText: () => 'Drag to reorder item',
    })

    /* Text used by the RulesField */
    Object.assign(dsConfig.forms.rules, {
        itemAriaText: () => 'Rule item',
        operatorAriaText: () => 'Rule operator',
        valueAriaText: () => 'Rule value',
        addText: () => 'Add rule',
        removeText: () => 'Remove rule',
        moveUpAriaText: () => 'Move rule up',
        moveDownAriaText: () => 'Move rule down',
        dragHandleAriaText: () => 'Drag to reorder rule',
        itemPlaceholderText: () => 'Select item',
        operatorPlaceholderText: () => 'Select operator',
        valuePlaceholderText: () => 'Enter value',
    })

    /* Text used by action buttons along the design system */
    Object.assign(dsConfig.actions, {
        cancelText: () => 'Cancel',
        clearAllText: () => 'Clear all',
        closeText: () => 'Close',
        clearText: () => 'Clear',
        deleteText: () => 'Delete',
        removeText: () => 'Remove',
        processingText: () => 'Processing...',
        goBackText: () => 'Go back',
        backToHomeText: () => 'Back to home page',
        tryAgainText: () => 'Try again',
        copyText: () => 'Copy',
        renameText: () => 'Rename',
        moreOptionsText: () => 'More options',
    })

    /* Shared text used across multiple component types */
    Object.assign(dsConfig.common, {
        loadingText: () => 'Loading...',
        notDefinedText: () => 'Not defined',
        copiedText: () => 'Copied to clipboard',
        copyFailedText: () => 'Failed to copy to clipboard',
        dropHereText: () => 'Drop here',
    })

    /* Text used by the LoadingScreen error state */
    Object.assign(dsConfig.loaders, {
        errorTitleText: () => 'Oops! Something went wrong!',
        errorDescriptionText: () => 'Please try again or report the error to us. Thank you!',
        retryLimitReachedText: () => 'Retry limit reached. Please refresh the page or contact support.',
        retryInText: () => 'Retry in',
    })

    /* Text used by the table components */
    Object.assign(dsConfig.tables, {
        toggleSortText: () => 'Toggle sort',
    })

    /* Text used by ButtonPagination, SimplePagination and the Gallery pagination */
    Object.assign(dsConfig.pagination, {
        resultTextMultiplePages: () => 'Showing {from} to {to} of {total} results',
        resultTextSinglePage: () => 'Showing {total} results',
        resultTextSingleItem: () => 'Showing {total} result',
        previousPageText: () => 'Previous page',
        nextPageText: () => 'Next page',
        pageText: () => 'Page {page}',
        rowsText: () => 'Rows',
    })

    /* Text used by the NavSidebar, the CompactHeader, the Breadcrumbs and the TableOfContents */
    Object.assign(dsConfig.navigation, {
        openSidebarText: () => 'Open sidebar',
        closeSidebarText: () => 'Close sidebar',
        collapseSidebarText: () => 'Collapse sidebar',
        expandSidebarText: () => 'Expand sidebar',
        openMobileMenuText: () => 'Open mobile menu',
        breadcrumbText: () => 'Breadcrumb',
        tableOfContentsText: () => 'Table of contents',
    })

    /* Text used by the SelectableCard and the SelectableCardField */
    Object.assign(dsConfig.cards, {
        selectText: () => 'Select',
        selectedText: () => 'Selected',
        detailsText: () => 'Details',
    })

    /* Text used by the NotificationsPopover and its items */
    Object.assign(dsConfig.notifications, {
        removeText: () => 'Remove notification',
        emptyText: () => 'No notifications available.',
        loadingText: () => 'Loading notifications',
        titleText: () => 'Notifications',
        viewAllText: () => 'View all',
        markAllAsReadText: () => 'Mark all as read',
        allText: () => 'All',
        unreadText: () => 'Unread',
    })

    /* Text used by the TreeView */
    Object.assign(dsConfig.treeView, {
        loadErrorText: () => 'Failed to load. Click to retry.',
        labelText: () => 'Tree view',
    })

    /* Accessible names (aria-label and alt) used when a component has no label of its own.
       Texts with {placeholders} are filled in by the component */
    Object.assign(dsConfig.accessibility, {
        toggleText: () => 'Toggle',
        toggleOptionsText: () => 'Toggle options',
        optionsText: () => 'Options',
        selectStepText: () => 'Select step',
        angleSliderText: () => 'Angle slider',
        ratingText: () => 'Rating',
        ratingValueText: () => 'Rating: {value} out of 5',
        ratingStarText: () => '{count} star',
        ratingStarsText: () => '{count} stars',
        qrCodeText: () => 'QR code: {value}',
        progressText: () => 'Progress',
        navigationButtonText: () => 'Navigation button',
        tabDecorationText: () => 'Tab decoration',
        avatarText: () => '{name} avatar',
        spinnerText: () => 'Loading',
        signaturePadText: () => 'Signature pad',
        pinCodeText: () => 'PIN code',
        sliderText: () => 'Slider',
        sliderThumbText: () => '{label} thumb',
        sliderThumbIndexText: () => '{label} thumb {index}',
    })

    /* Text used by the Gallery component */
    Object.assign(dsConfig.gallery, {
        loadMoreText: () => 'Load more',
    })

    /* Text used by the Lightbox and Image components */
    Object.assign(dsConfig.lightbox, {
        dialogText: () => 'Image lightbox',
        openImageText: () => 'Open image',
        fullscreenText: () => 'Toggle fullscreen',
    })

    /* Text used by the Calendar, the DatePickerField and the date InputField */
    Object.assign(dsConfig.calendar, {
        previousMonthText: () => 'Previous month',
        nextMonthText: () => 'Next month',
        previousYearText: () => 'Previous year',
        nextYearText: () => 'Next year',
        openText: () => 'Open calendar',
        doneText: () => 'Done',
        clearText: () => 'Clear',
        placeholderText: () => 'Select a date',
        monthPlaceholderText: () => 'Select a month',
        weekPlaceholderText: () => 'Select a week',
        dateTimePlaceholderText: () => 'Select a date and time',
        weekText: () => 'Week',
        weekAbbreviationText: () => 'Wk',
        todayText: () => 'Today',
        moreText: () => 'more',
        dayText: () => 'Day',
        monthText: () => 'Month',
        yearText: () => 'Year',
        daySegmentText: () => 'dd',
        monthSegmentText: () => 'mm',
        yearSegmentText: () => 'yyyy',
        weekSegmentText: () => 'ww',
        agendaText: () => 'Agenda',
        viewText: () => 'Calendar view',
        allDayText: () => 'All day',
        noEventsText: () => 'No events',
        editEventText: () => 'Edit event',
        deleteEventText: () => 'Delete event',
        previousText: () => 'Previous',
        nextText: () => 'Next',
    })

    /* Text used by the TimePicker and the time InputField */
    Object.assign(dsConfig.timePicker, {
        openText: () => 'Open time picker',
        placeholderText: () => 'Select a time',
        hoursText: () => 'Hours',
        minutesText: () => 'Minutes',
        secondsText: () => 'Seconds',
        periodText: () => 'AM/PM',
        hoursSegmentText: () => 'hh',
        minutesSegmentText: () => 'mm',
        secondsSegmentText: () => 'ss',
        periodSegmentText: () => '--',
    })

    /* Navigation text shared by the Carousel and the Lightbox */
    Object.assign(dsConfig.slides, {
        previousText: () => 'Previous slide',
        nextText: () => 'Next slide',
        goToSlideText: () => 'Go to slide',
    })

    /* Default glow of the cards, the modals, the buttons and the form fields. A glow prop on a component wins over these */
    Object.assign(dsConfig.glow.card, {
        colorMode: GlowColorMode.NONE,
        trigger: GlowTrigger.ALWAYS,
        type: GlowType.OUTER,
        opacity: 40,
        size: null,
    })

    Object.assign(dsConfig.glow.modal, {
        colorMode: GlowColorMode.NONE,
        trigger: GlowTrigger.ALWAYS,
        type: GlowType.INNER,
        opacity: 40,
        size: null,
    })

    Object.assign(dsConfig.glow.button, {
        colorMode: GlowColorMode.NONE,
        trigger: GlowTrigger.ALWAYS,
        type: GlowType.OUTER,
        opacity: 40,
        size: null,
    })

    Object.assign(dsConfig.glow.input, {
        colorMode: GlowColorMode.NONE,
        trigger: GlowTrigger.FOCUS,
        type: GlowType.INNER,
        opacity: 40,
        size: null,
    })

    Object.assign(dsConfig.glow.fileUpload, {
        colorMode: GlowColorMode.NONE,
        trigger: GlowTrigger.HOVER_FOCUS,
        type: GlowType.INNER,
        opacity: 40,
        size: null,
    })

    /* Taller form fields, dropdown items, tree rows and sidebar items on mobile. The responsiveSize prop of each component wins over these */
    dsConfig.forms.responsiveSize = false
    dsConfig.dropdowns.responsiveSize = false
    dsConfig.treeView.responsiveSize = false
    dsConfig.navigation.responsiveSize = false

    /* Bigger buttons on mobile. A responsiveSize prop on a button wins over this */
    dsConfig.buttons.responsiveSize = false
    Object.assign(dsConfig.buttons.mobileSizeMap, {
        [ButtonSize.XS]: ButtonSize.MD,
        [ButtonSize.SM]: ButtonSize.LG,
        [ButtonSize.MD]: ButtonSize.LG,
        [ButtonSize.LG]: ButtonSize.XL,
        [ButtonSize.XL]: ButtonSize.XL,
        [ButtonSize.XXL]: ButtonSize.XXL,
    })
})
```

#### Button options

Small buttons can be hard to tap on a phone. Set `buttons.responsiveSize` to `true` to make every `ActionButton` and `ActionIconButton` use a bigger size below the `md` breakpoint, and go back to their own `size` from `md` up. Height, text, icon, padding and gap change together.

`buttons.mobileSizeMap` decides which size each one grows to, so you can set a bigger target if the default is not enough for your project. A `responsiveSize` prop passed to a button always wins over the config, so `:responsiveSize="false"` keeps a single button at its own size.

| Option | Type | Default |
|---|---|---|
| `responsiveSize` | `boolean` | `false` |
| `mobileSizeMap` | `Record<ButtonSize, ButtonSize>` | See the table below |

Default `mobileSizeMap`:

::options-table
---
options: [
    {
        value: "ButtonSize.XS",
        description: "ButtonSize.MD",
    },
    {
        value: "ButtonSize.SM",
        description: "ButtonSize.LG",
    },
    {
        value: "ButtonSize.MD",
        description: "ButtonSize.LG",
    },
    {
        value: "ButtonSize.LG",
        description: "ButtonSize.XL",
    },
    {
        value: "ButtonSize.XL",
        description: "ButtonSize.XL",
    },
    {
        value: "ButtonSize.XXL",
        description: "ButtonSize.XXL",
    },
]
---
::

The change applies to every button that renders through `ActionButton` or `ActionIconButton`, including the ones inside other components. Check forms and toolbars where a button sits next to an element of a fixed height before turning it on for the whole project.

#### Responsive size options

Besides the buttons, other components can be taller on mobile so they are easier to tap. It is off by default, so nothing changes in your project until you turn it on. Each option works like `buttons.responsiveSize`: a `responsiveSize` prop passed to a component always wins over the config, so `:responsiveSize="false"` keeps a single component at its own size.

| Option | Applies to | Default |
|---|---|---|
| `forms.responsiveSize` | `InputField`, `SearchField`, `SelectField`, `ComboboxField`, `PinField`, `DatePickerField`, `TimePickerField`, `DropdownSelect`, `DropdownCombobox` and `DropdownSelectItem` | `false` |
| `dropdowns.responsiveSize` | `DropdownMenuItem` and `DropdownMenuContextItem` | `false` |
| `treeView.responsiveSize` | `TreeView` | `false` |
| `navigation.responsiveSize` | `NavSidebar` | `false` |

Form fields and dropdown items with `MD` size become `LG` below the `lg` breakpoint and go back to `MD` from `lg` up. Other sizes do not change.

#### Glow options

The glow of the cards, the modals, the buttons and the form fields can be set once per family, so you don't repeat the same props on every instance. `glow.card` applies to `Card`, `glow.modal` to the inner container of `ModalDialog`, `SuccessModalDialog`, `DangerModalDialog` and `InfoModalDialog`, `glow.button` to `ActionButton` and `ActionIconButton`, and `glow.input` to every form field that has a glow (`InputField`, `TextareaField`, `SelectField`, `ComboboxField`, `SearchField`, `TagsField`, `PinField`, `DatePickerField` and `TimePickerField`), and `glow.fileUpload` to `FileUploadField`.

A glow prop passed to a component always wins over the config. Each family has its own values, so you can, for example, glow only the cards in dark mode and the inputs on focus. The values in the example above are the defaults. Modals and form fields glow on the inside by default. Form fields glow only while they have focus, and the file upload field also glows on hover.

Each family accepts these options, which match the `glowColorMode`, `glowTrigger`, `glowType`, `glowOpacity` and `glowSize` props:

| Option | Type | Default |
|---|---|---|
| `colorMode` | `GlowColorMode` | `GlowColorMode.NONE` |
| `trigger` | `GlowTrigger` | `GlowTrigger.ALWAYS` |
| `type` | `GlowType` | `GlowType.OUTER` |
| `opacity` | `number` | `40` |
| `size` | `number | null` | `null` (each component calculates its own size) |

#### Utils config options

```ts
// plugins/air-ui-config.ts
export default defineNuxtPlugin(() => {
    const utilsConfig = useUtilsConfig()

    /* Fallback messages used by air-ui-utils's form validators */
    Object.assign(utilsConfig.validation, {
        requiredFieldMessage: () => 'This field is required.',
        invalidEmailMessage: () => 'Invalid email address.',
        passwordsDoNotMatchMessage: () => 'Passwords do not match.',
        invalidDateRangeMessage: () => 'Start date must be before or equal to end date',
        invalidUrlMessage: () => 'Invalid URL.',
        requiredEmailMessage: () => 'Email is required.',
        minItemsMessage: (min) => `At least ${min} item${min > 1 ? 's' : ''} required`,
        maxItemsMessage: (max) => `No more than ${max} item${max > 1 ? 's' : ''} allowed`,
        atLeastOneRuleMessage: () => 'Add at least one complete rule.',
        incompleteRuleMessage: () => 'Complete all rule fields before continuing.',
        maxRulesMessage: (max) => `No more than ${max} rule${max > 1 ? 's' : ''} allowed.`,
    })

    /* Shared texts of air-ui-utils's helpers */
    Object.assign(utilsConfig.common, {
        invalidNumberText: () => 'Not a valid number',
        readMoreText: () => 'Read more',
    })
})
```

The `minItemsMessage`, `maxItemsMessage` and `maxRulesMessage` resolvers receive the limit, so each language can pluralize on its own.

#### Translations

Point the resolver at your i18n library's translation function instead of returning a plain string, so the value stays reactive to locale changes. You only need to override the options you want translated:

```ts
// plugins/air-ui-config.ts
export default defineNuxtPlugin(() => {
    const { t } = useI18n()
    const dsConfig = useDSConfig()
    const utilsConfig = useUtilsConfig()

    Object.assign(dsConfig.forms, {
        optionalLabelText: () => t('forms.optional'),
        selectPlaceholderText: () => t('forms.selectPlaceholder'),
        searchText: () => t('forms.search'),
    })

    Object.assign(utilsConfig.validation, {
        requiredFieldMessage: () => t('validation.required'),
        invalidEmailMessage: () => t('validation.invalidEmail'),
        minItemsMessage: (min) => t('validation.minItems', { count: min }),
    })
})
```

#### Updating texts when the language changes

Error messages are stored already translated, so a form that is showing an error keeps the old language when the locale changes. Set `revalidateOn` on the utils config to a function that reads your reactive locale. `useForm` watches it and recomputes the messages of the fields that currently show an error:

```ts
// plugins/air-ui-config.ts
export default defineNuxtPlugin(() => {
    const utilsConfig = useUtilsConfig()

    utilsConfig.revalidateOn = () => useNuxtApp().$i18n.locale.value
})
```

### Extending the config

`useDSConfig` and `useUtilsConfig` cover AirUI's own text and validator messages only. They aren't meant to hold project-specific config for your own local components or utils; add a separate composable in your app for that.

If you want typed additions to `DesignSystemConfig` or `UtilsConfig` themselves, use TypeScript declaration merging in your app rather than editing these types in AirUI:

```ts
// types/air-ui-config.d.ts
import '@imaginario27/air-ui-ds'

declare module '@imaginario27/air-ui-ds' {
    interface DesignSystemConfig {
        myApp: {
            welcomeText: () => string
        }
    }
}
```

```ts
// plugins/air-ui-config.ts
export default defineNuxtPlugin(() => {
    const dsConfig = useDSConfig()

    dsConfig.myApp = {
        welcomeText: () => 'Welcome back',
    }
})
```

This keeps `DesignSystemConfig` and `UtilsConfig` closed and fully typed for every consumer of the library, while your app still gets typed access to the properties it adds.
