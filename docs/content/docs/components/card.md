## Component

::component-code
---
srcDir: 'cards/Card.vue'
props: 
    hasShadow: true
    hasBorder: true
    glowColorMode: "none"
    glowTrigger: "always"
    glowType: "outer"
    glowOpacity: 40
    glowSize: null
items:
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
enums:
    glowColorMode: "GlowColorMode"
    glowTrigger: "GlowTrigger"
    glowType: "GlowType"
slots:
  default: ""
slotComponents:
  default:
    srcDir: 'placeholders/ContentPlaceholder.vue'
    props:
        text: "Add card structure here"
---
::

## Usage
```vue
<template>
    <Card>
        <!-- Optional: Use card header if you need to insert title, buttons or other elements. -->
        <CardHeader>
            <!-- Your card footer content here -->

            <!-- Optional: Card title -->
            <CardTitle title="Card title example" />
        </CardHeader>

        <!-- Highly recommended: Useful to display the content in a proper way. -->
        <CardBody>
            <!-- Your card body content here -->
        </CardBody>

        <!-- Optional: Use card footer if you need to insert links, button or additional info. -->
        <CardFooter>
            <!-- Your card footer content here -->

            <CardActions>
                <!-- Your card actions here (ex. buttons) -->
            </CardActions>
        </CardFooter>
    </Card>
</template>
```

## Components
::components-table
---
components: [
    {
        name: "<Card>",
        description: "The main container that wraps all card content and structure.",
    },
    {
        name: "<CardHeader>",
        description: "Defines the top section of the card, typically used for the title and optional action elements.",
    },
    {
        name: "<CardBody>",
        description: "The primary content area of the card. Recommended for displaying text, media, or other main content.",
    },
    {
        name: "<CardFooter>",
        description: "The bottom section of the card, suitable for links, secondary actions, or additional information.",
    },
    {
        name: "<CardTitle>",
        description: "Used to render the card's title inside the header section.",
    },
    {
        name: "<CardActions>",
        description: "Container for action buttons, usually placed in the footer or header.",
    },
]
---
::

