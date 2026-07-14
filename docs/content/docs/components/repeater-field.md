## Component

::component-code
---
srcDir: 'forms/fields/RepeaterField.vue'
props:
    id: "repeater-field-id"
    label: "Label"
    modelValue:
        - name: "First item"
        - name: "Second item"
    defaultValue:
        name: ""
    addItemAriaLabel: "Add item"
    removeItemAriaLabel: "Remove item"
    addButtonText: "Add item"
    removeButtonText: "Remove item"
    actionsOrientation: "vertical"
    sortingType: "none"
    moveUpAriaLabel: "Move item up"
    moveDownAriaLabel: "Move item down"
    moveUpButtonText: "Move up"
    moveDownButtonText: "Move down"
    dragHandleAriaLabel: "Drag to reorder item"
    moveUpIcon: "mdi:arrow-up"
    moveDownIcon: "mdi:arrow-down"
    dragHandleIcon: "mdi:drag-vertical"
    dragPlaceholderText: "Drop here"
    showDragPlaceholderText: true
    dragPlaceholderClass: ""
    dragPlaceholderTextClass: ""
    helpText: ""
    helpTextPosition: "bottom"
    error: ""
    required: false
    disabled: false
slots:
  default: ""
slotComponents:
  default:
    srcDir: 'placeholders/ContentPlaceholder.vue'
    props:
        text: "Insert row content here"
items:
    helpTextPosition:
        - value: top
          text: TOP
        - value: bottom
          text: BOTTOM
    actionsOrientation:
        - value: vertical
          text: VERTICAL
        - value: horizontal
          text: HORIZONTAL
    sortingType:
        - value: none
          text: NONE
        - value: buttons
          text: BUTTONS
        - value: drag
          text: DRAG
enums:
    helpTextPosition: "Position"
    actionsOrientation: "Orientation"
    sortingType: "RepeatingFieldSortingType"
external:
  - modelValue
  - defaultValue
externalTypes:
  - unknown[]
  - unknown
propsSettingsExcludedProps: ['validator', 'modelValue', 'defaultValue']
isPreviewContentBoxed: true
previewContentMaxWidth: 700
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
        "name": "modelValue",
        "default": "[]",
        "type": "unknown[]",
    },
    {
        "name": "defaultValue",
        "default": "{}",
        "type": "unknown",
    },
    {
        "name": "addItemAriaLabel",
        "default": "'Add item'",
        "type": "string",
    },
    {
        "name": "removeItemAriaLabel",
        "default": "'Remove item'",
        "type": "string",
    },
    {
        "name": "addButtonText",
        "default": "'Add item'",
        "type": "string",
    },
    {
        "name": "removeButtonText",
        "default": "'Remove item'",
        "type": "string",
    },
    {
        "name": "actionsOrientation",
        "default": "Orientation.VERTICAL",
        "type": "Orientation",
    },
    {
        "name": "sortingType",
        "default": "RepeatingFieldSortingType.NONE",
        "type": "RepeatingFieldSortingType",
    },
    {
        "name": "moveUpAriaLabel",
        "default": "'Move item up'",
        "type": "string",
    },
    {
        "name": "moveDownAriaLabel",
        "default": "'Move item down'",
        "type": "string",
    },
    {
        "name": "moveUpButtonText",
        "default": "'Move up'",
        "type": "string",
    },
    {
        "name": "moveDownButtonText",
        "default": "'Move down'",
        "type": "string",
    },
    {
        "name": "dragHandleAriaLabel",
        "default": "'Drag to reorder item'",
        "type": "string",
    },
    {
        "name": "moveUpIcon",
        "default": "'mdi:arrow-up'",
        "type": "string",
    },
    {
        "name": "moveDownIcon",
        "default": "'mdi:arrow-down'",
        "type": "string",
    },
    {
        "name": "dragHandleIcon",
        "default": "'mdi:drag-vertical'",
        "type": "string",
    },
    {
        "name": "dragPlaceholderText",
        "default": "'Drop here'",
        "type": "string",
    },
    {
        "name": "showDragPlaceholderText",
        "default": "true",
        "type": "boolean",
    },
    {
        "name": "dragPlaceholderClass",
        "type": "string",
    },
    {
        "name": "dragPlaceholderTextClass",
        "type": "string",
    },
    {
        "name": "helpText",
        "type": "string",
    },
    {
        "name": "helpTextPosition",
        "default": "Position.BOTTOM",
        "type": "Position",
    },
    {
        "name": "error",
        "default": "''",
        "type": "string",
    },
    {
        "name": "required",
        "default": "false",
        "type": "boolean",
    },
    {
        "name": "validator",
        "type": "Function",
    },
    {
        "name": "disabled",
        "default": "false",
        "type": "boolean",
    },
]
---
::

