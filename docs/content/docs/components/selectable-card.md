## Component

::component-code
---
srcDir: 'cards/specific/SelectableCard.vue'
props: 
    modelValue: false
    selectMode: "card"
    title: "Title"
    titleClass: ""
    description: "Description"
    descriptionClass: ""
    icon: "mdi:help"
    checkIcon: "mdi:check-circle-outline"
    containedIconShape: "square"
    containedIconStyleType: "flat"
    containedIconColor: "secondary-brand"
    layoutAlign: "left"
    buttonSize: "lg"
    hasSecondaryBtn: true
    secondaryBtnText: "Details"
    secondaryBtnStyleType: "neutral-outlined"
    secondaryBtnIconPosition: "none"
    secondaryBtnIcon: "mdi:arrow-right"
    selectBtnStyleType: "neutral-filled"
    selectBtnIconPosition: "none"
    selectBtnIcon: "mdi:arrow-right"
    selectText: "Select"
    selectedText: "Selected"
    hasFooter: true
    footerContentAlign: "right"
    isHoverable: true
    hasShadow: true
    disabled: false
items:
    containedIconShape: 
        - value: square
          text: SQUARE
        - value: circle
          text: CIRCLE
    containedIconStyleType: 
        - value: flat
          text: FLAT
        - value: filled
          text: FILLED
    containedIconColor: 
        - value: neutral
          text: NEUTRAL
        - value: success
          text: SUCCESS
        - value: warning
          text: WARNING
        - value: danger
          text: DANGER
        - value: info
          text: INFO
        - value: primary-brand
          text: PRIMARY_BRAND
        - value : secondary-brand
          text: SECONDARY_BRAND
    layoutAlign: 
        - value: left
          text: LEFT
        - value: center
          text: CENTER
    selectMode:
        - value: card
          text: CARD
        - value: button
          text: BUTTON
    secondaryBtnStyleType:
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
        - value: delete-filled
          text: DELETE_FILLED
        - value: delete-outlined
          text: DELETE_OUTLINED
        - value: delete-soft
          text: DELETE_SOFT
        - value: delete-transparent
          text: DELETE_TRANSPARENT
    selectBtnStyleType:
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
        - value: delete-filled
          text: DELETE_FILLED
        - value: delete-outlined
          text: DELETE_OUTLINED
        - value: delete-soft
          text: DELETE_SOFT
        - value: delete-transparent
          text: DELETE_TRANSPARENT
    secondaryBtnIconPosition:
        - value: none
          text: NONE
        - value: left
          text: LEFT
        - value: right
          text: RIGHT
    selectBtnIconPosition:
        - value: none
          text: NONE
        - value: left
          text: LEFT
        - value: right
          text: RIGHT
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
    footerContentAlign:
        - value: left
          text: LEFT
        - value: center
          text: CENTER
        - value: right
          text: RIGHT
emits:
    buttonClick: "() => console.log('Button clicked')"
external:
  - modelValue
externalTypes:
  - boolean
previewContentMaxWidth: 400
---
::

## Props

