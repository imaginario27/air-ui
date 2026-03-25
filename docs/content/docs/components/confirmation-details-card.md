## Component

::component-code
---
srcDir: 'cards/specific/ConfirmationDetailsCard.vue'
props: 
    scope: "Scope"
    title: "Title"
    description: "Description"
    alignement: "left"
items:
    alignement: 
        - value: left
          text: LEFT
        - value: center
          text: CENTER
        - value: right
          text: RIGHT
enums:
    alignement: "Align"
previewBackground: 'white'
previewContentMaxWidth: 400
---
::

## Props

::props-table
---
props: [
    {
        "name": "scope",
        "default": "Scope",
        "type": "string",
    },
    {
        "name": "title",
        "default": "Title",
        "type": "string",
    },
    {
        "name": "description",
        "required": "true",
        "type": "string",
    },
    {
        "name": "alignement",
        "default": "Align.LEFT",
        "type": "Align",
    },
    {
        "name": "scopeClass",
        "type": "string",
    },
    {
        "name": "iconClass",
        "type": "string",
    },
    {
        "name": "titleClass",
        "type": "string",
    },
]
---
::

## Usage

### scope
Sets the scope label displayed at the start of the card.

```vue
<template>
    <ConfirmationDetailsCard 
        scope="Category"
        description="Description"
    />
</template>
```

- **Type:** `string`
- **Default:** `'Scope'`

### title
Sets the title displayed at the end of the card, rendered in bold.

```vue
<template>
    <ConfirmationDetailsCard 
        title="My Title"
        description="Description"
    />
</template>
```

- **Type:** `string`
- **Default:** `'Title'`

### description
Sets the description associated with the card. Required prop.

```vue
<template>
    <ConfirmationDetailsCard 
        description="A description of the item being confirmed."
    />
</template>
```

- **Type:** `string`
- **Required:** `true`

### alignement
Controls the horizontal alignment of the card content. Uses the `Align` enum.

```vue
<template>
    <ConfirmationDetailsCard 
        :alignement="Align.CENTER"
        description="Description"
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
        description: "Aligns content to the left.",
    },
    {
        value: "CENTER",
        description: "Aligns content to the center.",
    },
    {
        value: "RIGHT",
        description: "Aligns content to the right.",
    },
]
---
::

### scopeClass
Applies additional CSS classes to the scope label span.

```vue
<template>
    <ConfirmationDetailsCard 
        scopeClass="text-text-neutral-subtle"
        description="Description"
    />
</template>
```

- **Type:** `string`

### iconClass
Applies additional CSS classes to the chevron icon.

```vue
<template>
    <ConfirmationDetailsCard 
        iconClass="text-text-neutral-subtle"
        description="Description"
    />
</template>
```

- **Type:** `string`

### titleClass
Applies additional CSS classes to the title span.

```vue
<template>
    <ConfirmationDetailsCard 
        titleClass="text-text-primary-brand-default"
        description="Description"
    />
</template>
```

- **Type:** `string`
