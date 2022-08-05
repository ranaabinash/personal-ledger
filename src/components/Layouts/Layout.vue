<template>
  <navbar />
  <router-view></router-view>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import Navbar from '@/components/Nav.vue'

  export default defineComponent({
    setup() {},
    components: {
      Navbar,
    },
  })
</script>
