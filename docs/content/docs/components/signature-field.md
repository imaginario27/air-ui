## Component

::component-code
---
srcDir: 'forms/fields/SignatureField.vue'
props:
    id: signature-field-id
    label: Signature
    ariaLabel: null
    helpText: Sign inside the box
    helpTextPosition: bottom
    required: false
    showOptionalLabel: true
    optionalLabel: null
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
    disabled: false
    readOnly: false
    error: ""
items:
    helpTextPosition:
        - value: top
          text: TOP
        - value: bottom
          text: BOTTOM
enums:
    helpTextPosition: "Position"
external:
  - modelValue
  - error
externalTypes:
  - array
  - string
isPreviewContentBoxed: true
previewContentMaxWidth: 560
propsSettingsExcludedProps: ['validator', 'modelValue']
---
::

## Props

::props-table
---
props: [
    {
        "name": "id",
        "type": "string",
        "required": true,
    },
    {
        "name": "label",
        "type": "string",
    },
    {
        "name": "ariaLabel",
        "type": "string",
    },
    {
        "name": "helpText",
        "type": "string",
    },
    {
        "name": "helpTextPosition",
        "default": "Position.BOTTOM",
        "type": "Position",
    },
    {
        "name": "required",
        "default": "false",
        "type": "boolean",
    },
    {
        "name": "showOptionalLabel",
        "default": "true",
        "type": "boolean",
    },
    {
        "name": "optionalLabel",
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
        "name": "disabled",
        "default": "false",
        "type": "boolean",
    },
    {
        "name": "readOnly",
        "default": "false",
        "type": "boolean",
    },
    {
        "name": "validator",
        "default": "() => null",
        "type": "(value: unknown) => string | null",
    },
    {
        "name": "error",
        "default": "''",
        "type": "string",
    },
]
---
::