::props-table
---
props: [
    {
        "name": "modelValue",
        "default": false,
        "type": "boolean",
    },
    {
        "name": "selectMode",
        "default": "CardSelectionMode.CARD",
        "type": "CardSelectionMode",
    },
    {
        "name": "title",
        "default": "Title",
        "type": "string",
    },
    {
        "name": "titleClass",
        "type": "string",
    },
    {
        "name": "description",
        "default": "Description",
        "type": "string",
    },
    {
        "name": "descriptionClass",
        "type": "string",
    },
    {
        "name": "icon",
        "type": "string",
    },
    {
        "name": "checkIcon",
        "default": "mdi:check-circle-outline",
        "type": "string",
    },
    {
        "name": "containedIconShape",
        "default": "IconContainerShape.SQUARE",
        "type": "IconContainerShape",
    },
    {
        "name": "containedIconStyleType",
        "default": "IconContainerStyleType.FLAT",
        "type": "IconContainerStyleType",
    },
    {
        "name": "containedIconColor",
        "default": "ColorAccent.SECONDARY_BRAND",
        "type": "ColorAccent",
    },
    {
        "name": "layoutAlign",
        "default": "Align.LEFT",
        "type": "Align",
    },
    {
        "name": "buttonSize",
        "default": "ButtonSize.LG",
        "type": "ButtonSize",
    },
    {
        "name": "hasSecondaryBtn",
        "default": true,
        "type": "boolean",
    },
    {
        "name": "secondaryBtnText",
        "default": "Details",
        "type": "string",
    },
    {
        "name": "secondaryBtnStyleType",
        "default": "ButtonStyleType.NEUTRAL_OUTLINED",
        "type": "ButtonStyleType",
    },
    {
        "name": "secondaryBtnIconPosition",
        "default": "IconPosition.NONE",
        "type": "IconPosition",
    },
    {
        "name": "secondaryBtnIcon",
        "default": "mdi:arrow-right",
        "type": "string",
    },
    {
        "name": "selectBtnStyleType",
        "default": "ButtonStyleType.NEUTRAL_FILLED",
        "type": "ButtonStyleType",
    },
    {
        "name": "selectBtnIconPosition",
        "default": "IconPosition.NONE",
        "type": "IconPosition",
    },
    {
        "name": "selectBtnIcon",
        "default": "mdi:arrow-right",
        "type": "string",
    },
    {
        "name": "selectText",
        "default": "Select",
        "type": "string",
    },
    {
        "name": "selectedText",
        "default": "Selected",
        "type": "string",
    },
    {
        "name": "hasFooter",
        "default": true,
        "type": "boolean",
    },
    {
        "name": "footerContentAlign",
        "default": "Align.RIGHT",
        "type": "Align",
    },
    {
        "name": "isHoverable",
        "default": true,
        "type": "boolean",
    },
    {
        "name": "hasShadow",
        "default": true,
        "type": "boolean",
    },
    {
        "name": "disabled",
        "default": false,
        "type": "boolean",
    },
]
---
::

## Slots
::slots-table
---
slots: [
    {
        name: "default",
        description: "Slot to customize the content of the card body. If not used, the description prop will be shown in the body.",
    },
    {
        name: "footer",
        description: "Slot to customize the content of the footer. Only shown if `hasFooter` is true. If used, actions slot will be ignored. Be aware of using the CARD selection as the select button is located in the footer and it will be completely replaced.",
    }
]
---
::

```vue
<template>
    <SelectableCard>
        <span>Custom content</span>
        
        <template #footer>
            <div>Custom footer content</div>
        </template>
    </SelectableCard>
</template>
```

## Usage
### modelValue
Controls the selected state of the card. Can be used with `v-model` directive.

```vue<template>
    <SelectableCard 
        v-model="isSelected"
    />
</template>
<script setup lang="ts">
const isSelected = ref(false)
</script>
```

- **Type:** `boolean`
- **Default:** `false`

### title
Sets the title of the feature.

```vue
<template>
    <SelectableCard 
        title="Title"
    />
</template>
```

- **Type:** `string`
- **Default:** `'Title'`

### titleClass
Adds custom classes to the title element.

```vue
<template>
    <SelectableCard 
        titleClass="text-base font-semibold"
    />
</template>
```

- **Type:** `string`

### description
Sets the description of the feature.

```vue
<template>
    <SelectableCard 
        description="Description"
    />
</template>
``` 

- **Type:** `string`
- **Default:** `'Description'`

### descriptionClass
Adds custom classes to the description element.

```vue
<template>
    <SelectableCard 
        descriptionClass="text-sm text-text-neutral-subtle"
    />
</template>
```

- **Type:** `string`

### icon
Sets the icon of the feature.

```vue
<template>
    <SelectableCard 
        icon="mdi:help"
    />
</template>
```

