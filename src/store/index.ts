import { defineStore, _ActionsTree, _GettersTree } from 'pinia'

export type Item = { name: string; url: string }

export interface IRootState {
  items: Item[]
}

export const state: IRootState = {
  items: [],
}

export interface IGetters extends _GettersTree<IRootState> {
  getItems: (state: IRootState) => Item[]
}
export interface IActions extends _ActionsTree {
  addItem(item: Item): void
  removeItem(item: Item): void
}

export const useRootStore = defineStore('rootStore', {
  state: () => state as IRootState,
  getters: {
    getItems: (state: IRootState) => state.items,
  } as IGetters,
  actions: {
    addItem(item) {
      this.$patch((state: IRootState) => state.items.push(item))
    },
    removeItem(item) {
      this.$patch((state: IRootState) => {
        const i = state.items.findIndex((s) => s.name === item.name)
        if (i > -1) state.items.splice(i, 1)
      })
    },
  } as IActions,
})
