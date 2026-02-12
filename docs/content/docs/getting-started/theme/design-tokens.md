## AirUI design tokens

Air UI uses **design tokens** to define colors, spacing, radius, and other visual decisions in a consistent and scalable way.
All tokens are exposed through Tailwind utilities and centrally managed in `main.css` file.

Design tokens act as the **foundation of the design system**, ensuring visual consistency across components, layouts, and themes.

**How tokens are used:**

* Tokens are defined as CSS variables inside the `@theme` block
* Tailwind utilities consume those variables automatically

## Available design tokens

Below is a complete list of the available **Tailwind class names** generated from the design tokens.

### Background colors

::design-token-table
---
type: 'background'
items: [
    {
        "name": "background-container-surface",
        "description": "Main surface for contained layouts and cards.",
    },
    {
        "name": "background-overlay",
        "description": "Overlay backgrounds (modals, dialogs).",
    },
    {
        "name": "background-surface",
        "description": "Default application background.",
    },
    {
        "name": "background-danger-bold",
        "description": "Strong danger background for critical actions.",
    },
    {
        "name": "background-danger-subtler",
        "description": "Subtle danger background.",
    },
    {
        "name": "background-danger-subtlest",
        "description": "Very light danger background.",
    },
    {
        "name": "background-delete-default",
        "description": "Default delete action background.",
    },
    {
        "name": "background-delete-hover",
        "description": "Delete action on hover.",
    },
    {
        "name": "background-delete-on-neutral-hover",
        "description": "Delete background over neutral hover.",
    },
    {
        "name": "background-delete-soft",
        "description": "Soft delete background.",
    },
    {
        "name": "background-delete-soft-hover",
        "description": "Soft delete hover state.",
    },
    {
        "name": "background-info-bold",
        "description": "Strong informational background.",
    },
    {
        "name": "background-info-subtler",
        "description": "Subtle informational background.",
    },
    {
        "name": "background-info-subtlest",
        "description": "Very light informational background.",
    },
    {
        "name": "background-neutral-active",
        "description": "Active neutral surface.",
    },
    {
        "name": "background-neutral-bold",
        "description": "Emphasized neutral background.",
    },
    {
        "name": "background-neutral-default",
        "description": "Default neutral background.",
    },
    {
        "name": "background-neutral-disabled",
        "description": "Disabled background state.",
    },
    {
        "name": "background-neutral-hover",
        "description": "Hover state for neutral surfaces.",
    },
    {
        "name": "background-neutral-hover-subtle",
        "description": "Subtle hover state.",
    },
    {
        "name": "background-neutral-subtle",
        "description": "Low-contrast neutral background.",
    },
    {
        "name": "background-neutral-subtlest",
        "description": "Minimal neutral background.",
    },
    {
        "name": "background-neutral-filled-default",
        "description": "Filled neutral element.",
    },
    {
        "name": "background-neutral-filled-hover",
        "description": "Hover state for filled neutral elements.",
    },
    {
        "name": "background-primary-brand-default",
        "description": "Primary brand background.",
    },
    {
        "name": "background-primary-brand-hover",
        "description": "Primary brand hover state.",
    },
    {
        "name": "background-primary-brand-active",
        "description": "Primary brand active state.",
    },
    {
        "name": "background-primary-brand-soft",
        "description": "Soft primary brand background.",
    },
    {
        "name": "background-primary-brand-soft-hover",
        "description": "Soft primary brand hover.",
    },
    {
        "name": "background-secondary-brand-default",
        "description": "Secondary brand background.",
    },
    {
        "name": "background-secondary-brand-hover",
        "description": "Secondary brand hover.",
    },
    {
        "name": "background-success-bold",
        "description": "Strong success background.",
    },
    {
        "name": "background-success-subtler",
        "description": "Subtle success background.",
    },
    {
        "name": "background-success-subtlest",
        "description": "Very light success background.",
    },
    {
        "name": "background-warning-bold",
        "description": "Strong warning background.",
    },
    {
        "name": "background-warning-subtler",
        "description": "Subtle warning background.",
    },
    {
        "name": "background-warning-subtlest",
        "description": "Very light warning background.",
    }
    
]
---
::


### Text colors

::design-token-table
---
type: 'text'
items: [
    {
        "name": "text-default",
        "description": "Default text color.",
    },
    {
        "name": "text-danger",
        "description": "Text for danger states.",
    },
    {
        "name": "text-delete",
        "description": "Text related to delete actions.",
    },
    {
        "name": "text-error",
        "description": "Text for error states.",
    },
    {
        "name": "text-info",
        "description": "Text for informational messages.",
    },
    {
        "name": "text-success",
        "description": "Text for success states.",
    },
    {
        "name": "text-warning",
        "description": "Text for warning states.",
    },
    {
        "name": "text-warning-on-bg",
        "description": "Warning text on colored backgrounds.",
    },
    {
        "name": "text-neutral-disabled",
        "description": "Text for disabled elements.",
    },
    {
        "name": "text-neutral-inactive",
        "description": "Text for inactive or muted elements.",
    },
    {
        "name": "text-neutral-on-filled",
        "description": "Text color for filled neutral backgrounds.",
    },
    {
        "name": "text-neutral-subtle",
        "description": "Subtle secondary text color.",
    },
    {
        "name": "text-neutral-subtler",
        "description": "More muted text color.",
    },
    {
        "name": "text-neutral-subtlest",
        "description": "Least prominent text color.",
    },
    {
        "name": "text-primary-brand-default",
        "description": "Primary brand text color.",
    },
    {
        "name": "text-primary-brand-hover",
        "description": "Primary brand hover text color.",
    },
    {
        "name": "text-primary-brand-active",
        "description": "Primary brand active text color.",
    },
    {
        "name": "text-secondary-brand-default",
        "description": "Secondary brand text color.",
    }
]
---
::

