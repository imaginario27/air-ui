## Component

::component-code
---
srcDir: 'images/Image.vue'
previewBackground: "white"
props:
    src: "https://picsum.photos/id/1015/1200/800"
    alt: "Image of a river between mountains"
    caption: "River valley"
    showCaption: false
    captionPlacement: "below"
    aspectRatio: "16:9"
    fit: "cover"
    hoverEffect: "zoomIn"
    hoverSplitDirection: "diagonal"
    hasHoverIcon: true
    useLightbox: true
    isClickable: false
    useNuxtImg: false
    loading: "lazy"
items:
    loading:
        - value: lazy
          text: LAZY
        - value: eager
          text: EAGER
    captionPlacement:
        - value: none
          text: NONE
        - value: below
          text: BELOW
        - value: overlayBottom
          text: OVERLAY_BOTTOM
        - value: hover
          text: HOVER
    aspectRatio:
        - value: "1:1"
          text: AR_1_1
        - value: "4:3"
          text: AR_4_3
        - value: "3:2"
          text: AR_3_2
        - value: "16:9"
          text: AR_16_9
        - value: "3:4"
          text: AR_3_4
        - value: "4:5"
          text: AR_4_5
        - value: "2:3"
          text: AR_2_3
    fit:
        - value: cover
          text: COVER
        - value: contain
          text: CONTAIN
    hoverEffect:
        - value: none
          text: NONE
        - value: zoomIn
          text: ZOOM_IN
        - value: zoomOut
          text: ZOOM_OUT
        - value: overlay
          text: OVERLAY
        - value: blur
          text: BLUR
        - value: grayscale
          text: GRAYSCALE
        - value: splitZoom
          text: SPLIT_ZOOM
    hoverSplitDirection:
        - value: diagonal
          text: DIAGONAL
        - value: horizontal
          text: HORIZONTAL
        - value: vertical
          text: VERTICAL
enums:
    captionPlacement: "ImageCaptionPlacement"
    aspectRatio: "AspectRatio"
    fit: "ImageFit"
    hoverEffect: "ImageHoverEffect"
    hoverSplitDirection: "ImageHoverSplitDirection"
    loading: "ImageLoading"
---
::

## Props

::props-table
---
props: [
    {
        "name": "src",
        "required": "true",
        "type": "string",
    },
    {
        "name": "alt",
        "default": "''",
        "type": "string",
    },
    {
        "name": "caption",
        "type": "string",
    },
    {
        "name": "showCaption",
        "default": "false",
        "type": "boolean",
    },
    {
        "name": "captionPlacement",
        "default": "ImageCaptionPlacement.BELOW",
        "type": "ImageCaptionPlacement",
    },
    {
        "name": "width",
        "type": "number",
    },
    {
        "name": "height",
        "type": "number",
    },
    {
        "name": "aspectRatio",
        "type": "AspectRatio",
    },
    {
        "name": "fit",
        "default": "ImageFit.COVER",
        "type": "ImageFit",
    },
    {
        "name": "hoverEffect",
        "default": "ImageHoverEffect.NONE",
        "type": "ImageHoverEffect",
    },
    {
        "name": "hoverSplitDirection",
        "default": "ImageHoverSplitDirection.DIAGONAL",
        "type": "ImageHoverSplitDirection",
    },
    {
        "name": "hasHoverIcon",
        "default": "true",
        "type": "boolean",
    },
    {
        "name": "hoverIcon",
        "type": "string",
    },
    {
        "name": "useLightbox",
        "default": "false",
        "type": "boolean",
    },
    {
        "name": "lightboxSrc",
        "type": "string",
    },
    {
        "name": "isClickable",
        "default": "false",
        "type": "boolean",
    },
    {
        "name": "useNuxtImg",
        "default": "false",
        "type": "boolean",
    },
    {
        "name": "sizes",
        "type": "string",
    },
    {
        "name": "densities",
        "type": "string",
    },
    {
        "name": "loading",
        "default": "ImageLoading.LAZY",
        "type": "ImageLoading",
    },
    {
        "name": "containerClass",
        "type": "string",
    },
    {
        "name": "wrapperClass",
        "type": "string",
    },
    {
        "name": "imageClass",
        "type": "string",
    },
    {
        "name": "captionClass",
        "type": "string",
    },
    {
        "name": "openAriaLabel",
        "type": "string",
    },
]
---
::

## Usage

### src

Sets the image source.

```vue
<template>
    <Image src="/images/river.jpg" alt="River between mountains" />
</template>
```

- **Type:** `string`

### alt

Sets the alternative text. Redundant wording such as "Image of" is removed with `cleanImageAlt`, since screen readers already announce an image.

