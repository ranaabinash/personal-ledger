<template>
  <h1>{{ page }} Page</h1>
  <router-link to="/">Go to Dashboard</router-link>
</template>

<script>
  import { ref } from '@vue/reactivity'
  import { defineComponent } from '@vue/runtime-core'
  
  export default defineComponent({
    setup() {
      const page = ref('Login')
      return { page }
    },
  })
</script>

<style></style>
