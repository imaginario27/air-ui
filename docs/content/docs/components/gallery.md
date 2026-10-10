## Component

::component-code
---
srcDir: 'images/Gallery.vue'
previewBackground: "white"
props:
    images:
        - id: "1"
          src: "https://picsum.photos/id/1015/800/800"
          alt: "Image of a river between mountains"
          caption: "River valley"
        - id: "2"
          src: "https://picsum.photos/id/1018/800/800"
          alt: "Image of a green mountain range"
          caption: "Mountain range"
        - id: "3"
          src: "https://picsum.photos/id/1043/800/800"
          alt: "Image of a quiet lake"
          caption: "Quiet lake"
        - id: "4"
          src: "https://picsum.photos/id/1039/800/800"
          alt: "Image of a waterfall in a forest"
          caption: "Waterfall"
        - id: "5"
          src: "https://picsum.photos/id/1036/800/800"
          alt: "Image of a snowy peak"
          caption: "Snowy peak"
        - id: "6"
          src: "https://picsum.photos/id/1025/800/800"
          alt: "Image of a dog resting"
          caption: "Resting dog"
    cols: 3
    tabletCols: 2
    mobileCols: 1
    gapClass: "gap-4"
    aspectRatio: "1:1"
    fit: "cover"
    hoverEffect: "zoomIn"
    hoverSplitDirection: "diagonal"
    captionPlacement: "none"
    paginationMode: "none"
    itemsPerPage: 3
    useLightbox: true
    useLightboxLoop: true
    showLightboxCaption: true
    useNuxtImg: false
    loading: "lazy"
items:
    paginationMode:
        - value: none
          text: NONE
        - value: buttons
          text: BUTTONS
        - value: simple
          text: SIMPLE
        - value: loadMore
          text: LOAD_MORE
        - value: infinite
          text: INFINITE
    loading:
        - value: lazy
          text: LAZY
        - value: eager
          text: EAGER
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
    captionPlacement:
        - value: none
          text: NONE
        - value: below
          text: BELOW
        - value: overlayBottom
          text: OVERLAY_BOTTOM
        - value: hover
          text: HOVER
enums:
    aspectRatio: "AspectRatio"
    fit: "ImageFit"
    hoverEffect: "ImageHoverEffect"
    hoverSplitDirection: "ImageHoverSplitDirection"
    captionPlacement: "ImageCaptionPlacement"
    paginationMode: "GalleryPaginationMode"
    loading: "ImageLoading"
external:
  - images
externalTypes:
  - GalleryImage[]
propsSettingsExcludedProps: ['images']
---
::

## Props

::props-table
---
props: [
    {
        "name": "images",
        "required": "true",
        "type": "GalleryImage[]",
    },
    {
        "name": "cols",
        "default": "3",
        "type": "number",
    },
    {
        "name": "tabletCols",
        "default": "2",
        "type": "number",
    },
    {
        "name": "mobileCols",
        "default": "1",
        "type": "number",
    },
    {
        "name": "gapClass",
        "default": "'gap-4'",
        "type": "string",
    },
    {
        "name": "aspectRatio",
        "default": "AspectRatio.AR_1_1",
        "type": "AspectRatio",
    },
    {
        "name": "fit",
        "default": "ImageFit.COVER",
        "type": "ImageFit",
    },
    {
        "name": "hoverEffect",
        "default": "ImageHoverEffect.ZOOM_IN",
        "type": "ImageHoverEffect",
    },
    {
        "name": "hoverSplitDirection",
        "default": "ImageHoverSplitDirection.DIAGONAL",
        "type": "ImageHoverSplitDirection",
    },
    {
        "name": "captionPlacement",
        "default": "ImageCaptionPlacement.NONE",
        "type": "ImageCaptionPlacement",
    },
    {
        "name": "paginationMode",
        "default": "GalleryPaginationMode.NONE",
        "type": "GalleryPaginationMode",
    },
    {
        "name": "itemsPerPage",
        "default": "12",
        "type": "number",
    },
    {
        "name": "page",
        "type": "number",
    },
    {
        "name": "loadMoreText",
        "default": "useDSConfig().gallery.loadMoreText()",
        "type": "string",
    },
    {
        "name": "paginationProps",
        "type": "Record<string, unknown>",
    },
    {
        "name": "useLightbox",
        "default": "true",
        "type": "boolean",
    },
    {
        "name": "useLightboxLoop",
        "default": "true",
        "type": "boolean",
    },
    {
        "name": "showLightboxCaption",
        "default": "true",
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
        "name": "imageClass",
        "type": "string",
    },
    {
        "name": "captionClass",
        "type": "string",
    },
    {
        "name": "paginationClass",
        "type": "string",
    },
]
---
::

