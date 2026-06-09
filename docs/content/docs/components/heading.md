## Component

::component-code
---
srcDir: 'layouts/Heading.vue'
props: 
    overtitle: ""
    isOverTitleUppercase: false
    title: "Heading title"
    description: ""
    align: "left"
    size: "lg"
    spacing: "normal"
    headingTag: "h1"
    isMobileCentered: false
    overtitleClass: ""
    titleClass: ""
    descriptionClass: ""
items:
    align:
        - value: left
          text: LEFT
        - value: center
          text: CENTER
        - value: right
          text: RIGHT
    size:
        - value: xxs
          text: XXS
        - value: xs
          text: XS
        - value: sm
          text: SM
        - value: md
          text: MD
        - value: lg
          text: LG
        - value: xl
          text: XL
    spacing:
        - value: normal
          text: NORMAL
        - value: spaced
          text: SPACED
    headingTag:
        - value: h1
          text: H1
        - value: h2
          text: H2
        - value: h3
          text: H3
        - value: h4
          text: H4
        - value: h5
          text: H5
        - value: h6
          text: H6
enums:
    align: "Align"
    size: "HeadingSize"
    spacing: "HeadingSpacing"
previewBackground: 'white'
---
::

## Props

::props-table
---
props: [
    {
        "name": "overtitle",
        "type": "string"
    },
    {
        "name": "isOverTitleUppercase",
        "default": "false",
        "type": "boolean"
    },
    {
        "name": "title",
        "default": "'Heading title'",
        "type": "string"
    },
    {
        "name": "description",
        "type": "string"
    },
    {
        "name": "align",
        "default": "Align.LEFT",
        "type": "Align"
    },
    {
        "name": "size",
        "default": "HeadingSize.LG",
        "type": "HeadingSize"
    },
    {
        "name": "spacing",
        "default": "HeadingSpacing.NORMAL",
        "type": "HeadingSpacing"
    },
    {
        "name": "headingTag",
        "required": true,
        "type": "HeadingTag"
    },
    {
        "name": "isMobileCentered",
        "default": "false",
        "type": "boolean"
    },
    {
        "name": "overtitleClass",
        "type": "string"
    },
    {
        "name": "titleClass",
        "type": "string"
    },
    {
        "name": "descriptionClass",
        "type": "string"
    }
]
---
::

## Slots
::slots-table
---
slots: [
    {
        name: "overtitle",
        description: "Template to render custom content inside the overtitle slot. If used, the overtitle prop will be ignored.",
    },
    {
        name: "title",
        description: "Template to render custom content inside the title slot. If used, the title prop will be ignored.",
    },
    {
        name: "description",
        description: "Template to render custom content inside the description slot. If used, the description prop will be ignored.",
    },
]
---
::

```vue
<template>
    <Heading
        :size="HeadingSize.XL"
        headingTag="h1"
    >
        <template #overtitle>
            Overtitle
        </template>

        <template #title>
            <Icon name="mdi:star" /> Custom Title
        </template>

        <template #description>
            Description content goes here.
        </template>
    </Heading>
</template>
```

## Usage
### overtitle

You can provide an overtitle to the heading component to display a smaller title above the main title.

```vue
<template>
    <Heading
        overtitle="Section"
    />
</template>
```

- **Type:** `string`

### isOverTitleUppercase

The `isOverTitleUppercase` prop allows you to display the overtitle in uppercase letters.

```vue
<template>
    <Heading
        overtitle="Section"
        :isOverTitleUppercase="true"
        headingTag="h1"
    />
</template>
```

- **Type:** `boolean`
- **Default:** `false`

### title

The `title` prop allows you to set the main title of the heading component.

```vue
<template>
    <Heading
        title="Main Heading"
        headingTag="h1"
    />
</template>
```

- **Type:** `string`
- **Default:** `'Heading title'`

### description

You can add a description below the title to provide additional context or information.

```vue
<template>
    <Heading
        description="This is a description for the heading."
        headingTag="h1"
    />
</template>
```

- **Type:** `string`

### align

The `align` prop allows you to set the text alignment of the heading component. You can choose between left, center, or right alignment.

```vue
<template>
    <Heading
        :align="Align.CENTER"
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
        description: "Aligns the heading to the left.",
    },
    {
        value: "CENTER",
        description: "Centers the heading.",
    },
    {
        value: "right",
        description: "Aligns the heading to the right.",
    }
]
---
::

### size

You can adjust the size of the heading using the `size` prop. It uses the `HeadingSize` enum.

```vue
<template>
    <Heading
        :size="HeadingSize.XL"
        headingTag="h1"
    />
</template>
```

- **Type:** `HeadingSize`
- **Default:** `HeadingSize.LG`

#### Options
::options-table
---
options: [
    {
        value: "XXS",
        description: "Extra extra small size for the heading.",
    },
    {
        value: "XS",
        description: "Extra small size for the heading.",
    },
    {
        value: "SM",
        description: "Small size for the heading.",
    },
    {
        value: "MD",
        description: "Medium size for the heading.",
    },
    {
        value: "LG",
        description: "Large size for the heading.",
    },
    {
        value: "XL",
        description: "Extra large size for the heading.",
    }
]
---
::

### spacing

The `spacing` prop allows you to control the spacing below the heading. It uses the `HeadingSpacing` enum.

```vue
<template>
    <Heading
        :spacing="HeadingSpacing.SPACED"
    />
</template>
```

- **Type:** `HeadingSpacing`
- **Default:** `HeadingSpacing.NORMAL`

#### Options
::options-table
---
options: [
    {
        value: "NORMAL",
        description: "Appplies normal spacing below the heading.",
    },
    {
        value: "SPACED",
        description: "Applies increased spacing below the heading.",
    }
]
---
::

### headingTag

You can specify the HTML tag to be used for the heading title using the `headingTag` prop.

```vue
<template>
    <Heading
        headingTag="h1"
    />
</template>
```

- **Type:** `HeadingTag`
- **Required:** `true`

### isMobileCentered

The `isMobileCentered` prop allows you to center the heading on mobile devices.

```vue
<template>
    <Heading
        isMobileCentered
    />
</template>
```

- **Type:** `boolean`
- **Default:** `false`

### overtitleClass

You can apply custom CSS classes to the overtitle using the `overtitleClass` prop.

```vue
<template>
    <Heading
        overtitle="Section"
        overtitleClass="text-gray-500"
        headingTag="h1"
    />
</template>
```

- **Type:** `string`

### titleClass

You can apply custom CSS classes to the title using the `titleClass` prop.

```vue
<template>
    <Heading
        title="Main Heading"
        titleClass="font-bold"
        headingTag="h1"
    />
</template>
```

- **Type:** `string`

### descriptionClass

You can apply custom CSS classes to the description using the `descriptionClass` prop.

```vue
<template>
    <Heading
        description="This is a description for the heading."
        descriptionClass="text-gray-600"
        headingTag="h1"
    />
</template>
```

- **Type:** `string`