## Component

::component-code
---
srcDir: 'buttons/CopyButton.vue'
props: 
    textToCopy: "Sample text to copy"
    copySuccessText: "Copied to clipboard!"
    copyErrorText: "Failed to copy to clipboard."
    showToast: false
    resetAfter: 1500
    buttonType: "action-icon-button"
    styleType: "neutral-outlined"
    text: "Copy"
    size: "sm"
    icon: "mdi:content-copy"
    iconPosition: "right"
    disabled: false
items:
    styleType:
        - value: primary-brand-filled
          text: PRIMARY_BRAND_FILLED
        - value: primary-brand-transparent
          text: PRIMARY_BRAND_TRANSPARENT
        - value: primary-brand-soft
          text: PRIMARY_BRAND_SOFT
        - value: secondary-brand-filled
          text: SECONDARY_BRAND_FILLED
        - value: neutral-outlined
          text: NEUTRAL_OUTLINED
        - value: neutral-transparent
          text: NEUTRAL_TRANSPARENT
        - value: neutral-transparent-subtle
          text: NEUTRAL_TRANSPARENT_SUBTLE
        - value: neutral-filled
          text: NEUTRAL_FILLED
    buttonType: 
        - value: action-icon-button
          text: ACTION_ICON_BUTTON
        - value: action-button
          text: ACTION_BUTTON
    size: 
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
    iconPosition: 
        - value: none
          text: NONE
        - value: left
          text: LEFT
        - value: right
          text: RIGHT
---
::

## Props

::props-table
---
props: [
    {
        "name": "textToCopy",
        "default": "Sample text to copy",
        "type": "string",
        "required": "true",
    }, 
    {
        "name": "copySuccessText",
        "default": "Copied to clipboard!",
        "type": "string",
    }, 
    {
        "name": "copyErrorText",
        "default": "Failed to copy to clipboard.",
        "type": "string",
    }, 
    {
        "name": "showToast",
        "default": "true",
        "type": "boolean",
    }, 
    {
        "name": "resetAfter",
        "default": "1500",
        "type": "number",
    }, 
    {
        "name": "buttonType",
        "default": "ButtonType.ACTION_ICON_BUTTON",
        "type": "ButtonType",
        "description": "<b>Allowed types:</b> All except DELETE styles.",
    }, 
    {
        "name": "styleType",
        "default": "ButtonStyleType.NEUTRAL_OUTLINED",
        "type": "ButtonStyleType",
    }, 
    {
        "name": "text",
        "default": "Copy",
        "type": "string",
    }, 
    {
        "name": "size",
        "default": "ButtonSize.LG",
        "type": "ButtonSize",
    }, 
    {
        "name": "icon",
        "default": "mdi:content-copy",
        "type": "string",
    }, 
    {
        "name": "iconPosition",
        "default": "IconPosition.RIGHT",
        "type": "IconPosition",
    }, 
    {
        "name": "disabled",
        "default": "false",
        "type": "boolean",
    },   
]
---
::

## Usage
### textToCopy

The `textToCopy` prop defines the text that will be copied to the clipboard when the button is clicked.

```vue
<template>
    <CopyButton textToCopy="This is the text to be copied!" />
</template>
```

- **Type:** `string`
- **Required:** `true`

### copySuccessText

The `copySuccessText` prop defines the message displayed when the text is successfully copied to the clipboard.

It only works when `showToast` is set to `true` or when using the `ButtonType.ACTION_BUTTON` button type.

```vue
<template>
    <CopyButton copySuccessText="Text copied successfully!" />
</template>
```

- **Type:** `string`
- **Default:** `'Copied to clipboard!'`

### copyErrorText

The `copyErrorText` prop defines the message displayed when there is an error copying the text to the clipboard.

It only works when `showToast` is set to `true` or when using the `ButtonType.ACTION_BUTTON` button type.

```vue
<template>
    <CopyButton copyErrorText="Unable to copy text." />
</template>
```

- **Type:** `string`
- **Default:** `'Failed to copy to clipboard.'`

### showToast

The `showToast` prop determines whether a toast notification is displayed when the text is copied successfully or if there is an error.

```vue
<template>
    <CopyButton showToast />
</template>
```

