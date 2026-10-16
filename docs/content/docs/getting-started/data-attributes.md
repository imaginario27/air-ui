## Data attributes

Some AirUI components set `data-*` attributes on their root or layer element. These attributes are styling hooks: AirUI applies no styles for them. You target them in your own CSS to adapt tokens or styles to the context a component renders in.

Each component page lists the attributes it sets in its own table. This page explains how to use them.

### data-surface

Marks the layer a component draws, such as a card or a modal. Components that sit on top of a layer, like form fields, can then adapt to it from your CSS without the design system knowing about your project.

::data-attributes-table
---
attributes: [
    {
        "name": "data-surface",
        "value": "container",
        "description": "Set by Card and Drawer. Marks a container layer.",
    },
    {
        "name": "data-surface",
        "value": "modal",
        "description": "Set by ModalDialog on its content panel. Marks a modal layer.",
    },
]
---
::

#### Adapting tokens to a layer

Form fields use the `--color-background-field` token for their background. On a plain page that token works as is, but inside a card or a modal it may blend with the layer behind it. Override the token for each layer in your global stylesheet:

```css
[data-surface="container"],
[data-surface="modal"] {
    --color-background-field: var(--color-background-surface);
}
```

Every form field rendered inside a matching layer now uses the new value. Fields outside any layer keep the default.

#### Targeting a single layer

Use one selector per value to style layers differently:

```css
[data-surface="container"] {
    --color-background-field: var(--color-background-surface);
}

[data-surface="modal"] {
    --color-background-field: var(--color-background-neutral-subtle);
}
```

#### Nested layers

CSS custom properties inherit, so the closest layer wins. A field inside a Card that sits inside a ModalDialog uses the `container` value. Declare overrides only for the values you need.

::content-alert
---
props:
    title: "Important"
    description: "The design system only sets the attribute. Without a rule in your CSS, nothing changes visually."
---
::
