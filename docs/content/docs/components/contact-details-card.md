## Component

::component-code
---
srcDir: 'cards/specific/ContactDetailsCard.vue'
props: 
    name: "John Doe"
    email: "john.doe@example.com"
    phone: "123-456-7890"
previewBackground: 'white'
---
::

## Props

::props-table
---
props: [
    {
        "name": "name",
        "default": "John Doe",
        "type": "string",
    },
    {
        "name": "email",
        "type": "string",
    },
    {
        "name": "phone",
        "type": "string",
    },
]
---
::


## Usage
### name
Sets the contact name.

```vue
<template>
    <ContactDetailsCard 
        name="Silvia Pelkert"
    />
</template>
```

- **Type:** `string`
- **Default:** `'John Doe'`

### email
Sets the contact email. If the email is not provided, the email will be hidden.

```vue
<template>
    <ContactDetailsCard 
        email="silvia.pelkert@example.com"
    />
</template>
```

- **Type:** `string`

### phone
Sets the contact phone. If the phone is not provided, the phone will be hidden.

```vue
<template>
    <ContactDetailsCard 
        phone="123-456-7890"
    />
</template>
```

- **Type:** `string`

