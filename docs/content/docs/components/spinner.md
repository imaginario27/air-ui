## Component

::component-code
---
srcDir: 'spinners/Spinner.vue'
props: 
    variant: "ring"
    useOpacity: true
    class: "w-32 h-32 border-8"
items:
    variant:
        - value: ring
          text: RING
        - value: 12-dots-scale-rotate
          text: DOTS_12_SCALE_ROTATE
        - value: 180-ring
          text: RING_180
        - value: 180-ring-with-bg
          text: RING_180_WITH_BG
        - value: 270-ring
          text: RING_270
        - value: 270-ring-with-bg
          text: RING_270_WITH_BG
        - value: 3-dots-bounce
          text: DOTS_3_BOUNCE
        - value: 3-dots-fade
          text: DOTS_3_FADE
        - value: 3-dots-move
          text: DOTS_3_MOVE
        - value: 3-dots-rotate
          text: DOTS_3_ROTATE
        - value: 3-dots-scale
          text: DOTS_3_SCALE
        - value: 3-dots-scale-middle
          text: DOTS_3_SCALE_MIDDLE
        - value: 6-dots-rotate
          text: DOTS_6_ROTATE
        - value: 6-dots-scale
          text: DOTS_6_SCALE
        - value: 6-dots-scale-middle
          text: DOTS_6_SCALE_MIDDLE
        - value: 8-dots-rotate
          text: DOTS_8_ROTATE
        - value: 90-ring
          text: RING_90
        - value: 90-ring-with-bg
          text: RING_90_WITH_BG
        - value: bars-fade
          text: BARS_FADE
        - value: bars-rotate-fade
          text: BARS_ROTATE_FADE
        - value: bars-scale
          text: BARS_SCALE
        - value: bars-scale-fade
          text: BARS_SCALE_FADE
        - value: bars-scale-middle
          text: BARS_SCALE_MIDDLE
        - value: blocks-scale
          text: BLOCKS_SCALE
        - value: blocks-shuffle-2
          text: BLOCKS_SHUFFLE_2
        - value: blocks-shuffle-3
          text: BLOCKS_SHUFFLE_3
        - value: blocks-wave
          text: BLOCKS_WAVE
        - value: bouncing-ball
          text: BOUNCING_BALL
        - value: clock
          text: CLOCK
        - value: dot-revolve
          text: DOT_REVOLVE
        - value: eclipse
          text: ECLIPSE
        - value: eclipse-half
          text: ECLIPSE_HALF
        - value: gooey-balls-1
          text: GOOEY_BALLS_1
        - value: gooey-balls-2
          text: GOOEY_BALLS_2
        - value: pulse
          text: PULSE
        - value: pulse-2
          text: PULSE_2
        - value: pulse-3
          text: PULSE_3
        - value: pulse-multiple
          text: PULSE_MULTIPLE
        - value: pulse-ring
          text: PULSE_RING
        - value: pulse-rings-2
          text: PULSE_RINGS_2
        - value: pulse-rings-3
          text: PULSE_RINGS_3
        - value: pulse-rings-multiple
          text: PULSE_RINGS_MULTIPLE
        - value: ring-resize
          text: RING_RESIZE
        - value: tadpole
          text: TADPOLE
        - value: wifi
          text: WIFI
        - value: wifi-fade
          text: WIFI_FADE
        - value: wind-toy
          text: WIND_TOY
enums:
    variant: "SpinnerVariant"
previewBackground: 'white'
propsSettingsExcludedProps: ['class']
---
::

## Props

::props-table
---
props: [
    {
        "name": "variant",
        "default": "SpinnerVariant.RING",
        "type": "SpinnerVariant",
    },
    {
        "name": "useOpacity",
        "default": "true",
        "type": "boolean",
    },
    {
        "name": "ariaLabel",
        "type": "string",
    },
]
---
::

## Usage

Use the `<Spinner>` component to show a loading placeholder while content is being fetched or rendered.  
It’s useful for improving perceived performance during API calls, route transitions, or dynamic content rendering.

```vue
<template>
    <Spinner />
</template>
```

### variant

