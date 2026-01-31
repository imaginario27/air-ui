import { defineConfig } from 'vitest/config'

export default defineConfig({
    test: {
        environment: "happy-dom",
        coverage: {
            reportsDirectory: 'tests/.coverage',
            reporter: ['text', 'html'], // More options: 'text', 'lcov', 'html'
        },
        globals: true,
        silent : true,
        setupFiles: ['./tests/setup.ts'],
    },
})
