## Component

::component-code
---
srcDir: 'content/demos/lightbox/LightboxDemo.vue'
previewBackground: "white"
isCodePreviewEnabled: false
componentSource: 'docs'
---
::

```vue
<template>
    <Lightbox
        v-model="showLightbox"
        :images
    />
    <ActionButton
        text="Open lightbox"
        @click="showLightbox = true"
    />
</template>
<script setup lang="ts">
const showLightbox = ref(false)

const images: GalleryImage[] = [
    { id: '1', src: '/images/river.jpg', alt: 'River between mountains', caption: 'River valley' },
    { id: '2', src: '/images/mountains.jpg', alt: 'Green mountain range', caption: 'Mountain range' },
]
</script>
```

## Props

::props-table
---
props: [
    {
        "name": "modelValue",
        "default": "false",
        "type": "boolean",
    },
    {
        "name": "images",
        "required": "true",
        "type": "GalleryImage[]",
    },
    {
        "name": "initialIndex",
        "default": "0",
        "type": "number",
    },
    {
        "name": "loop",
        "default": "true",
        "type": "boolean",
    },
    {
        "name": "showCaption",
        "default": "true",
        "type": "boolean",
    },
    {
        "name": "closeOnClickOutside",
        "default": "true",
        "type": "boolean",
    },
    {
        "name": "lightboxClass",
        "type": "string",
    },
    {
        "name": "ariaLabel",
        "type": "string",
    },
    {
        "name": "prevLabel",
        "type": "string",
    },
    {
        "name": "nextLabel",
        "type": "string",
    },
    {
        "name": "closeLabel",
        "type": "string",
    },
    {
        "name": "fullscreenLabel",
        "type": "string",
    },
]
---
::

## Usage

### modelValue

Controls whether the lightbox is open. Bind it with `v-model`.

```vue
<template>
    <Lightbox v-model="showLightbox" :images />
</template>
```

- **Type:** `boolean`
- **Default:** `false`

### images

Sets the images to display. The lightbox shows the position counter and the navigation buttons when there is more than one.

```vue
<template>
    <Lightbox v-model="showLightbox" :images="images" />
</template>
<script setup lang="ts">
const images: GalleryImage[] = [
    { id: '1', src: '/images/river.jpg', alt: 'River between mountains' },
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

### initialIndex

Sets the image shown when the lightbox opens. It resets to this index every time the lightbox reopens.

```vue
<template>
    <Lightbox v-model="showLightbox" :images :initialIndex="2" />
</template>
```

- **Type:** `number`
- **Default:** `0`

### loop

Wraps around from the last image to the first, and the other way round. Set it to `false` to stop at both ends.

```vue
<template>
    <Lightbox v-model="showLightbox" :images :loop="false" />
</template>
```

- **Type:** `boolean`
- **Default:** `true`

### showCaption

Shows the caption of the current image below it.

```vue
<template>
    <Lightbox v-model="showLightbox" :images :showCaption="false" />
</template>
```

- **Type:** `boolean`
- **Default:** `true`

### closeOnClickOutside

Closes the lightbox when you click the backdrop around the image.

```vue
<template>
    <Lightbox v-model="showLightbox" :images :closeOnClickOutside="false" />
</template>
```

- **Type:** `boolean`
- **Default:** `true`

### lightboxClass

Adds custom classes to the dialog element.

```vue
<template>
    <Lightbox v-model="showLightbox" :images lightboxClass="backdrop-blur-sm" />
</template>
```

- **Type:** `string`

### ariaLabel

Sets the accessible name of the dialog. Falls back to `useDSConfig().lightbox.dialogText()`.

```vue
<template>
    <Lightbox v-model="showLightbox" :images ariaLabel="Product gallery" />
</template>
```

- **Type:** `string`

### prevLabel

Sets the accessible name of the previous button. Falls back to `useDSConfig().lightbox.previousText()`.

```vue
<template>
    <Lightbox v-model="showLightbox" :images prevLabel="Previous photo" />
</template>
```

- **Type:** `string`

### nextLabel

Sets the accessible name of the next button. Falls back to `useDSConfig().lightbox.nextText()`.

```vue
<template>
    <Lightbox v-model="showLightbox" :images nextLabel="Next photo" />
</template>
```

- **Type:** `string`

### closeLabel

Sets the accessible name of the close button. Falls back to `useDSConfig().actions.closeText()`.

```vue
<template>
    <Lightbox v-model="showLightbox" :images closeLabel="Close gallery" />
</template>
```

- **Type:** `string`

### fullscreenLabel

Sets the accessible name of the fullscreen button. Falls back to `useDSConfig().lightbox.fullscreenText()`.

```vue
<template>
    <Lightbox v-model="showLightbox" :images fullscreenLabel="Enter fullscreen" />
</template>
```

- **Type:** `string`

## Accessibility

The lightbox renders a `dialog` with `aria-modal`, moves focus into it when it opens and returns focus to the previous element when it closes. The page scroll is locked while it is open. Image alt text is cleaned with `cleanImageAlt`, so screen readers do not announce "image" twice. All button labels come from `useDSConfig` and can be translated globally or per instance with the label props.

::options-table
---
options: [
    { value: "Escape", description: "Closes the lightbox." },
    { value: "ArrowLeft", description: "Shows the previous image." },
    { value: "ArrowRight", description: "Shows the next image." },
]
---
::

On touch devices you can swipe left or right to change image.

## Emits

::options-table
---
options: [
    { value: "@update:modelValue", description: "Emits `false` when the lightbox asks to close." },
    { value: "@update:index", description: "Emits the new image index after navigating." },
    { value: "@close", description: "Emits when the lightbox is closed by the user." },
]
---
::

#### Example

```vue
<template>
    <Lightbox
        v-model="showLightbox"
        :images
        @update:index="handleIndex"
        @close="handleClose"
    />
</template>
<script setup lang="ts">
const handleIndex = (index: number) => {
    console.log('Showing image', index)
}

const handleClose = () => {
    console.log('Lightbox closed')
}
</script>
```
