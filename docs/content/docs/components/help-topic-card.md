## Component

::component-code
---
srcDir: 'cards/specific/HelpTopicCard.vue'
props: 
    icon: "mdi:help"
    title: "Topic title"
    description: "Topic description"
    to: "/"
    buttonText: "Learn more"
    buttonIcon: "mdi:arrow-right"
---
::

## Props

::props-table
---
props: [
    {
        "name": "icon",
        "default": "mdi:help",
        "type": "string",
    },
    {
        "name": "title",
        "default": "Title",
        "type": "string",
    },
    {
        "name": "description",
        "default": "Description",
        "type": "string",
    },
    {
        "name": "to",
        "default": "/",
        "type": "string",
    },
    {
        "name": "buttonText",
        "default": "Learn more",
        "type": "string",
    },
    {
        "name": "buttonIcon",
        "default": "mdi:arrow-right",
        "type": "string",
    },   
]
---
::


## Usage
### icon
Sets the icon of the help topic.

```vue
<template>
    <HelpTopicCard 
        icon="mdi:help"
    />
</template>
```

### title
Sets the title of the help topic.

```vue
<template>
    <HelpTopicCard 
        title="Topic title"
    />
</template>
```

- **Type:** `string`
- **Default:** `'Title'`

### description
Sets the description of the help topic.

```vue
<template>
    <HelpTopicCard 
        description="Topic description"
    />
</template>
``` 

- **Type:** `string`
- **Default:** `'Description'`

### to
Sets the link to the help topic. Allows only internal links.

```vue
<template>
    <HelpTopicCard 
        to="/"
    />
</template>
```

- **Type:** `string`
- **Default:** `'/'`

### buttonText
Sets the text of the button.

```vue
<template>
    <HelpTopicCard 
        buttonText="Learn more"
    />
</template>
```

- **Type:** `string`
- **Default:** `'Learn more'`

### buttonIcon
Sets the icon of the button.

```vue
<template>
    <HelpTopicCard 
        buttonIcon="mdi:arrow-right"
    />
</template>
```

- **Type:** `string`
- **Default:** `'mdi:arrow-right'`

