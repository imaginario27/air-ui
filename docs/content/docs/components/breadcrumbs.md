## Component

::component-code
---
srcDir: 'breadcrumbs/Breadcrumbs.vue'
props: 
    showHome: true
    homeIcon: "mdi:home-outline"
    separatorIcon: "mdi:chevron-right"
    includeCurrent: false
    customRoute: null
    homeIconClass: ""
    separatorClass: ""
    crumbClass: ""
    currentCrumbClass: ""
previewBackground: 'white'
---
::

## Props

::props-table
---
props: [
    {
        "name": "showHome",
        "default": "true",
        "type": "boolean",  
    },
    {
        "name": "homeIcon",
        "default": "'mdi:home-outline'",
        "type": "string",  
    },
    {
        "name": "separatorIcon",
        "default": "'mdi:chevron-right'",
        "type": "string",  
    },
    {
        "name": "includeCurrent",
        "default": "false",
        "type": "boolean",  
    },
    {
        "name": "customRoute",
        "default": "null",
        "type": "string | null | undefined",
    },
    {
        "name": "homeIconClass",
        "default": "''",
        "type": "string",  
    },
    {
        "name": "separatorClass",
        "default": "''",
        "type": "string",  
    },
    {
        "name": "crumbClass",
        "default": "''",
        "type": "string",  
    },
    {
        "name": "currentCrumbClass",
        "default": "''",
        "type": "string",  
    },
]
---
::

## Usage
### showHome

Determines whether to display the home icon at the beginning of the breadcrumbs.

```vue
<template>
    <Breadcrumbs showHome />
</template>
```

- **Type:** `boolean`
- **Default:** `true`

### homeIcon

Specifies the icon to be used for the home link in the breadcrumbs.

```vue
<template>
    <Breadcrumbs homeIcon="mdi:home-outline" /> 
</template>
```

- **Type:** `string`
- **Default:** `'mdi:home-outline'`

## separatorIcon

Specifies the icon to be used as a separator between breadcrumb items.

```vue
<template>
    <Breadcrumbs separatorIcon="mdi:chevron-right" />
</template>
```

- **Type:** `string`
- **Default:** `'mdi:chevron-right'`

### includeCurrent

Determines whether to include the current page in the breadcrumb trail.

```vue
<template>
    <Breadcrumbs :includeCurrent="false" />
</template>
```

- **Type:** `boolean`
- **Default:** `false`

### customRoute
Allows you to specify a custom route for generating breadcrumbs instead of using the current route.

```vue
<template>
    <Breadcrumbs customRoute="/custom/path" />
</template>
```

- **Type:** `string | null | undefined`
- **Default:** `null`

### homeIconClass

Applies custom CSS classes to the home icon.

```vue
<template>
    <Breadcrumbs homeIconClass="custom-home-icon" />
</template>
```

- **Type:** `string`
- **Default:** `''`

### separatorClass

Applies custom CSS classes to the separator icon.

```vue
<template>
    <Breadcrumbs separatorClass="custom-separator" />
</template>
```

- **Type:** `string`
- **Default:** `''`

### crumbClass

Applies custom CSS classes to each breadcrumb item.

```vue
<template>
    <Breadcrumbs crumbClass="custom-crumb" />
</template>
```

- **Type:** `string`
- **Default:** `''`

### currentCrumbClass

Applies custom CSS classes to the current breadcrumb item.

```vue
<template>
    <Breadcrumbs currentCrumbClass="custom-current-crumb" />
</template>
```

- **Type:** `string`
- **Default:** `''`