```vue
<template>
    <Image src="/images/river.jpg" alt="Image of a river between mountains" />
</template>
```

- **Type:** `string`
- **Default:** `''`

### caption

Sets the image caption. It is always shown in the lightbox, and on the page only when [showCaption](#showcaption) is on.

```vue
<template>
    <Image src="/images/river.jpg" caption="River valley" />
</template>
```

- **Type:** `string`

### showCaption

Shows the caption on the page, at the position set by [captionPlacement](#captionplacement).

```vue
<template>
    <Image src="/images/river.jpg" caption="River valley" showCaption />
</template>
```

- **Type:** `boolean`
- **Default:** `false`

### captionPlacement

Sets where the caption is displayed via the `ImageCaptionPlacement` enum.

```vue
<template>
    <Image
        src="/images/river.jpg"
        caption="River valley"
        showCaption
        :captionPlacement="ImageCaptionPlacement.OVERLAY_BOTTOM"
    />
</template>
```

- **Type:** `ImageCaptionPlacement`
- **Default:** `ImageCaptionPlacement.BELOW`

#### Options

::options-table
---
options: [
    { value: "NONE", description: "none" },
    { value: "BELOW", description: "below" },
    { value: "OVERLAY_BOTTOM", description: "overlayBottom" },
    { value: "HOVER", description: "hover" },
]
---
::

### width

Sets the intrinsic width of the image. It helps the browser reserve space and avoid layout shifts.

```vue
<template>
    <Image src="/images/river.jpg" :width="1200" :height="800" />
</template>
```

- **Type:** `number`

### height

Sets the intrinsic height of the image. Use it together with [width](#width).

```vue
<template>
    <Image src="/images/river.jpg" :width="1200" :height="800" />
</template>
```

- **Type:** `number`

### aspectRatio

Crops the image to a fixed ratio via the `AspectRatio` enum. Without it, the image keeps its natural proportions.

```vue
<template>
    <Image src="/images/river.jpg" :aspectRatio="AspectRatio.AR_16_9" />
</template>
```

- **Type:** `AspectRatio`

#### Options

::options-table
---
options: [
    { value: "AR_1_1", description: "1:1" },
    { value: "AR_4_3", description: "4:3" },
    { value: "AR_3_2", description: "3:2" },
    { value: "AR_16_9", description: "16:9" },
    { value: "AR_3_4", description: "3:4" },
    { value: "AR_4_5", description: "4:5" },
    { value: "AR_2_3", description: "2:3" },
]
---
::

### fit

Sets how the image fills the box defined by [aspectRatio](#aspectratio) via the `ImageFit` enum.

```vue
<template>
    <Image
        src="/images/logo.png"
        :aspectRatio="AspectRatio.AR_1_1"
        :fit="ImageFit.CONTAIN"
    />
</template>
```

- **Type:** `ImageFit`
- **Default:** `ImageFit.COVER`

#### Options

::options-table
---
options: [
    { value: "COVER", description: "cover" },
    { value: "CONTAIN", description: "contain" },
]
---
::

### hoverEffect

Sets the effect shown when you hover the image via the `ImageHoverEffect` enum.

```vue
<template>
    <Image src="/images/river.jpg" :hoverEffect="ImageHoverEffect.GRAYSCALE" />
</template>
```

- **Type:** `ImageHoverEffect`
- **Default:** `ImageHoverEffect.NONE`

#### Options

::options-table
---
options: [
    { value: "NONE", description: "none" },
    { value: "ZOOM_IN", description: "zoomIn" },
    { value: "ZOOM_OUT", description: "zoomOut" },
    { value: "OVERLAY", description: "overlay" },
    { value: "BLUR", description: "blur" },
    { value: "GRAYSCALE", description: "grayscale" },
    { value: "SPLIT_ZOOM", description: "splitZoom" },
]
---
::

### hoverSplitDirection

Sets the direction in which the two chromatic layers separate with the `SPLIT_ZOOM` effect.

```vue
<template>
    <Image
        src="/images/river.jpg"
        :hoverEffect="ImageHoverEffect.SPLIT_ZOOM"
        :hoverSplitDirection="ImageHoverSplitDirection.HORIZONTAL"
    />
</template>
```

- **Type:** `ImageHoverSplitDirection`
- **Default:** `ImageHoverSplitDirection.DIAGONAL`

#### Options

::options-table
---
options: [
    { value: "DIAGONAL", description: "diagonal" },
    { value: "HORIZONTAL", description: "horizontal" },
    { value: "VERTICAL", description: "vertical" },
]
---
::

### hasHoverIcon

Shows an icon in the center of the `OVERLAY` effect.

```vue
<template>
    <Image
        src="/images/river.jpg"
        :hoverEffect="ImageHoverEffect.OVERLAY"
        :hasHoverIcon="false"
    />
</template>
```

- **Type:** `boolean`
- **Default:** `true`

### hoverIcon

Sets the icon of the `OVERLAY` effect. By default it is a magnifier when [useLightbox](#uselightbox) is on, and an eye otherwise.

```vue
<template>
    <Image
        src="/images/river.jpg"
        :hoverEffect="ImageHoverEffect.OVERLAY"
        hoverIcon="mdi:heart"
    />
</template>
```

- **Type:** `string`

### useLightbox

Opens the image in a [Lightbox](/docs/components/lightbox) when you click it. The image becomes a button and the pointer shows a zoom cursor.

```vue
<template>
    <Image src="/images/river.jpg" useLightbox />
</template>
```

- **Type:** `boolean`
- **Default:** `false`

### lightboxSrc

Sets a larger source for the lightbox, so the thumbnail can stay light.

```vue
<template>
    <Image
        src="/images/river-small.jpg"
        lightboxSrc="/images/river-large.jpg"
        useLightbox
    />
</template>
```

- **Type:** `string`

### isClickable

Makes the image a button that emits [click](#emits) without opening a lightbox. It is always `true` when [useLightbox](#uselightbox) is on.

```vue
<template>
    <Image src="/images/river.jpg" isClickable @click="handleClick" />
</template>
```

- **Type:** `boolean`
- **Default:** `false`

### useNuxtImg

Renders the image with `NuxtImg` from `@nuxt/image` instead of a plain `img`. It requires the `@nuxt/image` module in your app, and enables [sizes](#sizes) and [densities](#densities).

```vue
<template>
    <Image src="/images/river.jpg" useNuxtImg />
</template>
```

- **Type:** `boolean`
- **Default:** `false`

### sizes

Sets the `sizes` attribute passed to `NuxtImg`. It only applies with [useNuxtImg](#usenuxtimg).

```vue
<template>
    <Image src="/images/river.jpg" useNuxtImg sizes="100vw md:50vw" />
</template>
```

- **Type:** `string`

### densities

Sets the `densities` attribute passed to `NuxtImg`. It only applies with [useNuxtImg](#usenuxtimg).

```vue
<template>
    <Image src="/images/river.jpg" useNuxtImg densities="x1 x2" />
</template>
```

- **Type:** `string`

### loading

Sets how the browser loads the image via the `ImageLoading` enum. Use `EAGER` for images above the fold.

```vue
<template>
    <Image src="/images/hero.jpg" :loading="ImageLoading.EAGER" />
</template>
```

- **Type:** `ImageLoading`
- **Default:** `ImageLoading.LAZY`

#### Options

::options-table
---
options: [
    { value: "LAZY", description: "lazy" },
    { value: "EAGER", description: "eager" },
]
---
::

### containerClass

Adds custom classes to the root `figure` element.

```vue
<template>
    <Image src="/images/river.jpg" containerClass="max-w-md" />
</template>
```

- **Type:** `string`

### wrapperClass

Adds custom classes to the element that wraps the image, where the aspect ratio and rounded corners live.

```vue
<template>
    <Image src="/images/river.jpg" wrapperClass="rounded-xl" />
</template>
```

- **Type:** `string`

### imageClass

Adds custom classes to the `img` element.

```vue
<template>
    <Image src="/images/river.jpg" imageClass="object-top" />
</template>
```

- **Type:** `string`

### captionClass

Adds custom classes to the caption.

```vue
<template>
    <Image src="/images/river.jpg" caption="River valley" showCaption captionClass="text-center" />
</template>
```

- **Type:** `string`

### openAriaLabel

Sets the accessible name of the button when the image is clickable. Falls back to `useDSConfig().lightbox.openImageText()`.

```vue
<template>
    <Image src="/images/river.jpg" useLightbox openAriaLabel="Enlarge photo" />
</template>
```

- **Type:** `string`

## Accessibility

Always provide an `alt` text, or leave it empty when the image is decorative. A clickable image is a native `button`, so it works with Enter and Space and shows a focus outline. The chromatic layers of `SPLIT_ZOOM` are hidden from assistive technology. Hover animations are disabled for users who prefer reduced motion.

## Emits

::options-table
---
options: [
    { value: "@click", description: "Emits the click event when the image is clickable, either with `useLightbox` or `isClickable`." },
]
---
::

#### Example

```vue
<template>
    <Image src="/images/river.jpg" isClickable @click="handleClick" />
</template>
<script setup lang="ts">
const handleClick = () => {
    console.log('Image clicked')
}
</script>
```
