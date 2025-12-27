
## Component

::component-code
---
srcDir: 'layouts/Grid.vue'
props: 
    cols: 3
    tabletCols: 2
    mobileCols: 1
slots:
  default: ""
slotComponents:
  default:
    srcDir: 'placeholders/ContentPlaceholder.vue'
    multiple: true
    props:
      - text: "Insert action 1"
      - text: "Insert action 2"
      - text: "Insert action 3"
previewBackground: 'white'
---
::

## Props

::props-table
---
props: [
    {
        "name": "cols",
        "default": "3",
        "type": "number",
    },
    {
        "name": "tabletCols",
        "default": "2",
        "type": "number",
    },
    {
        "name": "mobileCols",
        "default": "1",
        "type": "number",
    },     
]
---
::

## Usage

### cols

Sets the number of columns for desktop viewports. 

**Max columns:** Up to 6 columns.

```vue
<template>
    <Grid :cols="4">
        ...
    </Grid>
</template>
```

- **Type:** `number`
- **Default:** `3`

### tabletCols

Sets the number of columns for tablet viewports. 

**Max columns:** Up to 4 columns.

```vue
<template>
    <Grid :tabletCols="3">
        ...
    </Grid>
</template>
```

- **Type:** `number`
- **Default:** `2`

### mobileCols

Sets the number of columns for mobile viewports.

**Max columns:** Up to 4 columns.

```vue
<template>
    <Grid :mobileCols="2">
        ...
    </Grid>
</template>
```

- **Type:** `number`
- **Default:** `1`

