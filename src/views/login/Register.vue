<template>
  <div class="flex justify-center items-center h-screen">
    <div
      class="flex-row p-4 border border-gray-400 rounded-xl w-9/12 md:w-2/5 lg:w-2/6 shadow-xl"
    >
      <h1 class="text-3xl font-bold underline text-center mb-4">{{ page }}</h1>
      <form @submit.prevent="register">
        <label
          for="exampleFormControlInput1"
          class="form-label inline-block mb-2 text-gray-700"
          >User Name</label
        >
        <input
          v-model="inputItem.username"
          type="text"
          class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
          id="username"
          placeholder="Username"
        />
        <Password
          label="Password"
          placeholder="password"
          v-model:password="inputItem.password"
        />
        <Password
          label="Confirm Password"
          placeholder="Confirm Password"
          v-model:password="inputItem.confirmpassword"
          inputId="confirm-password"
        />
        <br />
        <button
          class="btn bg-cyan-500 shadow-lg shadow-cyan-500/50 text-white mx-auto p-2 rounded-lg w-full"
        >
          Submit
        </button>
      </form>
      <p class="text-center">
        Go to
        <router-link
          class="inline-block m-2 text-[#3b82f6] underline hover:text-[#1e40af]"
          to="/login"
          >Sign in</router-link
        >
      </p>
    </div>
  </div>
</template>

<script lang="ts">
  import { ref, reactive } from '@vue/reactivity'
  import { defineComponent } from '@vue/runtime-core'
  import { useRootStore } from '@/store'
  import router from '@/router'
  import Password from '@/components/inputs/password.vue'

  export default defineComponent({
    setup() {
      const page = ref('Register')
      const inputItem = reactive({
        username: '',
        password: '',
        confirmpassword: '',
      })
      const user = useRootStore()
      const clearInput = () => {
        inputItem.username = ''
        inputItem.password = ''
        inputItem.confirmpassword = ''
      }

      function register() {
        if (inputItem.password === inputItem.confirmpassword) {
          user.addUser({
            username: inputItem.username,
            password: inputItem.password,
          })
          console.log('Registered')
          clearInput()
          router.push('/login')
        }
      }

      return { page, register, inputItem }
    },
    components: { Password },
  })
</script>

<style></style>
