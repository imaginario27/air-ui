::component-code
---
srcDir: 'cards/specific/MetricCard.vue'
props: 
    title: "Metric title"
    value: "1327"
    description: "Metric description"
    align: "left"
items:
    align: 
        - value: left
          text: LEFT
        - value: center
          text: CENTER
---
::


## Props

::props-table
---
props: [
    {
        "name": "title",
        "default": "Card title",
        "type": "string",
    }, 
    {
        "name": "value",
        "default": 0,
        "type": "string | number",
    }, 
    {
        "name": "description",
        "type": "string",
    }, 
    {
        "name": "align",
        "default": "Align.LEFT",
        "type": "Align.LEFT | Align.CENTER",
    }
]
---
::

## Usage

### title
Sets the title of the metric card.

```vue
<template>
    <MetricCard 
        title="Metric title"
    />
</template>
```

- **Type:** `string`
- **Default:** `'CardTitle'`

### value
Sets the value of the metric.

```vue
<template>
    <MetricCard 
        :value="1327"
    />
</template>
```

- **Type:** `string | number`
- **Default:** `0`

### description
Sets the description of the metric. It is an optional value and will only be displayed if the description is passed through the props. 

```vue
<template>
    <MetricCard 
        description="Metric description"
    />
</template>
``` 

- **Type:** `string`

### align
Sets the horizontal alignment of the content. Uses the `Align` enum.

```vue
<template>
    <MetricCard 
        :align="Align.LEFT"
    />
</template>
```

- **Type:** `Align.LEFT | Align.CENTER`
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
