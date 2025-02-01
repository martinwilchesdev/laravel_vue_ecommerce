<script setup>
import ProductsTable from './ProductsTable.vue'
</script>

<template>
    <div class="flex items-center justify-between mb-3">
        <h1 class="text-3xl font-semibold">Products</h1>
        <button
            class="bg-indigo-700 text-white font-bold py-2 px-4 rounded border-transparent hover:bg-indigo-800 transition-colors"
        >
            Add new product
        </button>
    </div>
    <ProductsTable />
</template>
