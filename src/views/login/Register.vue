<template>
  <div class="flex justify-center items-center h-screen">
    <div
      class="flex-row p-4 border border-gray-400 rounded-xl w-9/12 md:w-2/5 lg:w-2/6 shadow-xl"
    >
      <h1 class="text-3xl font-bold underline text-center mb-4">{{ page }}</h1>
      <form @submit.prevent="register">
        <TextInput
          label="Username"
          placeholder="e.g. Jhon Cena"
          v-model:moduleValue="inputItem.value.username"
          :error="inputItem.errors.username"
        />
        <TextInput
          label="Email"
          placeholder="e.g. jhon@cena.com"
          typeInput="email"
          v-model:moduleValue="inputItem.value.email"
          :error="inputItem.errors.email"
        />
        <Password
          label="Password"
          placeholder="password"
          v-model:password="inputItem.value.password"
          :error="inputItem.errors.password"
        />
        <Password
          label="Confirm Password"
          placeholder="Confirm Password"
          v-model:password="inputItem.value.confirmpassword"
          :error="inputItem.errors.confirmpassword"
          inputId="confirm-password"
        />
        <br />
        <div v-if="errorFetch.length" class="mx-auto my-2">
          <p class="text-red-400 text-center">{{ errorFetch }}</p>
        </div>
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
  import TextInput from '@/components/inputs/text-input.vue'
  import { doesMatch, passwordPattern } from '@/utils/validation'

  export default defineComponent({
    setup() {
      const page = ref('Register')
      const inputItem = reactive({
        value: {
          username: '',
          email: '',
          password: '',
          confirmpassword: '',
        },
        errors: {
          username: '',
          email: '',
          password: '',
          confirmpassword: '',
        },
      })
      const errorFetch = ref('')
      const user = useRootStore()

      const clearInput = () => {
        inputItem.value.username = ''
        inputItem.value.email = ''
        inputItem.value.password = ''
        inputItem.value.confirmpassword = ''
      }

      const clearError = () => {
        inputItem.errors.username = ''
        inputItem.errors.email = ''
        inputItem.errors.password = ''
        inputItem.errors.confirmpassword = ''
      }

      function validate() {
        errorFetch.value = ''
        clearError()
        let valid = true

        inputItem.errors.password = passwordPattern(inputItem.value.password)

        inputItem.errors.confirmpassword = passwordPattern(
          inputItem.value.confirmpassword
        )

        if (
          !inputItem.errors.password.length &&
          !inputItem.errors.confirmpassword.length
        ) {
          inputItem.errors.confirmpassword = doesMatch(
            inputItem.value.password,
            inputItem.value.confirmpassword,
            'password does not match with confirm passowrd'
          )
        }

        Object.values(inputItem.errors).forEach((error) => {
          if (error.length) {
            valid = false
          }
        })
        return valid
      }

      async function register() {
        if (validate()) {
          try {
            await user.register({
              username: inputItem.value.username,
              email: inputItem.value.email,
              password: inputItem.value.password,
            })
            clearInput()
            router.push('/')
          } catch (error) {
            if (error instanceof Error) {
              if (error.message.includes('username')) {
                const errors = JSON.parse(error.message)
                inputItem.errors = { ...inputItem.errors, ...errors }
              } else {
                errorFetch.value = error.message
              }
            }
          }
        }
      }

      return { page, register, inputItem, errorFetch }
    },
    components: { Password, TextInput },
  })
</script>

<style></style>
