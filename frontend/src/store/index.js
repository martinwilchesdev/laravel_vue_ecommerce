import { defineStore } from 'pinia'
import {
    login as loginAction,
    logout as logoutAction,
    getUser as getUserAction,
} from './actions.js'

const useUserStore = defineStore('counter', {
    state: () => ({
        user: {
            token: sessionStorage.getItem('TOKEN'),
            data: {},
        },
    }),
    getters: {
        getCurrentUser() {
            return this.user.data
        }
    },
    actions: {
        async getUser() {
            await getUserAction()
        },
        async login(user) {
            await loginAction(user)
        },
        async logout() {
            await logoutAction()
        },
    },
})

export default useUserStore
