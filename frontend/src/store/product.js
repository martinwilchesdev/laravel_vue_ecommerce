import { defineStore } from 'pinia'
import state from './utils/state.js'

import { getProducts as getProductsAction } from './utils/actions.js'
import { createProduct as createProductAction } from './utils/actions.js'

const useProductStore = defineStore('product', {
    state: () => ({
        state,
    }),
    getters: {},
    actions: {
        async getProducts(url, queryParams) {
            await getProductsAction(url, queryParams)
        },
        async createProduct(product) {
            await createProductAction(product)
        },
        async updateProduct(product) {
            await updateProductAction(product)
        }
    },
})

export default useProductStore
