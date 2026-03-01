## Component

::component-code
---
srcDir: 'action-panels/ActionPanel.vue'
props: 
    title: "Panel title"
    description: "Panel description"
    orientation: "vertical"
    hasShadow: true
    hasBorder: false
slots:
  actions: ""
slotComponents:
  actions:
    srcDir: 'placeholders/ContentPlaceholder.vue'
    props:
        text: "Insert actions here"
items:
    orientation: 
        - value: horizontal
          text: HORIZONTAL
        - value: vertical
          text: VERTICAL

enums:
    orientation: "Orientation"
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
        "default": "'Description'",
        "type": "string",
    },
    {
        "name": "orientation",
        "default": "VERTICAL",
        "type": "Orientation",
    },
    {
        "name": "hasShadow",
        "default": "true",
        "type": "boolean",
    },
    {
        "name": "hasBorder",
        "default": "false",
        "type": "boolean",
    },
]
---
::

## Slots
::slots-table
---
slots: [
    {
        name: "actions",
        description: "Template to render actions in the panel such as buttons or other components.",
    },
]
---
::

```vue
<template>
    <ActionPanel
        title="My Panel Title"
        description="Additional context here"
    >
        <template #actions>
            <!-- Insert content here -->
        </template>
    </ActionPanel>
</template>
```

## Usage
### title
Action panel title.

```vue
<template>
    <ActionPanel title="My Panel Title" />
</template>
```

- **Type:** `string`
- **Default:** `'Title'`

### description
Optional short text displayed under the title.

```vue
<template>
    <ActionPanel
        title="My Panel Title"
        description="Additional context here"
    />
</template>
```

- **Type:** `string`
- **Default:** `'Description'`

### orientation
Sets the layout direction of the panel’s actions content. Uses the `Orientation` enum.

```vue
<template>
    <ActionPanel
        title="Panel"
        :orientation="Orientation.HORIZONTAL"
    />
</template>
```

- **Type:** `Orientation`
- **Default:** `Orientation.VERTICAL`

#### Options
::options-table
---
options: [
    {
        value: "Orientation.HORIZONTAL",
        description: "horizontal",
    },
    {
        value: "Orientation.VERTICAL",
        description: "vertical",
    },
]
---
::

### hasShadow
Toggles shadow around the panel container.

```vue
<template>
    <ActionPanel
        title="Panel"
        :hasShadow="false"
    />
</template>
```

- **Type:** `boolean`
- **Default:** `true`

### hasBorder
Toggles shadow around the panel container.

```vue
<template>
    <ActionPanel
        title="Panel"
        :hasBorder="true"
    />
</template>
```

- **Type:** `boolean`
- **Default:** `false`