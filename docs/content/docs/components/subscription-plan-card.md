::component-code
---
srcDir: "cards/specific/subscription/SubscriptionPlanCard.vue"
props: 
    isActive: false
    isFeatured: false
    title: "Plan name"
    description: "Cancel whenever you want"
    monthlyAmount: 0
    yearlyAmount: 0
    currencySymbol: "€"
    featuredBadgeText: "Recommended"
    features: 
        - "Feature 1"
        - "Feature 2"
        - "Feature 3"        
    hasFeatureListSeparator: false
    isYearly: false
    monthlyText: "monthly"
    yearlyText: "yearly"
    showSelectButton: true
    selectButtonText: "Get started today"
    alignSelectButton: "center"
    buttonStyle: "neutral-filled"
    featuredButtonStyle: "primary-brand-filled"
items:
    buttonStyle:
        - value: primary-brand-filled
          text: PRIMARY_BRAND_FILLED
        - value: primary-brand-transparent
          text: PRIMARY_BRAND_TRANSPARENT
        - value: primary-brand-soft
          text: PRIMARY_BRAND_SOFT
        - value: secondary-brand-filled
          text: SECONDARY_BRAND_FILLED
        - value: neutral-outlined
          text: NEUTRAL_OUTLINED
        - value: neutral-transparent
          text: NEUTRAL_TRANSPARENT
        - value: neutral-transparent-subtle
          text: NEUTRAL_TRANSPARENT_SUBTLE
        - value: neutral-filled
          text: NEUTRAL_FILLED
        - value: delete-filled
          text: DELETE_FILLED
        - value: delete-outlined
          text: DELETE_OUTLINED
        - value: delete-soft
          text: DELETE_SOFT
        - value: delete-transparent
          text: DELETE_TRANSPARENT
    alignSelectButton: 
        - value: left
          text: LEFT
        - value: center
          text: CENTER
    featuredButtonStyle:
        - value: primary-brand-filled
          text: PRIMARY_BRAND_FILLED
        - value: primary-brand-transparent
          text: PRIMARY_BRAND_TRANSPARENT
        - value: primary-brand-soft
          text: PRIMARY_BRAND_SOFT
        - value: secondary-brand-filled
          text: SECONDARY_BRAND_FILLED
        - value: neutral-outlined
          text: NEUTRAL_OUTLINED
        - value: neutral-transparent
          text: NEUTRAL_TRANSPARENT
        - value: neutral-transparent-subtle
          text: NEUTRAL_TRANSPARENT_SUBTLE
        - value: neutral-filled
          text: NEUTRAL_FILLED
        - value: delete-filled
          text: DELETE_FILLED
        - value: delete-outlined
          text: DELETE_OUTLINED
        - value: delete-soft
          text: DELETE_SOFT
        - value: delete-transparent
          text: DELETE_TRANSPARENT
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
        "name": "isActive",
        "default": "false",
        "type": "boolean",
    }, 
    {
        "name": "isFeatured",
        "default": "false",
        "type": "boolean",
    }, 
    {
        "name": "title",
        "default": "'Plan name'",
        "type": "string",
    }, 
    {
        "name": "description",
        "default": "'Cancel whenever you want'",
        "type": "string",
    }, 
    {
        "name": "monthlyAmount",
        "default": "0",
        "type": "number",
    }, 
    {
        "name": "yearlyAmount",
        "default": "0",
        "type": "number",
    }, 
    {
        "name": "currencySymbol",
        "default": "'€'",
        "type": "string",
    }, 
    {
        "name": "featuredBadgeText",
        "default": "'Recommended'",
        "type": "string",
    }, 
    {
        "name": "features",
        "default": "An example array",
        "type": "string[]",
    }, 
    {
        "name": "hasFeatureListSeparator",
        "default": "false",
        "type": "boolean",
    }, 
    {
        "name": "isYearly",
        "default": "false",
        "type": "boolean",
    }, 
    {
        "name": "monthlyText",
        "default": "'monthly'",
        "type": "string",
    }, 
    {
        "name": "yearlyText",
        "default": "'yearly'",
        "type": "string",
    }, 
    {
        "name": "showSelectButton",
        "default": "true",
        "type": "boolean",
    }, 
    {
        "name": "selectButtonText",
        "default": "'Get started today'",
        "type": "string",
    }, 
    {
        "name": "alignSelectButton",
        "default": "Align.CENTER",
        "type": "Align",
    }, 
    {
        "name": "buttonStyle",
        "default": "ButtonStyleType.NEUTRAL_FILLED",
        "type": "ButtonStyleType",
    }, 
    {
        "name": "featuredButtonStyle",
        "default": "ButtonStyleType.PRIMARY_BRAND_FILLED",
        "type": "ButtonStyleType",
    },    
]
---
::


## Usage
### isActive
Sets the active state of the card. If true, the card will be marked with a check mark.

```vue
<template>
    <SubscriptionPlanCard 
        isActive
    />
</template>
```

- **Type:** `boolean`
- **Default:** `false`

### isFeatured
Sets the featured state of the card. If true, a featured badge will be displayed.

