import { UserServices } from '@/api'
import { SetUser, User } from '@/api/models/Users'
import { defineStore, _ActionsTree, _GettersTree } from 'pinia'

export interface IRootState {
  users: User[]
  user: User | null
}

export const state: IRootState = {
  users: [],
  user: null,
}

export interface IGetters extends _GettersTree<IRootState> {
  getUsers: (state: IRootState) => User[]
  getUser: (state: IRootState) => User
}
export interface IActions extends _ActionsTree {
  fetchUsers(): void
  fetchUser(id: string): void
  addUser(user: SetUser): void
  removeUser(user: SetUser): void
  login(user: SetUser): void
  logout(username: string): void
}

export const useRootStore = defineStore('rootStore', {
  state: () => state as IRootState,
  getters: {
    getUsers: (state) => state.users,
    getUser: (state) => state.user,
  } as IGetters,
  actions: {
    async fetchUsers() {
      try {
        const res = await UserServices.getUsers()
        this.$patch((state: IRootState) => {
          state.users.push(...res)
        })
      } catch (error) {
        if (error instanceof Error) console.log(error.message)
      }
    },
    async fetchUser(id: string) {
      if (state.user) return
      try {
        const res = await UserServices.getUser(id)
        this.$patch((state: IRootState) => {
          state.user = res
        })
      } catch (error) {
        if (error instanceof Error) console.log(error.message)
      }
    },
    async addUser(user) {
      try {
        const res = await UserServices.addUser(user)
        if (res) {
          console.log(res);
          // this.$patch((state: IRootState) => {
          //   state.users.push({ ...user, _id: res.id })
          // })
        }
      } catch (error) {
        if (error instanceof Error) console.log(error.message)
      }
    },
    removeUser(user) {
      this.$patch((state: IRootState) => {
        const i = state.users.findIndex((s) => s.username === user.username)
        if (i > -1) state.users.splice(i, 1)
      })
    },
    login(userparam) {
      this.$patch((state: IRootState) => {
        const findIndex = state.users.findIndex(
          (user) =>
            user.username === userparam.username &&
            user.password === userparam.password
        )
        if (findIndex === -1) {
          throw new Error('User not found')
        }
        state.user = state.users[findIndex]
        localStorage.setItem('loggedIn', JSON.stringify(state.users[findIndex]))
      })
    },
    logout(username) {
      this.$patch((state: IRootState) => {
        const userIndex = state.users.findIndex(
          (user) => user.username === username
        )
        if (userIndex === -1) throw new Error('unable to logout')
        state.user = null
      })
      localStorage.removeItem('loggedIn')
    },
  } as IActions,
})
