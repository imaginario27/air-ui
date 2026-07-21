import { config } from '@vue/test-utils'
// Simulated components in order to speed up tests (do not require integration tests)
config.global.stubs = {
    MdiIcon: true,
    NuxtLink: true,
    MaxWidthContainer: true,
}

const originalWarn = console.warn


console.warn = (...args: any[]) => {
const message = args[0]
if (
typeof message === 'string' &&
message.includes('transformMode') &&
message.includes('viteEnvironment')
) {
return // suppress specific Vitest deprecation warning
}


originalWarn(...args) // allow all other warnings
}