import { defineStore } from 'pinia'
import state from './state.js'
import {
    login as loginAction,
    logout as logoutAction,
    getUser as getUserAction,
    getProducts as getProductsAction
} from './actions.js'

const useUserStore = defineStore('counter', {
    state: () => ({
        state,
    }),
    getters: {
        getCurrentUser() {
            return this.state.user.data
        },
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
        async getProducts() {
            const response = await getProductsAction()
        }
    },
})

export default useUserStore
