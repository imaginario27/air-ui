## Component

::component-code
---
srcDir: 'cards/specific/MetricCard.vue'
props:
    styleType: "default"
    title: "Metric title"
    icon: "mdi:chart-line"
    iconContainerShape: "square"
    defaultStyleIconColor: "neutral"
    defaultStyleIconContainerType: "filled"
    amount: "1327"
    unit: "month"
    featuredDescription: "+120 vs last period"
    description: "Metric description"
    trend: "+12%"
    trendDirection: "up"
    customFilledColorClass: "bg-background-neutral-bold"
items:
    styleType:
        - value: default
          text: DEFAULT
        - value: primary-brand-filled
          text: PRIMARY_BRAND_FILLED
        - value: primary-brand-soft
          text: PRIMARY_BRAND_SOFT
        - value: secondary-brand-filled
          text: SECONDARY_BRAND_FILLED
        - value: secondary-brand-soft
          text: SECONDARY_BRAND_SOFT
        - value: neutral-filled
          text: NEUTRAL_FILLED
        - value: neutral-soft
          text: NEUTRAL_SOFT
        - value: custom-filled
          text: CUSTOM_FILLED
    iconContainerShape:
        - value: circle
          text: CIRCLE
        - value: square
          text: SQUARE
    defaultStyleIconColor:
        - value: neutral
          text: NEUTRAL
        - value: success
          text: SUCCESS
        - value: warning
          text: WARNING
        - value: danger
          text: DANGER
        - value: info
          text: INFO
        - value: primary-brand
          text: PRIMARY_BRAND
        - value: secondary-brand
          text: SECONDARY_BRAND
    defaultStyleIconContainerType:
        - value: flat
          text: FLAT
        - value: filled
          text: FILLED
    trendDirection:
        - value: up
          text: UP
        - value: down
          text: DOWN
        - value: neutral
          text: NEUTRAL
enums:
    styleType: "DashboardMetricCardStyle"
    iconContainerShape: "IconContainerShape"
    defaultStyleIconColor: "ColorAccent"
    defaultStyleIconContainerType: "IconContainerStyleType"
    trendDirection: "DashboardMetricTrendDirection"
previewBackground: 'white'
previewContentMaxWidth: 360
---
::

## Props

::props-table
---
props: [
    {
        "name": "styleType",
        "default": "DashboardMetricCardStyle.DEFAULT",
        "type": "DashboardMetricCardStyle",
    },
    {
        "name": "title",
        "default": "'Metric title'",
        "type": "string",
    },
    {
        "name": "icon",
        "type": "string",
    },
    {
        "name": "iconContainerShape",
        "default": "IconContainerShape.SQUARE",
        "type": "IconContainerShape",
    },
    {
        "name": "defaultStyleIconColor",
        "default": "ColorAccent.NEUTRAL",
        "type": "ColorAccent",
    },
    {
        "name": "defaultStyleIconContainerType",
        "default": "IconContainerStyleType.FILLED",
        "type": "IconContainerStyleType",
    },
    {
        "name": "amount",
        "default": 0,
        "type": "string | number",
    },
    {
        "name": "unit",
        "type": "string",
    },
    {
        "name": "featuredDescription",
        "type": "string",
    },
    {
        "name": "description",
        "default": "'Metric description'",
        "type": "string",
    },
    {
        "name": "trend",
        "type": "string",
    },
    {
        "name": "trendDirection",
        "default": "DashboardMetricTrendDirection.UP",
        "type": "DashboardMetricTrendDirection",
    },
    {
        "name": "customFilledColorClass",
        "default": "'bg-background-neutral-bold'",
        "type": "string",
    },
]
---
::

## Usage

### styleType
Sets the visual style of the card. It accepts values from the `DashboardMetricCardStyle` enum.

```vue
<template>
    <MetricCard
        :styleType="DashboardMetricCardStyle.PRIMARY_BRAND_SOFT"
    />
</template>
```

- **Type:** `DashboardMetricCardStyle`
- **Default:** `DashboardMetricCardStyle.DEFAULT`

#### Options

::options-table
---
options: [
    {
        value: "DEFAULT",
        description: "Neutral surface background with default text color.",
    },
    {
        value: "PRIMARY_BRAND_FILLED",
        description: "Filled primary brand background with on-filled text color.",
    },
    {
        value: "PRIMARY_BRAND_SOFT",
        description: "Soft primary brand background with brand-on-soft text color.",
    },
    {
        value: "SECONDARY_BRAND_FILLED",
        description: "Filled secondary brand background with on-filled text color.",
    },
    {
        value: "SECONDARY_BRAND_SOFT",
        description: "Soft secondary brand background with brand-on-soft text color.",
    },
    {
        value: "NEUTRAL_FILLED",
        description: "Filled neutral-bold background with on-filled text color.",
    },
    {
        value: "NEUTRAL_SOFT",
        description: "Subtle neutral background with on-neutral text color.",
    },
    {
        value: "CUSTOM_FILLED",
        description: "Applies the class provided through `customFilledColorClass` as the background.",
    },
]
---
::

### title
Sets the title of the metric card.

