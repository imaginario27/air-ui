## Component

::component-code
---
srcDir: 'layouts/ErrorDisplay.vue'
props: 
    statusCode: 404
    errorMappings: []
    setPageTitle: false
    showIcon: true
    showErrorCode: true
    icon: 'mdi:alert-circle-outline'
    backToHomeText: 'Back to home page'
    backToHomeIcon: 'mdi:home-outline'
    homeRoute: '/'
    isFullScreen: false
    orientation: 'vertical'
    alignContent: 'center'
    isMobileCentered: true
items:
    orientation:
        - value: horizontal
          text: HORIZONTAL
        - value: vertical
          text: VERTICAL
    alignContent:
        - value: left
          text: LEFT
        - value: center
          text: CENTER
        - value: right
          text: RIGHT
enums:
    orientation: "Orientation"
    alignContent: "Align"
propsSettingsExcludedProps: ['errorMappings']
previewBackground: 'white'
---
::

## Props

::props-table
---
props: [
    {
        "name": "statusCode",
        "default": "required",
        "type": "number",
    },
    {
        "name": "setPageTitle",
        "default": "true",
        "type": "boolean",
    },
    {
        "name": "errorMappings",
        "default": "[]",
        "type": "ErrorMapping[]",
    },
    {
        "name": "showIcon",
        "default": "true",
        "type": "boolean",
    },
    {
        "name": "showErrorCode",
        "default": "true",
        "type": "boolean",
    },
    {
        "name": "icon",
        "default": "'mdi:alert-circle-outline'",
        "type": "string",
    },
    {
        "name": "backToHomeText",
        "default": "'Back to home page'",
        "type": "string",
    },
    {
        "name": "backToHomeIcon",
        "default": "'mdi:home-outline'",
        "type": "string",
    },
    {
        "name": "homeRoute",
        "default": "'/'",
        "type": "string",
    },
    {
        "name": "isFullScreen",
        "default": "true",
        "type": "boolean",
    },
    {
        "name": "orientation",
        "default": "'horizontal'",
        "type": "Orientation",
    },
    {
        "name": "alignContent",
        "default": "'center'",
        "type": "Align",
    },
    {
        "name": "isMobileCentered",
        "default": "true",
        "type": "boolean",
    },
]
---
::

## Slots

When using the slots, you can customize different parts of the `ErrorDisplay` component to better fit your application's design and requirements. It will replace the default content for each respective section and ignore the related props.

::slots-table
---
slots: [
    {
        name: "visual-left",
        description: "Slot for images, illustrations or other visual elements on the left side of the error display.",
    },
    {
        name: "visual-right",
        description: "Slot for images, illustrations or other visual elements on the right side of the error display.",
    },
    {
        name: "visual-top",
        description: "Slot for images, illustrations or other visual elements above the error message.",
    },
    {
        name: "description",
        description: "Slot to provide a custom description or message for the error display.",
    },
    {
        name: "actions",
        description: "Slot to add custom action buttons or links related to the error display.",
    },
]
---
::

```vue
<template>
    <ErrorDisplay 
        :statusCode="error?.statusCode ?? -1" 
    >
        <template #visual-top>
            <!-- Custom visual content -->
        </template>

        <template #visual-left>
            <!-- Custom visual content -->
        </template>

        <template #visual-right>
            <!-- Custom visual content -->
        </template>

        <template #description>
            <!-- Custom description content -->
        </template>

        <template #actions>
            <!-- Custom action buttons or links -->
        </template>
    </ErrorDisplay>
</template>

<script setup lang="ts">
const error = useError()
</script>
```


## Nuxt error page

The `error.vue` page, which is created in the root of the Nuxt project, can contain the `ErrorDisplay` component to show error messages based on the HTTP status code.

```vue
<template>
    <ErrorDisplay :statusCode="error?.statusCode ?? -1" />
</template>

<script setup lang="ts">
const error = useError()
</script>
```

Error mappings can also be customized by passing the `errorMappings` prop to the `ErrorDisplay` component.

## Usage
### statusCode

Sets the HTTP status code for the error display. This code is used to determine the appropriate error message and title to show.

```vue
<template>
    <ErrorDisplay :statusCode="404" />
</template>
```

- **Type:** `number`
- **Required:** `true`

### errorMappings