- **Type:** `string`

### checkIcon
Sets the check icon of the feature, which is shown when the card is selected.

```vue
<template>
    <SelectableCard 
        checkIcon="mdi:check-circle-outline"
    />
</template>
```

### containedIconShape
Stablishes the shape of the contained icon. Uses the `IconContainerShape` enum.

```vue
<template>
    <SelectableCard 
        :containedIconShape="IconContainerShape.CIRCLE"
    />
</template>
```

- **Type:** `IconContainerShape`
- **Default:** `IconContainerShape.SQUARE`

#### Options

::options-table
---
options: [
    {
        value: "CIRCLE",
        description: "Rounded icon container shape",
    },
    {
        value: "SQUARE",
        description: "Square icon container shape",
    },
]
---
::

### containedIconStyleType
Configures the style type of the contained icon. Uses the `IconContainerStyleType` enum.

```vue
<template>
    <SelectableCard 
        :containedIconStyleType="IconContainerStyleType.FILLED"
    />
</template>
```

- **Type:** `IconContainerStyleType`
- **Default:** `IconContainerStyleType.FLAT`

#### Options

::options-table
---
options: [
    {
        value: "FLAT",
        description: "Uses a soft background for the icon container",
    },
    {
        value: "FILLED",
        description: "Uses a bold background for the icon container",
    },
]
---
::

### containedIconColor
Configures the color of the contained icon. Uses the `ColorAccent` enum.

```vue
<template>
    <SelectableCard 
        :containedIconColor="ColorAccent.SECONDARY_BRAND"
    />
</template>
```

- **Type:** `ColorAccent`
- **Default:** `ColorAccent.SECONDARY_BRAND`

#### Options

::options-table
---
options: [
    {
        value: "neutral",
        description: "Neutral",
    },
    {
        value: "success",
        description: "Success",
    },
    {
        value: "warning",
        description: "Warning",
    },
    {
        value: "danger",
        description: "Danger",
    },
    {
        value: "info",
        description: "Info",
    },
    {
        value: "primary-brand",
        description: "Primary Brand",
    },
    {
        value: "secondary-brand",
        description: "Secondary Brand",
    },
]
---
::

### layoutAlign
Sets the horizontal alignment of the content. Uses the `Align` enum.

```vue
<template>
    <SelectableCard 
        :layoutAlign="Align.LEFT"
    />
</template>
```

- **Type:** `Align`
- **Default:** `Align.LEFT`

#### Options

::options-table
---
options: [
    {
        value: "LEFT",
        description: "Content aligns to the left side of the card.",
    },
    {
        value: "CENTER",
        description: "Content aligns to the center of the card.",
    },
]
---
::

### selectMode
Controls how the card is selected. Uses the `CardSelectionMode` enum.

```vue
<template>
    <SelectableCard 
        :selectMode="CardSelectionMode.BUTTON"
    />
</template>
```

- **Type:** `CardSelectionMode`
- **Default:** `CardSelectionMode.CARD`

#### Options
::options-table
---
options: [
    {
        value: "CARD",
        description: "Selecting toggles by clicking the card.",
    },
    {
        value: "BUTTON",
        description: "Selecting toggles using the select button.",
    },
]
---
::

### buttonSize
Sets the size of the footer buttons. Uses the `ButtonSize` enum.

```vue
<template>
    <SelectableCard 
        :buttonSize="ButtonSize.LG"
    />
</template>
```

- **Type:** `ButtonSize`
- **Default:** `ButtonSize.LG`

### hasSecondaryBtn
Determines whether the secondary action button in the footer is shown or not.

```vue
<template>
    <SelectableCard 
        :hasSecondaryBtn="true"
    />
</template>
```

- **Type:** `boolean`
- **Default:** `true`

### secondaryBtnText
Sets the text of the secondary action button in the footer.

```vue
<template>
    <SelectableCard 
        secondaryBtnText="Details"
    />
</template>
```

