## AirUI installation guide for existing Nuxt projects

::vertical-stepper
    ::vertical-step
    ---
    step: 1
    title: Install the AirUI packages
    ---
    You can install the packages using your preferred package manager in an existing Nuxt project.

    ```bash
    # npm
    npm i @imaginario27/air-ui-ds @imaginario27/air-ui-utils

    # pnpm
    pnpm add @imaginario27/air-ui-ds @imaginario27/air-ui-utils

    # yarn
    yarn add @imaginario27/air-ui-ds @imaginario27/air-ui-utils
    ```
    ::

    ::vertical-step
    ---
    step: 2
    title: Install Tailwind CSS
    ---
    If you haven't already set up Tailwind CSS in your Nuxt project, install it please.

    ```bash
    # npm
    npm install tailwindcss @tailwindcss/vite

    # pnpm
    pnpm add tailwindcss @tailwindcss/vite

    # yarn
    yarn add tailwindcss @tailwindcss/vite
    ```
    ::

    ::vertical-step
    ---
    step: 3
    title: Copy Air UI design system assets into your project
    ---
    Navigate to `node_modules/@imaginario27/air-ui-ds/assets` and copy the contents of the `assets` folder into your project’s `assets` directory.

    After copying the files, update the `@source` paths in your `main.css` file so they correctly match your project structure.
    ::

    ::vertical-step
    ---
    step: 4
    title: Include AirUI and Tailwind CSS in nuxt.config.ts
    ---
    Update your `nuxt.config.ts` to extend the AirUI configurations and include Tailwind CSS:

    ```ts
    // Add this import at the top of your nuxt.config.ts
    import tailwindcss from "@tailwindcss/vite"

    export default defineNuxtConfig({
        // ...other configurations
        extends: [
            '@imaginario27/air-ui-ds/nuxt.config.ts',
            '@imaginario27/air-ui-utils/nuxt.config.ts',
        ],

        vite: {
            plugins: [tailwindcss()],
        },

        // Create a CSS file for Tailwind styles if you haven't already
        css: ["~/assets/css/main.css"],
    })
    ```
    ::

    ::vertical-step
    ---
    step: 5
    title: Copy the generate theme script into your project
    isLast: true
    ---
    Copy the `generate-theme.ts` script from `node_modules/@imaginario27/air-ui-ds/scripts/` into your project’s `scripts` directory. This script is used to generate the Tailwind theme based on the design tokens.

    Then, add the following script to your `package.json`:

    ```json
    {
        "scripts": {
            "generate-theme": "ts-node scripts/generate-theme.ts"
        }
    }
    ```

    You might need to update the paths to the node modules in the script depending on your project structure. You can find them in the `generateThemeFile` function:

    ```ts
    function generateThemeFile(colorVars: string[], otherVars: string[]): string {
        return [
            `@import "tailwindcss";`,
            `@source "../../../packages/air-ui-ds/components";`,
            `@source "../../../packages/air-ui-utils";`,
            // ...rest of the code
        ].join("\n")
    }
    ```
    ::
::