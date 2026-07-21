## Component

::component-code
---
srcDir: 'cards/specific/MetricCard.vue'
props:
    styleType: "default"
    title: "Metric title"
    icon: "mdi:chart-line"
    backgroundIcon: ""
    backgroundIconPosition: "bottom"
    backgroundIconContainerClass: ""
    backgroundIconClass: ""
    iconContainerShape: "square"
    iconContainerSize: "sm"
    iconSize: "md"
    iconPosition: "left"
    defaultStyleIconColor: "neutral"
    defaultStyleIconContainerType: "filled"
    amount: "1327"
    unit: "/month"
    featuredDescription: "+120 vs last period"
    description: "Last 30 days"
    trend: "+12%"
    trendDirection: "up"
    trendIconSize: "sm"
    customFilledColorClass: "bg-background-neutral-bold"
    cardHeaderClass: ""
    cardBodyClass: ""
    cardTitleClass: ""
    amountClass: ""
    unitClass: ""
    descriptionWrapperClass: ""
    featuredDescriptionClass: ""
    descriptionClass: ""
    trendWrapperClass: ""
    trendTextClass: ""
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
    backgroundIconPosition:
        - value: top
          text: TOP
        - value: middle
          text: MIDDLE
        - value: bottom
          text: BOTTOM
    iconContainerShape:
        - value: circle
          text: CIRCLE
        - value: square
          text: SQUARE
    iconContainerSize:
        - value: 3xl
          text: XXXL
        - value: 2xl
          text: XXL
        - value: xl
          text: XL
        - value: lg
          text: LG
        - value: md
          text: MD
        - value: sm
          text: SM
    iconSize:
        - value: xs
          text: XS
        - value: sm
          text: SM
        - value: md
          text: MD
        - value: lg
          text: LG
        - value: xl
          text: XL
        - value: 2xl
          text: XXL
    iconPosition:
        - value: left
          text: LEFT
        - value: right
          text: RIGHT
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
    trendIconSize:
        - value: xs
          text: XS
        - value: sm
          text: SM
        - value: md
          text: MD
        - value: lg
          text: LG
        - value: xl
          text: XL
        - value: 2xl
          text: XXL
enums:
    styleType: "MetricCardStyle"
    backgroundIconPosition: "MetricCardBackgroundIconPosition"
    iconContainerShape: "IconContainerShape"
    iconContainerSize: "IconContainerSize"
    iconSize: "IconSize"
    iconPosition: "MetricCardIconPosition"
    defaultStyleIconColor: "ColorAccent"
    defaultStyleIconContainerType: "IconContainerStyleType"
    trendDirection: "MetricTrendDirection"
    trendIconSize: "IconSize"
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
        "default": "MetricCardStyle.DEFAULT",
        "type": "MetricCardStyle",
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
        "name": "backgroundIcon",
        "type": "string",
    },
    {
        "name": "backgroundIconPosition",
        "default": "MetricCardBackgroundIconPosition.MIDDLE",
        "type": "MetricCardBackgroundIconPosition",
    },
    {
        "name": "backgroundIconContainerClass",
        "type": "string",
    },
    {
        "name": "backgroundIconClass",
        "type": "string",
    },
    {
        "name": "iconContainerShape",
        "default": "IconContainerShape.SQUARE",
        "type": "IconContainerShape",
    },
    {
        "name": "iconContainerSize",
        "default": "IconContainerSize.SM",
        "type": "IconContainerSize",
    },
    {
        "name": "iconSize",
        "default": "IconSize.MD",
        "type": "IconSize",
    },
    {
        "name": "iconPosition",
        "default": "MetricCardIconPosition.LEFT",
        "type": "MetricCardIconPosition",
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
        "type": "string",
    },
    {
        "name": "trend",
        "type": "string",
    },
    {
        "name": "trendDirection",
        "default": "MetricTrendDirection.UP",
        "type": "MetricTrendDirection",
    },
    {
        "name": "customFilledColorClass",
        "default": "'bg-background-neutral-bold'",
        "type": "string",
    },
    {
        "name": "trendIconSize",
        "default": "IconSize.SM",
        "type": "IconSize",
    },
    {
        "name": "cardHeaderClass",
        "type": "string",
    },
    {
        "name": "cardBodyClass",
        "type": "string",
    },
    {
        "name": "cardTitleClass",
        "type": "string",
    },
    {
        "name": "amountClass",
        "type": "string",
    },
    {
        "name": "unitClass",
        "type": "string",
    },
    {
        "name": "descriptionWrapperClass",
        "type": "string",
    },
    {
        "name": "featuredDescriptionClass",
        "type": "string",
    },
    {
        "name": "descriptionClass",
        "type": "string",
    },
    {
        "name": "trendWrapperClass",
        "type": "string",
    },
    {
        "name": "trendTextClass",
        "type": "string",
    },
]
---
::

