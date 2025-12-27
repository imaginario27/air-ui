## Component

::component-code
---
srcDir: "cards/specific/subscription/CurrentActiveSubscriptionCard.vue"
props: 
    title: "Current active plan"
    nextPaymentAmount: 0
    nextPaymentDate: "_"
    currencySymbol: "€"
    planName: "Plan name"
    planDescription: "Cancel whenever you want"
    changePlanLink: "/"
    changePlanButtonText: "Change plan"
    cancelButtonText: "Cancel subscription"
    isPlanCancelled: false
---
::
  
## Props

::props-table
---
props: [
    {
        "name": "title",
        "default": "Current active plan",
        "type": "string",
    }, 
    {
        "name": "nextPaymentAmount",
        "default": 0,
        "type": "number",
    },
    {
        "name": "nextPaymentDate",
        "default": "_",
        "type": "string",
    },
    {
        "name": "currencySymbol",
        "default": "€",
        "type": "string",
    },
    {
        "name": "planName",
        "default": "Plan name",
        "type": "string",
    },
    {
        "name": "planDescription",
        "default": "Cancel whenever you want",
        "type": "string",
    },
    {
        "name": "changePlanLink",
        "default": "/",
        "type": "string",
    },
    {
        "name": "changePlanButtonText",
        "default": "Change plan",
        "type": "string",
    },
    {
        "name": "cancelButtonText",
        "default": "Cancel subscription",
        "type": "string",
    },
    {
        "name": "isPlanCancelled",
        "default": "false",
        "type": "boolean",
    },
]
---
::


## Usage
### title
Sets the title of the card.

```vue
<template>
    <CurrentActiveSubscriptionCard 
        title="Current active plan"
    />
</template>
```

- **Type:** `string`
- **Default:** `'Current active plan'`

### nextPaymentAmount
Sets the amount of the next payment.

```vue
<template>
    <CurrentActiveSubscriptionCard 
        nextPaymentAmount="123"
    />
</template>
```

- **Type:** `number`
- **Default:** `0`

### nextPaymentDate
Sets the date of the next payment.

```vue
<template>
    <CurrentActiveSubscriptionCard 
        nextPaymentDate="2023-01-01"
    />
</template>
```

- **Type:** `string`
- **Default:** `'_'`

### currencySymbol
Sets the currency symbol.

```vue
<template>
    <CurrentActiveSubscriptionCard 
        currencySymbol="€"
    />
</template>
```

- **Type:** `string`
- **Default:** `'€'`

### planName
Sets the name of the plan.

```vue
<template>
    <CurrentActiveSubscriptionCard 
        planName="Plan name"
    />
</template>
```

- **Type:** `string`
- **Default:** `'Plan name'`

### planDescription
Sets the description of the plan.

```vue
<template>
    <CurrentActiveSubscriptionCard 
        planDescription="Cancel whenever you want"
    />
</template>
```

- **Type:** `string`
- **Default:** `'Cancel whenever you want'`

### changePlanLink
Sets the link to the change plan page.

```vue
<template>
    <CurrentActiveSubscriptionCard 
        changePlanLink="/"
    />
</template>
```

- **Type:** `string`
- **Default:** `'/'`

### changePlanButtonText
Sets the text of the change plan button.

```vue
<template>
    <CurrentActiveSubscriptionCard 
        changePlanButtonText="Change plan"
    />
</template>
```

- **Type:** `string`
- **Default:** `'Change plan'`

### cancelButtonText
Sets the text of the cancel subscription button.

```vue
<template>
    <CurrentActiveSubscriptionCard 
        cancelButtonText="Cancel subscription"
    />
</template>
```

- **Type:** `string`
- **Default:** `'Cancel subscription'`

### isPlanCancelled
Sets whether the plan is cancelled or not.

## Emits
::options-table
---
options: [
    {
        value: "@cancel",
        description: "Triggers a custom function when the cancel button is clicked.",
    },
    {
        value: "@undoCancellation",
        description: "Triggers a custom function when the undo cancellation button is clicked.",
    },
]
---
::

#### Example

```vue
<template>
    <CurrentActiveSubscriptionCard 
        @cancel="handleCancel"
        @undoCancellation="handleUndoCancellation"
    />
</template>
<script setup lang="ts">
const handleCancel = () => {
    console.log("Cancel button clicked")
}

const handleUndoCancellation = () => {
    console.log("Undo cancellation button clicked")
}
</script>
```