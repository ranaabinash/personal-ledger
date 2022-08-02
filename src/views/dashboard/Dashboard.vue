<template>
  <h1 class="text-3xl font-bold underline text-center">{{ page }} Page</h1>
  <div class="flex justify-center content-center my-2">
    <div class="flex-row">
      <button
        class="bg-cyan-500 shadow-lg shadow-cyan-500/50 text-white m-2 py-2 px-8 rounded-lg"
        @click="logout"
      >
        Logout
      </button>
      <br />
      <router-link
        class="flex justify-center m-2 text-[#3b82f6] underline hover:text-[#1e40af]"
        to="/login"
        >Go to Login</router-link
      >
    </div>
  </div>
</template>

<script lang="ts">
  import { ref } from '@vue/reactivity'
  import { computed, defineComponent } from '@vue/runtime-core'
  import router from '@/router'
  import { useRootStore } from '@/store'

  export default defineComponent({
    components: {},
    setup() {
      const page = ref('Dashboard')
      const userState = useRootStore()

      const self = computed(() => userState.getUser)

      const goTo = (path: string) => {
        router.push({ path })
      }

      const logout = () => {
        try {
          console.log(self.value)
          userState.logout(self.value.username)
          console.log('Logged out')
          goTo('/login')
        } catch (error) {
          if (error instanceof Error) console.log(error.message)
        }
      }
      return { page, goTo, logout }
    },
  })
</script>

<style></style>