## Usage

### images

Sets the images to display. Each one becomes an [Image](/docs/components/image) in the grid and a slide in the lightbox.

```vue
<template>
    <Gallery :images />
</template>
<script setup lang="ts">
const images: GalleryImage[] = [
    { id: '1', src: '/images/river.jpg', alt: 'River between mountains', caption: 'River valley' },
    { id: '2', src: '/images/lake.jpg', alt: 'Quiet lake', caption: 'Quiet lake' },
]
</script>
```

- **Type:** `GalleryImage[]`

#### TypeScript Interface

```ts
interface GalleryImage {
    id: string
    src: string
    alt: string // Redundant wording such as "Image of" is removed with cleanImageAlt
    caption?: string | null
    width?: number
    height?: number
}
```

### cols

Sets the number of columns on desktop.

```vue
<template>
    <Gallery :images :cols="4" />
</template>
```

- **Type:** `number`
- **Default:** `3`

### tabletCols

Sets the number of columns on tablet.

```vue
<template>
    <Gallery :images :tabletCols="3" />
</template>
```

- **Type:** `number`
- **Default:** `2`

### mobileCols

Sets the number of columns on mobile.

```vue
<template>
    <Gallery :images :mobileCols="2" />
</template>
```

- **Type:** `number`
- **Default:** `1`

### gapClass

Sets the gap between images with a Tailwind class.

```vue
<template>
    <Gallery :images gapClass="gap-8" />
</template>
```

- **Type:** `string`
- **Default:** `'gap-4'`

### aspectRatio

Crops every image to the same ratio via the `AspectRatio` enum, which keeps the grid aligned even when the sources have different sizes.

```vue
<template>
    <Gallery :images :aspectRatio="AspectRatio.AR_4_3" />
</template>
```

- **Type:** `AspectRatio`
- **Default:** `AspectRatio.AR_1_1`

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

Sets how each image fills its box via the `ImageFit` enum.

```vue
<template>
    <Gallery :images :fit="ImageFit.CONTAIN" />
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

Sets the hover effect of every image via the `ImageHoverEffect` enum.

```vue
<template>
    <Gallery :images :hoverEffect="ImageHoverEffect.GRAYSCALE" />
</template>
```

- **Type:** `ImageHoverEffect`
- **Default:** `ImageHoverEffect.ZOOM_IN`

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

Sets the separation direction of the `SPLIT_ZOOM` effect.

```vue
<template>
    <Gallery
        :images
        :hoverEffect="ImageHoverEffect.SPLIT_ZOOM"
        :hoverSplitDirection="ImageHoverSplitDirection.VERTICAL"
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

### captionPlacement

Sets where the image captions are displayed on the grid. They are hidden by default and are still shown in the lightbox.

```vue
<template>
    <Gallery :images :captionPlacement="ImageCaptionPlacement.BELOW" />
</template>
```

- **Type:** `ImageCaptionPlacement`
- **Default:** `ImageCaptionPlacement.NONE`

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

### paginationMode

Sets how the images are split via the `GalleryPaginationMode` enum. The lightbox always navigates through the whole list, whatever the page.

```vue
<template>
    <Gallery
        :images
        :paginationMode="GalleryPaginationMode.LOAD_MORE"
        :itemsPerPage="9"
    />
</template>
```

- **Type:** `GalleryPaginationMode`
- **Default:** `GalleryPaginationMode.NONE`

#### Options

::options-table
---
options: [
    { value: "NONE", description: "Shows every image." },
    { value: "BUTTONS", description: "Shows one page at a time with numbered buttons (`ButtonPagination`)." },
    { value: "SIMPLE", description: "Shows one page at a time with previous and next buttons (`SimplePagination`)." },
    { value: "LOAD_MORE", description: "Shows a button that adds the next batch below the current images." },
    { value: "INFINITE", description: "Adds the next batch automatically when you scroll to the end of the grid." },
]
---
::

### itemsPerPage

Sets how many images are shown per page, or per batch with `LOAD_MORE` and `INFINITE`.

```vue
<template>
    <Gallery
        :images
        :paginationMode="GalleryPaginationMode.BUTTONS"
        :itemsPerPage="6"
    />
</template>
```

- **Type:** `number`
- **Default:** `12`

### page

Sets the current page. Bind it with `v-model:page` to control or read it from outside. Without it, the gallery keeps its own page state. With `LOAD_MORE` and `INFINITE` it is the number of batches shown. Out of range values are clamped.

```vue
<template>
    <Gallery
        v-model:page="page"
        :images
        :paginationMode="GalleryPaginationMode.BUTTONS"
    />
</template>
<script setup lang="ts">
const page = ref(1)
</script>
```

- **Type:** `number`

### loadMoreText

