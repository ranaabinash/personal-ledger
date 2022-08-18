<template>
  <div class="flex items-center space-x-4" @click="toggle">
    <div
      class="w-14 h-8 flex items-center rounded-full p-1 duration-300 ease-in-out"
      :class="{ 'bg-green-400': value, 'bg-red-400': !value }"
    >
      <div
        class="bg-white w-6 h-6 rounded-full shadow-md transform duration-300 ease-in-out"
        :class="{ 'translate-x-6': value }"
      ></div>
    </div>
    <h2 class="text-lg">{{ label }}</h2>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'

  export default defineComponent({
    props: {
      label: {
        type: String,
        required: true,
        default: '',
      },
      value: {
        type: Boolean,
        required: true,
        default: false,
      },
    },
    emits: ['onUpdateValue'],
    setup(_props, { emit }) {
      function toggle() {
        emit('onUpdateValue')
      }

      return { toggle }
    },
  })
</script>
