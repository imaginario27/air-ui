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

| Tailwind class                           | Description                                   |
| ---------------------------------------- | --------------------------------------------- |
| `bg-background-container-surface`        | Main surface for contained layouts and cards  |
| `bg-background-overlay`                  | Overlay backgrounds (modals, dialogs)         |
| `bg-background-surface`                  | Default application background                |
| `bg-background-danger-bold`              | Strong danger background for critical actions |
| `bg-background-danger-subtler`           | Subtle danger background                      |
| `bg-background-danger-subtlest`          | Very light danger background                  |
| `bg-background-delete-default`           | Default delete action background              |
| `bg-background-delete-hover`             | Delete action on hover                        |
| `bg-background-delete-on-neutral-hover`  | Delete background over neutral hover          |
| `bg-background-delete-soft`              | Soft delete background                        |
| `bg-background-delete-soft-hover`        | Soft delete hover state                       |
| `bg-background-info-bold`                | Strong informational background               |
| `bg-background-info-subtler`             | Subtle informational background               |
| `bg-background-info-subtlest`            | Very light informational background           |
| `bg-background-neutral-active`           | Active neutral surface                        |
| `bg-background-neutral-bold`             | Emphasized neutral background                 |
| `bg-background-neutral-default`          | Default neutral background                    |
| `bg-background-neutral-disabled`         | Disabled background state                     |
| `bg-background-neutral-hover`            | Hover state for neutral surfaces              |
| `bg-background-neutral-hover-subtle`     | Subtle hover state                            |
| `bg-background-neutral-subtle`           | Low-contrast neutral background               |
| `bg-background-neutral-subtlest`         | Minimal neutral background                    |
| `bg-background-neutral-filled-default`   | Filled neutral element                        |
| `bg-background-neutral-filled-hover`     | Hover state for filled neutral elements       |
| `bg-background-primary-brand-default`    | Primary brand background                      |
| `bg-background-primary-brand-hover`      | Primary brand hover state                     |
| `bg-background-primary-brand-active`     | Primary brand active state                    |
| `bg-background-primary-brand-soft`       | Soft primary brand background                 |
| `bg-background-primary-brand-soft-hover` | Soft primary brand hover                      |
| `bg-background-secondary-brand-default`  | Secondary brand background                    |
| `bg-background-secondary-brand-hover`    | Secondary brand hover                         |
| `bg-background-success-bold`             | Strong success background                     |
| `bg-background-success-subtler`          | Subtle success background                     |
| `bg-background-success-subtlest`         | Very light success background                 |
| `bg-background-warning-bold`             | Strong warning background                     |
| `bg-background-warning-subtler`          | Subtle warning background                     |
| `bg-background-warning-subtlest`         | Very light warning background                 |

### Text colors

| Tailwind class                      | Description                         |
| ----------------------------------- | ----------------------------------- |
| `text-text-default`                 | Default text color                  |
| `text-text-danger`                  | Danger text                         |
| `text-text-delete`                  | Delete-related text                 |
| `text-text-error`                   | Error text                          |
| `text-text-info`                    | Informational text                  |
| `text-text-success`                 | Success text                        |
| `text-text-warning`                 | Warning text                        |
| `text-text-warning-on-bg`           | Warning text on colored backgrounds |
| `text-text-neutral-disabled`        | Disabled text                       |
| `text-text-neutral-inactive`        | Inactive or muted text              |
| `text-text-neutral-on-filled`       | Text on filled neutral backgrounds  |
| `text-text-neutral-subtle`          | Subtle secondary text               |
| `text-text-neutral-subtler`         | More muted text                     |
| `text-text-neutral-subtlest`        | Least prominent text                |
| `text-text-primary-brand-default`   | Primary brand text                  |
| `text-text-primary-brand-hover`     | Primary brand hover text            |
| `text-text-primary-brand-active`    | Primary brand active text           |
| `text-text-secondary-brand-default` | Secondary brand text                |

### Border colors

| Tailwind class                        | Description                      |
| ------------------------------------- | -------------------------------- |
| `border-border-default`               | Default border color             |
| `border-border-danger`                | Danger border                    |
| `border-border-error`                 | Error border                     |
| `border-border-info`                  | Informational border             |
| `border-border-success`               | Success border                   |
| `border-border-warning`               | Warning border                   |
| `border-border-neutral-hover`         | Hover border on neutral elements |
| `border-border-neutral-subtle`        | Subtle neutral border            |
| `border-border-neutral-disabled`      | Disabled border                  |
| `border-border-primary-brand-default` | Primary brand border             |
| `border-border-primary-brand-hover`   | Primary brand hover border       |
| `border-border-primary-brand-active`  | Primary brand active border      |
| `border-border-secondary-brand`       | Secondary brand border           |
| `border-border-delete-default`        | Default delete border            |
| `border-border-delete-subtle`         | Subtle delete border             |

### Icon colors

| Tailwind class                      | Description                         |
| ----------------------------------- | ----------------------------------- |
| `text-icon-default`                 | Default icon color                  |
| `text-icon-danger`                  | Danger icon                         |
| `text-icon-danger-subtle`           | Subtle danger icon                  |
| `text-icon-info`                    | Informational icon                  |
| `text-icon-info-subtle-strong`      | Emphasized subtle info icon         |
| `text-icon-success`                 | Success icon                        |
| `text-icon-success-subtle`          | Subtle success icon                 |
| `text-icon-warning`                 | Warning icon                        |
| `text-icon-warning-on-bg`           | Warning icon on colored backgrounds |
| `text-icon-warning-subtle`          | Subtle warning icon                 |
| `text-icon-neutral-disabled`        | Disabled icon                       |
| `text-icon-neutral-inactive`        | Inactive icon                       |
| `text-icon-neutral-subtle`          | Subtle neutral icon                 |
| `text-icon-neutral-subtler`         | More muted icon                     |
| `text-icon-neutral-subtlest`        | Least prominent icon                |
| `text-icon-primary-brand-default`   | Primary brand icon                  |
| `text-icon-primary-brand-hover`     | Primary brand hover icon            |
| `text-icon-primary-brand-active`    | Primary brand active icon           |
| `text-icon-secondary-brand-default` | Secondary brand icon                |

### Spacing tokens

| Tailwind class           | Description                          |
| ------------------------ | ------------------------------------ |
| `gap-column`             | Default column gap spacing           |
| `px-content-side`        | Horizontal content padding           |
| `px-content-side-mobile` | Mobile horizontal content padding    |
| `pb-content-body`        | Bottom padding for content areas     |
| `py-section-xs`          | Extra-small vertical section spacing |
| `py-section-sm`          | Small vertical section spacing       |
| `py-section-md`          | Medium vertical section spacing      |
| `py-section-lg`          | Large vertical section spacing       |
| `py-section-xl`          | Extra-large vertical section spacing |

### Radius & opacity

| Tailwind class     | Description                   |
| ------------------ | ----------------------------- |
| `rounded-button`   | Standard button border radius |
| `opacity-disabled` | Opacity for disabled elements |
