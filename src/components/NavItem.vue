<template>
  <router-link
    :to="to"
    class="p-2 hover:bg-green-400 rounded-md h-full w-full cursor-pointer"
    :class="{ 'bg-green-400': isActive(to) }"
    >{{ title }}</router-link
  >
</template>

<script lang="ts">
  import { computed } from '@vue/reactivity'
  import { defineComponent } from 'vue'
  import { useRoute } from 'vue-router'

  export default defineComponent({
    props: {
      title: {
        type: String,
        required: true,
        default: '',
      },
      to: {
        type: String,
        required: true,
        default: '/',
      },
    },
    setup() {
      const route = useRoute()
      const activeRoute = computed(() => route.path)

      const isActive = (to: string) => activeRoute.value === to.toLowerCase()

      return { isActive }
    },
  })
</script>
