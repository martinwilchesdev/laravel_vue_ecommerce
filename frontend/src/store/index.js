import { defineStore } from 'pinia'

const useUserStore = defineStore('counter', {
    state: () => ({
        user: {
            token: null,
            data: {},
        },
    }),
    getters: {
        doubleCount: (state) => state.count * 2,
    },
    actions: {
        increment() {
            this.count++
        },
    },
})

export default useUserStore