## Props
### Card
::props-table
---
props: [
    {
        "name": "hasShadow",
        "default": "true",
        "type": "boolean",
    },
    {
        "name": "hasBorder",
        "default": "true",
        "type": "boolean",
    },
    {
        "name": "glowColorMode",
        "default": "GlowColorMode.NONE",
        "type": "GlowColorMode",
    },
    {
        "name": "glowTrigger",
        "default": "GlowTrigger.ALWAYS",
        "type": "GlowTrigger",
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
]
---
::

#### hasShadow

Displays a shadow effect around the card.

```vue
<template>
    <Card hasShadow>
        <!-- Your card content here -->
    </Card>
</template>
```

- **Type:** `boolean`
- **Default:** `true`

#### hasBorder

Shows a border around the card.

```vue
<template>
    <Card hasBorder>
        <!-- Your card content here -->
    </Card>
</template>
```

- **Type:** `boolean`
- **Default:** `true`


#### glowColorMode

Draws a glow around the card, shown in light mode, dark mode, both or none. It uses the `GlowColorMode` enum. It is `GlowColorMode.NONE` by default, so the card has no glow until you turn it on.

The glow uses the neutral color. While an always-on glow or an inner glow is active, it takes the place of the `hasShadow` shadow, so the glow can fade in without a jump.

```vue
<template>
    <Card :glowColorMode="GlowColorMode.DARK">
        <!-- Your card content here -->
    </Card>
</template>
```

- **Type:** `GlowColorMode`
- **Default:** `GlowColorMode.NONE` (set by the DS config, see [Configuration](/docs/getting-started/configuration))

##### Options
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

#### glowTrigger

Sets when the glow appears. It uses the `GlowTrigger` enum and works together with `glowColorMode`, which decides in which theme the glow shows. It is `GlowTrigger.ALWAYS` by default.

`FOCUS` shows the glow while something inside the card has focus. On touch screens there is no hover, so with `HOVER` the glow never shows.

```vue
<template>
    <Card :glowColorMode="GlowColorMode.BOTH" :glowTrigger="GlowTrigger.HOVER">
        <!-- Your card content here -->
    </Card>
</template>
```

- **Type:** `GlowTrigger`
- **Default:** `GlowTrigger.ALWAYS` (set by the DS config, see [Configuration](/docs/getting-started/configuration))

##### Options
::options-table
---
options: [
    {
        value: "ALWAYS",
        description: "The glow is always visible.",
    },
    {
        value: "HOVER",
        description: "The glow shows while the pointer is over the card.",
    },
    {
        value: "FOCUS",
        description: "The glow shows while an element inside the card has focus.",
    },
    {
        value: "HOVER_FOCUS",
        description: "The glow shows on hover and on focus.",
    },
]
---
::

#### glowType

Sets where the glow is drawn. It uses the `GlowType` enum and works together with `glowColorMode`. It is `GlowType.OUTER` by default.

```vue
<template>
    <Card :glowColorMode="GlowColorMode.BOTH" :glowType="GlowType.INNER">
        <!-- Your card content here -->
    </Card>
</template>
```

- **Type:** `GlowType`
- **Default:** `GlowType.OUTER` (set by the DS config, see [Configuration](/docs/getting-started/configuration))

##### Options
::options-table
---
options: [
    {
        value: "OUTER",
        description: "The glow spreads around the outside of the card.",
    },
    {
        value: "INNER",
        description: "The glow is drawn inside the card, along its edges.",
    },
]
---
::

#### glowOpacity

Sets how strong the glow is, from `0` (invisible) to `100` (full color). The default is `40`. Values move in steps of 5, so `42` is rounded to `40`. It has no effect while `glowColorMode` is `GlowColorMode.NONE`.

```vue
<template>
    <Card :glowColorMode="GlowColorMode.BOTH" :glowOpacity="30">
        <!-- Your card content here -->
    </Card>
</template>
```

- **Type:** `number`
- **Default:** `40` (set by the DS config, see [Configuration](/docs/getting-started/configuration))


#### glowSize

Sets how far the glow spreads, in pixels. It is `null` by default, so each component keeps its own size (for example, buttons follow their `size`). Values move in steps of 2 from `0` to `64`, so `13` is rounded to `14`. It has no effect while `glowColorMode` is `GlowColorMode.NONE`.

```vue
<template>
    <Card :glowColorMode="GlowColorMode.BOTH" :glowSize="32" />
</template>
```

- **Type:** `number`
- **Default:** `null` (set by the DS config, see [Configuration](/docs/getting-started/configuration))

### Card footer
::props-table
---
props: [
    {
        "name": "hasBorder",
        "default": "false",
        "type": "boolean",
    },
]
---
::

#### hasBorder

Displays a border top of the footer, used as a divider.

```vue
<template>
    <Card>
        <!-- ... -->
        <CardFooter hasBorder>
            <!-- Footer content -->
        </CardFooter>
    </Card>
</template>
```

- **Type:** `boolean`
- **Default:** `false`


### Card title
::props-table
---
props: [
    {
        "name": "title",
        "default": "Card title",
        "type": "string",
    },
]
---
::

#### title

Sets a title for the card title.

```vue
<template>
    <Card>
        
        <CardHeader>
            <CardTitle title="Card title example" />
        </CardHeader>
        <!-- ... -->
    </Card>
</template>
```

- **Type:** `string`
- **Default:** `'Card title'`

## Data attributes

Use this attribute to hook your own styles to the layer a component draws, such as the background that form fields should use on it.

::data-attributes-table
---
attributes: [
    {
        "name": "data-surface",
        "value": "container",
        "description": [
            "Set on the root element. Marks the layer it draws. The design system applies no styles for it. Use it in your CSS to adapt tokens to the layer, for example",
            { "type": "code", "content": "[data-surface='container'] { --color-background-field: var(--color-background-surface); }" },
        ],
    },
]
---
::

See [Data attributes](/docs/getting-started/data-attributes) for how to use them.
