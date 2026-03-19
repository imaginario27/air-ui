## Component

::component-code
---
srcDir: 'forms/fields/RulesField.vue'
props:
    id: "rules-field-id"
    label: "Rules"
    helpText: "Build rule conditions to filter results"
    itemOptions:
        - value: "status"
          text: "Status"
          inputType: "text"
        - value: "age"
          text: "Age"
          inputType: "number"
    operatorOptions:
        - value: "eq"
          text: "Equals"
          applicableTypes: ["text", "number", "date", "email", "tel"]
        - value: "contains"
          text: "Contains"
          applicableTypes: ["text", "email", "tel", "url"]
        - value: "gt"
          text: "Greater than"
          applicableTypes: ["number", "date"]
        - value: "lt"
          text: "Less than"
          applicableTypes: ["number", "date"]
    modelValue:
        - item: "status"
          operator: "eq"
          value: "active"
          type: "text"
        - item: "age"
          operator: "gt"
          value: 21
          type: "number"
    itemPlaceholder: "Select item"
    operatorPlaceholder: "Select operator"
    valuePlaceholder: "Enter value"
    addIcon: "mdi:plus-circle-outline"
    removeIcon: "mdi:minus-circle-outline"
    mobileBtnAddText: "Add rule"
    mobileBtnRemoveText: "Remove rule"
    validator: null
    maxRules: 5
    error: ""
    disabled: false
    required: false
external:
  - itemOptions
  - operatorOptions
  - modelValue
externalTypes:
  - SelectOption[]
  - SelectOption[]
  - RuleItem[]
propsSettingsExcludedProps: ['validator', 'modelValue', 'itemOptions', 'operatorOptions']
isPreviewContentBoxed: true
previewContentMaxWidth: 920
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
        "name": "label",
        "type": "string",
    },
    {
        "name": "helpText",
        "type": "string",
    },
    {
        "name": "itemOptions",
        "default": "[]",
        "type": "SelectOption[]",
    },
    {
        "name": "operatorOptions",
        "default": "[]",
        "type": "SelectOption[]",
    },
    {
        "name": "modelValue",
        "default": "[]",
        "type": "RuleItem[]",
    },
    {
        "name": "itemPlaceholder",
        "default": "'Select item'",
        "type": "string",
    },
    {
        "name": "operatorPlaceholder",
        "default": "'Select operator'",
        "type": "string",
    },
    {
        "name": "valuePlaceholder",
        "default": "'Enter value'",
        "type": "string",
    },
    {
        "name": "addIcon",
        "default": "'mdi:plus-circle-outline'",
        "type": "string",
    },
    {
        "name": "removeIcon",
        "default": "'mdi:minus-circle-outline'",
        "type": "string",
    },
    {
        "name": "mobileBtnAddText",
        "default": "'Add rule'",
        "type": "string",
    },
    {
        "name": "mobileBtnRemoveText",
        "default": "'Remove rule'",
        "type": "string",
    },
    {
        "name": "validator",
        "type": "Function",
    },
    {
        "name": "maxRules",
        "type": "number",
    },
    {
        "name": "error",
        "default": "''",
        "type": "string",
    },
    {
        "name": "disabled",
        "default": "false",
        "type": "boolean",
    },
    {
        "name": "required",
        "default": "false",
        "type": "boolean",
    },
]
---
::

## Usage

### id

Sets the id prefix used internally by each row input (`item`, `operator`, `value`, `action`).

```vue
<template>
    <RulesField id="rules-field-id" />
</template>
```

- **Type:** `string`
- **Required:** `true`

### label

Sets the field label displayed above the rules rows.

```vue
<template>
    <RulesField id="rules" label="Rules" />
</template>
```

- **Type:** `string`

### helpText

Shows helper text below the field when there is no error.

```vue
<template>
    <RulesField
        id="rules"
        helpText="Build one or more conditions to filter records"
    />
</template>
```

- **Type:** `string`

### itemOptions

Defines the available options for the first select in each row (the "item" column).

```vue
<template>
    <RulesField
        id="rules"
        :itemOptions="itemOptions"
    />
</template>

<script setup lang="ts">
const itemOptions = [
    {
        value: 'status',
        text: 'Status',
    },
    {
        value: 'age',
        text: 'Age',
    },
]
</script>
```

- **Type:** `SelectOption[]`
- **Default:** `[]`

### operatorOptions

Defines the available options for the operator select in each row. You can optionally use `applicableTypes` to conditionally display operators based on the selected item's input type.

