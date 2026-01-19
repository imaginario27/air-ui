## Component

::component-code
---
srcDir: 'loaders/LoadingScreen.vue'
props: 
    isLoading: true
    loadingText: 'Loading'
    error: null
    title: 'Oops! Something went wrong!'
    helpText: 'Please try again or report the error to us. Thank you!'
    hasGoBackButton: true
    goBackText: 'Go back'
    goBackLink: '/'
    goBackIcon: 'mdi:keyboard-backspace'
    hasRetryButton: false
    retryText: 'Try again'
    retryLimitReachedText: 'Retry limit reached. Please refresh the page or contact support.'
    cooldownText: 'Retry in'
    maxRetryCycles: 2
    maxRetries: 3
    cooldownSeconds: 60
    isFullScreen: false
    spinnerSize: 'lg'
    iconContainerSize: 'xxl'
    buttonSize: 'lg'
    isSpaced: true
    titleClass: 'font-semibold text-xl md:text-2xl text-center leading-6'
    errorTextClass: 'text-text-neutral-subtle font-semibold text-center'
    helpTextClass: 'text-center'
    containerClass: 'py-20'
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
    iconContainerSize: 
        - value: 3xl
          text: XXXL
        - value: 2xl
          text: XXL
        - value: xl
          text: XL
        - value: lg
          text: LG
    buttonSize: 
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
        "name": "loadingText",
        "default": "'Loading'",
        "type": "string",
    },
    {
        "name": "error",
        "default": "null",
        "type": "string | null",
    },
    {
        "name": "title",
        "default": "'Oops! Something went wrong!'",
        "type": "string",
    },
    {
        "name": "helpText",
        "default": "'Please try again or report the error to us. Thank you!'",
        "type": "string",
    },
    {
        "name": "hasGoBackButton",
        "default": "true",
        "type": "boolean",
    },
    {
        "name": "goBackText",
        "default": "'Go back'",
        "type": "string",
    },
    {
        "name": "goBackLink",
        "default": "'/'",
        "type": "string",
    },
    {
        "name": "goBackIcon",
        "default": "'mdi:keyboard-backspace'",
        "type": "string",
    },
    {
        "name": "hasRetryButton",
        "default": "false",
        "type": "boolean",
    },
    {
        "name": "retryText",
        "default": "'Try again'",
        "type": "string",
    },
    {
        "name": "retryLimitReachedText",
        "default": "'Retry limit reached. Please refresh the page or contact support.'",
        "type": "string",
    },
    {
        "name": "cooldownText",
        "default": "'Retry in'",
        "type": "string",
    },
    {
        "name": "maxRetryCycles",
        "default": "2",
        "type": "number",
    },
    {
        "name": "maxRetries",
        "default": "3",
        "type": "number",
    },
    {
        "name": "cooldownSeconds",
        "default": "60",
        "type": "number",
    },
    {
        "name": "isFullScreen",
        "default": "true",
        "type": "boolean",
    },
    {
        "name": "spinnerSize",
        "type": "LoadingSpinnerSize",
    },
    {
        "name": "iconContainerSize",
        "default": "IconContainerSize.XXL",
        "type": "IconContainerSize",
    },
    {
        "name": "buttonSize",
        "type": "ButtonSize",
    },
    {
        "name": "isSpaced",
        "default": "true",
        "type": "boolean",
    },
    {
        "name": "titleClass",
        "default": "'font-semibold text-xl md:text-2xl text-center leading-6'",
        "type": "string",
    },
    {
        "name": "errorTextClass",
        "default": "'text-text-neutral-subtle font-semibold text-center'",
        "type": "string",
    },
    {
        "name": "helpTextClass",
        "default": "'text-center'",
        "type": "string",
    },
    {
        "name": "containerClass",
        "default": "'py-20'",
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
    <LoadingScreen :isLoading="true" />
</template>
```

- **Type:** `boolean`
- **Default:** `true`

### loadingText
Sets the text to be displayed in the loading state. Do not add ellpisis (`...`) or any other characters since it is already included in the component. 

```vue
<template>
    <LoadingScreen text="Loading" />
</template>
``` 

- **Type:** `string`
- **Default:** `'Loading'`

### error
Sets the error message to be displayed in the error state. 

**Important:** Until the loading state is not set to `false`, the error will not appearing even if it exists.

```vue
<template>
    <LoadingScreen 
        :isLoading="false"
        error="Something went wrong!" 
    />
</template>
```

- **Type:** `string | null`
- **Default:** `null`

### title
Sets the title to be displayed in the error state. 

```vue
<template>
    <LoadingScreen 
        :isLoading="false"
        error="Reported error message"
        title="Oops! Something went wrong!" 
    />
</template>
```

- **Type:** `string`
- **Default:** `'Oops! Something went wrong!'`

### helpText
Sets the help text to be displayed in the error state. 

```vue
<template>
    <LoadingScreen 
        :isLoading="false"
        error="Reported error message"
        helpText="Please try again or report the error to us. Thank you!" 
    />
</template>
```

- **Type:** `string`
- **Default:** `'Please try again or report the error to us. Thank you!'`

### hasGoBackButton
Shows or hides the go back button in the error state. 

```vue
<template>
    <LoadingScreen 
        :isLoading="false"
        error="Reported error message"
        :hasGoBackButton="false"
    />
</template>
```

- **Type:** `boolean`
- **Default:** `true`

### goBackText
Sets the text to be displayed in the error state go back button. 

```vue
<template>
    <LoadingScreen 
        :isLoading="false"
        error="Reported error message"
        goBackText="Go back" 
    />
</template>
```

- **Type:** `string`
- **Default:** `'Go back'`

### goBackLink
Sets the link for the go back button in the error state. 

```vue
<template>
    <LoadingScreen 
        :isLoading="false"
        error="Reported error message"
        goBackLink="/" 
    />
</template>
```

- **Type:** `string`
- **Default:** `'/'`

### goBackIcon
Sets the icon for the go back button in the error state. 

```vue
<template>
    <LoadingScreen 
        :isLoading="false"
        error="Reported error message"
        goBackIcon="mdi:keyboard-backspace" 
    />
</template>
```

- **Type:** `string`
- **Default:** `'mdi:keyboard-backspace'`

### hasRetryButton
Shows or hides the retry button in the error state. 

```vue
<template>
    <LoadingScreen 
        :isLoading="false"
        error="Reported error message"
        hasRetryButton
    />
</template>
```

- **Type:** `boolean`
- **Default:** `false`

### retryText
Sets the text to be displayed in the error state retry button. 

```vue
<template>
    <LoadingScreen 
        :isLoading="false"
        error="Reported error message"
        retryText="Try again" 
    />
</template>
```

- **Type:** `string`
- **Default:** `'Try again'`

### retryLimitReachedText
Sets the text to be displayed in the error state when the retry limit is reached. 

```vue
<template>
    <LoadingScreen 
        :isLoading="false"
        error="Reported error message"
        retryLimitReachedText="Retry limit reached. Please refresh the page or contact support." 
    />
</template>
```

- **Type:** `string`
- **Default:** `'Retry limit reached. Please refresh the page or contact support.'`

### cooldownText
Sets the text to be displayed in the error state when the retry limit is reached. 

```vue
<template>
    <LoadingScreen 
        :isLoading="false"
        error="Reported error message"
        cooldownText="Retry in" 
    />
</template>
```

- **Type:** `string`
- **Default:** `'Retry in'`

### maxRetryCycles
Sets the maximum number of retry cycles. 

```vue
<template>
    <LoadingScreen 
        :isLoading="false"
        error="Reported error message"
        :maxRetryCycles="2" 
    />
</template>
```

- **Type:** `number`
- **Default:** `2`

### maxRetries
Sets the maximum number of retries. 

```vue
<template>
    <LoadingScreen 
        :isLoading="false"
        error="Reported error message"
        :maxRetries="3" 
    />
</template>
```

- **Type:** `number`
- **Default:** `3`

### cooldownSeconds
Sets the cooldown time in seconds. 

```vue
<template>
    <LoadingScreen 
        :isLoading="false"
        error="Reported error message"
        :cooldownSeconds="60" 
    />
</template>
```

- **Type:** `number`
- **Default:** `60`

### isFullScreen
Sets the full screen state to `true` or `false`. It works exactly the same way for loading or error state.

If it is not full screen, the container height will be smaller and can be adjusted with the `containerClass` prop.

```vue
<template>
    <LoadingScreen 
        isLoading
        :isFullScreen="false" 
    />
</template>
```

- **Type:** `boolean`
- **Default:** `true`

### spinnerSize
Sets the size of the loading spinner. It uses the `LoadingSpinner` enum.

```vue
<template>
    <LoadingScreen 
        isLoading
        :spinnerSize="LoadingSpinner.LG" 
    />
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

### iconContainerSize
Sets the size of the icon container. It uses the `IconContainerSize` enum.

```vue
<template>
    <LoadingScreen 
        isLoading
        :iconContainerSize="IconContainerSize.XXL" 
    />
</template>
```

#### Options
::options-table
---
options: [
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

### buttonSize
Sets the size of the retry and go back buttons in the error state. It uses the `ButtonSize` enum.

```vue
<template>
    <LoadingScreen 
        isLoading
        :buttonSize="ButtonSize.LG" 
    />
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
]
---
::

### isSpaced
Sets a bigger space between elements in the error state.

```vue
<template>
    <LoadingScreen 
        :isLoading="false"
        error="Reported error message"
        isSpaced
    />
</template>
```

- **Type:** `boolean`
- **Default:** `true`

### titleClass
Sets the title class of the error state.

```vue
<template>
    <LoadingScreen 
        isLoading
        titleClass="font-semibold text-xl md:text-2xl text-center leading-6" 
    />
</template>
```

- **Type:** `string`
- **Default:** `'font-semibold text-xl md:text-2xl text-center leading-6'`

### errorTextClass
Sets the error text class of the error state.

```vue
<template>
    <LoadingScreen 
        isLoading
        errorTextClass="text-center text-sm md:text-base" 
    />
</template>
```

- **Type:** `string`
- **Default:** `'text-center text-sm md:text-base'`

### helpTextClass
Sets the help text class of the error state.

```vue
<template>
    <LoadingScreen 
        isLoading
        helpTextClass="text-center text-sm md:text-base" 
    />
</template>
```

- **Type:** `string`
- **Default:** `'text-center'`


### containerClass
Sets the container class of the screen.

```vue
<template>
    <LoadingScreen 
        isLoading
        containerClass="h-[300px]" 
    />
</template>
```

- **Type:** `string`
- **Default:** `'py-20'`