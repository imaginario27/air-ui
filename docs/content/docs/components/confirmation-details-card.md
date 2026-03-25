## Component

::component-code
---
srcDir: 'cards/specific/ConfirmationDetailsCard.vue'
props: 
    scope: "Scope"
    title: "Title"
    separatorIcon: "mdi:chevron-right"
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
        "name": "separatorIcon",
        "default": "'mdi:chevron-right'",
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
    />
</template>
```

- **Type:** `string`
- **Default:** `'Title'`

### separatorIcon
Overrides the icon shown between `scope` and `title`. Accepts any icon name supported by the `Icon` component.

```vue
<template>
    <ConfirmationDetailsCard 
        separatorIcon="mdi:arrow-right"
    />
</template>
```

- **Type:** `string`
- **Default:** `'mdi:chevron-right'`

### alignement
Controls the horizontal alignment of the card content. Uses the `Align` enum.

```vue
<template>
    <ConfirmationDetailsCard 
        :alignement="Align.CENTER"
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
    />
</template>
```

- **Type:** `string`
