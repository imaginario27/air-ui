## Component

::component-code
---
srcDir: 'cards/Card.vue'
props: 
    hasShadow: true
    hasBorder: true
slots:
  default: ""
slotComponents:
  default:
    srcDir: 'placeholders/ContentPlaceholder.vue'
    props:
        text: "Add card structure here"
---
::

## Usage
```vue
<template>
    <Card>
        <!-- Optional: Use card header if you need to insert title, buttons or other elements. -->
        <CardHeader>
            <!-- Your card footer content here -->

            <!-- Optional: Card title -->
            <CardTitle title="Card title example" />
        </CardHeader>

        <!-- Highly recommended: Useful to display the content in a proper way. -->
        <CardBody>
            <!-- Your card body content here -->
        </CardBody>

        <!-- Optional: Use card footer if you need to insert links, button or additional info. -->
        <CardFooter>
            <!-- Your card footer content here -->

            <CardActions>
                <!-- Your card actions here (ex. buttons) -->
            </CardActions>
        </CardFooter>
    </Card>
</template>
```

## Components
::components-table
---
components: [
    {
        name: "<Card>",
        description: "The main container that wraps all card content and structure.",
    },
    {
        name: "<CardHeader>",
        description: "Defines the top section of the card, typically used for the title and optional action elements.",
    },
    {
        name: "<CardBody>",
        description: "The primary content area of the card. Recommended for displaying text, media, or other main content.",
    },
    {
        name: "<CardFooter>",
        description: "The bottom section of the card, suitable for links, secondary actions, or additional information.",
    },
    {
        name: "<CardTitle>",
        description: "Used to render the card's title inside the header section.",
    },
    {
        name: "<CardActions>",
        description: "Container for action buttons, usually placed in the footer or header.",
    },
]
---
::

## Props
### Card
::props-table
---
props: [
    {
        "name": "hasShadow",
        "default": "true",
        "type": "boolean",
    },
    {
        "name": "hasBorder",
        "default": "true",
        "type": "boolean",
    },
]
---
::

#### hasShadow

Displays a shadow effect around the card.

```vue
<template>
    <Card hasShadow>
        <!-- Your card content here -->
    </Card>
</template>
```

- **Type:** `boolean`
- **Default:** `true`

#### hasBorder

Shows a border around the card.

```vue
<template>
    <Card hasBorder>
        <!-- Your card content here -->
    </Card>
</template>
```

- **Type:** `boolean`
- **Default:** `true`


### Card footer
::props-table
---
props: [
    {
        "name": "hasBorder",
        "default": "false",
        "type": "boolean",
    },
]
---
::

#### hasBorder

Displays a border top of the footer, used as a divider.

```vue
<template>
    <Card>
        <!-- ... -->
        <CardFooter hasBorder>
            <!-- Footer content -->
        </CardFooter>
    </Card>
</template>
```

- **Type:** `boolean`
- **Default:** `false`


### Card title
::props-table
---
props: [
    {
        "name": "title",
        "default": "Card title",
        "type": "string",
    },
]
---
::

#### title

Sets a title for the card title.

```vue
<template>
    <Card>
        
        <CardHeader>
            <CardTitle title="Card title example" />
        </CardHeader>
        <!-- ... -->
    </Card>
</template>
```

- **Type:** `string`
- **Default:** `'Card title'`