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
    icon: "mdi:plus"
    iconPosition: "none"
    iconClass: ""
    isRounded: false
    hasFocusRing: true
    glowColorMode: "none"
    glowTrigger: "always"
    glowType: "outer"
    glowOpacity: 40
    glowSize: null
    isFullWidth: false
    isMobileFullWidth: false
    responsiveSize: false
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
    glowColorMode:
        - value: none
          text: NONE
        - value: both
          text: BOTH
        - value: light
          text: LIGHT
        - value: dark
          text: DARK
    glowTrigger:
        - value: always
          text: ALWAYS
        - value: hover
          text: HOVER
        - value: focus
          text: FOCUS
        - value: hoverFocus
          text: HOVER_FOCUS
    glowType:
        - value: outer
          text: OUTER
        - value: inner
          text: INNER
emits:
    click: "() => console.log('Button clicked')"
enums:
    actionType: "ButtonActionType"
    styleType: "ButtonStyleType"
    size: "ButtonSize"
    glowColorMode: "GlowColorMode"
    glowTrigger: "GlowTrigger"
    glowType: "GlowType"
    iconPosition: "IconPosition"
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
        "default": "'mdi:help'",
        "type": "string"
    },
    {
        "name": "iconPosition",
        "default": "IconPosition.NONE",
        "type": "IconPosition"
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
        "name": "hasFocusRing",
        "default": "true",
        "type": "boolean"
    },
    {
        "name": "glowColorMode",
        "default": "GlowColorMode.NONE",
        "type": "GlowColorMode"
    },
    {
        "name": "glowTrigger",
        "default": "GlowTrigger.ALWAYS",
        "type": "GlowTrigger"
    },
    {
        "name": "glowType",
        "default": "GlowType.OUTER",
        "type": "GlowType",
    },
    {
        "name": "glowOpacity",
        "default": "40",
        "type": "number",
    },
    {
        "name": "glowSize",
        "type": "number",
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
        "name": "responsiveSize",
        "default": "null",
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

The `actionType` prop defines whether the button performs an action or navigates to a route. It uses the `ButtonActionType` enum.

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

Sets the icon displayed on the button.

```vue
<template>
    <ActionButton icon="mdi:check" />
</template>
```

- **Type:** `string`
- **Default:** `'mdi:help'`

### iconPosition

Where to display the icon in relation to the label. Uses the `IconPosition` enum.

```vue
<template>
    <ActionButton 
        icon="mdi:check" 
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

### iconClass

Sets a custom class for the icon element.

```vue
<template>
    <ActionButton 
        :iconPosition="IconPosition.LEFT"
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


### hasFocusRing

Shows or hides the focus ring. The ring only appears on keyboard focus (`:focus-visible`), not when clicking with the mouse. Disable it only when the focus state is already visible some other way, for example when the button sits inside a container that highlights on focus.

```vue
<template>
    <ActionButton :hasFocusRing="false" />
</template>
```

- **Type:** `boolean`
- **Default:** `true`

### glowColorMode

Draws a glow around the button, shown in light mode, dark mode, both or none. It uses the `GlowColorMode` enum. It is `GlowColorMode.NONE` by default, so buttons have no glow until you turn it on.

The glow color follows the `styleType` and its spread follows the `size`, so a small primary button gets a tighter glow than a large one. Pass a `GlowColorMode` to turn the glow on for a single button.

```vue
<template>
    <ActionButton :glowColorMode="GlowColorMode.DARK" />
</template>
```

- **Type:** `GlowColorMode`
- **Default:** `GlowColorMode.NONE` (set by the DS config, see [Configuration](/docs/getting-started/configuration))

#### Options
::options-table
---
options: [
    {
        value: "NONE",
        description: "No glow.",
    },
    {
        value: "BOTH",
        description: "Glow in light and dark mode.",
    },
    {
        value: "LIGHT",
        description: "Glow in light mode only.",
    },
    {
        value: "DARK",
        description: "Glow in dark mode only.",
    },
]
---
::

### glowTrigger

Sets when the glow appears. It uses the `GlowTrigger` enum and works together with `glowColorMode`, which decides in which theme the glow shows. It is `GlowTrigger.ALWAYS` by default.

`FOCUS` uses keyboard focus (`:focus-visible`), so the glow does not stay on after a mouse click. On touch screens there is no hover, so with `HOVER` the glow never shows.

```vue
<template>
    <ActionButton :glowColorMode="GlowColorMode.BOTH" :glowTrigger="GlowTrigger.HOVER_FOCUS" />
</template>
```

- **Type:** `GlowTrigger`
- **Default:** `GlowTrigger.ALWAYS` (set by the DS config, see [Configuration](/docs/getting-started/configuration))

#### Options
::options-table
---
options: [
    {
        value: "ALWAYS",
        description: "The glow is always visible.",
    },
    {
        value: "HOVER",
        description: "The glow shows while the pointer is over the button.",
    },
    {
        value: "FOCUS",
        description: "The glow shows while the button has keyboard focus.",
    },
    {
        value: "HOVER_FOCUS",
        description: "The glow shows on hover and on keyboard focus.",
    },
]
---
::

### glowType

Sets where the glow is drawn. It uses the `GlowType` enum and works together with `glowColorMode`. It is `GlowType.OUTER` by default.

```vue
<template>
    <ActionButton :glowColorMode="GlowColorMode.BOTH" :glowType="GlowType.INNER" />
</template>
```

On filled styles (primary, secondary, neutral and delete filled) the inner glow uses the label color instead of the style color, because the style color is the same as the background and would not be visible.

- **Type:** `GlowType`
- **Default:** `GlowType.OUTER` (set by the DS config, see [Configuration](/docs/getting-started/configuration))

#### Options
::options-table
---
options: [
    {
        value: "OUTER",
        description: "The glow spreads around the outside of the element.",
    },
    {
        value: "INNER",
        description: "The glow is drawn inside the element, along its edges.",
    },
]
---
::

### glowOpacity

Sets how strong the glow is, from `0` (invisible) to `100` (full color). The default is `40`. Values move in steps of 5, so `42` is rounded to `40`. It has no effect while `glowColorMode` is `GlowColorMode.NONE`.

```vue
<template>
    <ActionButton :glowColorMode="GlowColorMode.BOTH" :glowOpacity="30" />
</template>
```

- **Type:** `number`
- **Default:** `40` (set by the DS config, see [Configuration](/docs/getting-started/configuration))

### glowSize

Sets how far the glow spreads, in pixels. It is `null` by default, so each component keeps its own size (for example, buttons follow their `size`). Values move in steps of 2 from `0` to `64`, so `13` is rounded to `14`. It has no effect while `glowColorMode` is `GlowColorMode.NONE`.

```vue
<template>
    <ActionButton :glowColorMode="GlowColorMode.BOTH" :glowSize="32" />
</template>
```

- **Type:** `number`
- **Default:** `null` (set by the DS config, see [Configuration](/docs/getting-started/configuration))

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

### responsiveSize

Makes the button bigger on mobile so it is easier to tap. Below the `md` breakpoint it uses the size set for its `size` in `buttons.mobileSizeMap` of the DS config, and from `md` up it goes back to its own `size`. Height, text, icon, padding and gap all change together, so the button keeps its proportions.

This is the default mapping:

::options-table
---
options: [
    {
        value: "ButtonSize.XS",
        description: "Is XS (24px) from md up and MD (32px) on mobile.",
    },
    {
        value: "ButtonSize.SM",
        description: "Is SM (28px) from md up and LG (36px) on mobile.",
    },
    {
        value: "ButtonSize.MD",
        description: "Is MD (32px) from md up and LG (36px) on mobile.",
    },
    {
        value: "ButtonSize.LG",
        description: "Is LG (36px) from md up and XL (40px) on mobile.",
    },
    {
        value: "ButtonSize.XL",
        description: "Is XL (40px) from md up and XL (40px) on mobile.",
    },
    {
        value: "ButtonSize.XXL",
        description: "Is XXL (48px) from md up and XXL (48px) on mobile.",
    },
]
---
::

```vue
<template>
    <ActionButton :size="ButtonSize.SM" :responsiveSize="true" />
</template>
```

When the prop is not set, the button follows `buttons.responsiveSize` of the DS config, which is `false` by default. Pass `false` to keep a button at its own size on mobile even when the config turns it on for the whole project. See [Configuration](/docs/getting-started/configuration).

- **Type:** `boolean`
- **Default:** `null` (follows `buttons.responsiveSize` of the DS config, `false` by default)

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

## Accessibility

`ActionButton` already exposes an accessible name from its visible `text`, so `aria-label` is not required in the common case.

Use a native `aria-label` only when the visible label is not descriptive enough for screen readers.

```vue
<template>
    <ActionButton
        text="Go"
        aria-label="Go to dashboard"
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