## Usage

### id

Sets the field identifier, used as the label's `for` target and exposed to the default slot so row controls can build their own unique ids.

```vue
<template>
    <RepeaterField
        id="members"
        v-slot="{ item, index, id }"
    >
        <InputField
            :id="`${id}-name-${index}`"
            :modelValue="item.name"
            @update:model-value="value => (item.name = value)"
        />
    </RepeaterField>
</template>
```

- **Type:** `string`
- **Required:** `true`

### label

Sets the field label displayed above the items.

```vue
<template>
    <RepeaterField
        id="members"
        label="Members"
        v-slot="{ item, index, id }"
    >
        <InputField
            :id="`${id}-name-${index}`"
            :modelValue="item.name"
            @update:model-value="value => (item.name = value)"
        />
    </RepeaterField>
</template>
```

- **Type:** `string`

### modelValue

Controls the list of items rendered by the repeater via `v-model`. Each entry is passed as-is to the default slot, so items can be any shape — an object, a string, a number, or anything your slot content knows how to render.

```vue
<template>
    <RepeaterField
        id="members"
        :defaultValue="{ name: '' }"
        v-model="items"
        v-slot="{ item, index, id }"
    >
        <InputField
            :id="`${id}-name-${index}`"
            :modelValue="item.name"
            @update:model-value="value => (item.name = value)"
        />
    </RepeaterField>
</template>

<script setup lang="ts">
const items = ref([{ name: 'First item' }])
</script>
```

- **Type:** `unknown[]`
- **Default:** `[]`

### defaultValue

Sets the value cloned into `modelValue` whenever a new item is added. When `modelValue` is empty, one clone of `defaultValue` is also used to seed the initial row.

```vue
<template>
    <RepeaterField
        id="members"
        :defaultValue="{ name: '', email: '' }"
        v-model="items"
        v-slot="{ item, index, id }"
    >
        <InputField
            :id="`${id}-name-${index}`"
            :modelValue="item.name"
            @update:model-value="value => (item.name = value)"
        />
    </RepeaterField>
</template>
```

- **Type:** `unknown`
- **Default:** `{}`

### addItemAriaLabel

Sets the accessible label for the add-item icon button, shown on the last row.

```vue
<template>
    <RepeaterField
        id="members"
        addItemAriaLabel="Add member"
        v-slot="{ item, index, id }"
    >
        <InputField
            :id="`${id}-name-${index}`"
            :modelValue="item.name"
            @update:model-value="value => (item.name = value)"
        />
    </RepeaterField>
</template>
```

- **Type:** `string`
- **Default:** `'Add item'`

### removeItemAriaLabel

Sets the accessible label for the remove-item icon button, shown on every row when there is more than one item.

```vue
<template>
    <RepeaterField
        id="members"
        removeItemAriaLabel="Remove member"
        v-slot="{ item, index, id }"
    >
        <InputField
            :id="`${id}-name-${index}`"
            :modelValue="item.name"
            @update:model-value="value => (item.name = value)"
        />
    </RepeaterField>
</template>
```

- **Type:** `string`
- **Default:** `'Remove item'`

### addButtonText

Sets the visible text on the add-item button rendered as a full-width `ActionButton` — shown at every breakpoint when `actionsOrientation` is `horizontal`, and as the mobile-only fallback when `actionsOrientation` is `vertical`.

```vue
<template>
    <RepeaterField
        id="members"
        addButtonText="Add member"
        v-slot="{ item, index, id }"
    >
        <InputField
            :id="`${id}-name-${index}`"
            :modelValue="item.name"
            @update:model-value="value => (item.name = value)"
        />
    </RepeaterField>
</template>
```

- **Type:** `string`
- **Default:** `'Add item'`

### removeButtonText

