<script lang="ts">
  import { defineComponent, onMounted } from '@vue/runtime-core'
  import { useRootStore } from '@/store'

  export default defineComponent({
    setup() {
      const userState = useRootStore();
      onMounted(() => {
        userState.fetchUsers();
      })
    },
  })
</script>

<template>
  <router-view></router-view>
</template>

<style></style>
