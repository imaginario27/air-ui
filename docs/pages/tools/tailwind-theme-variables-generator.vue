<template>
    <div class="h-screen flex items-center justify-center">
      <div class="p-6 max-w-xl w-full text-center">
        <h1 class="text-2xl font-bold mb-4">Tailwind Theme Variables Generator</h1>
  
        <button
          @click="generateTheme"
          class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Generate Tailwind Theme File
        </button>
  
        <p v-if="message" class="mt-4 text-green-600">{{ message }}</p>
      </div>
    </div>
  </template>
  
  <script setup>
  const message = ref('')
  
  const generateTheme = async () => {
    try {
      const res = await $fetch('/api/generate-tailwind-variables')
      message.value = res.message
    } catch (error) {
      message.value = 'Something went wrong generating the theme file.'
      console.error(error)
    }
  }
  </script>
  