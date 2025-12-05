// Docs: https://vue3-toastify.js-bridge.com/get-started/introduction.html

import Vue3Toastify, { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'

export default defineNuxtPlugin((nuxtApp) => {
    const config = useToastifyConfig()

    nuxtApp.vueApp.use(Vue3Toastify, config)

    return {
        provide: { toast },
    }
})