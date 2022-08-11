<template>
  <div class="flex justify-center content-center items-center h-screen">
    <div
      class="flex-row p-4 border border-gray-500 rounded-xl w-9/12 md:w-2/5 lg:w-2/6 shadow-xl"
    >
      <h1 class="text-3xl font-bold underline text-center mb-4">{{ page }}</h1>
      <form @submit.prevent="login">
        <TextInput
          label="Username"
          placeholder="e.g. Jhon Cena"
          v-model:moduleValue="inputItem.value.username"
          :error="inputItem.error.username"
        />
        <Password
          label="Password"
          v-model:password="inputItem.value.password"
          placeholder="password"
          :error="inputItem.error.password"
        />
        <br />
        <button
          class="bg-cyan-500 shadow-md shadow-cyan-500/50 text-white p-2 rounded-lg mx-auto block w-full"
        >
          Submit</button
        ><br />
      </form>
      <p class="text-center">
        New here register here
        <router-link
          class="text-[#3b82f6] underline hover:text-[#1e40af] inline-block"
          to="/register"
          >Sign up</router-link
        >
      </p>
    </div>
  </div>
</template>

<script lang="ts">
  import { ref, reactive } from '@vue/reactivity'
  import { defineComponent, onMounted } from '@vue/runtime-core'
  import { useRootStore } from '@/store'
  import router from '@/router'
  import Password from '@/components/inputs/password.vue'
  import TextInput from '@/components/inputs/text-input.vue'
  import { passwordPattern } from '@/utils/validation'

  export default defineComponent({
    setup() {
      const page = ref('Login')
      const inputItem = reactive({
        value: {
          username: '',
          password: '',
        },
        error: {
          username: '',
          password: '',
        },
      })
      const userState = useRootStore()
      const clearInput = () => {
        inputItem.value.username = ''
        inputItem.value.password = ''
      }

      function valid() {
        inputItem.error.password = passwordPattern(inputItem.value.password)
        return inputItem.error.password.length
      }

      function login() {
        if (!valid()) return
        try {
          userState.login(inputItem.value)
          clearInput()
          router.push('/')
        } catch (error) {
          if (error instanceof Error) console.log(error.message)
        }
      }

      return { page, login, inputItem }
    },
    components: { Password, TextInput },
  })
</script>

<style></style>
