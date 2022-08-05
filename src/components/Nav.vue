<template>
  <div class="flex justify-between items-center p-2 mb-2 bg-gray-100">
    <img
      class="h-10 w-10 object-cover"
      src="https://www.seoclerk.com/pics/000/748/061/bd1ddcf20243b5366e14524b6b79c773.png"
      alt="Logo"
    />
    <nav>
      <ul class="flex items-center space-x-4">
        <li><NavItem title="Home" to="/" /></li>
        <li><NavItem title="About" to="/about" /></li>
        <li><NavItem title="Contact" to="/contact" /></li>
        <li>
          <button
            class="bg-cyan-500 shadow-lg shadow-cyan-500/50 text-white m-2 py-2 px-8 rounded-lg"
            @click="logout"
          >
            Logout
          </button>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script lang="ts">
  import router from '@/router'
  import { useRootStore } from '@/store'
  import { computed, defineComponent } from 'vue'
  import NavItem from './NavItem.vue'

  export default defineComponent({
    setup() {
      const userState = useRootStore()
      const self = computed(() => userState.getUser)

      const goTo = (path: string) => {
        router.push({ path })
      }

      const logout = () => {
        try {
          userState.logout(self.value.username)
          console.log('Logged out')
          goTo('/login')
        } catch (error) {
          if (error instanceof Error) console.log(error.message)
        }
      }

      return { logout }
    },
    components: { NavItem },
  })
</script>
