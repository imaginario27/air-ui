::component-code
---
srcDir: 'spinners/Spinner.vue'
props: 
    class: "w-32 h-32 border-8"
previewBackground: 'white'
propsSettingsExcludedProps: ['class']
isPlaygroundEnabled: false
---
::

## Usage

Use the `<Spinner>` component to show a loading placeholder while content is being fetched or rendered.  
It’s useful for improving perceived performance during API calls, route transitions, or dynamic content rendering.

```vue
<template>
    <Spinner />
</template>