```vue
<template>
    <SubscriptionPlanCard 
        isFeatured
    />
</template>
```

- **Type:** `boolean`
- **Default:** `false`

### title
Sets the title of the card, which can be assigned to the plan name.

```vue
<template>
    <SubscriptionPlanCard 
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
    <SubscriptionPlanCard 
        description="Cancel whenever you want"
    />
</template>
```

- **Type:** `string`
- **Default:** `'Cancel whenever you want'`

### monthlyAmount
Sets the monthly amount of the plan.

```vue
<template>
    <SubscriptionPlanCard 
        monthlyAmount="0"
    />
</template>
```

- **Type:** `number`
- **Default:** `0`

### yearlyAmount
Sets the yearly amount of the plan.

```vue
<template>
    <SubscriptionPlanCard 
        yearlyAmount="0"
    />
</template>
```

- **Type:** `number`
- **Default:** `0`

### currencySymbol
Sets the currency symbol of the plan.

```vue
<template>
    <SubscriptionPlanCard 
        currencySymbol="€"
    />
</template>
```

- **Type:** `string`
- **Default:** `'€'`

### featuredBadgeText
Sets the text of the featured badge.

```vue
<template>
    <SubscriptionPlanCard 
        featuredBadgeText="Recommended"
    />
</template>
```

- **Type:** `string`
- **Default:** `'Recommended'`

### features
Sets the features of the plan.

```vue
<template>
    <SubscriptionPlanCard 
        :features="featureList"
    />
</template>
<script setup lang="ts">
const featureList = [
    'Feature 1',
    'Feature 2',
    'Feature 3'
]
</script>
```

- **Type:** `string[]`
- **Default:** `An example array`

### hasFeatureListSeparator
Sets the feature list separator.

```vue
<template>
    <SubscriptionPlanCard 
        hasFeatureListSeparator
    />
</template>
```

- **Type:** `boolean`
- **Default:** `false`

### isYearly
Sets the yearly state of the plan.

```vue
<template>
    <SubscriptionPlanCard 
        isYearly
    />
</template>
```

- **Type:** `boolean`
- **Default:** `false`

### monthlyText
Sets the monthly text of the plan.

```vue
<template>
    <SubscriptionPlanCard 
        monthlyText="monthly"
    />
</template>
```

- **Type:** `string`
- **Default:** `'monthly'`

### yearlyText
Sets the yearly text of the plan.

```vue
<template>
    <SubscriptionPlanCard 
        yearlyText="yearly"
    />
</template>
```

- **Type:** `string`
- **Default:** `'yearly'`

### showSelectButton
Sets the select button state of the plan.

```vue
<template>
    <SubscriptionPlanCard 
        showSelectButton
    />
</template>
```

- **Type:** `boolean`
- **Default:** `true`

### selectButtonText
Sets the select button text of the plan.

```vue
<template>
    <SubscriptionPlanCard 
        selectButtonText="Get started today"
    />
</template>
```

- **Type:** `string`
- **Default:** `'Get started today'`

### alignSelectButton
Sets the select button alignment of the plan. Uses the `Align` enum.

```vue
<template>
    <SubscriptionPlanCard 
        :alignSelectButton="Align.CENTER"
    />
</template>
```

- **Type:** `Align`
- **Default:** `Align.CENTER`

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

### buttonStyle
Sets the button style of the plan. Uses the `ButtonStyleType` enum.

```vue
<template>
    <SubscriptionPlanCard 
        :buttonStyle="ButtonStyleType.NEUTRAL_FILLED"
    />
</template>
```

### featuredButtonStyle
Sets the featured button style of the plan.

```vue
<template>
    <SubscriptionPlanCard 
        :featuredButtonStyle="ButtonStyleType.PRIMARY_BRAND_FILLED"
    />
</template>
```

#### Button style options

::options-table
---
options: [
    {
        value: "PRIMARY_BRAND_FILLED",
        description: "Primary brand filled",
    },
    {
        value: "PRIMARY_BRAND_TRANSPARENT",
        description: "Primary brand transparent",
    },
    {
        value: "PRIMARY_BRAND_SOFT",
        description: "Primary brand soft",
    },
    {
        value: "SECONDARY_BRAND_FILLED",
        description: "Secondary brand filled",
    },
    {
        value: "NEUTRAL_OUTLINED",
        description: "Neutral outlined",
    },
    {
        value: "NEUTRAL_TRANSPARENT",
        description: "Neutral transparent",
    },
    {
        value: "NEUTRAL_TRANSPARENT_SUBTLE",
        description: "Neutral transparent subtle",
    },
    {
        value: "NEUTRAL_FILLED",
        description: "Neutral filled",
    },
    {
        value: "DELETE_FILLED",
        description: "Delete filled",
    },
    {
        value: "DELETE_OUTLINED",
        description: "Delete outlined",
    },
    {
        value: "DELETE_SOFT",
        description: "Delete soft", 
    },
    {
        value: "DELETE_TRANSPARENT",
        description: "Delete transparent",
    },
]
---
::
