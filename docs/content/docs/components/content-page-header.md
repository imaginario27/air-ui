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

## Slots
::slots-table
---
slots: [
    {
        "name": "top",
        "description": "Slot to insert custom content at the top of the header."
    },
    {
        "name": "bottom",
        "description": "Slot to insert custom content at the bottom of the header."
    }
]
---
::

```vue
<template>
    <ContentPageHeader>
        <template #top>
            <!-- Custom content at the top of the header -->
        </template>
        <template #bottom>
            <!-- Custom content at the bottom of the header -->
        </template>
    </ContentPageHeader>
</template>
```

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

### overtitle

The `overtitle` prop allows you to set an overtitle text that appears above the main title in the header component.

```vue
<template>
    <ContentPageHeader
        overtitle="Section"
    />
</template>
```

- **Type:** `string`

### isOverTitleUppercase

The `isOverTitleUppercase` prop allows you to control whether the overtitle text is displayed in uppercase letters.

```vue
<template>
    <ContentPageHeader
        overtitle="Section"
        :isOverTitleUppercase="true"
    />
</template>
```

- **Type:** `boolean`
- **Default:** `false`

### overtitleClass

The `overtitleClass` prop allows you to add custom CSS classes to the overtitle element for additional styling.

```vue
<template>
    <ContentPageHeader
        overtitle="Section"
        overtitleClass="custom-overtitle-class"
    />
</template>
```

- **Type:** `string`

### showDescription

The `showDescription` prop allows you to toggle the visibility of the description text in the header component.

```vue
<template>
    <ContentPageHeader
        :showDescription="false"
    />
</template>
```

- **Type:** `boolean`
- **Default:** `true`

### description

The `description` prop allows you to set a description text that appears below the main title in the header component.

```vue
<template>
    <ContentPageHeader
        description="This is a description for the content page header."
    />
</template>
```

- **Type:** `string`

### hasGoBackLink

The `hasGoBackLink` prop allows you to enable or disable the "Go back" link in the header component.

```vue
<template>
    <ContentPageHeader
        :hasGoBackLink="true"
    />
</template>
```

- **Type:** `boolean`
- **Default:** `false`

### goBackText

The `goBackText` prop allows you to customize the text displayed for the "Go back" link in the header component.

```vue

<template>
    <ContentPageHeader
        :hasGoBackLink="true"
        goBackText="Return to previous page"
    />
</template>
```

- **Type:** `string`
- **Default:** `'Go back'`

### goBackLink

The `goBackLink` prop allows you to set the URL for the "Go back" link in the header component.

```vue
<template>
    <ContentPageHeader
        :hasGoBackLink="true"
        goBackLink="/previous-page"
    />
</template>
```

- **Type:** `string`

### hasSeparator

The `hasSeparator` prop allows you to toggle the visibility of a separator line below the header component.

```vue 
<template>
    <ContentPageHeader
        :hasSeparator="false"
    />
</template>
```

- **Type:** `boolean`
- **Default:** `true`

### hasSidePadding

The `hasSidePadding` prop allows you to enable or disable side padding for the header component.

```vue
<template>
    <ContentPageHeader
        :hasSidePadding="false"
    />
</template>
```

- **Type:** `boolean`
- **Default:** `true`