## Slots
::slots-table
---
slots: [
    {
        name: "rightTop",
        description: "Slot to render custom content on the right side of the card header, aligned with the title. Only rendered when `iconPosition` is `LEFT`.",
    },
    {
        name: "footer",
        description: "Slot to render custom content below the trend row, such as actions or supplementary details.",
    }
]
---
::

```vue
<template>
    <MetricCard
        title="Revenue"
        :amount="1327"
    >
        <template #rightTop>
            <Badge text="Live" />
        </template>

        <template #footer>
            <ActionButton
                text="View Details"
                :iconPosition="IconPosition.RIGHT"
                icon="mdi:arrow-right"
                :actionType="ButtonActionType.LINK"
                to="link"
            />
        </template>
    </MetricCard>
</template>
```

## Usage

### styleType
Sets the visual style of the card. It accepts values from the `MetricCardStyle` enum.

```vue
<template>
    <MetricCard
        :styleType="MetricCardStyle.PRIMARY_BRAND_SOFT"
    />
</template>
```

- **Type:** `MetricCardStyle`
- **Default:** `MetricCardStyle.DEFAULT`

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

### backgroundIcon
Sets an optional decorative icon rendered as a large, semi-transparent background element on the right side of the card. It is only displayed when provided and inherits its color from the active `styleType`. It is hidden from assistive technologies (`aria-hidden`).

```vue
<template>
    <MetricCard
        backgroundIcon="mdi:earth"
        :styleType="MetricCardStyle.PRIMARY_BRAND_FILLED"
        title="Global coverage"
        :amount="159"
        unit="M ha"
    />
</template>
```

- **Type:** `string`

### backgroundIconPosition
Sets the vertical alignment of the background icon inside the card. It accepts values from the `MetricCardBackgroundIconPosition` enum.

```vue
<template>
    <MetricCard
        backgroundIcon="mdi:earth"
        :backgroundIconPosition="MetricCardBackgroundIconPosition.TOP"
    />
</template>
```

- **Type:** `MetricCardBackgroundIconPosition`
- **Default:** `MetricCardBackgroundIconPosition.BOTTOM`

#### Options

::options-table
---
options: [
    {
        value: "TOP",
        description: "Aligns the background icon to the top of the card.",
    },
    {
        value: "MIDDLE",
        description: "Vertically centers the background icon within the card.",
    },
    {
        value: "BOTTOM",
        description: "Aligns the background icon to the bottom of the card.",
    },
]
---
::

### backgroundIconContainerClass
Appends Tailwind utility classes to the background icon wrapper element. Use it to override defaults such as `opacity-20` or to adjust position.

```vue
<template>
    <MetricCard
        backgroundIcon="mdi:earth"
        backgroundIconContainerClass="opacity-10"
    />
</template>
```

- **Type:** `string`

### backgroundIconClass
Appends Tailwind utility classes to the background `Icon` component. The defaults `w-[80px]! h-[80px]!` apply when this prop is omitted; values passed here are merged after the defaults, so they can override size.

```vue
<template>
    <MetricCard
        backgroundIcon="mdi:earth"
        backgroundIconClass="w-[120px]! h-[120px]!"
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

### iconContainerSize
Sets the size of the `ContainedIcon` container rendered for non-filled style types. It accepts values from the `IconContainerSize` enum and applies regardless of `iconPosition`.

```vue
<template>
    <MetricCard
        icon="mdi:chart-line"
        :iconContainerSize="IconContainerSize.MD"
    />
</template>
```

- **Type:** `IconContainerSize`
- **Default:** `IconContainerSize.SM`

#### Options

::options-table
---
options: [
    { value: "SM", description: "24 × 24 px container." },
    { value: "MD", description: "32 × 32 px container." },
    { value: "LG", description: "40 × 40 px container." },
    { value: "XL", description: "48 × 48 px container." },
    { value: "XXL", description: "56 × 56 px container." },
    { value: "XXXL", description: "80 × 80 px container." },
]
---
::

### iconSize
Sets the size of the plain icon rendered when using a filled `styleType`. It is passed as the `size` prop to the `Icon` component and applies regardless of `iconPosition`. Has no effect on non-filled styles, which use `iconContainerSize` instead. It accepts values from the `IconSize` enum.

```vue
<template>
    <MetricCard
        icon="mdi:chart-line"
        :styleType="MetricCardStyle.NEUTRAL_FILLED"
        :iconSize="IconSize.LG"
    />