- **Type:** `string`
- **Default:** `'Details'`

#### Options
::options-table
---
options: [
    {
        value: "2xl",
        description: "XXL button size",
    },
    {
        value: "xl",
        description: "XL button size",
    },
    {
        value: "lg",
        description: "LG button size",
    },
    {
        value: "md",
        description: "MD button size",
    },
    {
        value: "sm",
        description: "SM button size",
    },
    {
        value: "xs",
        description: "XS button size",
    },
]
---
::

### secondaryBtnStyleType
Sets the style type of the secondary action button. Uses the `ButtonStyleType` enum.

```vue
<template>
    <SelectableCard 
        :secondaryBtnStyleType="ButtonStyleType.NEUTRAL_OUTLINED"
    />
</template>
```

- **Type:** `ButtonStyleType`
- **Default:** `ButtonStyleType.NEUTRAL_OUTLINED`

#### Options
::options-table
---
options: [
    {
        value: "primary-brand-filled",
        description: "Primary Brand Filled button style",
    },
    {
        value: "primary-brand-transparent",
        description: "Primary Brand Transparent button style",
    },
    {
        value: "primary-brand-soft",
        description: "Primary Brand Soft button style",
    },
    {
        value: "secondary-brand-filled",
        description: "Secondary Brand Filled button style",
    },
    {
        value: "neutral-outlined",
        description: "Neutral Outlined button style",
    },
    {
        value: "neutral-transparent",
        description: "Neutral Transparent button style",
    },
    {
        value: "neutral-transparent-subtle",
        description: "Neutral Transparent Subtle button style",
    },
    {
        value: "neutral-filled",
        description: "Neutral Filled button style",
    },
    {
        value: "delete-filled",
        description: "Delete Filled button style",
    },
    {
        value: "delete-outlined",
        description: "Delete Outlined button style",
    },
    {
        value: "delete-soft",
        description: "Delete Soft button style",
    },
    {
        value: "delete-transparent",
        description: "Delete Transparent button style",
    },
]
---
::

### secondaryBtnIconPosition
Sets the position of the icon in the secondary action button. Uses the `IconPosition` enum.

```vue
<template>
    <SelectableCard 
        :secondaryBtnIconPosition="IconPosition.LEFT"
    />
</template>
```

- **Type:** `IconPosition`
- **Default:** `IconPosition.NONE`

#### Options
::options-table
---
options: [
    {
        value: "NONE",
        description: "No icon is shown in the button.",
    },
    {
        value: "LEFT",
        description: "Icon is shown to the left of the text in the button.",
    },
    {
        value: "RIGHT",
        description: "Icon is shown to the right of the text in the button.",
    },
]
---
::

### secondaryBtnIcon
Sets the icon of the secondary action button.

```vue
<template>
    <SelectableCard 
        secondaryBtnIcon="mdi:arrow-right"
    />
</template>
```

- **Type:** `string`
- **Default:** `'mdi:arrow-right'`

### selectBtnStyleType
Sets the style type of the select button. Uses the `ButtonStyleType` enum.

```vue
<template>
    <SelectableCard 
        :selectBtnStyleType="ButtonStyleType.NEUTRAL_FILLED"
    />
</template>
```

- **Type:** `ButtonStyleType`
- **Default:** `ButtonStyleType.NEUTRAL_FILLED`

#### Options
::options-table
---
options: [
    {
        value: "primary-brand-filled",
        description: "Primary Brand Filled button style",
    },
    {
        value: "primary-brand-transparent",
        description: "Primary Brand Transparent button style",
    },
    {
        value: "primary-brand-soft",
        description: "Primary Brand Soft button style",
    },
    {
        value: "secondary-brand-filled",
        description: "Secondary Brand Filled button style",
    },
    {
        value: "neutral-outlined",
        description: "Neutral Outlined button style",
    },
    {
        value: "neutral-transparent",
        description: "Neutral Transparent button style",
    },
    {
        value: "neutral-transparent-subtle",
        description: "Neutral Transparent Subtle button style",
    },
    {
        value: "neutral-filled",
        description: "Neutral Filled button style",
    },
    {
        value: "delete-filled",
        description: "Delete Filled button style",
    },
    {
        value: "delete-outlined",
        description: "Delete Outlined button style",
    },
    {
        value: "delete-soft",
        description: "Delete Soft button style",
    },
    {
        value: "delete-transparent",
        description: "Delete Transparent button style",
    },
]
---
::

