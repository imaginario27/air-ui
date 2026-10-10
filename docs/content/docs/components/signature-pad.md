## Component

::component-code
---
srcDir: 'signature-pads/SignaturePad.vue'
props:
    ariaLabel: Signature pad
    modelValue: []
    name: null
    height: 200
    minWidth: 240
    strokeSize: 2
    showGuide: true
    placeholder: Sign here
    showClearButton: true
    clearIcon: mdi:eraser
    clearAriaLabel: Clear signature
    hasError: false
    disabled: false
    readOnly: false
external:
  - modelValue
externalTypes:
  - array
isPreviewContentBoxed: true
previewContentMaxWidth: 560
propsSettingsExcludedProps: ['modelValue']
---
::

## Props

::props-table
---
props: [
    {
        "name": "ariaLabel",
        "default": "'Signature pad'",
        "type": "string",
    },
    {
        "name": "ariaLabelledby",
        "type": "string",
    },
    {
        "name": "modelValue",
        "default": "[]",
        "type": "string[]",
    },
    {
        "name": "name",
        "type": "string",
    },
    {
        "name": "height",
        "default": "200",
        "type": "number",
    },
    {
        "name": "minWidth",
        "default": "240",
        "type": "number",
    },
    {
        "name": "strokeSize",
        "default": "2",
        "type": "number",
    },
    {
        "name": "showGuide",
        "default": "true",
        "type": "boolean",
    },
    {
        "name": "placeholder",
        "default": "'Sign here'",
        "type": "string",
    },
    {
        "name": "showClearButton",
        "default": "true",
        "type": "boolean",
    },
    {
        "name": "clearIcon",
        "default": "'mdi:eraser'",
        "type": "string",
    },
    {
        "name": "clearAriaLabel",
        "default": "'Clear signature'",
        "type": "string",
    },
    {
        "name": "hasError",
        "default": "false",
        "type": "boolean",
    },
    {
        "name": "disabled",
        "default": "false",
        "type": "boolean",
    },
    {
        "name": "readOnly",
        "default": "false",
        "type": "boolean",
    },
]
---
::

All props are optional. There is no required prop; bind `v-model` to keep the strokes in your own state.

## Usage

### ariaLabel

Accessible label of the drawing surface.

```vue
<template>
    <SignaturePad ariaLabel="Customer signature" />
</template>
```

- **Type:** `string`
- **Default:** `'Signature pad'`

### ariaLabelledby

Id of the element that labels the drawing surface. Takes precedence over `ariaLabel`.

```vue
<template>
    <SignaturePad ariaLabelledby="signature-title" />
</template>
```

- **Type:** `string`

### modelValue

Strokes drawn on the pad. Each item is an SVG path (`d` attribute) in pixels relative to the pad. Assign a previous value to restore a signature.

```vue
<template>
    <SignaturePad v-model="paths" />
</template>

<script setup lang="ts">
const paths = ref<string[]>([])
</script>
```

- **Type:** `string[]`
- **Default:** `[]`

### name

Renders a hidden input with this name whose value is the JSON-serialized `modelValue`, so the pad takes part in native form submissions.

```vue
<template>
    <SignaturePad name="signature" />
</template>
```

- **Type:** `string`

### height

Sets the height of the pad in pixels. The pad always fills the width of its container.

```vue
<template>
    <SignaturePad :height="280" />
</template>
```

- **Type:** `number`
- **Default:** `200`

### minWidth

Sets the minimum width of the pad in pixels. Below this width the pad stops shrinking, so the container can scroll instead of squeezing the signature area.

```vue
<template>
    <SignaturePad :minWidth="320" />
</template>
```

- **Type:** `number`
- **Default:** `240`

### strokeSize

Sets the stroke width in pixels.

```vue
<template>
    <SignaturePad :strokeSize="4" />
</template>
```

- **Type:** `number`
- **Default:** `2`

### showGuide

Shows the dashed baseline to sign on.

```vue
<template>
    <SignaturePad :showGuide="false" />
</template>
```

- **Type:** `boolean`
- **Default:** `true`

### placeholder

Text shown over the guide while the pad is empty. It requires `showGuide`.

```vue
<template>
    <SignaturePad placeholder="Sign inside the box" />
</template>
```

- **Type:** `string`
- **Default:** `'Sign here'`

### showClearButton

Shows the icon button that removes all strokes. It only appears once something has been drawn.

```vue
<template>
    <SignaturePad :showClearButton="false" />
</template>
```

- **Type:** `boolean`
- **Default:** `true`

### clearIcon

Sets the icon of the clear button.

```vue
<template>
    <SignaturePad :clearIcon="'mdi:close'" />
</template>
```

- **Type:** `string`
- **Default:** `'mdi:eraser'`

### clearAriaLabel

Sets the accessible label (`aria-label`) of the clear icon button.

```vue
<template>
    <SignaturePad clearAriaLabel="Reset signature" />
</template>
```

- **Type:** `string`
- **Default:** `'Clear signature'`

### hasError

Applies the error border. [SignatureField](/docs/components/signature-field) sets it from its `error` prop.

```vue
<template>
    <SignaturePad hasError />
</template>
```

- **Type:** `boolean`
- **Default:** `false`

### disabled

Disables drawing and the clear button.

```vue
<template>
    <SignaturePad disabled />
</template>
```

- **Type:** `boolean`
- **Default:** `false`

### readOnly

Shows the strokes but prevents drawing or clearing.

```vue
<template>
    <SignaturePad readOnly :modelValue="savedPaths" />
</template>
```

- **Type:** `boolean`
- **Default:** `false`

## Accessibility

The drawing surface is exposed as `role="img"` with `ariaLabel` (or `ariaLabelledby`), and reflects `aria-disabled` and `aria-readonly`. Drawing needs a pointer (mouse, touch or pen), so provide an alternative way to confirm identity, such as a typed name, when keyboard-only users must sign.

## Emits

::options-table
---
options: [
    {
        value: "@update:modelValue",
        description: "Emitted with the full list of strokes when a stroke ends or the pad is cleared (v-model).",
    },
    {
        value: "@draw",
        description: "Emitted while drawing with `{ paths, currentPath }`, where `currentPath` is the stroke in progress.",
    },
    {
        value: "@draw-end",
        description: "Emitted with `{ paths }` when the user finishes a stroke.",
    },
    {
        value: "@clear",
        description: "Emitted when the pad is cleared.",
    },
]
---
::

#### Example

```vue
<template>
    <SignaturePad v-model="paths" @draw-end="({ paths }) => console.log(paths.length)" />
</template>

<script setup lang="ts">
const paths = ref<string[]>([])
</script>
```

## Methods

::options-table
---
options: [
    {
        value: "clear()",
        description: "Removes all strokes.",
    },
    {
        value: "getDataUrl(type?, quality?)",
        description: "Renders the strokes to a canvas and returns a data URL. `type` defaults to `'image/png'`.",
    },
]
---
::

```vue
<template>
    <SignaturePad ref="padRef" v-model="paths" />
    <ActionButton text="Export" @click="exportImage" />
</template>

<script setup lang="ts">
const padRef = ref()
const paths = ref<string[]>([])

const exportImage = () => {
    const dataUrl = padRef.value.getDataUrl('image/png')
    console.log(dataUrl)
}
</script>
```
