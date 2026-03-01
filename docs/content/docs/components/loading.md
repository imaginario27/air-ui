## Component

::component-code
---
srcDir: 'loaders/Loading.vue'
props: 
    isLoading: true
    text: 'Loading'
    spinnerSize: 'lg'
    spinnerClass: ''
items:
    spinnerSize: 
        - value: 3xl
          text: XXXL
        - value: 2xl
          text: XXL
        - value: xl
          text: XL
        - value: lg
          text: LG
        - value: md
          text: MD
        - value: sm
          text: SM
        - value: xs
          text: XS
enums:
    spinnerSize: "LoadingSpinnerSize"
previewBackground: 'white'
---
::

## Props

::props-table
---
props: [
    {
        "name": "isLoading",
        "default": "true",
        "type": "boolean",
    },
    {
        "name": "text",
        "default": "'Loading'",
        "type": "string",
    },
    {
        "name": "spinnerSize",
        "default": "LoadingSpinnerSize.LG",
        "type": "LoadingSpinnerSize",
    },
    {
        "name": "spinnerClass",
        "type": "string",
    },
]
---
::

## Usage
### isLoading
Sets the loading state to `true` or `false`.

```vue
<template>
    <Loading :isLoading="true" />
</template>
```

- **Type:** `boolean`
- **Default:** `true`

### text
Sets the text to be displayed in the loading state. Do not add ellpisis (`...`) or any other characters since it is already included in the component. 

In the event of using only the spinner, do not use this component, use the `Spinner` component instead.

```vue
<template>
    <Loading text="Loading" />
</template>
``` 

- **Type:** `string`
- **Default:** `'Loading'`

### spinnerSize

Controls sizing via `LoadingSpinnerSize` enum.

```vue
<template>
    <Loading :spinnerSize="LoadingSpinnerSize.XL" />
</template>
```

#### Options
::options-table
---
options: [
    {
        value: "XS",
        description: "xs",
    },
    {
        value: "SM",
        description: "sm",
    },
    {
        value: "MD",
        description: "md",
    },
    {
        value: "LG",
        description: "lg",
    },
    {
        value: "XL",
        description: "xl",
    },
    {
        value: "XXL",
        description: "2xl",
    },
    {
        value: "XXXL",
        description: "3xl",
    },
]
---
::

### spinnerClass
Sets the class to be applied to the spinner. 

```vue
<template>
    <Loading spinnerClass="w-[32px] h-[32px]" />
</template>
```

- **Type:** `string`