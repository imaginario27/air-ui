
## Component

::component-code
---
srcDir: 'forms/fields/ButtonField.vue'
props: 
    id: "field-id"
    label: "Sample label"
    actionType: "action"
    styleType: "neutral-filled"
    text: "Button text"
    size: "lg"
    icon: "mdi:help"
    iconPosition: "none"
    isRounded: false
    isFullWidth: false
    isMobileFullWidth: false
    to: ""
    isExternal: false
    disabled: false
    isLoading: false
    loadingText: "Processing..."
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
    iconPosition: 
        - value: none
          text: NONE
        - value: left
          text: LEFT
        - value: right
          text: RIGHT
enums:
    actionType: "ButtonActionType"
    styleType: "ButtonStyleType"
    size: "ButtonSize"
    iconPosition: "IconPosition"
isPreviewContentBoxed: true
previewContentMaxWidth: 400
---
::

## Props

::props-table
---
props: [
    {
        "name": "id",
        "required": "true",
        "type": "string",
    },
    {
        "name": "label",
        "type": "string",
    },
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
        "name": "text",
        "default": "'Button text'",
        "type": "string"
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
        "name": "iconPosition",
        "default": "IconPosition.NONE",
        "type": "IconPosition"
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
        "name": "isFullWidth",
        "default": "false",
        "type": "boolean"
    },
    {
        "name": "isMobileFullWidth",
        "default": "false",
        "type": "boolean"
    },
    {
        "name": "disabled",
        "default": "false",
        "type": "boolean"
    },
    {
        "name": "isLoading",
        "default": "false",
        "type": "boolean"
    },
    {
        "name": "loadingText",
        "default": "'Processing...'",
        "type": "string"
    },
]
---
::

## Usage
### id 

Sets the id of the field.

```vue
<template>
    <ButtonField id="field-id" />
</template>
```

- **Type:** `string`
- **Required:** `true`

### label

Sets the label of the field.

```vue
<template>
    <ButtonField label="Sample label" />
</template>
```

- **Type:** `string`

### actionType

The `actionType` prop defines the button’s behavior—whether it performs an action or navigates to a route. It uses the `ButtonActionType` enum.

```vue
<template>
    <ButtonField :actionType="ButtonActionType.ACTION" />
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
    <ButtonField :styleType="ButtonStyleType.PRIMARY_BRAND_FILLED" />
</template>
```

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

### text

Button label content.

```vue
<template>
    <ButtonField text="Click Me" />
</template>
```

- **Type:** `string`
- **Default:** `'Button text'`

### size

Controls sizing via `ButtonSize` enum.

```vue
<template>
    <ButtonField :size="ButtonSize.XL" />
</template>
```

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

Sets the icon displayed within the button.

```vue
<template>
    <ButtonField icon="mdi:check" />
</template>
```

- **Type:** `string`
- **Default:** `'mdi:help'`

### iconPosition

Where to display the icon in relation to the label. Uses the `IconPosition` enum.

```vue
<template>
    <ButtonField 
        icon="mdi:check" 
        :iconPosition="IconPosition.RIGHT" 
    />
</template>
```

#### Options
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

### to

Route to navigate to when `actionType` is set to `LINK`.

```vue
<template>
    <ButtonField 
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
    <ButtonField 
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
    <ButtonField :isRounded="true" />
</template>
```

- **Type:** `boolean`
- **Default:** `false`


### isFullWidth and isMobileFullWidth

Use these props to control the width behavior of the button:

- `**isFullWidth**`: Makes the button span the full width of its container at **all screen sizes**.
- `**isMobileFullWidth**`: Makes the button full width **only on mobile**, and revert to auto width on larger screens. The default breakpoint is `md` but you can overwrite it using `class`.

```vue
<template>
    <ButtonField :isFullWidth="true" />
</template>
```

```vue
<template>
    <ButtonField :isMobileFullWidth="true" />
</template>
```

- **Type:** `boolean`
- **Default:** `false`


### disabled

Disables the button.
```vue

<template>
    <ButtonField disabled />
</template>
```

- **Type:** `boolean`
- **Default:** `false`

### isLoading

Displays a loading spinner and disables interaction.

```vue
<template>
    <ButtonField :isLoading="true" />
</template>
```

- **Type:** `boolean`
- **Default:** `false`

### loadingText

Text shown when button is in a loading state.

```vue
<template>
    <ButtonField 
        :isLoading="true"
        loadingText="Please wait..."
    />
</template>
```

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
    <ButtonField 
        @click="handleClick"
    />
</template>
<script setup lang="ts">
const handleClick = () => {
    console.log("Button clicked")
}
</script>
```