## Component

::component-code
---
srcDir: 'sliders/Marquee.vue'
props:
    orientation: "horizontal"
    speed: 50
    gap: "1rem"
    isReversed: false
    autoFill: true
    pauseOnHover: true
    isPaused: false
    hasFadeEdges: true
    fadeSize: 10
    delay: 0
    loopCount: 0
    ariaLabel: "Partners"
items:
    orientation:
        - value: horizontal
          text: HORIZONTAL
        - value: vertical
          text: VERTICAL
enums:
    orientation: "Orientation"
slots:
  default: ""
slotComponents:
  default:
    srcDir: 'placeholders/ContentPlaceholder.vue'
    multiple: true
    props:
      - text: "Item 1"
        style: "width: 160px"
      - text: "Item 2"
        style: "width: 160px"
      - text: "Item 3"
        style: "width: 160px"
      - text: "Item 4"
        style: "width: 160px"
---
::

## Props

::props-table
---
props: [
    {
        "name": "orientation",
        "default": "Orientation.HORIZONTAL",
        "type": "Orientation"
    },
    {
        "name": "speed",
        "default": "50",
        "type": "number"
    },
    {
        "name": "gap",
        "default": "'1rem'",
        "type": "string"
    },
    {
        "name": "isReversed",
        "default": "false",
        "type": "boolean"
    },
    {
        "name": "autoFill",
        "default": "true",
        "type": "boolean"
    },
    {
        "name": "pauseOnHover",
        "default": "false",
        "type": "boolean"
    },
    {
        "name": "isPaused",
        "default": "false",
        "type": "boolean"
    },
    {
        "name": "hasFadeEdges",
        "default": "false",
        "type": "boolean"
    },
    {
        "name": "fadeSize",
        "default": "10",
        "type": "number"
    },
    {
        "name": "delay",
        "default": "0",
        "type": "number"
    },
    {
        "name": "loopCount",
        "default": "0",
        "type": "number"
    },
    {
        "name": "ariaLabel",
        "type": "string"
    },
]
---
::

## Slots

::slots-table
---
slots: [
    { "name": "default", "description": "Items to scroll. The slot is repeated to build a seamless loop." },
]
---
::

```vue
<template>
    <Marquee ariaLabel="Partners">
        <span>Item 1</span>
        <span>Item 2</span>
        <span>Item 3</span>
    </Marquee>
</template>
```

## Usage

### orientation

Sets the scroll axis via the `Orientation` enum. Vertical marquees need a parent with a fixed height.

```vue
<template>
    <div class="h-64">
        <Marquee :orientation="Orientation.VERTICAL" />
    </div>
</template>
```

- **Type:** `Orientation`
- **Default:** `Orientation.HORIZONTAL`

#### Options

::options-table
---
options: [
    { value: "HORIZONTAL", description: "Scrolls from right to left." },
    { value: "VERTICAL", description: "Scrolls from bottom to top." },
]
---
::

### speed

Sets the scroll speed in pixels per second.

```vue
<template>
    <Marquee :speed="100" />
</template>
```

- **Type:** `number`
- **Default:** `50`

### gap

Sets the space between items using any CSS length.

```vue
<template>
    <Marquee gap="2rem" />
</template>
```

- **Type:** `string`
- **Default:** `'1rem'`

### isReversed

Reverses the scroll direction.

```vue
<template>
    <Marquee isReversed />
</template>
```

- **Type:** `boolean`
- **Default:** `false`

### autoFill

Repeats the content as many times as needed to fill the container. Set it to `false` to loop the content only once.

```vue
<template>
    <Marquee :autoFill="false" />
</template>
```

- **Type:** `boolean`
- **Default:** `true`

### pauseOnHover

Pauses the animation while the pointer is over the marquee or focus is inside it.

```vue
<template>
    <Marquee pauseOnHover />
</template>
```

- **Type:** `boolean`
- **Default:** `false`

### isPaused

Pauses the animation from outside, for example with a play/pause button.

```vue
<template>
    <Marquee :isPaused="isPaused" />
</template>

<script setup lang="ts">
const isPaused = ref(false)
</script>
```

- **Type:** `boolean`
- **Default:** `false`

### hasFadeEdges

Fades the content out at both ends of the marquee.

```vue
<template>
    <Marquee hasFadeEdges />
</template>
```

- **Type:** `boolean`
- **Default:** `false`

### fadeSize

Sets how much of the container fades at each end, as a percentage from `0` to `50`. Only applies when [hasFadeEdges](#hasfadeedges) is enabled.

```vue
<template>
    <Marquee hasFadeEdges :fadeSize="20" />
</template>
```

- **Type:** `number`
- **Default:** `10`

### delay

Sets the delay before the animation starts, in seconds.

```vue
<template>
    <Marquee :delay="2" />
</template>
```

- **Type:** `number`
- **Default:** `0`

### loopCount

Sets how many times the content loops. `0` loops forever.

```vue
<template>
    <Marquee :loopCount="3" />
</template>
```

- **Type:** `number`
- **Default:** `0`

### ariaLabel

Sets the accessible name of the marquee group.

```vue
<template>
    <Marquee ariaLabel="Our partners" />
</template>
```

- **Type:** `string`

## Accessibility

- The marquee renders as a `group`. Set [ariaLabel](#arialabel) to describe it.
- Repeated copies are hidden from assistive technology with `aria-hidden`, so only the original content is announced.
- The animation pauses automatically when the user prefers reduced motion.
- Avoid using a marquee for critical information, since moving content is hard to read. Use [pauseOnHover](#pauseonhover) so users can stop it.

## Emits

::options-table
---
options: [
    { value: "@loopComplete", description: "Triggers after each loop iteration." },
    { value: "@complete", description: "Triggers when all loops finish. Only fires when `loopCount` is greater than 0." },
]
---
::

#### Example

```vue
<template>
    <Marquee :loopCount="2" @complete="handleComplete" />
</template>

<script setup lang="ts">
const handleComplete = () => {
    console.log("Marquee finished")
}
</script>
```