Sets the visible text on the remove-item button rendered as a full-width `ActionButton` — shown at every breakpoint when `actionsOrientation` is `horizontal`, and as the mobile-only fallback when `actionsOrientation` is `vertical`.

```vue
<template>
    <RepeaterField
        id="members"
        removeButtonText="Remove member"
        v-slot="{ item, index, id }"
    >
        <InputField
            :id="`${id}-name-${index}`"
            :modelValue="item.name"
            @update:model-value="value => (item.name = value)"
        />
    </RepeaterField>
</template>
```

- **Type:** `string`
- **Default:** `'Remove item'`

### actionsOrientation

Controls how the add/remove/move row actions are laid out. `vertical` (the default) places compact icon buttons in a column beside the slot content, which fits best when the slot content is short; on mobile it always falls back to a full-width `ActionButton` row below the content, stacked in a column, since a side column doesn't scale down well. `horizontal` always renders that same full-width button row below the content, at every breakpoint — a better fit when the slot content is tall or the row needs to stack regardless of screen size. It uses the `Orientation` enum.

```vue
<template>
    <RepeaterField
        id="members"
        :actionsOrientation="Orientation.HORIZONTAL"
        v-slot="{ item, index, id }"
    >
        <InputField
            :id="`${id}-name-${index}`"
            :modelValue="item.name"
            @update:model-value="value => (item.name = value)"
        />
    </RepeaterField>
</template>
```

- **Type:** `Orientation`
- **Default:** `Orientation.VERTICAL`

#### Options
::options-table
---
options: [
    {
        value: "VERTICAL",
        description: "vertical",
    },
    {
        value: "HORIZONTAL",
        description: "horizontal",
    },
]
---
::

### sortingType

Controls how users can reorder items. `none` disables reordering, `buttons` shows up/down icon buttons next to every row, and `drag` shows a drag handle for native drag-and-drop reordering with a dashed placeholder marking the drop position. Unlike a fixed-column field, every row is reorderable since there is no trailing add-row. It uses the `RepeatingFieldSortingType` enum.

```vue
<template>
    <RepeaterField
        id="members"
        :sortingType="RepeatingFieldSortingType.BUTTONS"
        v-model="items"
        v-slot="{ item, index, id }"
    >
        <InputField
            :id="`${id}-name-${index}`"
            :modelValue="item.name"
            @update:model-value="value => (item.name = value)"
        />
    </RepeaterField>
</template>
```

- **Type:** `RepeatingFieldSortingType`
- **Default:** `RepeatingFieldSortingType.NONE`

#### Options
::options-table
---
options: [
    {
        value: "NONE",
        description: "none",
    },
    {
        value: "BUTTONS",
        description: "buttons",
    },
    {
        value: "DRAG",
        description: "drag",
    },
]
---
::

### moveUpAriaLabel

Sets the accessible label for the move-item-up icon button, shown when `sortingType` is `buttons`.

```vue
<template>
    <RepeaterField
        id="members"
        :sortingType="RepeatingFieldSortingType.BUTTONS"
        moveUpAriaLabel="Move member up"
        v-slot="{ item, index, id }"
    >
        <InputField
            :id="`${id}-name-${index}`"
            :modelValue="item.name"
            @update:model-value="value => (item.name = value)"
        />
    </RepeaterField>
</template>
```

- **Type:** `string`
- **Default:** `'Move item up'`

### moveDownAriaLabel

Sets the accessible label for the move-item-down icon button, shown when `sortingType` is `buttons`.

```vue
<template>
    <RepeaterField
        id="members"
        :sortingType="RepeatingFieldSortingType.BUTTONS"
        moveDownAriaLabel="Move member down"
        v-slot="{ item, index, id }"
    >
        <InputField
            :id="`${id}-name-${index}`"
            :modelValue="item.name"
            @update:model-value="value => (item.name = value)"
        />
    </RepeaterField>
</template>
```

- **Type:** `string`
- **Default:** `'Move item down'`

### moveUpButtonText

Sets the visible text on the move-up button rendered as a full-width `ActionButton` in the horizontal/mobile row, shown when `sortingType` is `buttons`.

```vue
<template>
    <RepeaterField
        id="members"
        :sortingType="RepeatingFieldSortingType.BUTTONS"
        moveUpButtonText="Move member up"
        v-slot="{ item, index, id }"
    >
        <InputField
            :id="`${id}-name-${index}`"
            :modelValue="item.name"
            @update:model-value="value => (item.name = value)"
        />
    </RepeaterField>
</template>
```

