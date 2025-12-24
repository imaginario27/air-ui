::component-code
---
srcDir: 'popovers/Popover.vue'
props: 
    position: "top"
    align: "center"
    trigger: "hover"
    popoverClass: "min-w-[300px]"
items:
    position: 
        - value: top
          text: TOP
        - value: bottom
          text: BOTTOM
    align: 
        - value: left
          text: LEFT
        - value: center
          text: CENTER
        - value: right
          text: RIGHT
    trigger: 
        - value: click
          text: CLICK
        - value: hover
          text: HOVER
slots:
    content: ""
    activator: ""
slotComponents:
    content:
        srcDir: 'placeholders/ContentPlaceholder.vue'
        props:
            text: "Insert content here"
    activator:
        srcDir: 'buttons/ActionButton.vue'
---
::

## Props

::props-table
---
props: [
    {
        "name": "position",
        "default": "Position.TOP",
        "type": "Position",
    },
    {
        "name": "align",
        "default": "Align.CENTER",
        "type": "Align",
    },
    {
        "name": "trigger",
        "default": "Trigger.HOVER",
        "type": "Trigger",
    },
    {
        "name": "popoverClass",
        "default": "min-w-[300px]",
        "type": "string",
    },
]
---
::


## Usage
### position

Determines the vertical position of the popover. Uses the `Position` enum.

```vue
<template>
    <Popover
        position="Position.TOP"
    >
        <template #content>
            ...
        </template>
        <template #activator>
            <ActionButton />
        </template>
    </Popover>
</template>
```

- **Type:** `Position`
- **Default:** `Position.TOP`

#### Options

::options-table
---
options: [
    {
        value: "TOP",
        description: "The popover will be positioned at the top of the activator.",
    },
    {
        value: "BOTTOM",
        description: "The popover will be positioned at the bottom of the activator.",
    },
]
---
::

### align

Sets the horizontal position of the popover. Uses the `Align` enum.

```vue
<template>
    <Popover
        align="Align.LEFT"
    >
        <template #content>
            ...
        </template>
        <template #activator>
            <ActionButton />
        </template>
    </Popover>
</template>
```

::options-table
---
options: [
    {
        value: "LEFT",
        description: "The popover will be positioned at the left border of the activator",
    },
    {
        value: "CENTER",
        description: "The popover will be positioned at the center of the activator",
    },
    {
        value: "RIGHT",
        description: "The popover will be positioned at the right border of the activator",
    },
]
---
::

### trigger

Configures the trigger for the popover. Uses the `Trigger` enum.

```vue
<template>
    <Popover
        trigger="Trigger.CLICK"
    >
        <template #content>
            ...
        </template>
        <template #activator>
            <ActionButton />
        </template>
    </Popover>
</template>
```

- **Type:** `Trigger`
- **Default:** `Trigger.HOVER`

#### Options

::options-table
---
options: [
    {
        value: "CLICK",
        description: "The floating panel will appear when clicking on the activator item.",
    },
    {
        value: "HOVER",
        description: "The floating panel will appear when hovering over the activator item.",
    },
]
---
::

### popoverClass

Can be used to override the popover's card class.

```vue
<template>
    <Popover
        popoverClass="min-w-[400px]"
    >
        <template #content>
            ...
        </template>
        <template #activator>
            <ActionButton />
        </template>
    </Popover>
</template>
```

- **Type:** `string`
- **Default:** `'min-w-[300px]'`