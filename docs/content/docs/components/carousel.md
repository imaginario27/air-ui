## Component

::component-code
---
srcDir: 'sliders/Carousel.vue'
props:
    modelValue: 0
    items: ["Slide 1", "Slide 2", "Slide 3", "Slide 4"]
    slidesPerView: 1
    gap: "1rem"
    hasArrows: true
    hasDots: true
    isLoop: false
    autoplay: false
    autoplayInterval: 4000
    transition: "slide"
    easing: "smooth"
    speed: 500
    pauseOnHover: true
    previousAriaLabel: "Previous slide"
    nextAriaLabel: "Next slide"
    dotAriaLabel: "Go to slide"
    ariaLabel: "Featured content"
items:
    transition:
        - value: slide
          text: SLIDE
        - value: fade
          text: FADE
        - value: zoom
          text: ZOOM
        - value: none
          text: NONE
    easing:
        - value: smooth
          text: SMOOTH
        - value: ease
          text: EASE
        - value: ease-in
          text: EASE_IN
        - value: ease-out
          text: EASE_OUT
        - value: ease-in-out
          text: EASE_IN_OUT
        - value: linear
          text: LINEAR
        - value: bounce
          text: BOUNCE
enums:
    transition: "CarouselTransition"
    easing: "Easing"
slots:
  default: ""
slotComponents:
  default:
    srcDir: 'placeholders/ContentPlaceholder.vue'
    slotProps:
      item: "text"
    props:
      style: "height: 200px"
propsSettingsExcludedProps: ["items"]
---
::

## Props