```vue
<template>
    <RulesField
        id="rules"
        :operatorOptions="operatorOptions"
    />
</template>

<script setup lang="ts">
const operatorOptions = [
    {
        value: 'eq',
        text: 'Equals',
        applicableTypes: ['text', 'number', 'date', 'email', 'tel'],
    },
    {
        value: 'contains',
        text: 'Contains',
        applicableTypes: ['text', 'email', 'tel', 'url'],
    },
    {
        value: 'gt',
        text: 'Greater than',
        applicableTypes: ['number', 'date'],
    },
    {
        value: 'lt',
        text: 'Less than',
        applicableTypes: ['number', 'date'],
    },
]
</script>
```

When `applicableTypes` is set on an operator, only operators matching the selected item's input type will be displayed. For example, "Greater than" will only show when you select a number or date field.

- **Type:** `SelectOption[]`
- **Default:** `[]`

### modelValue

Controls all rows in the rules field via `v-model`. Each row is represented by a `RuleItem`.

```vue
<template>
    <RulesField
        id="rules"
        :itemOptions="itemOptions"
        :operatorOptions="operatorOptions"
        v-model="rules"
    />
</template>

<script setup lang="ts">
const rules = ref([
    { item: 'status', operator: 'eq', value: 'active', type: 'text' },
    { item: 'age', operator: 'gt', value: 21, type: 'number' },
])
</script>
```

- **Type:** `RuleItem[]`
- **Default:** `[]`

#### TypeScript type and interface

```ts
type RuleValue = string | number | null

interface RuleItem {
    item: RuleValue
    operator: RuleValue
    value: RuleValue
    type?: AllowedInputType
}
```

`type` is forwarded to each row `InputField` `type` prop, so rows can use different input types.

```vue
<script setup lang="ts">
const rules = ref([
    { item: 'status', operator: 'eq', value: 'active', type: 'text' },
    { item: 'age', operator: 'gt', value: 21, type: 'number' },
    { item: 'startDate', operator: 'eq', value: '2026-03-18', type: 'date' },
])
</script>
```

### itemPlaceholder

Sets placeholder text for the item select in each row.

```vue
<template>
    <RulesField
        id="rules"
        itemPlaceholder="Choose a field"
    />
</template>
```

- **Type:** `string`
- **Default:** `'Select item'`

### operatorPlaceholder

Sets placeholder text for the operator select in each row.

```vue
<template>
    <RulesField
        id="rules"
        operatorPlaceholder="Choose a condition"
    />
</template>
```

- **Type:** `string`
- **Default:** `'Select operator'`

### valuePlaceholder

Sets placeholder text for the value input in each row.

```vue
<template>
    <RulesField
        id="rules"
        valuePlaceholder="Type comparison value"
    />
</template>
```

- **Type:** `string`
- **Default:** `'Enter value'`

### addIcon

Sets the icon used on the add-action button for the last row.

```vue
<template>
    <RulesField
        id="rules"
        addIcon="mdi:plus"
    />
</template>
```

- **Type:** `string`
- **Default:** `'mdi:plus-circle-outline'`

### removeIcon

Sets the icon used on remove-action buttons for non-last rows.

```vue
<template>
    <RulesField
        id="rules"
        removeIcon="mdi:minus"
    />
</template>
```

- **Type:** `string`
- **Default:** `'mdi:minus-circle-outline'`

### mobileBtnAddText

Sets the add button text shown on mobile rows.

```vue
<template>
    <RulesField
        id="rules"
        mobileBtnAddText="Add condition"
    />
</template>
```

- **Type:** `string`
- **Default:** `'Add rule'`

### mobileBtnRemoveText

Sets the remove button text shown on mobile rows.

```vue
<template>
    <RulesField
        id="rules"
        mobileBtnRemoveText="Remove condition"
    />
</template>
```

- **Type:** `string`
- **Default:** `'Remove rule'`

### validator

Validation callback for the whole rules array. Used together with `required` and `v-model:error`.

```vue
<template>
    <RulesField
        id="rules"
        :itemOptions="itemOptions"
        :operatorOptions="operatorOptions"
        v-model="rules"
        v-model:error="errorMessage"
        :required="true"
        :validator="validateRules"
    />
</template>
```

- **Type:** `Function`

### maxRules

Sets the maximum number of rules users can add in the UI.
When the limit is reached, the add action is disabled.

```vue
<template>
    <RulesField
        id="rules"
        :itemOptions="itemOptions"
        :operatorOptions="operatorOptions"
        v-model="rules"
        :maxRules="10"
    />
</template>
```

