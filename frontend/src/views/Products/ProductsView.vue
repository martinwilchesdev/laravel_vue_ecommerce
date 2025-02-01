<script setup>
import ProductModal from './ProductModal.vue'
import ProductsTable from './ProductsTable.vue'
import { ref } from 'vue'

const showModal = ref(false)

function showProductModal() {
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
    <ProductModal v-model="showModal" />
    <ProductsTable />
</template>
