<template>
  <h1>{{ page }} Page</h1>
  <HelloWorld msg="Hello Vue 3 + TypeScript + Vite" />
  <button @click="goTo('/login')">Login</button> <br/>
  <router-link to="/login">Go to Login</router-link>
</template>

<script lang="ts">
  import { ref } from '@vue/reactivity'
  import { defineComponent } from '@vue/runtime-core'
  import HelloWorld from '@/components/HelloWorld.vue'
  import router from '@/router'

  export default defineComponent({
    components: {
      HelloWorld,
    },
    setup() {
      const page = ref('Dashboard')

      const goTo = (path: string) => {
        router.push({path})
      }
      return { page, goTo }
    },
  })
</script>

<style></style>
