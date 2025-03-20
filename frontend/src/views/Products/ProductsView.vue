<script setup>
import ProductModal from './ProductModal.vue'
import ProductsTable from './ProductsTable.vue'
import { ref } from 'vue'

import useProductStore from '../../store/product'

const productStore = useProductStore()

const showModal = ref(false)

const productModel = ref({
    id: '',
    title: '',
    image: '',
    price: '',
    description: '',
})

function showProductModal() {
    showModal.value = true
}

async function editProduct(product) {
    const response = await productStore.getProduct(product.id)
    productModel.value = response
    showModal.value = true
}
</script>

<template>
    <div class="flex items-center justify-between mb-3">
        <h1 class="text-3xl font-semibold">Products</h1>
        <button
            type="submit"
            class="bg-indigo-700 text-white font-bold py-2 px-4 rounded border-transparent hover:bg-indigo-800 transition-colors"
            @click="showProductModal"
        >
            Add new product
        </button>
    </div>
    <ProductModal v-model="showModal" :product="productModel" />
    <ProductsTable @clickEdit="editProduct" />
</template>
