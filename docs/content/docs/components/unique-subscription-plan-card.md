::component-code
---
srcDir: "cards/specific/subscription/UniqueSubscriptionPlanCard.vue"
props: 
    title: "Plan name"
    description: "Plan description"
    features: 
        - "Feature 1"
        - "Feature 2"
        - "Feature 3"
        - "Feature 4"
        - "Feature 5"
        - "Feature 6"
        - "Feature 7"
        - "Feature 8"
    overtitle: "Over title"
    price: "0€"
    buttonText: "Get started today"
emits:
    click: "() => console.log('Button clicked')"
external:
    - features
propsSettingsExcludedProps: ['features']

---
::

## Props

::props-table
---
props: [
    {
        "name": "title",
        "default": "'Plan name'",
        "type": "string",
    },  
    {
        "name": "description",
        "default": "'Plan description'",
        "type": "string",
    },  
    {
        "name": "features",
        "default": "An example array",
        "type": "array",
    },  
    {
        "name": "overtitle",
        "type": "string",
    },  
    {
        "name": "price",
        "default": "'0€'",
        "type": "string",
    },  
    {
        "name": "buttonText",
        "default": "'Get started today'",
        "type": "string",
    },  
]
---
::


## Usage
### title
Sets the title of the plan.

```vue
<template>
    <UniqueSubscriptionPlanCard 
        title="Plan name"
    />
</template>
```
- **Type:** `string`
- **Default:** `'Plan name'`

### description
Sets the description of the plan.

```vue
<template>
    <UniqueSubscriptionPlanCard 
        description="Plan description"
    />
</template>
```
- **Type:** `string`
- **Default:** `'Plan description'`

### features
Sets the features of the plan.

```vue
<template>
    <UniqueSubscriptionPlanCard 
        :features="exampleFeatures"
    />
</template>
<script setup lang="ts">
const exampleFeatures = ref([
    "Feature 1",
    "Feature 2",
    "Feature 3",
    "Feature 4",
    "Feature 5",
    "Feature 6",
    "Feature 7",
    "Feature 8",
])
</script>
```
- **Type:** `array`
- **Default:** `An example array`

### overtitle
Sets the over title of the plan. It does not get displayed if it is not passed throug props.

```vue
<template>
    <UniqueSubscriptionPlanCard 
        overtitle="Over title"
    />
</template>
```
- **Type:** `string`

### price
Sets the price of the plan.

```vue
<template>
    <UniqueSubscriptionPlanCard 
        price="0€"
    />
</template>
```
- **Type:** `string`
- **Default:** `'0€'`

### buttonText
Sets the button text of the call to action.

```vue
<template>
    <UniqueSubscriptionPlanCard 
        buttonText="Get started today"
    />
</template>
```
- **Type:** `string`
- **Default:** `'Get started today'`

## Emits
::options-table
---
options: [
    {
        value: "@click",
        description: "Triggers a callback function when the CTA button is clicked.",
    },
]
---
::

#### Example

```vue
<template>
    <UniqueSubscriptionPlanCard 
        @click="handleCTAClick"
    />
</template>
<script setup lang="ts">
const handleCTAClick = () => {
    console.log("Button clicked")
}
</script>
```