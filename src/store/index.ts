import { UserServices } from '@/api'
import { LoginCredentials, RegisterCredentials, User } from '@/api/models/Users'
import { authServices } from '@/api/services/authServices'
import { defineStore, _ActionsTree, _GettersTree } from 'pinia'

export interface IRootState {
  user: User | null
}

export const state: IRootState = {
  user: null,
}

export interface IGetters extends _GettersTree<IRootState> {
  getUser: (state: IRootState) => User
}
export interface IActions extends _ActionsTree {
  fetchUser(id: string): void
  register(user: RegisterCredentials): void
  login(user: LoginCredentials): void
  logout(id: string): void
}

export const useRootStore = defineStore('rootStore', {
  state: () => state as IRootState,
  getters: {
    getUser: (state) => state.user,
  } as IGetters,
  actions: {
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
    async register(user) {
      try {
        const res = await authServices.registerUser(user)
        if (res) {
          this.$patch((state: IRootState) => {
            state.user = {
              _id: res.user,
              username: user.username,
              email: user.email,
            }
          })
          localStorage.setItem('loggedIn', res.user)
        }
      } catch (error) {
        if (error instanceof Error) throw Error(error.message)
      }
    },
    async login(userparam) {
      try {
        const res = await authServices.login(userparam)
        if (res) localStorage.setItem('loggedIn', res.user)
      } catch (error) {
        if (error instanceof Error) throw Error(error.message)
      }
    },
    logout(id) {
      this.$patch((state: IRootState) => {
        state.user = null
      })
      localStorage.removeItem('loggedIn')
    },
  } as IActions,
})
