## Component

::component-code
---
srcDir: 'features/Feature.vue'
props: 
    title: "Feature title"
    description: "This is a description of the feature."
    icon: "mdi:star-circle-outline"
    iconColor: "primary-brand"
    iconClass: ""
items:
    iconColor: 
        - value: neutral
          text: NEUTRAL
        - value: success
          text: SUCCESS
        - value: warning
          text: WARNING
        - value: danger
          text: DANGER
        - value: info
          text: INFO
        - value: primary-brand
          text: PRIMARY_BRAND
        - value: secondary-brand
          text: SECONDARY_BRAND
previewBackground: 'white'
---
::

## Props

::props-table
---
props: [
    {
        "name": "title",
        "default": "'Title'",
        "type": "string",
    },
    {
        "name": "description",
        "default": "'This is a description of the feature.'",
        "type": "string",
    },
    {
        "name": "icon",
        "default": "'mdi:star-circle-outline'",
        "type": "string",
    },
    {
        "name": "iconColor",
        "default": "'primary-brand'",
        "type": "ColorAccent",
    },
    {
        "name": "iconClass",
        "type": "string",
    },
]
---
::

## Usage
### title

Displays the title.

```vue
<template>
    <Feature title="Replace me" />
</template>
```

- **Type:** `text`
- **Default:** `Title`

### description

Displays the description.

```vue
<template>
    <Feature description="This is a description of the feature." />
</template>
```

- **Type:** `string`
- **Default:** `This is a description of the feature.`

### icon

Displays the icon.

```vue
<template>
    <Feature icon="mdi:star-circle-outline" />
</template>
```

- **Type:** `string`
- **Default:** `mdi:star-circle-outline`    

### iconColor

Sets the color of the icon. Uses the `ColorAccent` enum.

```vue
<template>
    <Feature :iconColor="ColorAccent.PRIMARY_BRAND" />
</template>

- **Type:** `ColorAccent`
- **Default:** `ColorAccent.SECONDARY_BRAND`

#### Options
::options-table
---
options: [
    {
        value: "NEUTRAL",
        description: "neutral",
    },
    {
        value: "SUCCESS",
        description: "success",
    },
    {
        value: "WARNING",
        description: "warning",
    },
    {
        value: "DANGER",
        description: "danger",
    },
    {
        value: "INFO",
        description: "info",
    },
    {
        value: "PRIMARY_BRAND",
        description: "primary brand",
    },
    {
        value: "SECONDARY_BRAND",
        description: "secondary brand",
    },
]
---
::

### iconClass

Sets custom class to the icon.

```vue
<template>
    <Feature 
        icon="mdi:star-circle-outline" 
        iconClass="custom-icon-class" 
    />
</template>
```

- **Type:** `string`