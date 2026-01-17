
## Component

::component-code
---
srcDir: 'content/ContentItem.vue'
props: 
    type: "basic"
    title: "Post content title"
    titleTag: "h4"
    titleClass: "font-semibold"
    titleMaxLength: 72
    description: "Post content description"
    descriptionClass: "text-sm text-text-neutral-subtle"
    descriptionMaxLength: 100
    to: ""
    hasImage: true
    imgUrl: "https://picsum.photos/200/300"
    imgAlt: "Item image"
    imgAspectRatio: "16:9"
    imgHoverEffect: "blur"
    imgHoverIcon: "mdi:eye-outline"
    imgFallbackIcon: "mdi:image-off-outline"
    imgContainerClass: ""
    containerClass: ""
    hasCardShadow: true
    hasCardBackgroundHover: false
items:
    type:
        - value: basic
          text: BASIC
        - value: card
          text: CARD
    imgHoverEffect:
        - value: zoomIn
          text: ZOOM_IN
        - value: zoomOut
          text: ZOOM_OUT
        - value: overlay
          text: OVERLAY
        - value: blur
          text: BLUR
previewBackground: 'white'
---
::

## Props

::props-table
---
props: [
    {
        "name": "type",
        "default": "ContentItemType.CARD",
        "type": "ContentItemType",
    },
    {
        "name": "title",
        "default": "'Title'",
        "type": "string",
    },
    {
        "name": "titleTag",
        "default": "'h4'",
        "type": "string",
    },
    {
        "name": "titleClass",
        "default": "'font-semibold'",
        "type": "string",
    },
    {
        "name": "titleMaxLength",
        "default": "72",
        "type": "number",
    },
    {
        "name": "description",
        "type": "string",
    },
    {
        "name": "descriptionClass",
        "default": "'text-sm text-text-neutral-subtle'",
        "type": "string",
    },
    {
        "name": "descriptionMaxLength",
        "default": "100",
        "type": "number",
    },
    {
        "name": "to",
        "type": "string",
    },
    {
        "name": "hasImage",
        "default": "true",
        "type": "boolean",
    },
    {
        "name": "imgUrl",
        "type": "string",
    },
    {
        "name": "imgAlt",
        "default": "'Item image'",
        "type": "string",
    },
    {
        "name": "imgAspectRatio",
        "default": "AspectRatio.AR_16_9",
        "type": "AspectRatio",
    },
    {
        "name": "imgHoverEffect",
        "default": "ImageHoverEffect.BLUR",
        "type": "ImageHoverEffect",
    },
    {
        "name": "imgHoverIcon",
        "type": "string",
    },
    {
        "name": "imgFallbackIcon",
        "type": "string",
    },
    {
        "name": "imgContainerClass",
        "type": "string",
    },
    {
        "name": "containerClass",
        "type": "string",
    },
    {
        "name": "hasCardShadow",
        "default": "true",
        "type": "boolean",
    },
    {
        "name": "hasCardBackgroundHover",
        "default": "false",
        "type": "boolean",
    },
]
---
::

## Usage

### type

The `type` prop determines the type of the content item. It accepts values from the `ContentItemType` enum.

```vue
<template>
    <ContentItem 
        :type="ContentItemType.CARD"  
    />
</template>
```

- **Type:** `ContentItemType`
- **Default:** `ContentItemType.CARD`

#### Options

::options-table
---
options: [
    {
        value: "BASIC",
        description: "Displays the item with in a basic style",
    },
    {
        value: "CARD",
        description: "Displays the item inside a card",
    },
]
---
::

### title

Sets the title of the content item.

```vue
<template>
    <ContentItem 
        title="Title"  
    />
</template>
```

- **Type:** `string`
- **Default:** `'Title'`

### titleTag

Sets the HTML tag used for the title. 

**Accepted tags:** h3, h4, h5, h6

```vue
<template>
    <ContentItem 
        title="Title" 
        titleTag="h4"  
    />
</template>
```

- **Type:** `string`
- **Default:** `'h4'`


### titleClass

Sets the class of the title.

```vue
<template>
    <ContentItem 
        title="Title" 
        titleClass="font-bold"  
    />
</template>
```

- **Type:** `string`
- **Default:** `'font-semibold'`

### titleMaxLength

Sets the maximum length of the title.

```vue
<template>
    <ContentItem 
        title="Title" 
        titleMaxLength="10"  
    />
</template>
```

- **Type:** `number`
- **Default:** `72`

### description

Sets the description of the content item.

```vue
<template>
    <ContentItem 
        description="Description"  
    />
</template>
```

- **Type:** `string`
- **Default:** `''`

### descriptionClass

Sets the class of the description.

