## Component

::component-code
---
srcDir: 'buttons/ActionIconButton.vue'
props: 
    actionType: "action"
    styleType: "primary-brand-filled"
    type: "button"
    size: "lg"
    icon: "mdi:plus"
    iconClass: ""
    isRounded: false
    disabled: false
    to: "/"
    isExternal: false
    id: "my-action-icon-button"
items:
    actionType: 
        - value: action
          text: ACTION
        - value: link
          text: LINK
    styleType:
        - value: primary-brand-filled
          text: PRIMARY_BRAND_FILLED
        - value: primary-brand-transparent
          text: PRIMARY_BRAND_TRANSPARENT
        - value: primary-brand-soft
          text: PRIMARY_BRAND_SOFT
        - value: secondary-brand-filled
          text: SECONDARY_BRAND_FILLED
        - value: neutral-outlined
          text: NEUTRAL_OUTLINED
        - value: neutral-transparent
          text: NEUTRAL_TRANSPARENT
        - value: neutral-transparent-subtle
          text: NEUTRAL_TRANSPARENT_SUBTLE
        - value: neutral-filled
          text: NEUTRAL_FILLED
        - value: delete-filled
          text: DELETE_FILLED
        - value: delete-outlined
          text: DELETE_OUTLINED
        - value: delete-soft
          text: DELETE_SOFT
        - value: delete-transparent
          text: DELETE_TRANSPARENT
    type: 
        - value: button
          text: Button
        - value: submit
          text: Submit
        - value: reset
          text: Reset
    size: 
        - value: 2xl
          text: XXL
        - value: xl
          text: XL
        - value: lg
          text: LG
        - value: md
          text: MD
        - value: sm
          text: SM
        - value: xs
          text: XS
emits:
    click: "() => console.log('Button clicked')"

enums:
    actionType: "ButtonActionType"
    styleType: "ButtonStyleType"
    size: "ButtonSize"
---
::

## Props

::props-table
---
props: [
    {
        "name": "actionType",
        "default": "ButtonActionType.ACTION",
        "type": "ButtonActionType",
    },
    {
        "name": "styleType",
        "default": "ButtonStyleType.NEUTRAL_OUTLINED",
        "type": "ButtonStyleType"
    },
    {
        "name": "type",
        "default": "'button'",
        "type": "'button' | 'submit' | 'reset'"
    },
    {
        "name": "size",
        "default": "ButtonSize.LG",
        "type": "ButtonSize"
    },
    {
        "name": "icon",
        "default": "'mdi:help'",
        "type": "string"
    },
    {
        "name": "iconClass",
        "type": "string"
    },
    {
        "name": "disabled",
        "default": "false",
        "type": "boolean"
    },
    {
        "name": "to",
        "default": "'/'",
        "type": "string"
    },
    {
        "name": "isExternal",
        "default": "false",
        "type": "boolean"
    },
    {
        "name": "isRounded",
        "default": "false",
        "type": "boolean"
    },
    {
        "name": "id",
        "type": "string"
    }
]
---
::

## Usage
### actionType

The `actionType` prop defines the button’s behavior—whether it performs an action or navigates to a route. It uses the `ButtonActionType` enum.

```vue
<template>
    <ActionIconButton :actionType="ButtonActionType.ACTION" />
</template>
```

- **Type:** `ButtonActionType`
- **Default:** `ButtonActionType.ACTION`

#### Options

::options-table
---
options: [
    {
        value: "ACTION",
        description: "Converts the HTML tag of the component into a '<button>' tag. Use @click to trigger callback functions."
    },
    {
        value: "LINK",
        description: "Converts the HTML tag of the component into a '<a>' tag. Use 'to' prop to set a link"
    },
]
---
::

### styleType

Controls the button's visual variant using `ButtonStyleType` enum.

```vue
<template>
    <ActionIconButton :styleType="ButtonStyleType.PRIMARY_BRAND_FILLED" />
</template>
```

- **Type:** `ButtonStyleType`
- **Default:** `ButtonStyleType.PRIMARY_BRAND_FILLED`

#### Options