`id` is the only required prop. The pad props (`modelValue`, `name`, `height`, `minWidth`, `strokeSize`, `showGuide`, `placeholder`, `showClearButton`, `clearIcon`, `clearAriaLabel`, `disabled`, `readOnly`) work as in [SignaturePad](/docs/components/signature-pad#usage).

## Usage

### id

Unique id of the field. The label gets `${id}-label` and labels the drawing surface.

```vue
<template>
    <SignatureField id="signature" label="Signature" />
</template>
```

- **Type:** `string`

### label

Text of the label shown above the pad.

```vue
<template>
    <SignatureField id="signature" label="Signature" />
</template>
```

- **Type:** `string`

### ariaLabel

Accessible label of the pad when there is no visible `label`.

```vue
<template>
    <SignatureField id="signature" ariaLabel="Customer signature" />
</template>
```

- **Type:** `string`

### helpText

Helper text shown next to the pad. It is replaced by the `error` message when there is one.

```vue
<template>
    <SignatureField id="signature" helpText="Sign inside the box" />
</template>
```

- **Type:** `string`

### helpTextPosition

Places the help text above or below the pad.

```vue
<template>
    <SignatureField id="signature" helpText="Sign inside the box" :helpTextPosition="Position.TOP" />
</template>
```

- **Type:** `Position`
- **Default:** `Position.BOTTOM`

#### Options

::options-table
---
options: [
    { value: "TOP", description: "top" },
    { value: "BOTTOM", description: "bottom" },
]
---
::

### required

Marks the field as required, hides the optional label and enables `validator`.

```vue
<template>
    <SignatureField id="signature" required />
</template>
```

- **Type:** `boolean`
- **Default:** `false`

### showOptionalLabel

Shows the optional label when the field is not required.

```vue
<template>
    <SignatureField id="signature" label="Signature" :showOptionalLabel="false" />
</template>
```

- **Type:** `boolean`
- **Default:** `true`

### optionalLabel

Overrides the optional label text. Defaults to the text from the DS config.

```vue
<template>
    <SignatureField id="signature" label="Signature" optionalLabel="(Optional)" />
</template>
```

- **Type:** `string`

### modelValue

Strokes drawn on the pad, as a list of SVG paths.

```vue
<template>
    <SignatureField id="signature" v-model="paths" />
</template>

<script setup lang="ts">
const paths = ref<string[]>([])
</script>
```

- **Type:** `string[]`
- **Default:** `[]`

### name

Renders a hidden input with the JSON-serialized strokes for native form submissions.

```vue
<template>
    <SignatureField id="signature" name="signature" />
</template>
```

- **Type:** `string`

### height

Sets the height of the pad in pixels.

```vue
<template>
    <SignatureField id="signature" :height="280" />
</template>
```

- **Type:** `number`
- **Default:** `200`

### minWidth

Sets the minimum width of the pad in pixels. Below this width the pad stops shrinking, so the container can scroll instead of squeezing the signature area.

```vue
<template>
    <SignatureField id="signature" :minWidth="320" />
</template>
```

- **Type:** `number`
- **Default:** `240`

### strokeSize

Sets the stroke width in pixels.

```vue
<template>
    <SignatureField id="signature" :strokeSize="4" />
</template>
```

- **Type:** `number`
- **Default:** `2`

### showGuide

Shows the dashed baseline to sign on.

```vue
<template>
    <SignatureField id="signature" :showGuide="false" />
</template>
```

- **Type:** `boolean`
- **Default:** `true`

### placeholder

Text shown over the guide while the pad is empty.

```vue
<template>
    <SignatureField id="signature" placeholder="Sign inside the box" />
</template>
```

- **Type:** `string`
- **Default:** `'Sign here'`

### showClearButton

Shows the icon button that removes all strokes. It only appears once something has been drawn.

```vue
<template>
    <SignatureField id="signature" :showClearButton="false" />
</template>
```

- **Type:** `boolean`
- **Default:** `true`

### clearIcon

Sets the icon of the clear button.

```vue
<template>
    <SignatureField id="signature" :clearIcon="'mdi:close'" />
</template>
```

- **Type:** `string`
- **Default:** `'mdi:eraser'`

### clearAriaLabel

Sets the accessible label (`aria-label`) of the clear icon button.

```vue
<template>
    <SignatureField id="signature" clearAriaLabel="Reset signature" />
</template>
```

- **Type:** `string`
- **Default:** `'Clear signature'`

### disabled

Disables drawing and the clear button.

```vue
<template>
    <SignatureField id="signature" disabled />
</template>
```

- **Type:** `boolean`
- **Default:** `false`

### readOnly

Shows the strokes but prevents drawing or clearing.

```vue
<template>
    <SignatureField id="signature" readOnly :modelValue="savedPaths" />
</template>
```

- **Type:** `boolean`
- **Default:** `false`

### validator

Function that receives the strokes and returns an error message, or `null` when valid. It runs only when `required` is set, following the form validation mode.

```vue
<template>
    <SignatureField
        id="signature"
        v-model="paths"
        v-model:error="error"
        required
        :validator="value => (value as string[]).length ? null : 'Signature is required'"
    />
</template>

<script setup lang="ts">
const paths = ref<string[]>([])
const error = ref('')
</script>
```

- **Type:** `(value: unknown) => string | null`
- **Default:** `() => null`

### error (v-model:error)

Sets the error message of the field. This prop is bindable via `v-model:error`, allowing two-way syncing of the validation state. It replaces the help text and applies the error border on the pad.

```vue
<template>
    <SignatureField id="signature" v-model:error="errorMessage" />
</template>
```

- **Type:** `string`
- **Default:** `''`

## Accessibility

The label is linked to the drawing surface through `aria-labelledby`. Without a visible `label`, set `ariaLabel`. See [SignaturePad](/docs/components/signature-pad#accessibility) for the pointer-only note.

## Emits

::options-table
---
options: [
    { value: "@update:modelValue", description: "Emitted with the full list of strokes when a stroke ends or the pad is cleared (v-model)." },
    { value: "@update:error", description: "Emitted with the validation message, or an empty string, when the field is validated (v-model:error)." },
    { value: "@draw", description: "Emitted while drawing with `{ paths, currentPath }`." },
    { value: "@draw-end", description: "Emitted with `{ paths }` when the user finishes a stroke." },
    { value: "@clear", description: "Emitted when the pad is cleared." },
]
---
::

#### Example

```vue
<template>
    <SignatureField id="signature" v-model="paths" @clear="console.log('cleared')" />
</template>

<script setup lang="ts">
const paths = ref<string[]>([])
</script>
```

## Methods

::options-table
---
options: [
    { value: "clear()", description: "Removes all strokes." },
    { value: "getDataUrl(type?, quality?)", description: "Returns the signature as a data URL. `type` defaults to `'image/png'`." },
]
---
::

```vue
<template>
    <SignatureField id="signature" ref="fieldRef" v-model="paths" />
</template>

<script setup lang="ts">
const fieldRef = ref()
const paths = ref<string[]>([])

const exportImage = () => fieldRef.value.getDataUrl()
</script>
```
