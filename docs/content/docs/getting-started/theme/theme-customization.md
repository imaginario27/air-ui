## AirUI Theme customization

Air UI comes with a theming system that allows you to easily adapt the look and feel of your application to match your brand identity.

Inside the `app/assets/css/theme` folder (or custom folder location) you will find:
- colors.css: Color schemes
- ui-theme.css: Tailwind theme variables

You can easily customize one of the existing themes (e.g., primary, secondary, danger, etc.).

### Native theme palettes

| Theme palette | Description                                     | Typical usage                                                 |
| ------------- | ----------------------------------------------- | ------------------------------------------------------------- |
| **Primary**   | Main brand identity colors.                     | Primary actions, highlights, key UI elements.                 |
| **Secondary** | Supporting brand accent colors.                 | Secondary actions, accents, complementary UI elements.        |
| **Danger**    | Represents destructive or critical states.      | Errors, destructive actions, alerts, validation failures.     |
| **Info**      | Used for informational and contextual feedback. | Notifications, informational banners, hints, helper messages. |
| **Neutral**   | The foundation palette for the UI.              | Layout surfaces, backgrounds, borders, default text.          |
| **Success**   | Positive and successful states.                 | Success messages, confirmations, completed actions.           |
| **Warning**   | Cautionary and attention-required states.       | Warnings, notices, non-blocking alerts.                       |

### Customization steps

In order to customize the theme, you need to create new color schemes and assign it to the **existing theme css variables**. Follow these steps:

1. Generate a new Tailwind color schemes in [Tints.dev](https://www.tints.dev/?output=hex) and copy the `@theme` block content into root in `colors.css`. The old color schemes that you are going to replace can be removed from `colors.css`.
    </br>
    
    Example:
    ```css
    :root {
        /* ... other variables */
        
        /* New primary brand color scheme */
        --color-purple-50: #f4eefe;
        --color-purple-100: #ebe1fe;
        --color-purple-200: #d7befc;
        --color-purple-300: #c69ffb;
        --color-purple-400: #b77df9;
        --color-purple-500: #a855f7;
        --color-purple-600: #941fe8;
        --color-purple-700: #6f15b0;
        --color-purple-800: #4d0b7b;
        --color-purple-900: #2f044f;
        --color-purple-950: #1d0234;
    }
    ```

2. Update the theme variables. 
    - Run the command `npm run update-theme-colors` to update the `ui-theme.css` file with the new colors added in `colors.css`.
        </br>
        **Important**: Make sure that `ASSETS_THEME_PATH` in `scripts/update-ui-theme-colors.ts` is set to the correct path.
    - Alternatively, you can manually update the theme variables as explained below.
        - Open `ui-theme.css` and assign the new color scheme to the corresponding theme variables. Only update the theme variables, not the entire `:root` block and do not forget to update dark theme color variables. 
        </br>
    
            Example:
            ```css
            :root {
                /* ... other variables */
                
                /* Updated variables */
                --color-theme-primary-brand-50: var(--color-purple-50);
                --color-theme-primary-brand-100: var(--color-purple-100);
                --color-theme-primary-brand-200: var(--color-purple-200);
                --color-theme-primary-brand-300: var(--color-purple-300);
                --color-theme-primary-brand-400: var(--color-purple-400);
                --color-theme-primary-brand-500: var(--color-purple-500);
                --color-theme-primary-brand-600: var(--color-purple-600);
                --color-theme-primary-brand-700: var(--color-purple-700);
                --color-theme-primary-brand-800: var(--color-purple-800);
                --color-theme-primary-brand-900: var(--color-purple-900);
                --color-theme-primary-brand-950: var(--color-purple-950);

                /* Dark mode - Reverse the color scheme */
                .dark {
                    --color-theme-primary-brand-50: var(--color-purple-950);
                    --color-theme-primary-brand-100: var(--color-purple-900);
                    --color-theme-primary-brand-200: var(--color-purple-800);
                    --color-theme-primary-brand-300: var(--color-purple-700);
                    --color-theme-primary-brand-400: var(--color-purple-600);
                    --color-theme-primary-brand-500: var(--color-purple-500);
                    --color-theme-primary-brand-600: var(--color-purple-400);
                    --color-theme-primary-brand-700: var(--color-purple-300);
                    --color-theme-primary-brand-800: var(--color-purple-200);
                    --color-theme-primary-brand-900: var(--color-purple-100);
                    --color-theme-primary-brand-950: var(--color-purple-50);
                }
            }
            ```

            Finally, save the files to see the changes applied.


## Extending the theme

If you need to go beyond the default design tokens, you can extend the theme by defining your own custom CSS variables in `ui-theme.css`.

When adding new tokens, you must regenerate the theme so they become available as Tailwind utilities.

```bash
# If the script is defined in your package.json
npm run generate-theme

# Or run it directly (install ts-node if you don't have it)
ts-node scripts/generate-theme.ts
```

::content-alert
---
props:
    title: "Important"
    description: "Built-in Air UI components rely only on the existing design tokens. Custom tokens will not affect them unless you create new components or explicitly extend existing ones to use your custom tokens."
---
::

## Disabling Tailwind defaults

Tailwind’s default color palette can be disabled in the `main.css` file, so you stay fully in control of your design system:

```css
@theme {
    --color-*: initial;
}
```

::content-alert
---
props:
    title: "Important"
    description: "Since AirUI relies on the generate theme script to build new design tokens, you can additionally update the script."
---
::

