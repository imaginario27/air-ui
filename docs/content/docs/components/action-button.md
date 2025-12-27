## Component

::component-code
---
srcDir: 'buttons/ActionButton.vue'
props: 
    actionType: "action"
    styleType: "primary-brand-filled"
    type: "button"
    text: "Button label"
    size: "lg"
    icon: "mdiPlus"
    iconPosition: "none"
    iconClass: ""
    isRounded: false
    isFullWidth: false
    isMobileFullWidth: false
    disabled: false
    to: "/"
    isLoading: false
    loadingText: "Processing..."
    isExternal: false
    id: "my-action-button"
    textClass: ""
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
    iconPosition: 
        - value: none
          text: NONE
        - value: left
          text: LEFT
        - value: right
          text: RIGHT
emits:
    click: "() => console.log('Button clicked')"
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
        "default": "'mdiHelp'",
        "type": "string"
    },
    {
        "name": "iconPosition",
        "default": "IconPosition.NONE",
        "type": "IconPosition"
    },
    {
        "name": "svgIcon",
        "type": "string"
    },
    {
        "name": "useSVGIconColor",
        "default": "false",
        "type": "boolean"
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
        "name": "isLoading",
        "default": "false",
        "type": "boolean"
    },
    {
        "name": "loadingText",
        "default": "'Processing...'",
        "type": "string"
    },
    {
        "name": "id",
        "type": "string"
    },
    {
        "name": "textClass",
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
    <ActionButton :actionType="ButtonActionType.ACTION" />
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
    <ActionButton :styleType="ButtonStyleType.PRIMARY_BRAND_FILLED" />
</template>
```

- **Type:** `ButtonStyleType`
- **Default:** `ButtonStyleType.NEUTRAL_OUTLINED`

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
    <ActionButton type="submit" />
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

### text

Button label content.

```vue
<template>
    <ActionButton text="Click Me" />
</template>
```

- **Type:** `string`
- **Default:** `'Button text'`


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

Name of icon to show using Material Design Icons.

Usable icons: [pictogrammers.com/library/mdi/](https://pictogrammers.com/library/mdi/){ target="_blank" rel="noopener noreferrer" }

```vue
<template>
    <ActionButton icon="mdiCheck" />
</template>
```

- **Type:** `string`
- **Default:** `'mdiHelp'`

### iconPosition

Where to display the icon in relation to the label. Uses the `IconPosition` enum.

```vue
<template>
    <ActionButton 
        icon="mdiCheck" 
        :iconPosition="IconPosition.RIGHT" 
    />
</template>
```

- **Type:** `IconPosition`
- **Default:** `IconPosition.NONE`

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

### svgIcon

Uses a SVG image instead of the default icon. By default, the source color of the SVG will be overwritten by the button icon color.

::content-alert
---
props:
    title: "Important"
    description: "Use always '?raw' at the end of the source route."
---
::

```vue
<template>
    <ActionButton :svgIcon="iconGoogleColor" />
</template>
<script setup lang="ts">
// Import
import iconGoogleColor from '@/assets/images/icons/icon-google-color.svg?raw'
</script>
```

- **Type:** `string`

### useSVGIconColor

Uses the original SVG color instead.

::content-alert
---
props:
    title: "Important"
    description: "When setting this option to true, it will use the original color without taking into account the style type of the button."
---
::

```vue
<template>
    <ActionButton 
        :svgIcon="iconGoogleColor" 
        useSVGIconColor
    />
</template>
<script setup lang="ts">
// Import
import iconGoogleColor from '@/assets/images/icons/icon-google-color.svg?raw'
</script>
```

- **Type:** `boolean`
- **Default:** `false`

### iconClass

Sets a custom class for the icon element.

```vue
<template>
    <ActionButton 
        :iconPosition="IconPosition.LEFT"
        icon="mdiCheck" 
        iconClass="text-red-500" 
    />
</template>
```

- **Type:** `string`

### disabled

Disables the button.
```vue

<template>
    <ActionButton disabled />
</template>
```

- **Type:** `boolean`
- **Default:** `false`

### to

Route to navigate to when `actionType` is set to `LINK`.

```vue
<template>
    <ActionButton 
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
    <ActionButton 
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
    <ActionButton :isRounded="true" />
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
    <ActionButton :isFullWidth="true" />
</template>
```

```vue
<template>
    <ActionButton :isMobileFullWidth="true" />
</template>
```

- **Type:** `boolean`
- **Default:** `false`

### isLoading

Displays a loading spinner and disables interaction.

```vue
<template>
    <ActionButton :isLoading="true" />
</template>
```

- **Type:** `boolean`
- **Default:** `false`

### loadingText

Text shown when button is in a loading state.

```vue
<template>
    <ActionButton 
        :isLoading="true"
        loadingText="Please wait..."
    />
</template>
```

- **Type:** `string`
- **Default:** `'Processing...'`

### id

Provides an HTML ID to the button element.

```vue
<template>
    <ActionButton id="my-action-button" />
</template>
```

- **Type:** `string`

### textClass

Sets a custom class for the button label.

```vue
<template>
    <ActionButton textClass="font-bold" />
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