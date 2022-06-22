<template>
  <h1>{{ page }} Page</h1>
  <router-link to="/">Go to Dashboard</router-link><br />
  <p>Name</p>
  <input v-model="inputItem.name" type="text" name="name" id="name" /><br />
  <p>Url</p>
  <input v-model="inputItem.url" type="text" name="url" id="url" /><br />
  <button class="btn" @click="addItem">Submit</button><br />
  <ul v-for="(item) in items" :key="item">
    <li>{{ item.name }}</li>
  </ul>
</template>

<script>
  import { ref, reactive } from '@vue/reactivity'
  import { computed, defineComponent } from '@vue/runtime-core'
  import { useRootStore } from '@/store'

  export default defineComponent({
    setup() {
      const page = ref('Login')
      const inputItem = reactive({
        name: '',
        url: '',
      })
      const cart = useRootStore()

      const items = computed(() => cart.getItems)

      const clearInput = () => {
        inputItem.name = ''
        inputItem.url = ''
      }

      function addItem() {
        cart.addItem({ ...inputItem })
        clearInput()
      }
      return { page, addItem, inputItem, items }
    },
  })
</script>

<style>
  .btn {
    margin-top: 5px;
  }
</style>
