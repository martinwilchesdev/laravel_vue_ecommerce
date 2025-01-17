<script setup>
import { ref, computed, onMounted } from 'vue'

import Spinner from '../components/core/Spinner.vue'
import useUserStore from '../store/index'

const store = useUserStore()

const search = ref('')
const perPage = ref(10)
const products = computed(() => store.state.products)

onMounted(() => {
    getProducts()
})

const getProducts = async () => {
    try {
        await store.getProducts()
    } catch(e) {
        console.log('Error: ', e)
    }
}
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
    <div class="bg-white p-4 rounded-lg-shadow">
        <div class="flex justify-between border-b-2 pb-3">
            <div class="flex items-center">
                <span class="whitespace-nowrap mr-3">Per page</span>
                <select
                    v-model="perPage"
                    class="appeareance-none relative block w-24 px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                >
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="20">20</option>
                    <option value="50">50</option>
                    <option value="100">100</option>
                </select>
            </div>
            <div>
                <input
                    v-model="search"
                    placeholder="Type to search products"
                    class="appeareance-none relative block w-56 px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                />
            </div>
        </div>
        <Spinner v-if="products.loading" />
        <template v-else>
            <table class="table-auto w-full">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Image</th>
                        <th>Title</th>
                        <th>Price</th>
                        <th>Last updated</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="product in products.data">
                        <td class="border-b p-2">{{ product.id }}</td>
                        <td class="border-b p-2">
                            <img
                                class="w-16"
                                :src="product.image"
                            />
                        </td>
                        <td
                            class="border-b p-2 max-w-[200px] whitespace-nowrap overflow-hidden text-ellipsis"
                        >
                            {{ product.title }}
                        </td>
                        <td class="border-b p-2">{{ product.price }}</td>
                        <td class="border-b p-2">{{ product.updated_at }}</td>
                    </tr>
                </tbody>
            </table>
        </template>
    </div>
</template>
