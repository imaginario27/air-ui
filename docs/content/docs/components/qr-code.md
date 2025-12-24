
## Component

::component-code
---
srcDir: 'images/QRCode.vue'
props: 
    renderAs: "canvas"
    modelValue: "https://example.com/qr-code.png"
    size: 250
    level: "M"
    background: "#ffffff"
    foreground: "#000000"
    useGradient: false
    gradientType: "linear"
    gradientStartColor: "#ffffff"
    gradientEndColor: "#000000"
    imageMargin: 2
    hasBorder: true
    hasMiddleImage: false
    imageSettings: {
        src: "https://example.com/image.png",
        width: 100,
        height: 100,
    }
    isLoading: false
items:
    renderAs: 
        - value: canvas
          text: CANVAS
        - value: svg
          text: SVG
    level: 
        - value: L
          text: L
        - value: M
          text: M
        - value: Q
          text: Q
        - value: H
          text: H
    gradientType:
        - value: linear
          text: LINEAR
        - value: radial
          text: RADIAL
previewBackground: 'white'
propsSettingsExcludedProps: ['imageSettings']
---
::

## Props

::props-table
---
props: [
    {
        "name": "renderAs",
        "default": "canvas",
        "type": "QRRenderAs",
    },
    {
        "name": "modelValue",
        "required": "true",
        "type": "string",
    },
    {
        "name": "size",
        "default": 250,
        "type": "number",
    },
    {
        "name": "level",
        "default": "M",
        "type": "QRLevel",
    },
    {
        "name": "background",
        "default": "#ffffff",
        "type": "string",
    },
    {
        "name": "foreground",
        "default": "#000000",
        "type": "string",
    },
    {
        "name": "gradient",
        "default": "false",
        "type": "boolean",
    },
    {
        "name": "gradientType",
        "default": "linear",
        "type": "QRGradientType",
    },
    {
        "name": "gradientStartColor",
        "default": "#ffffff",
        "type": "string",
    },
    {
        "name": "gradientEndColor",
        "default": "#000000",
        "type": "string",
    },
    {
        "name": "imageMargin",
        "default": 0,
        "type": "number",
    },
    {
        "name": "hasBorder",
        "default": "true",
        "type": "boolean",
    },
    {
        "name": "hasMiddleImage",
        "default": "false",
        "type": "boolean",
    },
    {
        "name": "imageSettings",
        "type": "ImageSettings",
    },
    {
        "name": "isLoading",
        "default": "false",
        "type": "boolean",
    },
    {
        "name": "containerClass",
        "type": "string",
    },
]
---
::

## Usage
### renderAs

The `renderAs` prop determines how the QR code is rendered. It uses the `QRRenderAs` enum to determine the type of rendering.

```vue
<template>
    <QR image :renderAs="QRRenderAs.CANVAS" />
</template>
```

- **Type:** `QRRenderAs`
- **Default:** `QRRenderAs.CANVAS`

#### Options
::options-table
---
options: [
    {
        value: "CANVAS",
        description: "Uses a canvas element to render the QR code.",
    },
    {
        value: "SVG",
        description: "Uses a SVG tag to render the QR code.",
    },
]
---
::

### modelValue

The `modelValue` prop is used to set the value of the QR code.

```vue
<template>
    <QRCode v-model="" />
</template>
```

- **Type:** `string`
- **Required:** `true`

### size

The `size` prop determines the size of the QR code.

```vue
<template>
    <QRCode :size="100" />
</template>
```

- **Type:** `number`
- **Default:** `250`

### level

The `level` prop determines the error correction level of the QR code. It uses the `QRLevel` enum.

```vue
<template>
    <QRCode :level="QRLevel.M" />
</template>
```

- **Type:** `QRLevel`
- **Default:** `QRLevel.M`

#### Options
::options-table
---
options: [
    {
        value: "L",
        description: "Low error correction level.",
    },
    {
        value: "M",
        description: "Medium error correction level.",
    },
    {
        value: "Q",
        description: "Quartile error correction level.",
    },
    {
        value: "H",
        description: "High error correction level.",
    },
]
---
::

### background

The `background` prop determines the background color of the QR code.

```vue
<template>
    <QRCode background="#000000" />
</template>
```

- **Type:** `string`
- **Default:** `#ffffff`

### foreground

The `foreground` prop determines the foreground color of the QR code.

```vue
<template>
    <QRCode foreground="#ffffff" />
</template>
```

- **Type:** `string`
- **Default:** `#000000`

### useGradient

The `useGradient` prop determines whether to use a gradient for the QR code. 

```vue
<template>
    <QRCode useGradient />
</template>
```

- **Type:** `boolean`
- **Default:** `false`

### gradientType

The `gradientType` prop determines the type of gradient to use. It uses the `QRGradientType` enum.

```vue
<template>
    <QRCode :gradientType="QRGradientType.RADIAL" />
</template>
```

- **Type:** `QRGradientType`
- **Default:** `QRGradientType.LINEAR`

#### Options
::options-table
---
options: [
    {
        value: "linear",
        description: "Linear gradient.",
    },
    {
        value: "radial",
        description: "Radial gradient.",
    },
]
---
::

### gradientStartColor

The `gradientStartColor` prop determines the start color of the gradient.

```vue
<template>
    <QRCode gradientStartColor="#000000" />
</template>
```

- **Type:** `string`
- **Default:** `#ffffff`

### gradientEndColor

The `gradientEndColor` prop determines the end color of the gradient.

```vue
<template>
    <QRCode gradientEndColor="#ffffff" />
</template>
```

- **Type:** `string`
- **Default:** `#000000`

### imageMargin

The `imageMargin` prop determines the margin of the image.

```vue
<template>
    <QRCode :imageMargin="10" />
</template>
```

- **Type:** `number`
- **Default:** `0`

### hasBorder

The `hasBorder` prop determines whether to draw a border around the QR code.

::content-alert
---
props:
    title: "Important"
    description: "In order to be visible, some margin has to be applied."
---
::

```vue
<template>
    <QRCode :hasBorder="false" />
</template>
```

- **Type:** `boolean`
- **Default:** `true`

### hasMiddleImage

The `hasMiddleImage` prop determines whether to draw a middle image.

```vue
<template>
    <QRCode :hasMiddleImage="false" />
</template>
```

- **Type:** `boolean`
- **Default:** `false`

### imageSettings

The `imageSettings` prop is an object that contains the settings for the middle image.

```vue
<template>
    <QRCode :imageSettings="{
        src: 'https://example.com/image.png',
        width: 100,
        height: 100,
    }" />
</template>
```

- **Type:** `ImageSettings`

### isLoading

The `isLoading` prop determines whether the QR code is loading.

```vue
<template>
    <QRCode :isLoading="true" />
</template>
```

- **Type:** `boolean`
- **Default:** `false`

### containerClass

The `containerClass` prop is a string that determines the class of the container.

```vue
<template>
    <QRCode :containerClass="myClass" />
</template>
```

- **Type:** `string`




