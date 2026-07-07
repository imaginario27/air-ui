
## Component

::component-code
---
srcDir: 'forms/fields/Switch.vue'
props: 
    id: "switch-id"
    modelValue: false
    disabled: false
    size: "md"
    styleType: "brand"
items:
    size: 
        - value: xs
          text: XS
        - value: sm
          text: SM
        - value: md
          text: MD
        - value: lg
          text: LG
    styleType:
        - value: brand
          text: BRAND
        - value: success
          text: SUCCESS
external:
  - modelValue
externalTypes:
  - boolean
enums:
    size: "ControlFieldSize"
    styleType: "SwitchStyle"
isPreviewContentBoxed: true
previewContentMaxWidth: 400
---
::

## Props

::props-table
---
props: [
    {
        "name": "id",
        "required": "true",
        "type": "string",
    },
    {
        "name": "modelValue",
        "default": "false",
        "type": "boolean",
    },
    {
        "name": "disabled",
        "default": "false",
        "type": "boolean",
    },
    {
        "name": "size",
        "default": "ControlFieldSize.MD",
        "type": "ControlFieldSize",
    },
    {
        "name": "styleType",
        "default": "SwitchStyle.BRAND",
        "type": "SwitchStyle",
    },
]
---
::

## Usage

### id

Sets the id of the underlying native checkbox input.

```vue
<template>
    <Switch id="my-switch" />
</template>
```

- **Type:** `string`
- **Required:** `true`

### modelValue

Controls the checked state of the switch. Use `v-model` for two-way binding.

```vue
<template>
    <Switch id="my-switch" v-model="isEnabled" />
</template>
<script setup lang="ts">
const isEnabled = ref(false)
</script>
```

- **Type:** `boolean`
- **Default:** `false`

### disabled

Sets the disabled state of the switch. When disabled, clicks are ignored and the switch appearance reflects the inactive state.

```vue
<template>
    <Switch id="my-switch" disabled />
</template>
```

- **Type:** `boolean`
- **Default:** `false`

### size

Sets the size of the switch. It uses the `ControlFieldSize` enum.

```vue
<template>
    <Switch id="my-switch" :size="ControlFieldSize.LG" />
</template>
```

- **Type:** `ControlFieldSize`
- **Default:** `ControlFieldSize.MD`

#### Options
::options-table
---
options: [
    {
        value: "XS",
        description: "Extra Small",
    },
    {
        value: "SM",
        description: "Small",
    },
    {
        value: "MD",
        description: "Medium",
    },
    {
        value: "LG",
        description: "Large",
    },
]
---
::

### styleType

Sets the style type of the switch. It uses the `SwitchStyle` enum.

```vue
<template>
    <Switch id="my-switch" :styleType="SwitchStyle.SUCCESS" />
</template>
```

- **Type:** `SwitchStyle`
- **Default:** `SwitchStyle.BRAND`

#### Options
::options-table
---
options: [
    {
        value: "BRAND",
        description: "Uses the primary brand color for the background when the switch is on.",
    },
    {
        value: "SUCCESS",
        description: "Uses the success color for the background when the switch is on.",
    },
]
---
::