```vue
<template>
    <MetricCard
        title="Revenue"
    />
</template>
```

- **Type:** `string`
- **Default:** `'Metric title'`

### icon
Sets the icon shown in the card header. When using a filled `styleType`, it renders as a plain icon; otherwise it is wrapped in a `ContainedIcon`.

```vue
<template>
    <MetricCard
        icon="mdi:chart-line"
    />
</template>
```

- **Type:** `string`

### iconContainerShape
Sets the shape of the icon container when `styleType` is `DEFAULT`. It accepts values from the `IconContainerShape` enum and has no effect on other style types (which always render with a square container).

```vue
<template>
    <MetricCard
        icon="mdi:chart-line"
        :iconContainerShape="IconContainerShape.CIRCLE"
    />
</template>
```

- **Type:** `IconContainerShape`
- **Default:** `IconContainerShape.SQUARE`

#### Options

::options-table
---
options: [
    {
        value: "CIRCLE",
        description: "Renders the icon inside a circular container.",
    },
    {
        value: "SQUARE",
        description: "Renders the icon inside a square container.",
    },
]
---
::

### defaultStyleIconColor
Sets the icon color when `styleType` is `DEFAULT`. It accepts values from the `ColorAccent` enum and has no effect on other style types.

```vue
<template>
    <MetricCard
        :defaultStyleIconColor="ColorAccent.SUCCESS"
    />
</template>
```

- **Type:** `ColorAccent`
- **Default:** `ColorAccent.NEUTRAL`

#### Options

::options-table
---
options: [
    {
        value: "NEUTRAL",
        description: "Neutral accent.",
    },
    {
        value: "SUCCESS",
        description: "Success accent.",
    },
    {
        value: "WARNING",
        description: "Warning accent.",
    },
    {
        value: "DANGER",
        description: "Danger accent.",
    },
    {
        value: "INFO",
        description: "Info accent.",
    },
    {
        value: "PRIMARY_BRAND",
        description: "Primary brand accent.",
    },
    {
        value: "SECONDARY_BRAND",
        description: "Secondary brand accent.",
    },
]
---
::

### defaultStyleIconContainerType
Sets the style type of the icon container when `styleType` is `DEFAULT`. It accepts values from the `IconContainerStyleType` enum and has no effect on other style types.

```vue
<template>
    <MetricCard
        icon="mdi:chart-line"
        :defaultStyleIconContainerType="IconContainerStyleType.FLAT"
    />
</template>
```

- **Type:** `IconContainerStyleType`
- **Default:** `IconContainerStyleType.FILLED`

#### Options

::options-table
---
options: [
    {
        value: "FLAT",
        description: "Renders the icon container with a flat, transparent background.",
    },
    {
        value: "FILLED",
        description: "Renders the icon container with a filled background.",
    },
]
---
::

### amount
Sets the main metric value displayed prominently in the card body.

```vue
<template>
    <MetricCard
        :amount="1327"
    />
</template>
```

- **Type:** `string | number`
- **Default:** `0`

### unit
Sets an optional unit shown next to the amount (e.g. `/month`). It is only rendered when provided.

```vue
<template>
    <MetricCard
        :amount="80"
        unit="month"
    />
</template>
```

- **Type:** `string`

### featuredDescription
Sets an optional highlighted description rendered above the regular description in a stronger weight. It is only displayed when provided.

```vue
<template>
    <MetricCard
        featuredDescription="+120 vs last period"
    />
</template>
```

- **Type:** `string`

### description
Sets the description of the metric.

```vue
<template>
    <MetricCard
        description="Last 30 days"
    />
</template>
```

- **Type:** `string`
- **Default:** `'Metric description'`

### trend
Sets an optional trend label rendered next to a directional icon. The trend row is only displayed when this prop is provided.

```vue
<template>
    <MetricCard
        trend="+12%"
    />
</template>
```

- **Type:** `string`

### trendDirection
Sets the direction of the trend, which determines both the icon and the text color. It accepts values from the `DashboardMetricTrendDirection` enum.

```vue
<template>
    <MetricCard
        trend="+12%"
        :trendDirection="DashboardMetricTrendDirection.UP"
    />
</template>
```

- **Type:** `DashboardMetricTrendDirection`
- **Default:** `DashboardMetricTrendDirection.UP`

#### Options

::options-table
---
options: [
    {
        value: "UP",
        description: "Upward arrow with success color (or on-filled color on filled styles).",
    },
    {
        value: "DOWN",
        description: "Downward arrow with error color (or on-filled color on filled styles).",
    },
    {
        value: "NEUTRAL",
        description: "Minus icon with neutral-subtle color (or on-filled color on filled styles).",
    },
]
---
::

### customFilledColorClass
Sets the Tailwind background class applied when `styleType` is `CUSTOM_FILLED`. Use it to render the card with a custom filled background.

```vue
<template>
    <MetricCard
        :styleType="DashboardMetricCardStyle.CUSTOM_FILLED"
        customFilledColorClass="bg-background-success-bold"
    />
</template>
```

- **Type:** `string`
- **Default:** `'bg-background-neutral-bold'`
