import { defineStore } from 'pinia'
import { login as loginAction, logout as logoutAction } from './actions.js'

const useUserStore = defineStore('counter', {
    state: () => ({
        user: {
            token: sessionStorage.getItem('TOKEN'),
            data: {},
        },
    }),
    getters: {
        getUser() {
            return this.user
        },
    },
    actions: {
        async login(user) {
            await loginAction(user)
        },
        async logout() {
            await logoutAction()
        },
    },
})

export default useUserStore