</template>
```

- **Type:** `IconSize`
- **Default:** `IconSize.MD`

### iconPosition
Sets whether the icon appears before or after the title. It accepts values from the `MetricCardIconPosition` enum.

```vue
<template>
    <MetricCard
        icon="mdi:chart-line"
        :iconPosition="MetricCardIconPosition.RIGHT"
    />
</template>
```

- **Type:** `MetricCardIconPosition`
- **Default:** `MetricCardIconPosition.LEFT`

#### Options

::options-table
---
options: [
    {
        value: "LEFT",
        description: "Renders the icon before the title.",
    },
    {
        value: "RIGHT",
        description: "Renders the icon after the title.",
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
        unit="/month"
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
Sets an optional description rendered below the featured description. It is only displayed when provided.

```vue
<template>
    <MetricCard
        description="Last 30 days"
    />
</template>
```

- **Type:** `string`

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
Sets the direction of the trend, which determines both the icon and the text color. It accepts values from the `MetricTrendDirection` enum.

```vue
<template>
    <MetricCard
        trend="+12%"
        :trendDirection="MetricTrendDirection.UP"
    />
</template>
```

- **Type:** `MetricTrendDirection`
- **Default:** `MetricTrendDirection.UP`

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
        :styleType="MetricCardStyle.CUSTOM_FILLED"
        customFilledColorClass="bg-background-success-bold"
    />
</template>
```

- **Type:** `string`
- **Default:** `'bg-background-neutral-bold'`

### trendIconSize
Sets the size of the trend direction icon. It accepts values from the `IconSize` enum.

```vue
<template>
    <MetricCard
        trend="+12%"
        :trendIconSize="IconSize.MD"
    />
</template>
```

- **Type:** `IconSize`
- **Default:** `IconSize.SM`

### cardHeaderClass
Appends Tailwind utility classes to the `CardHeader` element.

```vue
<template>
    <MetricCard
        cardHeaderClass="pb-0"
    />
</template>
```

- **Type:** `string`

### cardBodyClass
Appends Tailwind utility classes to the `CardBody` element.

```vue
<template>
    <MetricCard
        cardBodyClass="flex-col"
    />
</template>
```

- **Type:** `string`

### cardTitleClass
Appends Tailwind utility classes to the `CardTitle` element.

```vue
<template>
    <MetricCard
        cardTitleClass="text-base"
    />
</template>
```

- **Type:** `string`

### amountClass
Appends Tailwind utility classes to the amount value span.

```vue
<template>
    <MetricCard
        :amount="1327"
        amountClass="text-4xl"
    />
</template>
```

- **Type:** `string`

### unitClass
Appends Tailwind utility classes to the unit span.

```vue
<template>
    <MetricCard
        unit="month"
        unitClass="text-base"
    />
</template>
```

- **Type:** `string`

### descriptionWrapperClass
Appends Tailwind utility classes to the wrapper element that contains both the featured description and the description.

```vue
<template>
    <MetricCard
        description="Last 30 days"
        descriptionWrapperClass="gap-1"
    />
</template>
```

- **Type:** `string`

### featuredDescriptionClass
Appends Tailwind utility classes to the featured description paragraph.

```vue
<template>
    <MetricCard
        featuredDescription="+120 vs last period"
        featuredDescriptionClass="text-text-success"
    />
</template>
```

- **Type:** `string`

### descriptionClass
Appends Tailwind utility classes to the description paragraph.

```vue
<template>
    <MetricCard
        description="Last 30 days"
        descriptionClass="text-text-neutral-subtle"
    />
</template>
```

- **Type:** `string`

### trendWrapperClass
Appends Tailwind utility classes to the trend row wrapper element.

```vue
<template>
    <MetricCard
        trend="+12%"
        trendWrapperClass="mt-1"
    />
</template>
```

- **Type:** `string`

### trendTextClass
Appends Tailwind utility classes to the trend label span.

```vue
<template>
    <MetricCard
        trend="+12%"
        trendTextClass="font-bold"
    />
</template>
```

- **Type:** `string`
