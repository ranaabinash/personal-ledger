<template>
  <label
    for="exampleFormControlInput1"
    class="form-label inline-block mb-2 text-gray-700 text-lg"
    >{{ label }}</label
  >
  <input
    required
    :value="moduleValue"
    @input="updateValue"
    :type="typeInput"
    class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
    :placeholder="placeholder"
  />
  <div>
    <p class="text-red-500 text-xs">{{ error }}</p>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'

  export default defineComponent({
    props: {
      label: {
        type: String,
        required: true,
      },
      placeholder: {
        type: String,
        required: true,
      },
      moduleValue: {
        type: String,
        required: true,
        default: '',
      },
      typeInput: {
        type: String,
        default: 'text',
      },
      error: {
        type: String,
        default: '',
      },
    },
    emits: ['update:moduleValue'],
    setup(_prop, { emit }) {
      const updateValue = (event: Event) => {
        const target = <HTMLInputElement>event.target
        emit('update:moduleValue', target.value)
      }

      return { updateValue }
    },
  })
</script>