::props-table
---
props: [
    {
        "name": "modelValue",
        "default": "0",
        "type": "number"
    },
    {
        "name": "items",
        "default": "[]",
        "type": "unknown[]"
    },
    {
        "name": "slidesPerView",
        "default": "1",
        "type": "number"
    },
    {
        "name": "gap",
        "default": "'1rem'",
        "type": "string"
    },
    {
        "name": "hasArrows",
        "default": "true",
        "type": "boolean"
    },
    {
        "name": "hasDots",
        "default": "true",
        "type": "boolean"
    },
    {
        "name": "isLoop",
        "default": "false",
        "type": "boolean"
    },
    {
        "name": "autoplay",
        "default": "false",
        "type": "boolean"
    },
    {
        "name": "autoplayInterval",
        "default": "4000",
        "type": "number"
    },
    {
        "name": "transition",
        "default": "CarouselTransition.SLIDE",
        "type": "CarouselTransition"
    },
    {
        "name": "easing",
        "default": "Easing.SMOOTH",
        "type": "Easing"
    },
    {
        "name": "speed",
        "default": "500",
        "type": "number"
    },
    {
        "name": "pauseOnHover",
        "default": "true",
        "type": "boolean"
    },
    {
        "name": "previousAriaLabel",
        "type": "string"
    },
    {
        "name": "nextAriaLabel",
        "type": "string"
    },
    {
        "name": "dotAriaLabel",
        "type": "string"
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
    {
        "name": "default",
        "description": "Renders each slide. Receives `item` (the entry of `items`) and `index`."
    },
]
---
::

```vue
<template>
    <Carousel :items="slides">
        <template #default="{ item, index }">
            <ContentPlaceholder :text="`${index + 1}. ${item.title}`" />
        </template>
    </Carousel>
</template>

<script setup lang="ts">
const slides = [{ title: 'First' }, { title: 'Second' }, { title: 'Third' }]
</script>
```

## Usage

### modelValue

Sets the active page. You can bind it with `v-model` to control the carousel from outside.

```vue
<template>
    <Carousel v-model="page" :items="slides" />
</template>

<script setup lang="ts">
const page = ref(0)
</script>
```

- **Type:** `number`
- **Default:** `0`

### items

Defines the slides to render. Each entry is passed to the default slot.

```vue
<template>
    <Carousel :items="slides" />
</template>

<script setup lang="ts">
const slides = ['Slide 1', 'Slide 2', 'Slide 3']
</script>
```

- **Type:** `unknown[]`
- **Default:** `[]`

### slidesPerView

Sets how many slides are visible at once. The number of pages is `items.length - slidesPerView + 1`.

```vue
<template>
    <Carousel :items="slides" :slidesPerView="3" />
</template>
```

- **Type:** `number`
- **Default:** `1`

### gap

Sets the space between slides. Accepts any CSS length.

```vue
<template>
    <Carousel :items="slides" gap="2rem" />
</template>
```

- **Type:** `string`
- **Default:** `'1rem'`

### hasArrows

Shows or hides the previous and next buttons.

```vue
<template>
    <Carousel :items="slides" :hasArrows="false" />
</template>
```

- **Type:** `boolean`
- **Default:** `true`

### hasDots

Shows or hides the page indicators.

```vue
<template>
    <Carousel :items="slides" :hasDots="false" />
</template>
```

- **Type:** `boolean`
- **Default:** `true`

### isLoop

Wraps around from the last page to the first one and vice versa.

```vue
<template>
    <Carousel :items="slides" :isLoop="true" />
</template>
```

- **Type:** `boolean`
- **Default:** `false`

### autoplay

Advances automatically every [autoplayInterval](#autoplayinterval) milliseconds. Without [isLoop](#isloop), autoplay stops at the last page.

```vue
<template>
    <Carousel :items="slides" :autoplay="true" :isLoop="true" />
</template>
```

- **Type:** `boolean`
- **Default:** `false`

### autoplayInterval

Sets the time in milliseconds between automatic slide changes.

```vue
<template>
    <Carousel :items="slides" :autoplay="true" :autoplayInterval="6000" />
</template>
```

- **Type:** `number`
- **Default:** `4000`

### transition

Sets the animation between slides via the `CarouselTransition` enum. `FADE` and `ZOOM` show one slide at a time, so [slidesPerView](#slidesperview) is ignored.

```vue
<template>
    <Carousel :items="slides" :transition="CarouselTransition.FADE" />
</template>
```

- **Type:** `CarouselTransition`
- **Default:** `CarouselTransition.SLIDE`

#### Options

::options-table
---
options: [
    { value: "SLIDE", description: "slide" },
    { value: "FADE", description: "fade" },
    { value: "ZOOM", description: "zoom" },
    { value: "NONE", description: "none" },
]
---
::

### easing

Sets the timing curve of the transition via the shared `Easing` enum, which the [Lightbox](/docs/components/lightbox#easing) also uses.

```vue
<template>
    <Carousel :items="slides" :easing="Easing.BOUNCE" />
</template>
```

- **Type:** `Easing`
- **Default:** `Easing.SMOOTH`

#### Options

::options-table
---
options: [
    { value: "SMOOTH", description: "Fast start with a long, gentle finish" },
    { value: "EASE", description: "CSS `ease`" },
    { value: "EASE_IN", description: "CSS `ease-in`" },
    { value: "EASE_OUT", description: "CSS `ease-out`" },
    { value: "EASE_IN_OUT", description: "CSS `ease-in-out`" },
    { value: "LINEAR", description: "Constant speed" },
    { value: "BOUNCE", description: "Slightly overshoots the target before settling" },
]
---
::

### speed

Sets the duration in milliseconds of the slide transition.

```vue
<template>
    <Carousel :items="slides" :speed="800" />
</template>
```

- **Type:** `number`
- **Default:** `500`

### pauseOnHover

Pauses autoplay while the pointer is over the carousel or it has focus.

```vue
<template>
    <Carousel :items="slides" :autoplay="true" :pauseOnHover="false" />
</template>
```

- **Type:** `boolean`
- **Default:** `true`

### previousAriaLabel

Sets the `aria-label` of the previous button. Falls back to `useDSConfig().slides.previousText()`.

```vue
<template>
    <Carousel :items="slides" previousAriaLabel="Diapositiva anterior" />
</template>
```

- **Type:** `string`

### nextAriaLabel

Sets the `aria-label` of the next button. Falls back to `useDSConfig().slides.nextText()`.

```vue
<template>
    <Carousel :items="slides" nextAriaLabel="Diapositiva siguiente" />
</template>
```

- **Type:** `string`

### dotAriaLabel

Sets the prefix of each indicator's `aria-label`. The page number is appended. Falls back to `useDSConfig().slides.goToSlideText()`.

```vue
<template>
    <Carousel :items="slides" dotAriaLabel="Ir a la diapositiva" />
</template>
```

- **Type:** `string`

### ariaLabel

Sets the accessible name of the carousel region.

```vue
<template>
    <Carousel :items="slides" ariaLabel="Featured content" />
</template>
```

- **Type:** `string`

## Accessibility

The carousel is a `<section>` with `aria-roledescription="carousel"`, and each slide is a list item with `aria-roledescription="slide"`. Slides outside the viewport are hidden from assistive technology. Always set [ariaLabel](#arialabel) so the region has a name. The carousel itself is not a tab stop: keyboard users reach it through the arrow buttons and dots, and the arrow keys work while focus is inside it.

::options-table
---
options: [
    { value: "ArrowRight", description: "Goes to the next page." },
    { value: "ArrowLeft", description: "Goes to the previous page." },
]
---
::

Swiping on touch screens and dragging with a pointer also change the page. Transitions are disabled when the user prefers reduced motion.

## Emits

::options-table
---
options: [
    { value: "@update:modelValue", description: "Emitted with the new page index when the active page changes." },
    { value: "@change", description: "Emitted with the new page index when the active page changes." },
]
---
::

#### Example

```vue
<template>
    <Carousel :items="slides" @change="handleChange" />
</template>

<script setup lang="ts">
const handleChange = (page: number) => {
    console.log('Page', page)
}
</script>
```

## Methods

::options-table
---
options: [
    { value: "next()", description: "Goes to the next page, wrapping around when `isLoop` is enabled." },
    { value: "prev()", description: "Goes to the previous page, wrapping around when `isLoop` is enabled." },
    { value: "goTo(index)", description: "Goes to the given page index, clamped to the valid range." },
]
---
::

```vue
<template>
    <Carousel ref="carousel" :items="slides" />
    <ActionButton text="Next" @click="carousel?.next()" />
</template>

<script setup lang="ts">
const carousel = ref()
</script>
```
