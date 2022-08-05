<template>
  <label
    for="exampleFormControlInput1"
    class="form-label inline-block mb-2 text-gray-700 text-lg"
    >{{ label }}</label
  >
  <div class="relative">
    <input
      :id="inputId"
      :value="password"
      @input="updatePassword"
      :type="passInputType"
      class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
      :placeholder="placeholder"
      autocomplete="off"
    />
    <div class="absolute right-0 z-30 inset-y-1 flex items-center px-4">
      <button type="button" @click="isShowPass" class="z-30">
        <svg
          :v-show="!isshow"
          aria-hidden="true"
          class="w-5 h-5"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
          ></path>
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
          ></path>
        </svg>
        <svg
          :v-show="isshow"
          aria-hidden="true"
          class="w-5 h-5"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          style="display: none"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
          ></path>
        </svg>
      </button>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref } from 'vue'

  export default defineComponent({
    props: {
      label: {
        type: String,
        required: true,
      },
      password: {
        type: String,
        required: true,
      },
      placeholder: {
        type: String,
        required: true,
      },
      inputId: {
        type: String,
        required: false,
        default: 'password',
      },
    },
    emits: ['update:password'],
    setup(_props, { emit }) {
      const passInputType = ref('password')
      const isshow = ref(false)

      function isShowPass() {
        passInputType.value =
          passInputType.value === 'password' ? 'text' : 'password'
        isshow.value = !isshow.value
      }

      function updatePassword(event: Event) {
        const target = <HTMLInputElement>event.target
        emit('update:password', target.value)
      }

      return { isShowPass, passInputType, isshow, updatePassword }
    },
  })
</script>
