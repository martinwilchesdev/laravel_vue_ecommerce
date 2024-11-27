import { defineStore } from 'pinia'

const useCounterStore = defineStore('counter', {
    state: () => ({ counter: 123 }),
    getters: {
      doubleCount: (state) => state.count * 2,
    },
    actions: {
        increment() {
            this.count++
        },
    },
})

export default useCounterStore
