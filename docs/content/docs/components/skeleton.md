::component-code
---
srcDir: 'skelettons/Skeletton.vue'
props: 
    class: "w-64 h-64"
previewBackground: 'white'
propsSettingsExcludedProps: ['class']
isPlaygroundEnabled: false
---
::

## Usage
Use the `<Skeletton>` component to show a loading placeholder while content is being fetched or rendered.
It’s useful for improving perceived performance during API calls, route transitions, or dynamic content rendering.

```vue
<template>
    <Skeletton />
</template>
```

### Class overrides
You can customize the size, shape, and appearance of the skeleton loader using Tailwind utility classes.

```vue
<template>
    <Skeletton class="w-32 h-6 rounded-md bg-neutral-200" />
</template>
```