::component-code
---
srcDir: 'cards/specific/TestimonialCard.vue'
props: 
    displayName: "John Doe"
    role: "Software Engineer"
    imgUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    ratingValue: 4.5
    ratingStarColor: "gold"
    isDivided: false
items:
    ratingStarColor: 
        - value: gold
          text: GOLD  
        - value: primary-brand
          text: PRIMARY_BRAND 
previewBackground: 'white'
---
::

## Props

::props-table
---
props: [
    {
        "name": "displayName",
        "default": "John Doe",
        "type": "string",
    }, 
    {
        "name": "role",
        "type": "string",
    }, 
    {
        "name": "imgUrl",
        "type": "string",
    }, 
    {
        "name": "text",
        "default": "Text",
        "type": "string",
    }, 
    {
        "name": "ratingValue",
        "default": 0,
        "type": "number",
    }, 
    {
        "name": "ratingStarColor",
        "default": RatingItemColor.GOLD,
        "type": "string",
    }, 
    {
        "name": "isDivided",
        "type": "boolean",
    }
]
---
::

## Usage
### displayName
Sets the display for the author of the testimonial.

```vue
<template>
    <TestimonialCard 
        displayName="John Doe"
    />
</template>
```

- **Type:** `string`
- **Default:** `'John Doe'`

### role
Sets the role of the author.

```vue
<template>
    <TestimonialCard 
        role="Software Engineer"
    />
</template>
```

- **Type:** `string`

### imgUrl
Sets the image url of the author's avatar.

```vue
<template>
    <TestimonialCard 
        imgUrl="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    />
</template>
```

- **Type:** `string`

### text
Sets the message text.

```vue
<template>
    <TestimonialCard 
        text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
    />
</template>
```

- **Type:** `string`

### ratingValue
Sets the rating value. The value must be between `0` and `5`.

```vue
<template>
    <TestimonialCard 
        :ratingValue="4.5"
    />
</template>
```

- **Type:** `number`

### ratingStarColor
Sets the color of the rating stars. Uses the `RatingItemColor` enum.

```vue
<template>
    <TestimonialCard 
        :ratingStarColor="RatingItemColor.GOLD"
    />
</template>
```

- **Type:** `RatingItemColor`
- **Default:** `RatingItemColor.GOLD`

#### Options

::options-table
---
options: [
    {
        value: "GOLD",
        description: "Uses gold color for the rating stars.",
    },
    {
        value: "PRIMARY_BRAND",
        description: "Uses primary brand color for the rating stars.",
    },
]
---
::

### isDivided
Moves the author to the footer and sets a divider between the author and the message.

```vue
<template>
    <TestimonialCard 
        isDivided
    />
</template>
```

- **Type:** `boolean`
- **Default:** `false`