### Border colors

::design-token-table
---
type: 'border'
items: [
    {
        "name": "border-default",
        "description": "Default border color.",
    },
    {
        "name": "border-danger",
        "description": "Border for danger states.",
    },
    {
        "name": "border-error",
        "description": "Border for error states.",
    },
    {
        "name": "border-info",
        "description": "Border for informational messages.",
    },
    {
        "name": "border-success",
        "description": "Border for success states.",
    },
    {
        "name": "border-warning",
        "description": "Border for warning states.",
    },
    {
        "name": "border-neutral-hover",
        "description": "Border color on neutral hover state.",
    },
    {
        "name": "border-neutral-subtle",
        "description": "Subtle neutral border color.",
    },
    {
        "name": "border-neutral-disabled",
        "description": "Border color for disabled elements.",
    },
    {
        "name": "border-primary-brand-default",
        "description": "Primary brand border color.",
    },
    {
        "name": "border-primary-brand-hover",
        "description": "Primary brand hover border color.",
    },
    {
        "name": "border-primary-brand-active",
        "description": "Primary brand active border color.",
    },
    {
        "name": "border-secondary-brand",
        "description": "Secondary brand border color.",
    },
    {
        "name": "border-delete-default",
        "description": "Default delete border color.",
    },
    {
        "name": "border-delete-subtle",
        "description": "Subtle delete border color.",
    }
]
---
::

### Icon colors

::design-token-table
---
type: 'icon'
items: [
    {
        "name": "icon-default",
        "description": "Default icon color",
    },
    {
        "name": "icon-danger",
        "description": "Danger icon",
    },
    {
        "name": "icon-danger-subtle",
        "description": "Subtle danger icon",
    },
    {
        "name": "icon-info",
        "description": "Informational icon",
    },
    {
        "name": "icon-info-subtle-strong",
        "description": "Emphasized subtle info icon",
    },
    {
        "name": "icon-success",
        "description": "Success icon",
    },
    {
        "name": "icon-success-subtle",
        "description": "Subtle success icon",
    },
    {
        "name": "icon-warning",
        "description": "Warning icon",
    },
    {
        "name": "icon-warning-on-bg",
        "description": "Warning icon on colored backgrounds",
    },
    {
        "name": "icon-warning-subtle",
        "description": "Subtle warning icon",
    },
    {
        "name": "icon-neutral-disabled",
        "description": "Disabled icon",
    },
    {
        "name": "icon-neutral-inactive",
        "description": "Inactive icon",
    },
    {
        "name": "icon-neutral-subtle",
        "description": "Subtle neutral icon color",
    },
    {
        "name": "icon-neutral-subtler",
        "description": "More muted neutral icon color",
    },
    {
        "name": "icon-neutral-subtlest",
        "description": "Least prominent neutral icon color",
    },
    {
        "name": "icon-primary-brand-default",
        "description": "Primary brand icon color",
    },
    {
        "name": "icon-primary-brand-hover",
        "description": "Primary brand hover icon color",
    },
    {
        "name": "icon-primary-brand-active",
        "description": "Primary brand active icon color",
    },
    {
        "name": "icon-secondary-brand-default ",
       	"description": 	"Secondary brand icon color ",
    }
]
---
::

### Spacing

::design-token-table
---
type: 'others'
items: [
    {
        "name": "column-gap",
        "description": "Default column gap spacing",
    },
    {
        "name": "content-side",
        "description": "Horizontal content padding",
    },
    {
        "name": "content-side-mobile",
        "description": "Mobile horizontal content padding",
    },
    {
        "name": "content-body-bottom",
        "description": "Bottom padding for content areas",
    },
    {
        "name": "section-xs",
        "description": "Extra-small vertical section spacing",
    },
    {
        "name": "section-sm",
        "description": "Small vertical section spacing",
    },
    {
        "name": "section-md",
        "description": "Medium vertical section spacing",
    },
    {
        "name": "section-lg",
        "description": "Large vertical section spacing",
    },
    {
        "name": "section-xl",
        "description": "Extra-large vertical section spacing",
    }
]
---
::

### Radius

::design-token-table
---
type: 'radius'
items: [
    {
        "name": "button",
        "description": "Standard button border radius",
    },
]
---
::

### Opacity

::design-token-table
---
type: 'opacity'
items: [
    {
        "name": "disabled",
        "description": "Opacity for disabled elements",
    },
]
---
::

## Token usage

Levarage design tokens in your code by applying the corresponding Tailwind classes, following the pattern: `category-name` (e.g., `bg-background-neutral-bold`, `text-text-default`, `border-border-default`, `opacity-disabled`).

```vue
<div 
    :class="[
        'bg-background-neutral-bold',
        'text-text-default',
        'border-border-default',
        'p-section-md',
        'rounded-button',
        'opacity-disabled',
    ]"
>
    This div uses various design tokens for styling.
</div>
```