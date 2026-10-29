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
    hasFocusRing: true
    responsiveSize: false
    glowColorMode: "none"
    glowTrigger: "always"
    glowType: "outer"
    glowOpacity: 40
    glowSize: null
    disabled: false
    to: "/"
    isExternal: false
    id: "my-action-icon-button"
    ariaLabel: "Add item"
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
        "name": "isDecorative",
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
        "name": "responsiveSize",
        "default": "null",
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
        "name": "id",
        "type": "string"
    },
    {
        "name": "ariaLabel",
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

### isDecorative

Renders the icon button as a non-interactive `span`, keeping the same look. Use it when the button sits inside another interactive element such as a `button`, where a nested `button` is invalid HTML. The element ignores clicks and is not focusable.

```vue
<template>
    <button type="button">
        Toggle
        <ActionIconButton
            isDecorative
            icon="mdi:unfold-more-horizontal"
            aria-hidden="true"
        />
    </button>
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

### hasFocusRing

Shows or hides the focus ring. The ring only appears on keyboard focus (`:focus-visible`), not when clicking with the mouse. Disable it only when the focus state is already visible some other way, for example when the button sits inside a container that highlights on focus.

```vue
<template>
    <ActionIconButton :hasFocusRing="false" />
</template>
```

- **Type:** `boolean`
- **Default:** `true`

### responsiveSize

Makes the button bigger on mobile so it is easier to tap. Below the `md` breakpoint it uses the size set for its `size` in `buttons.mobileSizeMap` of the DS config, and from `md` up it goes back to its own `size`. The width, the height and the icon change together, so the button stays square.

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
    <ActionIconButton :size="ButtonSize.SM" :responsiveSize="true" />
</template>
```

When the prop is not set, the button follows `buttons.responsiveSize` of the DS config, which is `false` by default. Pass `false` to keep a button at its own size on mobile even when the config turns it on for the whole project. See [Configuration](/docs/getting-started/configuration).

- **Type:** `boolean`
- **Default:** `null` (follows `buttons.responsiveSize` of the DS config, `false` by default)

### glowColorMode

Draws a glow around the button, shown in light mode, dark mode, both or none. It uses the `GlowColorMode` enum. It is `GlowColorMode.NONE` by default, so buttons have no glow until you turn it on.

The glow color follows the `styleType` and its spread follows the `size`, so a small primary button gets a tighter glow than a large one. Pass a `GlowColorMode` to turn the glow on for a single button.

```vue
<template>
    <ActionIconButton :glowColorMode="GlowColorMode.DARK" />
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
    <ActionIconButton :glowColorMode="GlowColorMode.BOTH" :glowTrigger="GlowTrigger.HOVER_FOCUS" />
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
    <ActionIconButton :glowColorMode="GlowColorMode.BOTH" :glowType="GlowType.INNER" />
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
    <ActionIconButton :glowColorMode="GlowColorMode.BOTH" :glowOpacity="30" />
</template>
```

- **Type:** `number`
- **Default:** `40` (set by the DS config, see [Configuration](/docs/getting-started/configuration))

### glowSize

Sets how far the glow spreads, in pixels. It is `null` by default, so each component keeps its own size (for example, buttons follow their `size`). Values move in steps of 2 from `0` to `64`, so `13` is rounded to `14`. It has no effect while `glowColorMode` is `GlowColorMode.NONE`.

```vue
<template>
    <ActionIconButton :glowColorMode="GlowColorMode.BOTH" :glowSize="32" />
</template>
```

- **Type:** `number`
- **Default:** `null` (set by the DS config, see [Configuration](/docs/getting-started/configuration))

### id

Provides an HTML ID to the button element.

```vue
<template>
    <ActionIconButton id="my-action-button" />
</template>
```

- **Type:** `string`

### ariaLabel

Sets the `aria-label` attribute for screen readers. Required for accessibility since the button contains only an icon with no visible text.

```vue
<template>
    <ActionIconButton 
        icon="mdi:close" 
        ariaLabel="Close dialog" 
    />
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