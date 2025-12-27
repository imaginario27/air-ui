## Component

::component-code
---
srcDir: 'content/demos/layouts/BasicSection.vue'
previewBackground: "white"
isCodePreviewEnabled: false
componentSource: 'docs'
---
::

## Architecture
The `Section` component provides a structured layout for organizing content into distinct sections.

```vue
<template>
    <Section>
        <SectionHeader>
            <!-- Section header content such as title or actions -->
            <SectionTitle title="Basic Section Layout" />

            <!-- 
                You can also use the <Heading> component or any custom code here 

                <Heading 
                    headingTag="h2" 
                    title="Custom Section Title"
                />
            -->
        </SectionHeader>
        <SectionBody>
            <!-- Section body content goes here -->
            <ContentPlaceholder 
                text="This is a basic section content"
            />
        </SectionBody>
    </Section>
</template>
```

## Components
This set of components are used to create the layout of a form.

::components-table
---
components: [
    {
        name: "<Section>",
        description: "Wraps the entire section, providing structure and styling.",
    },
    {
        name: "<SectionHeader>",
        description: "Defines the header area of the section, typically containing titles or actions.",
    },
    {
        name: "<SectionTitle>",
        description: "Displays the title of the section within the header. Can be replaced with the <Heading> component or any other custom piece of code.",
    },
    {
        name: "<SectionBody>",
        description: "Contains the main content of the section.",
    },
    
]
---
::


## Usage

### Section
The `Section` component is used to create a structured layout for organizing content into distinct sections.

```vue
<template>
    <Section>
        ...
    </Section>
</template>
```

::props-table
---
props: [
    {
        "name": "id",
        "type": "string"
    },
    {
        "name": "hasSidePadding",
        "default": "true",
        "type": "boolean"
    },
    {
        "name": "hasContentMaxWidth",
        "default": "false",
        "type": "boolean"
    },
    {
        "name": "spacing",
        "default": "SectionSpacing.XS",
        "type": "SectionSpacing"
    },
    {
        "name": "topSpacing",
        "type": "SectionSpacing"
    },
    {
        "name": "bottomSpacing",
        "type": "SectionSpacing"
    },
    {
        "name": "isDark",
        "default": "false",
        "type": "boolean"
    },
]
---
::

#### id
Sets a unique identifier for the section.

```vue
<template>
    <Section id="unique-section-id">
        ...
    </Section>
</template>
```

- **Type:** `string`

#### hasSidePadding

Adds horizontal padding to the section content.

It uses `content-side-padding-mobile` and `md:content-side-padding` css variables for mobile and desktop respectively.

```vue
<template>
    <Section :hasSidePadding="false">
        ...
    </Section>
</template>
```

- **Type:** `boolean`
- **Default:** `true`

#### hasContentMaxWidth

Constrains the section content to a maximum width for better readability. 

By default, the maximum width is set to `1440px`.

```vue
<template>
    <Section hasContentMaxWidth>
        ...
    </Section>
</template>
```

- **Type:** `boolean`
- **Default:** `false`

#### spacing

Sets the vertical spacing for the section. Accepts predefined spacing values.

```vue
<template>
    <Section spacing="SectionSpacing.MD">
        ...
    </Section>
</template>
```

- **Type:** `SectionSpacing`
- **Default:** `SectionSpacing.XS`

##### Options
::options-table
---
options: [
    {
        "value": "NONE",
        "description": "No spacing"
    },
    {
        "value": "XS",
        "description": "Extra small spacing"
    },
    {
        "value": "SM",
        "description": "Small spacing"
    },
    {
        "value": "MD",
        "description": "Medium spacing"
    },
    {
        "value": "LG",
        "description": "Large spacing"
    },
    {
        "value": "XL",
        "description": "Extra large spacing"
    },
]
---
::

#### topSpacing

Sets the top vertical spacing for the section, overriding the general spacing prop.

```vue
<template>
    <Section topSpacing="SectionSpacing.LG">
        ...
    </Section>
</template>
```

- **Type:** `SectionSpacing`

#### bottomSpacing

Sets the bottom vertical spacing for the section, overriding the general spacing prop.

```vue
<template>
    <Section bottomSpacing="SectionSpacing.LG">
        ...
    </Section>
</template>
```

- **Type:** `SectionSpacing`

#### isDark

Enables dark mode styling for the section.

```vue
<template>
    <Section isDark>
        ...
    </Section>
</template>
```

- **Type:** `boolean`
- **Default:** `false`

### SectionHeader

The `SectionHeader` component defines the header area of the section, typically containing titles or actions.

```vue
<template>
    <SectionHeader>
        ...
    </SectionHeader>
</template>
```

### SectionTitle

The `SectionTitle` component displays the title of the section within the header (tag: `h2`). It can be replaced with the `Heading` component or any other custom piece of code.

::props-table
---
props: [
    {
        "name": "title",
        "type": "string"
    },
]
---
::

#### title

Sets the title text for the section.

```vue
<template>
    <SectionTitle title="Custom Section Title" />
</template>
```

- **Type:** `string`

### SectionBody

The `SectionBody` component contains the main content of the section.

```vue
<template>
    <SectionBody>
        ...
    </SectionBody>
</template>
```