Sets the text of the button shown with `LOAD_MORE`. Falls back to `useDSConfig().gallery.loadMoreText()`.

```vue
<template>
    <Gallery
        :images
        :paginationMode="GalleryPaginationMode.LOAD_MORE"
        loadMoreText="Show more photos"
    />
</template>
```

- **Type:** `string`
- **Default:** `useDSConfig().gallery.loadMoreText()`

### paginationProps

Passes extra props to the pagination component, either `ButtonPagination` or `SimplePagination`. Use it to translate the result texts and aria labels for this gallery only. To translate them everywhere, set `useDSConfig().pagination` once instead. The pagination props the gallery controls itself, such as the page and the total, can't be overridden.

```vue
<template>
    <Gallery
        :images
        :paginationMode="GalleryPaginationMode.BUTTONS"
        :paginationProps="{
            resultTextMultiplePages: 'Mostrando {from} a {to} de {total} imágenes',
            ariaLabelPrevious: 'Página anterior',
            ariaLabelNext: 'Página siguiente',
        }"
    />
</template>
```

- **Type:** `Record<string, unknown>`

### useLightbox

Opens a single [Lightbox](/docs/components/lightbox) on the clicked image, so you can navigate through the whole gallery. Set it to `false` for a static grid.

```vue
<template>
    <Gallery :images :useLightbox="false" />
</template>
```

- **Type:** `boolean`
- **Default:** `true`

### useLightboxLoop

Wraps the lightbox navigation around at both ends.

```vue
<template>
    <Gallery :images :useLightboxLoop="false" />
</template>
```

- **Type:** `boolean`
- **Default:** `true`

### showLightboxCaption

Shows the image caption inside the lightbox.

```vue
<template>
    <Gallery :images :showLightboxCaption="false" />
</template>
```

- **Type:** `boolean`
- **Default:** `true`

### useNuxtImg

Renders every image with `NuxtImg` from `@nuxt/image`. It requires the `@nuxt/image` module in your app.

```vue
<template>
    <Gallery :images useNuxtImg sizes="100vw md:50vw lg:33vw" />
</template>
```

- **Type:** `boolean`
- **Default:** `false`

### sizes

Sets the `sizes` attribute passed to `NuxtImg`. It only applies with [useNuxtImg](#usenuxtimg).

```vue
<template>
    <Gallery :images useNuxtImg sizes="100vw md:50vw" />
</template>
```

- **Type:** `string`

### densities

Sets the `densities` attribute passed to `NuxtImg`. It only applies with [useNuxtImg](#usenuxtimg).

```vue
<template>
    <Gallery :images useNuxtImg densities="x1 x2" />
</template>
```

- **Type:** `string`

### loading

Sets how the browser loads every image via the `ImageLoading` enum. Images are lazy by default. Use `EAGER` when the gallery is above the fold.

```vue
<template>
    <Gallery :images :loading="ImageLoading.EAGER" />
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

Adds custom classes to the root element.

```vue
<template>
    <Gallery :images containerClass="max-w-4xl mx-auto" />
</template>
```

- **Type:** `string`

### imageClass

Adds custom classes to every `img` element.

```vue
<template>
    <Gallery :images imageClass="object-top" />
</template>
```

- **Type:** `string`

### captionClass

Adds custom classes to every caption.

```vue
<template>
    <Gallery :images captionClass="text-center" />
</template>
```

- **Type:** `string`

### paginationClass

Adds custom classes to the element that wraps the pagination or the load more button.

```vue
<template>
    <Gallery
        :images
        :paginationMode="GalleryPaginationMode.BUTTONS"
        paginationClass="mt-10"
    />
</template>
```

- **Type:** `string`

## Accessibility

Each image is a native `button` when the lightbox is on, so the gallery works with Tab, Enter and Space. Alt text comes from each `GalleryImage`. The pagination components are native navigation with labelled buttons. With `INFINITE`, the sentinel that triggers loading is hidden from assistive technology, so prefer `LOAD_MORE` when keyboard and screen reader users need to control when more images appear. Inside the lightbox you can use the arrow keys to navigate and Escape to close it. See the [Lightbox](/docs/components/lightbox) accessibility notes.

## Emits

::options-table
---
options: [
    { value: "@click", description: "Emits the clicked `GalleryImage` and its index in the full list when an image is clicked with `useLightbox` on." },
    { value: "@update:page", description: "Emits the new page number when the page changes, from the pagination, the load more button or infinite scroll." },
]
---
::

#### Example

```vue
<template>
    <Gallery :images @click="handleClick" />
</template>
<script setup lang="ts">
const handleClick = (image: GalleryImage, index: number) => {
    console.log('Clicked', image.id, index)
}
</script>
```