- **Type:** `boolean`
- **Default:** `true`

### resetAfter

The `resetAfter` prop defines the time in milliseconds after which the button resets to its original state after a copy action.

```vue

<template>
    <CopyButton :resetAfter="2000" />
</template>
```

- **Type:** `number`
- **Default:** `1500`

### buttonType

The `buttonType` prop defines the type of the copy button using the `ButtonType` enum.

```vue
<template>
    <CopyButton :buttonType="ButtonType.ACTION_BUTTON" />
</template>
```

- **Type:** `ButtonType`
- **Default:** `ButtonType.ACTION_ICON_BUTTON`

#### Options
::options-table
---
options: [
    {
        value: "ACTION_ICON_BUTTON",
        description: "A square button with an icon for copy action.",
    },
    {
        value: "ACTION_BUTTON",
        description: "A standard action button with text and optional icon.",
    },
]
---
::

### styleType

The `styleType` prop controls the visual style of the button using the `ButtonStyleType` enum. 

**Important:** The `DELETE` styles are not available for this component.

```vue
<template>
    <CopyButton :styleType="ButtonStyleType.PRIMARY_BRAND_FILLED" />
</template>
```

- **Type:** `ButtonStyleType`
- **Default:** `ButtonStyleType.NEUTRAL_OUTLINED`

#### Options
::options-table
---
options: [
    {
        value: "PRIMARY_BRAND_FILLED",
        description: "Primary brand filled",
    },
    {
        value: "PRIMARY_BRAND_TRANSPARENT",
        description: "Primary brand transparent",
    },
    {
        value: "PRIMARY_BRAND_SOFT",
        description: "Primary brand soft",
    },
    {
        value: "SECONDARY_BRAND_FILLED",
        description: "Secondary brand filled",
    },
    {
        value: "NEUTRAL_OUTLINED",
        description: "Neutral outlined",
    },
    {
        value: "NEUTRAL_TRANSPARENT",
        description: "Neutral transparent",
    },
    {
        value: "NEUTRAL_TRANSPARENT_SUBTLE",
        description: "Neutral transparent subtle",
    },
    {
        value: "NEUTRAL_FILLED",
        description: "Neutral filled",
    },
]
---
::

### text

The `text` prop defines the label displayed on the copy button.

```vue
<template>
    <CopyButton text="Copy Text" />
</template>
```

- **Type:** `string`
- **Default:** `'Copy'`

### size

The `size` prop controls the size of the button using the `ButtonSize` enum.

```vue
<template>
    <CopyButton :size="ButtonSize.SM" />
</template>
```

- **Type:** `ButtonSize`
- **Default:** `ButtonSize.SM`

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

### icon

The `icon` prop specifies the Material Design Icon to be displayed on the button.

```vue
<template>
    <CopyButton icon="mdi:content-copy" />
</template>
```

- **Type:** `string`
- **Default:** `'mdi:content-copy'`

### iconPosition

The `iconPosition` prop determines the position of the icon relative to the button text using the `IconPosition` enum.

```vue
<template>
    <CopyButton 
        icon="mdi:content-copy" 
        :iconPosition="IconPosition.RIGHT" 
    />
</template>
```

- **Type:** `IconPosition`
- **Default:** `IconPosition.RIGHT`

#### Options
::options-table
---
options: [
    {
        value: "LEFT",
        description: "left",
    },
    {
        value: "RIGHT",
        description: "right",
    },
    {
        value: "NONE",
        description: "none (icon does not appear at all)",
    },
]
---
::

### disabled

The `disabled` prop disables the copy button when set to `true`.

```vue
<template>
    <CopyButton disabled />
</template>
```

- **Type:** `boolean`
- **Default:** `false`


## Emits
::options-table
---
options: [
    {
        value: "@success",
        description: "Emitted when the text is successfully copied to the clipboard.",
    },
    {
        value: "@error",
        description: "Emitted when there is an error copying the text to the clipboard.",
    }
]
---
::

#### Example

```vue
<template>
    <CopyButton 
        @success="handleSuccess"
        @error="handleError"
    />
</template>
<script setup lang="ts">
const handleSuccess = () => {
    console.log("Text copied successfully")
}
const handleError = () => {
    console.log("Error copying text")
}
</script>
```