- **Type:** `string`
- **Default:** `'Move up'`

### moveDownButtonText

Sets the visible text on the move-down button rendered as a full-width `ActionButton` in the horizontal/mobile row, shown when `sortingType` is `buttons`.

```vue
<template>
    <RepeaterField
        id="members"
        :sortingType="RepeatingFieldSortingType.BUTTONS"
        moveDownButtonText="Move member down"
        v-slot="{ item, index, id }"
    >
        <InputField
            :id="`${id}-name-${index}`"
            :modelValue="item.name"
            @update:model-value="value => (item.name = value)"
        />
    </RepeaterField>
</template>
```

- **Type:** `string`
- **Default:** `'Move down'`

### dragHandleAriaLabel

Sets the accessible label for the drag handle, shown when `sortingType` is `drag`.

```vue
<template>
    <RepeaterField
        id="members"
        :sortingType="RepeatingFieldSortingType.DRAG"
        dragHandleAriaLabel="Drag to reorder member"
        v-slot="{ item, index, id }"
    >
        <InputField
            :id="`${id}-name-${index}`"
            :modelValue="item.name"
            @update:model-value="value => (item.name = value)"
        />
    </RepeaterField>
</template>
```

- **Type:** `string`
- **Default:** `'Drag to reorder item'`

### moveUpIcon

Sets the icon used on the move-item-up button.

```vue
<template>
    <RepeaterField
        id="members"
        :sortingType="RepeatingFieldSortingType.BUTTONS"
        moveUpIcon="mdi:chevron-up"
        v-slot="{ item, index, id }"
    >
        <InputField
            :id="`${id}-name-${index}`"
            :modelValue="item.name"
            @update:model-value="value => (item.name = value)"
        />
    </RepeaterField>
</template>
```

- **Type:** `string`
- **Default:** `'mdi:arrow-up'`

### moveDownIcon

Sets the icon used on the move-item-down button.

```vue
<template>
    <RepeaterField
        id="members"
        :sortingType="RepeatingFieldSortingType.BUTTONS"
        moveDownIcon="mdi:chevron-down"
        v-slot="{ item, index, id }"
    >
        <InputField
            :id="`${id}-name-${index}`"
            :modelValue="item.name"
            @update:model-value="value => (item.name = value)"
        />
    </RepeaterField>
</template>
```

- **Type:** `string`
- **Default:** `'mdi:arrow-down'`

### dragHandleIcon

Sets the icon used on the drag handle.

```vue
<template>
    <RepeaterField
        id="members"
        :sortingType="RepeatingFieldSortingType.DRAG"
        dragHandleIcon="mdi:dots-grid"
        v-slot="{ item, index, id }"
    >
        <InputField
            :id="`${id}-name-${index}`"
            :modelValue="item.name"
            @update:model-value="value => (item.name = value)"
        />
    </RepeaterField>
</template>
```

- **Type:** `string`
- **Default:** `'mdi:drag-vertical'`

### dragPlaceholderText

Sets the text passed to the underlying `DragPlaceholder`'s `text` prop, shown in the dashed drop-position placeholder when `showDragPlaceholderText` is `true`.

```vue
<template>
    <RepeaterField
        id="members"
        :sortingType="RepeatingFieldSortingType.DRAG"
        dragPlaceholderText="Drop member here"
        v-slot="{ item, index, id }"
    >
        <InputField
            :id="`${id}-name-${index}`"
            :modelValue="item.name"
            @update:model-value="value => (item.name = value)"
        />
    </RepeaterField>
</template>
```

- **Type:** `string`
- **Default:** `'Drop here'`

### showDragPlaceholderText

Sets the `DragPlaceholder`'s `showText` prop, controlling whether `dragPlaceholderText` is rendered inside the drop-position placeholder shown when `sortingType` is `drag`.

```vue
<template>
    <RepeaterField
        id="members"
        :sortingType="RepeatingFieldSortingType.DRAG"
        :showDragPlaceholderText="true"
        v-slot="{ item, index, id }"
    >
        <InputField
            :id="`${id}-name-${index}`"
            :modelValue="item.name"
            @update:model-value="value => (item.name = value)"
        />
    </RepeaterField>
</template>
```