Selects the spinner shape via the `SpinnerVariant` enum. `RING` is drawn with CSS borders; every other option is an animated icon from the [SVG Spinners](https://icones.js.org/collection/svg-spinners) collection and takes its color from a `text-*` class.

The default comes from `spinner.variant` of the DS config, so every component that shows a spinner follows it. A `variant` prop always wins. See [Spinner options](/docs/getting-started/configuration#spinner-options).

If the icon cannot be resolved (for example, `@iconify-json/svg-spinners` is not available in the consuming project), the spinner falls back to `RING`.

```vue
<template>
    <Spinner :variant="SpinnerVariant.DOTS_3_BOUNCE" />
</template>
```

- **Type:** `SpinnerVariant`
- **Default:** `SpinnerVariant.RING`

#### Options

::options-table
---
options: [
    { value: "RING", description: "Open ring drawn with CSS borders. Supports `border-*` utilities for size and color." },
    { value: "DOTS_12_SCALE_ROTATE", description: "Animated `svg-spinners:12-dots-scale-rotate` icon." },
    { value: "RING_180", description: "Animated `svg-spinners:180-ring` icon." },
    { value: "RING_180_WITH_BG", description: "Animated `svg-spinners:180-ring-with-bg` icon." },
    { value: "RING_270", description: "Animated `svg-spinners:270-ring` icon." },
    { value: "RING_270_WITH_BG", description: "Animated `svg-spinners:270-ring-with-bg` icon." },
    { value: "DOTS_3_BOUNCE", description: "Animated `svg-spinners:3-dots-bounce` icon." },
    { value: "DOTS_3_FADE", description: "Animated `svg-spinners:3-dots-fade` icon." },
    { value: "DOTS_3_MOVE", description: "Animated `svg-spinners:3-dots-move` icon." },
    { value: "DOTS_3_ROTATE", description: "Animated `svg-spinners:3-dots-rotate` icon." },
    { value: "DOTS_3_SCALE", description: "Animated `svg-spinners:3-dots-scale` icon." },
    { value: "DOTS_3_SCALE_MIDDLE", description: "Animated `svg-spinners:3-dots-scale-middle` icon." },
    { value: "DOTS_6_ROTATE", description: "Animated `svg-spinners:6-dots-rotate` icon." },
    { value: "DOTS_6_SCALE", description: "Animated `svg-spinners:6-dots-scale` icon." },
    { value: "DOTS_6_SCALE_MIDDLE", description: "Animated `svg-spinners:6-dots-scale-middle` icon." },
    { value: "DOTS_8_ROTATE", description: "Animated `svg-spinners:8-dots-rotate` icon." },
    { value: "RING_90", description: "Animated `svg-spinners:90-ring` icon." },
    { value: "RING_90_WITH_BG", description: "Animated `svg-spinners:90-ring-with-bg` icon." },
    { value: "BARS_FADE", description: "Animated `svg-spinners:bars-fade` icon." },
    { value: "BARS_ROTATE_FADE", description: "Animated `svg-spinners:bars-rotate-fade` icon." },
    { value: "BARS_SCALE", description: "Animated `svg-spinners:bars-scale` icon." },
    { value: "BARS_SCALE_FADE", description: "Animated `svg-spinners:bars-scale-fade` icon." },
    { value: "BARS_SCALE_MIDDLE", description: "Animated `svg-spinners:bars-scale-middle` icon." },
    { value: "BLOCKS_SCALE", description: "Animated `svg-spinners:blocks-scale` icon." },
    { value: "BLOCKS_SHUFFLE_2", description: "Animated `svg-spinners:blocks-shuffle-2` icon." },
    { value: "BLOCKS_SHUFFLE_3", description: "Animated `svg-spinners:blocks-shuffle-3` icon." },
    { value: "BLOCKS_WAVE", description: "Animated `svg-spinners:blocks-wave` icon." },
    { value: "BOUNCING_BALL", description: "Animated `svg-spinners:bouncing-ball` icon." },
    { value: "CLOCK", description: "Animated `svg-spinners:clock` icon." },
    { value: "DOT_REVOLVE", description: "Animated `svg-spinners:dot-revolve` icon." },
    { value: "ECLIPSE", description: "Animated `svg-spinners:eclipse` icon." },
    { value: "ECLIPSE_HALF", description: "Animated `svg-spinners:eclipse-half` icon." },
    { value: "GOOEY_BALLS_1", description: "Animated `svg-spinners:gooey-balls-1` icon." },
    { value: "GOOEY_BALLS_2", description: "Animated `svg-spinners:gooey-balls-2` icon." },
    { value: "PULSE", description: "Animated `svg-spinners:pulse` icon." },
    { value: "PULSE_2", description: "Animated `svg-spinners:pulse-2` icon." },
    { value: "PULSE_3", description: "Animated `svg-spinners:pulse-3` icon." },
    { value: "PULSE_MULTIPLE", description: "Animated `svg-spinners:pulse-multiple` icon." },
    { value: "PULSE_RING", description: "Animated `svg-spinners:pulse-ring` icon." },
    { value: "PULSE_RINGS_2", description: "Animated `svg-spinners:pulse-rings-2` icon." },
    { value: "PULSE_RINGS_3", description: "Animated `svg-spinners:pulse-rings-3` icon." },
    { value: "PULSE_RINGS_MULTIPLE", description: "Animated `svg-spinners:pulse-rings-multiple` icon." },
    { value: "RING_RESIZE", description: "Animated `svg-spinners:ring-resize` icon." },
    { value: "TADPOLE", description: "Animated `svg-spinners:tadpole` icon." },
    { value: "WIFI", description: "Animated `svg-spinners:wifi` icon." },
    { value: "WIFI_FADE", description: "Animated `svg-spinners:wifi-fade` icon." },
    { value: "WIND_TOY", description: "Animated `svg-spinners:wind-toy` icon." },
]
---
::

### useOpacity

Several animated variants draw part of their shape with a static opacity (for example, the 25% track of `RING_180_WITH_BG` or the faded bars of `BARS_FADE`). By default that opacity is kept (`spinner.useOpacity` in the DS config). Set it to `false` to render those shapes at full opacity. Opacity that belongs to the animation itself (for example, `PULSE`) is not affected.

Only applies to icon variants; `RING` has no opacity.

```vue
<template>
    <Spinner :variant="SpinnerVariant.RING_180_WITH_BG" :useOpacity="false" />
</template>
```

- **Type:** `boolean`
- **Default:** `true`

### ariaLabel

Overrides the accessible label. By default it comes from the DS configuration.

```vue
<template>
    <Spinner ariaLabel="Saving" />
</template>
```

- **Type:** `string`
