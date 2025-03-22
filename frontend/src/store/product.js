import { defineStore } from 'pinia'
import state from './utils/state.js'

import { getProduct as getProductAction } from './utils/actions.js'
import { getProducts as getProductsAction } from './utils/actions.js'
import { createProduct as createProductAction } from './utils/actions.js'
import { updateProduct as updateProductAction } from './utils/actions.js'
import { deleteProduct as deleteProductAction } from './utils/actions.js'

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
        },
        async deleteProduct(id) {
            await deleteProductAction(id)
        },
        async getProduct(id) {
            return await getProductAction(id)
        }
    },
})

export default useProductStore
