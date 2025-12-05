import { defineVitestConfig } from "@nuxt/test-utils/config"

export default defineVitestConfig({
    test: {
        environment: "nuxt", // If you have other test, doesn't set that here
        coverage: {
            reportsDirectory: 'tests/.coverage',
            reporter: ['text', 'html'], // More options: 'text', 'lcov', 'html'
        },
        globals: true,
        setupFiles: ['./tests/setup.ts'],
    },
})