- **Type:** `boolean`
- **Default:** `true`

### dragPlaceholderClass

Sets the class applied to the `DragPlaceholder`'s root element, letting you override its default border, background, or spacing.

```vue
<template>
    <RepeaterField
        id="members"
        :sortingType="RepeatingFieldSortingType.DRAG"
        dragPlaceholderClass="border-border-primary-brand-default"
        v-slot="{ item, index, id }"
    >
        <InputField
            :id="`${id}-name-${index}`"
            :modelValue="item.name"
            @update:model-value="value => (item.name = value)"
        />
    </RepeaterField>
</template>
```

- **Type:** `string`

### dragPlaceholderTextClass

Sets the `DragPlaceholder`'s `textClass` prop, letting you override the default styling of `dragPlaceholderText` when `showDragPlaceholderText` is `true`.

```vue
<template>
    <RepeaterField
        id="members"
        :sortingType="RepeatingFieldSortingType.DRAG"
        :showDragPlaceholderText="true"
        dragPlaceholderTextClass="text-sm font-semibold"
        v-slot="{ item, index, id }"
    >
        <InputField
            :id="`${id}-name-${index}`"
            :modelValue="item.name"
            @update:model-value="value => (item.name = value)"
        />
    </RepeaterField>
</template>
```

- **Type:** `string`

### helpText

Shows helper text below the field when there is no error.

```vue
<template>
    <RepeaterField
        id="members"
        helpText="Add one or more members"
        v-slot="{ item, index, id }"
    >
        <InputField
            :id="`${id}-name-${index}`"
            :modelValue="item.name"
            @update:model-value="value => (item.name = value)"
        />
    </RepeaterField>
</template>
```

- **Type:** `string`

### helpTextPosition

Sets the position of the help text relative to the field. It uses the `Position` enum.

```vue
<template>
    <RepeaterField
        id="members"
        :helpTextPosition="Position.TOP"
        helpText="Appears above the field"
        v-slot="{ item, index, id }"
    >
        <InputField
            :id="`${id}-name-${index}`"
            :modelValue="item.name"
            @update:model-value="value => (item.name = value)"
        />
    </RepeaterField>
</template>
```

- **Type:** `Position`
- **Default:** `Position.BOTTOM`

#### Options
::options-table
---
options: [
    {
        value: "TOP",
        description: "top",
    },
    {
        value: "BOTTOM",
        description: "bottom",
    },
]
---
::

### error (v-model:error)

Displays error text below the field and applies error styling to the label.

```vue
<template>
    <RepeaterField
        id="members"
        v-model="items"
        v-model:error="errorMessage"
        v-slot="{ item, index, id }"
    >
        <InputField
            :id="`${id}-name-${index}`"
            :modelValue="item.name"
            @update:model-value="value => (item.name = value)"
        />
    </RepeaterField>
</template>

<script setup lang="ts">
const errorMessage = ref('')
</script>
```

- **Type:** `string`
- **Default:** `''`

### required

Enables validation execution together with `validator`.

```vue
<template>
    <RepeaterField
        id="members"
        v-model="items"
        v-model:error="errorMessage"
        :required="true"
        :validator="validateMembers"
        v-slot="{ item, index, id }"
    >
        <InputField
            :id="`${id}-name-${index}`"
            :modelValue="item.name"
            @update:model-value="value => (item.name = value)"
        />
    </RepeaterField>
</template>
```

- **Type:** `boolean`
- **Default:** `false`

### validator

Validation callback for the whole items array. Used together with `required` and `v-model:error`.

```vue
<template>
    <RepeaterField
        id="members"
        v-model="items"
        v-model:error="errorMessage"
        :required="true"
        :validator="validateMembers"
        v-slot="{ item, index, id }"
    >
        <InputField
            :id="`${id}-name-${index}`"
            :modelValue="item.name"
            @update:model-value="value => (item.name = value)"
        />
    </RepeaterField>
</template>

<script setup lang="ts">
const validateMembers = (value: unknown[]) => (value.length ? null : 'Add at least one member.')
</script>
```

- **Type:** `Function`

### disabled

Disables the drag handle, move buttons, and add/remove action buttons for every row.

