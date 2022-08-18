<template>
  <div class="flex justify-center content-center my-2">
    <div class="flex-row w-full">
      <br />
      <h1 class="text-center text-3xl underline mb-4">
        Welcome {{ self?.username ?? '' }}
      </h1>
      <form class="w-1/2 mx-auto space-y-3" @submit.prevent="pushStatement">
        <ToggleButton
          :label="incExp"
          :value="statement.income"
          @onUpdateValue="changeEntryLabel"
        />
        <TextInput
          label="Remarks"
          placeholder="e.g. Salary"
          v-model:moduleValue="statement.remark"
        />
        <TextInput
          label="Amount"
          placeholder="e.g. 100000"
          v-model:moduleValue="statement.amount"
        />
        <div>
          <button
            type="submit"
            class="p-2 mx-auto block my-2 w-1/3 rounded-md bg-green-200 hover:bg-green-300 active:bg-green-400"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
  import { reactive, ref } from '@vue/reactivity'
  import { computed, defineComponent, onMounted } from '@vue/runtime-core'
  import router from '@/router'
  import { useRootStore } from '@/store'
  import TextInput from '@/components/inputs/text-input.vue'
  import ToggleButton from '@/components/inputs/toggle-button.vue'

  export default defineComponent({
    components: { TextInput, ToggleButton },
    setup() {
      const statement = reactive({
        amount: '',
        remark: '',
        income: false,
      })
      const userState = useRootStore()
      const incExp = ref('Expenses')

      const self = computed(() => userState.getUser)

      const goTo = (path: string) => {
        router.push({ path })
      }

      onMounted(() => {
        userState.fetchUser()
      })

      function clearInput() {
        statement.amount = ''
        statement.remark = ''
        statement.income = false
      }

      function pushStatement() {
        console.log(statement.remark, statement.amount)
        clearInput()
      }

      function changeEntryLabel() {
        statement.income = !statement.income
        incExp.value = statement.income ? 'Income' : 'Expenses'
      }
      return { statement, goTo, self, pushStatement, incExp, changeEntryLabel }
    },
  })
</script>

<style></style>