::options-table
---
options: [
    {
        value: "PRIMARY_BRAND_FILLED",
        description: "Primary brand filled",
    },
    {
        value: "PRIMARY_BRAND_TRANSPARENT",
        description: "Primary brand transparent",
    },
    {
        value: "PRIMARY_BRAND_SOFT",
        description: "Primary brand soft",
    },
    {
        value: "SECONDARY_BRAND_FILLED",
        description: "Secondary brand filled",
    },
    {
        value: "NEUTRAL_OUTLINED",
        description: "Neutral outlined",
    },
    {
        value: "NEUTRAL_TRANSPARENT",
        description: "Neutral transparent",
    },
    {
        value: "NEUTRAL_TRANSPARENT_SUBTLE",
        description: "Neutral transparent subtle",
    },
    {
        value: "NEUTRAL_FILLED",
        description: "Neutral filled",
    },
    {
        value: "DELETE_FILLED",
        description: "Delete filled",
    },
    {
        value: "DELETE_OUTLINED",
        description: "Delete outlined",
    },
    {
        value: "DELETE_SOFT",
        description: "Delete soft", 
    },
    {
        value: "DELETE_TRANSPARENT",
        description: "Delete transparent",
    },
]
---
::

### type

HTML button type when actionType is `ACTION`.

```vue
<template>
    <ActionIconButton type="submit" />
</template>
```

- **Type:** `'button' | 'submit' | 'reset'`
- **Default:** `'button'`

#### Options

::options-table
---
options: [
    {
        value: "button",
        description: "HTML button type",
    },
    {
        value: "submit",
        description: "HTML submit type",
    },
    {
        value: "reset",
        description: "HTML reset type",
    },
]
---
::

### size

Controls sizing via `ButtonSize` enum.

```vue
<template>
    <ActionButton :size="ButtonSize.XL" />
</template>
```

- **Type:** `ButtonSize`
- **Default:** `ButtonSize.LG`

#### Options
::options-table
---
options: [
    {
        value: "XS",
        description: "xs",
    },
    {
        value: "SM",
        description: "sm",
    },
    {
        value: "MD",
        description: "md",
    },
    {
        value: "LG",
        description: "lg",
    },
    {
        value: "XL",
        description: "xl",
    },
    {
        value: "XXL",
        description: "2xl",
    },
]
---
::

### icon

Sets the icon displayed on the button.


```vue
<template>
    <ActionIconButton icon="mdi:check" />
</template>
```

- **Type:** `string`
- **Default:** `'mdi:help'`

### iconClass

Sets a custom class for the icon element.

```vue
<template>
    <ActionIconButton 
        icon="mdi:check" 
        iconClass="text-red-500" 
    />
</template>
```

- **Type:** `string`


### disabled

Disables the button.
```vue

<template>
    <ActionIconButton :disabled="true" />
</template>
```

### to

Route to navigate to when `actionType` is set to `LINK`. Uses the `ButtonActionType` enum.

```vue
<template>
    <ActionIconButton 
        :actionType="ButtonActionType.LINK"
        to="/about"
    />
</template>
```

- **Type:** `string`
- **Default:** `'/'`

### isExternal

Opens the link in a new tab when `true`.

```vue
<template>
    <ActionIconButton 
        :actionType="ButtonActionType.LINK"
        to="https://example.com"
        :isExternal="true"
    />
</template>
```

- **Type:** `boolean`
- **Default:** `false`

### isRounded

Makes the button fully rounded.

```vue
<template>
    <ActionIconButton :isRounded="true" />
</template>
```

- **Type:** `boolean`
- **Default:** `false`

### id

Provides an HTML ID to the button element.

```vue
<template>
    <ActionIconButton id="my-action-button" />
</template>
```

- **Type:** `string`

## Emits
::options-table
---
options: [
    {
        value: "@click",
        description: [
            "Triggers a callback function while using actionType: ",
            { type: "code", content: "ACTION" },
            ". (Default value)",
        ],
    },
]
---
::

#### Example

```vue
<template>
    <ActionButton 
        @click="handleClick"
    />
</template>
<script setup lang="ts">
const handleClick = () => {
    console.log("Button clicked")
}
</script>
```
</script>
```