```vue
<template>
    <RepeaterField
        id="members"
        disabled
        v-model="items"
        v-slot="{ item, index, id }"
    >
        <InputField
            :id="`${id}-name-${index}`"
            :modelValue="item.name"
            @update:model-value="value => (item.name = value)"
        />
    </RepeaterField>
</template>
```

- **Type:** `boolean`
- **Default:** `false`

## Slots

::slots-table
---
slots: [
    {
        name: "default",
        description: "Template rendered for each item; can contain any content, from a single input to a full multi-field row.",
    },
]
---
::

### Slot exposed props

```vue
<template>
    <RepeaterField
        id="members"
        v-model="items"
        v-slot="{ item, index, id }"
    >
        <InputField
            :id="`${id}-item-${index}`"
            :ariaLabel="`Item ${index + 1}`"
            :modelValue="item.name"
            @update:model-value="value => (item.name = value)"
        />
    </RepeaterField>
</template>
```

The slot exposes: `item`, `index`, `id`.

## Full example

```vue
<template>
    <Form @submit="handleSubmit">
        <FormRow>
            <RepeaterField
                id="members"
                label="Team members"
                helpText="Add one or more members"
                :defaultValue="{ name: '', email: '' }"
                v-model="formData.members"
                v-model:error="formErrors.members"
                :sortingType="RepeatingFieldSortingType.DRAG"
                :required="true"
                :validator="validateMembers"
                v-slot="{ item, index, id }"
            >
                <div class="flex flex-col gap-2">
                    <InputField
                        :id="`${id}-name-${index}`"
                        :ariaLabel="`Member ${index + 1} name`"
                        placeholder="Name"
                        :modelValue="item.name"
                        @update:model-value="value => (item.name = value)"
                    />
                    <InputField
                        :id="`${id}-email-${index}`"
                        :ariaLabel="`Member ${index + 1} email`"
                        type="email"
                        placeholder="Email"
                        :modelValue="item.email"
                        @update:model-value="value => (item.email = value)"
                    />
                </div>
            </RepeaterField>
        </FormRow>

        <FormActions>
            <ActionButton
                type="submit"
                text="Save members"
                :styleType="ButtonStyleType.PRIMARY_BRAND_FILLED"
            />
        </FormActions>
    </Form>
</template>

<script setup lang="ts">
const { $toast } = useNuxtApp()

const formData = reactive({
    members: [{ name: '', email: '' }],
})

const validateMembers = (value: { name: string, email: string }[]) =>
    value.every(member => member.name && member.email) ? null : 'Complete all member fields.'

const { formErrors, resetForm, validateFormFields } = useForm({
    formData,
    requiredFields: ['members'],
    validators: {
        members: validateMembers,
    },
})

const handleSubmit = () => {
    const isValid = validateFormFields()

    if (!isValid) {
        $toast.error('Some fields contain errors', {
            toastId: 'members-form-error',
        })
        return
    }

    $toast.success('Members saved successfully', {
        toastId: 'members-form-success',
    })

    resetForm()
}
</script>
```

## Field behavior

- Click the `plus` icon (or `addButtonText` button) on the last row to add a new item cloned from `defaultValue`.
- Click the `minus` icon (or `removeButtonText` button) on any row to remove it; the button is hidden when only one item remains.
- Set `actionsOrientation` to `horizontal` when the slot content is tall or otherwise doesn't fit well next to a compact icon column — it moves add/remove/move actions to a full-width `ActionButton` row below the content, at every breakpoint, stacked in a column on mobile. The default `vertical` keeps a compact icon column beside the content on desktop, and falls back to the same full-width row automatically on mobile.
- Set `sortingType` to `buttons` or `drag` to allow reordering items; unlike a fixed-column field, every row is reorderable since there is no trailing add-row.
- In `drag` mode, drag the handle icon at the start of a row to reorder it; a dashed placeholder shows the drop position while dragging. The handle is a focusable button — press `ArrowUp`/`ArrowDown` while it's focused to reorder without a mouse.
- The drop-position placeholder is a `DragPlaceholder`; use `dragPlaceholderClass` to restyle its root element, and `dragPlaceholderText` with `dragPlaceholderTextClass` to label and style the text shown when `showDragPlaceholderText` is `true`.
- The default slot can render anything: a single control, a multi-field row, or a nested component — the repeater only manages add, remove, and reorder around it. Use the exposed `id` slot prop to build unique ids for each row's controls.