The `errorMappings` prop allows you to provide custom mappings for different HTTP status codes. Each mapping should include a `statusCode`, `title`, `description`, and optionally an `icon`.

Provided mappings will override the matching default mappings. The rest of the default mappings will still be available.

```vue
<template>
    <ErrorDisplay :errorMappings="customErrorMappings" />
</template>
<script setup lang="ts">
const customErrorMappings: ErrorMapping[] = [
    {
        statusCode: 404,
        title: 'Page Not Found',
        description: 'The page you are looking for does not exist.',
        icon: 'mdi:alert-circle-outline',
    },
    {
        statusCode: 500,
        title: 'Internal Server Error',
        description: 'Something went wrong on our end. Please try again later.',
        icon: 'mdi:server',
    },
]
</script>
```

#### TypeScript type
```ts
type ErrorMapping = {
    statusCode: number
    title: string
    message: string
    icon?: string
}
```

### showIcon

Determines whether to display the error icon in the error display component.

```vue
<template>
    <ErrorDisplay :showIcon="false" />
</template>
```

- **Type:** `boolean`
- **Default:** `true`

### setPageTitle

When set to `true`, the component will update the page title to reflect the error status code and title.

```vue 
<template>
    <ErrorDisplay setPageTitle />
</template>
```

- **Type:** `boolean`
- **Default:** `true`

### showErrorCode

Controls the visibility of the error code in the error display.

```vue
<template>
    <ErrorDisplay :showErrorCode="false" />
</template>
```

- **Type:** `boolean`
- **Default:** `true`

### icon

Specifies the icon to be displayed in the error display component. It will be replaced if is a custom icon provided through the `errorMappings` prop.

```vue
<template>
    <ErrorDisplay icon="mdi:alert-octagon-outline" />
</template>
```

- **Type:** `string`
- **Default:** `'mdi:alert-circle-outline'`

### backToHomeText

The `backToHomeText` prop allows you to customize the text displayed on the button that navigates back to the home page.

```vue
<template>
    <ErrorDisplay backToHomeText="Return to Homepage" />
</template>
```

- **Type:** `string`
- **Default:** `'Back to home page'`

### backToHomeIcon

The `backToHomeIcon` prop allows you to set a custom icon for the button that navigates back to the home page.

```vue
<template>
    <ErrorDisplay backToHomeIcon="mdi:arrow-left-circle-outline" />
</template>
```

- **Type:** `string`
- **Default:** `'mdi:home-outline'`

### homeRoute

The `homeRoute` prop specifies the route to which the user will be redirected when they click the "Back to home page" button.

```vue<template>
    <ErrorDisplay homeRoute="/dashboard" />
</template>
```

- **Type:** `string`
- **Default:** `'/'`

### isFullScreen

When set to `true`, the error display will occupy the full height of the viewport, providing a more immersive experience.

```vue
<template>
    <ErrorDisplay isFullScreen />
</template>
```

- **Type:** `boolean`
- **Default:** `true`

### orientation

The `orientation` prop allows you to set the layout orientation of the error display content. It uses the `Orientation` enum.

```vue

<template>
    <ErrorDisplay :orientation="Orientation.HORIZONTAL" />
</template>
``` 

- **Type:** `Orientation`
- **Default:** `Orientation.VERTICAL`

#### Options
::options-table
---
options: [
    {
        value: "HORIZONTAL",
        description: "Displays content in a horizontal layout",
    },
    {
        value: "VERTICAL",
        description: "Displays content in a vertical layout",
    },
]
---
::

### alignContent

The `alignContent` prop allows you to set the alignment of the content within the error display. It uses the `Align` enum.

```vue
<template>
    <ErrorDisplay :alignContent="Align.LEFT" />
</template>
```

- **Type:** `Align`
- **Default:** `Align.CENTER`

#### Options
::options-table
---
options: [
    {
        value: "LEFT",
        description: "Aligns content to the left",
    },
    {
        value: "CENTER",
        description: "Centers the content",
    },
    {
        value: "RIGHT",
        description: "Aligns content to the right",
    },
]
---
::

### isMobileCentered

When set to `true`, the content of the error display will be centered on mobile devices for better readability.

```vue
<template>
    <ErrorDisplay :isMobileCentered="false" />
</template>
```

- **Type:** `boolean`
- **Default:** `true`