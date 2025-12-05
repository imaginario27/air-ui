
## Component

::component-code
---
srcDir: 'alerts/Alert.vue'
props: 
    type: "info"
    title: "Title"
    description: "Description"
    hasCloseButton: true
    buttons:
        - text: "View details"
          actionType: "link"
          to: ""
        - text: "Dismiss"
          callback: "() => console.log('close')"
items:
    type:
        - value: info
          text: INFO
        - value: success
          text: SUCCESS
        - value: danger
          text: DANGER
        - value: warning
          text: WARNING
emits:
    close: "() => console.log('Close alert')"
external:
  - buttons
externalTypes:
  - AlertButton[]
propsSettingsExcludedProps: ['buttons']
---
::

## Props

::props-table
---
props: [
    {
        "name": "type",
        "default": "AlertType.WARNING",
        "type": "AlertType",
    },
    {
        "name": "icon",
        "type": "string",
    },
    {
        "name": "title",
        "default": "'Title'",
        "type": "string",
    },
    {
        "name": "description",
        "type": "string",
    },
    {
        "name": "buttons",
        "type": "AlertButton[]",
    },
    {
        "name": "hasCloseButton",
        "default": "true",
        "type": "boolean",
    },
    
]
---
::

## Usage
### type

The `type` prop determines the type of the alert. It accepts values from the `AlertType` enum.

```vue
<template>
    <Alert 
        :type="AlertType.SUCCESS"  
    />
</template>
```

#### Options
::options-table
---
options: [
    {
        value: "INFO",
        description: "Info alert",
    },
    {
        value: "SUCCESS",
        description: "Success alert",
    },
    {
        value: "DANGER",
        description: "Danger alert",
    },
    {
        value: "WARNING",
        description: "Warning alert",
    },
]
---
::

### icon

Sets the icon of the alert. 

By default, it will use specific icons for each type of alert.

```vue
<template>
    <Alert 
        icon="info"  
    />
</template>
```

- **Type:** `string`

### title

Sets the title of the alert. 

```vue
<template>
    <Alert 
        title="Title"  
    />
</template>
```

- **Type:** `string`
- **Default:** `'Title'`

### description

Sets the description of the alert. 

```vue
<template>
    <Alert 
        description="Description"  
    />
</template>
```

- **Type:** `string`

### buttons

Sets the buttons of the alert. 

```vue
<template>
    <Alert 
        buttons="exampleButtons"
    />
</template>
<script setup="ts">
const exampleButtons: AlertButton[] = [
    {
        text: "View details",
        actionType: "link",
        to: "/",
    },
    {
        text: "Dismiss",
        callback: () => console.log("close"),
    },
]
</script>
```

#### TypeScript interface
```ts
interface AlertButton {
    text: string
    actionType?: ButtonActionType
    icon?: any
    iconPosition?: IconPosition
    disabled?: boolean
    to?: string
    isExternal?: boolean
    callback?: () => void
}
```

#### Button iconPosition options
::options-table
---
options: [
    {
        value: "LEFT",
        description: "left",
    },
    {
        value: "RIGHT",
        description: "right",
    },
    {
        value: "NONE",
        description: "none (icon does not appear at all)",
    },
]
---
::

#### Buttons actionType options

::options-table
---
options: [
    {
        value: "ACTION",
        description: "Converts the HTML tag of the component into a '<button>' tag. Use 'callback' key to trigger functions."
    },
    {
        value: "LINK",
        description: "Converts the HTML tag of the component into a '<a>' tag. Use 'to' key to set a link"
    },
]
---
::

### hasCloseButton

Sets whether the alert has a icon close button.

::content-alert
---
props:
    title: "Important"
    description: "This close button only appears if the description is provided. Otherwise you can pass dismiss button through the <strong>buttons</strong> array prop."
---
::

```vue
<template>
    <Alert 
        description="Some description"
        hasCloseButton="false"
    />
</template>
```

## Emits
::options-table
---
options: [
    {
        value: "@close",
        description: "Triggers a callback function when the close button is clicked. Remember to provide a description in order to use this emitter.",
    },
]
---
::

#### Example

```vue
<template>
    <Alert 
        v-if="showAlert"
        description="Some description"
        hasCloseButton="false"
        @close="handleClose"
    />
</template>
<script setup lang="ts">
const showAlert = ref(true)

const handleClose = () => {
    showAlert.value = false
}
</script>
```