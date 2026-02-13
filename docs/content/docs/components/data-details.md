## Component

::component-code
---
srcDir: 'content/demos/data-details/DataDetailsExample.vue'
isPreviewContentBoxed: true
previewContentMaxWidth: 800
isCodePreviewEnabled: false
componentSource: 'docs'
---
::

## Architecture
The `DataDetails` component provides a clean and consistent layout structure for building data details blocks.

It’s designed to work with the `DataDetailsRow`, `DataDetailsFieldGroup`, and `DataField` components to help organize fields and actions intuitively.

```vue
<template>
    <DataDetails>
        <DataDetailsRow>
            <DataField 
                id="first-name"
                label="First Name"
                text="John"
            />
            <DataField 
                id="last-name"
                label="Last Name"
                text="Doe"
            />
        </DataDetailsRow>

        <Divider hide-on-mobile />

        <DataDetailsRow>
            <DataField 
                id="email"
                label="Email"
                text="john.doe@example.com"
            />
        </DataDetailsRow>

        <Divider hide-on-mobile />

        <DataDetailsRow>
            <DataField
                id="phone"
                label="Phone"
            />
            <DataField 
                id="type"
                label="Type"
            >
                <Badge 
                    :color="ColorAccent.INFO" 
                    text="Mobile"
                />
            </DataField>
        </DataDetailsRow>

        <DataDetailsFieldGroup 
            title="Address Information"
        >
            <DataDetailsRow>
                <DataField 
                    id="address"
                    label="Address"
                    text="123 Main St, Springfield"
                />
                <DataField 
                    id="country"
                    label="Country"
                    text="USA"
                />
            </DataDetailsRow>

            <DataDetailsRow>
                <DataField 
                    id="city"
                    label="City"
                    text="Springfield"
                />
                <DataField 
                    id="zip"
                    label="ZIP Code"
                    text="12345"
                />
            </DataDetailsRow>
        </DataDetailsFieldGroup>
        <DataDetailsActions class="justify-end">
            <ActionButton 
                text="Edit"
                :iconPosition="IconPosition.LEFT"
                icon="mdi:pencil-outline"
                :styleType="ButtonStyleType.PRIMARY_BRAND_FILLED"
            />
            <ActionButton 
                text="Delete"
                :styleType="ButtonStyleType.DELETE_SOFT"
            />
        </DataDetailsActions>
    </DataDetails>
</template>
```

## Components
This set of components are used to create the layout of a form.

::components-table
---
components: [
    {
        name: "<DataDetailsRow>",
        description: "Wraps data fields in a row, ensuring proper spacing and alignment.",
    },
    {
        name: "<DataDetailsFieldGroup>",
        description: "Groups related data details fields under a common title.",
    },
    {
        name: "<DataField>",
        description: "Displays a label and corresponding read-only data value.",
    },
    {
        name: "<DataDetailsActions>",
        description: "Groups data details action buttons, such as Edit or Delete.",
    },
]
---
::

## Usage

### DataDetailsRow
The `DataDetailsRow` component is used to wrap data field components, ensuring proper spacing and alignment.

```vue
<template>
    <DataDetailsRow>
        <DataField 
            id="first-name"
            label="Full name"
            text="John Doe"
        />
    </DataDetailsRow>
    <DataDetailsRow>
        <DataField 
            id="full-name"
            label="Full name"
            text="John Doe"
        />
    </FormRow>
</template>
```

::props-table
---
props: [
    {
        "name": "spaced",
        "default": "false",
        "type": "boolean"
    },
]
---
::

#### spaced
Adds some extra vertifcal padding to the row.

```vue
<template>
    <FormRow spaced>
        ...
    </FormRow>
</template>
```

- **Type:** `boolean`
- **Default:** `false`

### DataDetailsFieldGroup
The `DataDetailsFieldGroup` component groups related data details fields under a common title.

```vue
<template>
    <DataDetailsFieldGroup title="Personal Information">
        <DataDetailsRow>
            <DataField 
                id="first-name"
                label="First Name"
                text="John"
            />
            <DataField 
                id="last-name"
                label="Last Name"
                text="Doe"
            />
        </DataDetailsRow>
    </DataDetailsFieldGroup>
</template>
```

::props-table
---
props: [
    {
        "name": "title",
        "default": "'Group title'",
        "type": "string"
    },
    {
        "name": "titleClass",
        "type": "string"
    },
    {
        "name": "headingTag",
        "default": "'h1'",
        "type": "'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'"
    },
]
---
::

#### title
The title of the field group.

```vue
<template>
    <DataDetailsFieldGroup title="Personal Information">
        ...
    </DataDetailsFieldGroup>
</template>
```

### DataDetailsActions
The `DataDetailsActions` component groups data details action buttons, such as Edit or Delete. On mobile devices, buttons stack vertically and their order can be customized via props.

```vue
<template>
    <DataDetailsActions>
        <ActionButton 
            text="Edit"
            :iconPosition="IconPosition.LEFT"
            icon="mdi:pencil-outline"
            :styleType="ButtonStyleType.PRIMARY_BRAND_FILLED"
        />
        <ActionButton 
            text="Delete"
            :styleType="ButtonStyleType.DELETE_SOFT"
        />
    </DataDetailsActions>
</template>
```

::props-table
---
props: [
    {
        "name": "reverseOnMobile",
        "default": "false",
        "type": "boolean"
    },
]
---
::

#### reverseOnMobile
Reverses the order of the buttons on mobile devices. 

```vue
<template>
    <FormActions reverseOnMobile>
        ...
    </FormActions>
</template>
```

- **Type:** `boolean`
- **Default:** `true`

### DataField
The `DataField` component displays a label and corresponding read-only data value.

Have a look at the [DataField documentation](./data-field) for more details on how to use this component.