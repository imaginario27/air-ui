import { config } from '@vue/test-utils'
// Simulated components in order to speed up tests (do not require integration tests)
config.global.stubs = {
    MdiIcon: true,
    NuxtLink: true,
    MaxWidthContainer: true,
}