### selectBtnIconPosition
Sets the position of the icon in the select button. Uses the `IconPosition` enum.

```vue
<template>
    <SelectableCard 
        :selectBtnIconPosition="IconPosition.LEFT"
    />
</template>
```

- **Type:** `IconPosition`
- **Default:** `IconPosition.NONE`

#### Options
::options-table
---
options: [
    {
        value: "NONE",
        description: "No icon is shown in the button.",
    },
    {
        value: "LEFT",
        description: "Icon is shown to the left of the text in the button.",
    },
    {
        value: "RIGHT",
        description: "Icon is shown to the right of the text in the button.",
    },
]
---
::

### selectBtnIcon
Sets the icon of the select button.

```vue
<template>
    <SelectableCard 
        selectBtnIcon="mdi:arrow-right"
    />
</template>
```

- **Type:** `string`
- **Default:** `'mdi:arrow-right'`

### selectText
Sets the label for the select button when the card is not selected.

```vue
<template>
    <SelectableCard 
        selectText="Select"
    />
</template>
```

- **Type:** `string`
- **Default:** `'Select'`

### selectedText
Sets the label for the select button when the card is selected.

```vue
<template>
    <SelectableCard 
        selectedText="Selected"
    />
</template>
```

- **Type:** `string`
- **Default:** `'Selected'`

### hasFooter
Determines whether the card has a footer or not.

::content-alert
---
props:
    title: "Important"
    description: "When using the select mode `CardSelectionMode.BUTTON`, the footer will always be shown even if this prop is set to false, as the select button is located in the footer."
---
::

```vue
<template>
    <SelectableCard 
        :hasFooter="true"
    />
</template>
```

- **Type:** `boolean`
- **Default:** `true`

### footerContentAlign
Sets the horizontal alignment of the footer content. Uses the `Align` enum.

```vue
<template>
    <SelectableCard 
        :footerContentAlign="Align.RIGHT"
    />
</template>
```

- **Type:** `Align`
- **Default:** `Align.RIGHT`

#### Options
::options-table
---
options: [
    {
        value: "LEFT",
        description: "Footer content aligns to the left side of the footer.",
    },
    {
        value: "CENTER",
        description: "Footer content aligns to the center of the footer.",
    },
    {
        value: "RIGHT",
        description: "Footer content aligns to the right side of the footer.",
    },
]
---
::

### isHoverable
Determines whether the card has a hover effect or not.

```vue
<template>
    <SelectableCard 
        :isHoverable="true"
    />
</template>
```

- **Type:** `boolean`
- **Default:** `true`

### hasShadow
Determines whether the card has a shadow effect or not.

```vue
<template>
    <SelectableCard 
        :hasShadow="true"
    />
</template>
```

- **Type:** `boolean`
- **Default:** `true`

### disabled
Determines whether the card is disabled or not.

```vue
<template>
    <SelectableCard 
        :disabled="true"
    />
</template>
```

- **Type:** `boolean`
- **Default:** `false`

## Emits
::options-table
---
options: [
    {
        value: "@buttonClick",
        description: "Emitted when the footer button is clicked.",
    },
    {
        value: "@update:modelValue",
        description: "Emitted when the selected state changes.",
    },
]
---
::

#### Example

```vue
<template>
    <SelectableCard 
        @buttonClick="handleClick"
    />
</template>
<script setup lang="ts">
const handleClick = () => {
    console.log("Button clicked")
}
</script>
```