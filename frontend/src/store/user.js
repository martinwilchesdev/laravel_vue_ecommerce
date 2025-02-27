import { defineStore } from 'pinia'
import state from './utils/state.js'

import {
    login as loginAction,
    logout as logoutAction,
    getUser as getUserAction,
} from './utils/actions.js'

const useUserStore = defineStore('user', {
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
    },
})

export default useUserStore
