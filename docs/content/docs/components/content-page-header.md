## Component

::component-code
---
srcDir: 'layouts/headers/ContentPageHeader.vue'
props: 
    type: "simple"
    title: "Your page title"
    overtitle: "Overtitle Text"
    isOverTitleUppercase: true
    overtitleClass: ""
    showDescription: true
    description: "This is a description for the content page header."
    hasGoBackLink: false
    goBackText: "Go back"
    goBackLink: ""
    hasSeparator: true
    hasSidePadding: true
items:
    type:
        - value: simple
          text: SIMPLE
        - value: with-overtitle
          text: WITH_OVERTITLE
        - value: with-breadcrumbs
          text: WITH_BREADCRUMBS
previewBackground: 'white'
propsSettingsExcludedProps: ['navMenuItems', 'userMenuItems', 'class']
---
::

## Props

::props-table
---
props: [
    {
        "name": "type",
        "default": "PageTitleType.SIMPLE",
        "type": "PageTitleType"
    },
    {
        "name": "overtitle",
        "type": "string"
    },
    {
        "name": "isOverTitleUppercase",
        "default": "false",
        "type": "boolean"
    },
    {
        "name": "overtitleClass",
        "type": "string"
    },
    {
        "name": "showDescription",
        "default": "true",
        "type": "boolean"
    },
    {
        "name": "description",
        "type": "string"
    },
    {
        "name": "hasGoBackLink",
        "type": "boolean"
    },
    {
        "name": "goBackText",
        "default": "'Go back'",
        "type": "string"
    },
    {
        "name": "goBackLink",
        "type": "string"
    },
    {
        "name": "hasSeparator",
        "default": "true",
        "type": "boolean"
    },
    {
        "name": "hasSidePadding",
        "default": "true",
        "type": "boolean"
    }
]
---
::

## Usage
### type

The compact header component uses `useHead` under the hood to set the page title based on the selected format as a fallback. 

By using the `PageTitleType` enum, you can choose between the available types for the page title.

```vue
<template>
    <ContentPageHeader
        :type="PageTitleType.WITH_OVERTITLE"
    />
</template>
```

- **Type:** `PageTitleType`
- **Default:** `PageTitleType.SIMPLE`

#### Options
::options-table
---
options: [
    {
        value: "SIMPLE",
        description: "Sets the page header without an overtitle nor breadcrumbs.",
    },
    {
        value: "WITH_OVERTITLE",
        description: "Sets the page header to include an overtitle above the page title.",
    },
    {
        value: "WITH_BREADCRUMBS",
        description: "Sets the page header to include breadcrumbs above the page title.",
    }
]
---
::