```vue
<template>
    <ContentItem 
        description="Description" 
        descriptionClass="text-sm"  
    />
</template>
```

- **Type:** `string`
- **Default:** `'text-sm text-text-neutral-subtle'`

### descriptionMaxLength

Sets the maximum length of the description.

```vue
<template>
    <ContentItem 
        description="Description" 
        descriptionClass="text-sm" 
        descriptionMaxLength="10"  
    />
</template>
```

- **Type:** `number`
- **Default:** `100`

### to

Sets the link of the content item.

```vue
<template>
    <ContentItem 
        to="/"
    />
</template>
```

- **Type:** `string`

### hasImage

Sets whether the content item should display an image. If it it set to `true` but no image is provided, it will show the fallback placeholder.

```vue
<template>
    <ContentItem 
        hasImage="true"
    />
</template>
```

### imgUrl

Sets the URL of the image to be displayed.

```vue
<template>
    <ContentItem 
        imgUrl="https://picsum.photos/200/300"
    />
</template>
```

- **Type:** `string`

### imgAlt

Sets the alt text of the image.

```vue
<template>
    <ContentItem 
        imgUrl="https://picsum.photos/200/300" 
        imgAlt="Item image"  
    />
</template>
```

- **Type:** `string`
- **Default:** `'Item image'`

### imgAspectRatio

Sets the aspect ratio of the image.

```vue
<template>
    <ContentItem 
        imgAspectRatio="AspectRatio.AR_16_9"  
    />
</template>
```

- **Type:** `AspectRatio`
- **Default:** `AspectRatio.AR_16_9`

#### Options

::options-table
---
options: [
    {
        value: "AR_1_1",
        description: "Square image format",
    },
    {
        value: "AR_4_3",
        description: "Horizontal 4:3 aspect ratio",
    },
    {
        value: "AR_3_2",
        description: "Horizontal 3:2 aspect ratio",
    },
    {
        value: "AR_16_9",
        description: "Horizontal 16:9 aspect ratio",
    },
    {
        value: "AR_3_4",
        description: "Vertical 3:4 aspect ratio",
    },
    {
        value: "AR_4_5",
        description: "Vertical 4:5 aspect ratio",
    },
    {
        value: "AR_2_3",
        description: "Vertical 2:3 aspect ratio",
    },
]
---
::

### imgHoverEffect

Sets the hover effect of the image.

```vue
<template>
    <ContentItem 
        :imgHoverEffect="ImageHoverEffect.ZOOM_IN"  
    />
</template>
```

- **Type:** `ImageHoverEffect`
- **Default:** `ImageHoverEffect.BLUR`

#### Options

::options-table
---
options: [
    {
        value: "ZOOM_IN",
        description: "Zoom in on the image",
    },
    {
        value: "ZOOM_OUT",
        description: "Zoom out of the image",
    },
    {
        value: "OVERLAY",
        description: "Overlay the image",
    },
    {
        value: "BLUR",
        description: "Blur the image",
    },
]
---
::

### imgHoverIcon

Sets the icon to be displayed on hover.

```vue
<template>
    <ContentItem 
        imgHoverIcon="mdi:eye-outline"  
    />
</template>
```

- **Type:** `string`

### imgFallbackIcon

Sets the fallback icon when no image is found.

```vue
<template>
    <ContentItem 
        imgFallbackIcon="mdi:image-off-outline"  
    />
</template>
```

### imgContainerClass

Sets the class of the image container.

```vue
<template>
    <ContentItem 
        imgContainerClass="rounded-lg"  
    />
</template>
```

- **Type:** `string`

### containerClass

Sets the class of the container.

```vue
<template>
    <ContentItem 
        containerClass="bg-white"  
    />
</template>
```

- **Type:** `string`

### hasCardShadow

Sets whether the card has a shadow. It requires the `type` to be `ContentItemType.CARD`.

```vue
<template>
    <ContentItem 
        :type="ContentItemType.CARD"
        :hasCardShadow="false"
    />
</template>
```

- **Type:** `boolean`
- **Default:** `true`

### hasCardBackgroundHover

Sets whether the card background has a hover effect. It requires the `type` to be `ContentItemType.CARD`.

```vue
<template>
    <ContentItem 
        :type="ContentItemType.CARD"
        :hasCardBackgroundHover="true"
    />
</template>
```

- **Type:** `boolean`
- **Default:** `false`


## Slots
::slots-table
---
slots: [
    {
        name: "content",
        description: "Template to render a custom content for the item",
    },
]
---
::

```vue
<template>
    <ContentItem>
        <template #content>
            <!-- Insert custom content here -->
        </template>
    </ContentItem>
</template>
```