- **Type:** `number`

### error (v-model:error)

Displays error text below the field and applies error styling to the label.

```vue
<template>
    <RulesField
        id="rules"
        :itemOptions="itemOptions"
        :operatorOptions="operatorOptions"
        v-model="rules"
        v-model:error="errorMessage"
    />
</template>
```

- **Type:** `string`
- **Default:** `''`

### disabled

Disables all row controls and action buttons.

```vue
<template>
    <RulesField
        id="rules"
        :itemOptions="itemOptions"
        :operatorOptions="operatorOptions"
        v-model="rules"
        disabled
    />
</template>
```

- **Type:** `boolean`
- **Default:** `false`

### required

Enables validation execution together with `validator`.

```vue
<template>
    <RulesField
        id="rules"
        :itemOptions="itemOptions"
        :operatorOptions="operatorOptions"
        v-model="rules"
        :required="true"
        :validator="validateRules"
    />
</template>
```

- **Type:** `boolean`
- **Default:** `false`

## Full example

```vue
<template>
    <Form @submit="handleSubmit">
        <FormRow>
            <RulesField
                id="customer-rules"
                label="Customer filters"
                helpText="Add one or more conditions"
                :itemOptions="itemOptions"
                :operatorOptions="operatorOptions"
                v-model="formData.rules"
                v-model:error="formErrors.rules"
                itemPlaceholder="Select field"
                operatorPlaceholder="Select operator"
                valuePlaceholder="Enter value"
                addIcon="mdi:plus-circle-outline"
                removeIcon="mdi:minus-circle-outline"
                mobileBtnAddText="Add condition"
                mobileBtnRemoveText="Remove condition"
                :maxRules="10"
                :required="true"
                :validator="validateRules"
            />
        </FormRow>

        <FormActions>
            <ActionButton
                type="submit"
                text="Apply rules"
                :styleType="ButtonStyleType.PRIMARY_BRAND_FILLED"
            />
        </FormActions>
    </Form>
</template>

<script setup lang="ts">
const { $toast } = useNuxtApp()

const itemOptions = [
    {
        value: 'name',
        text: 'Name',
        inputType: 'text',
    },
    {
        value: 'age',
        text: 'Age',
        inputType: 'number',
    },
    {
        value: 'startDate',
        text: 'Start date',
        inputType: 'date',
    },
]

const operatorOptions = [
    {
        value: 'eq',
        text: 'Equals',
        applicableTypes: ['text', 'number', 'date'],
    },
    {
        value: 'contains',
        text: 'Contains',
        applicableTypes: ['text'],
    },
    {
        value: 'gt',
        text: 'Greater than',
        applicableTypes: ['number', 'date'],
    },
    {
        value: 'lt',
        text: 'Less than',
        applicableTypes: ['number', 'date'],
    },
]

const formData = reactive({
    rules: [
        {
            item: 'name',
            operator: 'contains',
            value: 'Ana',
            type: 'text',
        },
    ],
})

const validateRules = createRulesFieldValidator({
    required: true,
    maxRules: 10,
    requiredFieldMessage: 'Add at least one complete rule.',
    incompleteRuleMessage: 'Complete all rule fields before continuing.',
    maxRulesMessage: 'You can add up to 10 rules.',
})

const { formErrors, resetForm, validateFormFields } = useForm({
    formData,
    requiredFields: ['rules'],
    validators: {
        rules: validateRules,
    },
})

const handleSubmit = () => {
    const isValid = validateFormFields()

    if (!isValid) {
        $toast.error('Some fields contain errors', {
            toastId: 'rules-form-error',
        })
        return
    }

    $toast.success('Rules submitted successfully', {
        toastId: 'rules-form-success',
    })

    resetForm()
}
</script>
```

## Field behavior

- Click the `plus` icon on the last row to add a new empty rule.
- Click a `minus` icon on previous rows to remove that row.
- Press `Enter` in the last row value input to add a new row.
- Use `maxRules` to limit how many rules can be added from the UI.
- Use `addIcon` and `removeIcon` props to customize row action icons from a parent.
- Use `mobileBtnAddText` and `mobileBtnRemoveText` props to customize mobile row action button labels.
- Operator options are automatically filtered based on the selected item's input type. For example, if the item has `inputType: 'number'`, only operators with `applicableTypes` containing `'number'` will be displayed.
- When the item selection changes, the value field is automatically cleared, and the input type updates to match the new item's type.
