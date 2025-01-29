<script setup>
import { ref, computed, onMounted } from 'vue'

import { PRODUCTS_PER_PAGE } from '../constants'

import TableHeaderCell from '../components/core/Table/TableHeaderCell.vue'
import Spinner from '../components/core/Spinner.vue'

import useUserStore from '../store/index'

const store = useUserStore()

// Query params
const search = ref('')
const perPage = ref(PRODUCTS_PER_PAGE)

// Sorting params
const sortDirection = ref('desc')
const sortField = ref('updated_at')

const products = computed(() => store.state.products)

onMounted(() => {
    getProducts()
})

const getProducts = async (url = null) => {
    try {
        const params = {
            search: search.value,
            perPage: perPage.value,
            sortField: sortField.value,
            sortDirection: sortDirection.value,
        }

        await store.getProducts(url, params)
    } catch (e) {
        console.log('Error: ', e)
    }
}

const getForPage = (ev, link) => {
    if (!link.url || link.active) return
    getProducts(link.url)
}

const sortProducts = async (field) => {
    if (sortField.value != field) sortDirection.value = 'asc'
    sortField.value = field

    sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc'

    await getProducts(null)
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
                    @change="getProducts(null)"
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
                    @input="getProducts(null)"
                    placeholder="Type to search products"
                    class="appeareance-none relative block w-56 px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                />
            </div>
        </div>
        <div v-if="products.loading" class="w-full m-2 flex justify-center">
            <Spinner />
        </div>
        <template v-else>
            <table class="table-auto w-full">
                <thead>
                    <tr>
                        <TableHeaderCell
                            @click="sortProducts('id')"
                            field="id"
                            :sortField="sortField"
                            :sortDirection="sortDirection"
                        >
                            ID
                        </TableHeaderCell>
                        <TableHeaderCell field="image"> Image </TableHeaderCell>
                        <TableHeaderCell
                            @click="sortProducts('title')"
                            field="title"
                            :sortField="sortField"
                            :sortDirection="sortDirection"
                        >
                            Title
                        </TableHeaderCell>
                        <TableHeaderCell
                            @click="sortProducts('price')"
                            field="price"
                            :sortField="sortField"
                            :sortDirection="sortDirection"
                        >
                            Price
                        </TableHeaderCell>
                        <TableHeaderCell
                            @click="sortProducts('updated_at')"
                            field="updated_at"
                            :sortField="sortField"
                            :sortDirection="sortDirection"
                        >
                            Last updated at
                        </TableHeaderCell>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="product in products.data">
                        <td class="border-b p-2">{{ product.id }}</td>
                        <td class="border-b p-2">
                            <img class="w-16" :src="product.image" />
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
            <div class="flex justify-between items-center mt-5">
                <span>
                    Showing {{ products.meta.from }} to
                    {{ products.meta.to }} from {{ products.meta.total }}
                </span>
                <div>
                    <nav
                        class="isolate inline-flex -space-x-px rounded-md shadow-sm"
                        aria-label="Pagination"
                    >
                        <a
                            v-for="(link, index) in products.meta.links"
                            :key="index"
                            href="#"
                            @click="getForPage($event, link)"
                            aria-current="page"
                            class="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300"
                            :class="[
                                link.active
                                    ? 'relative z-10 inline-flex items-center bg-indigo-600 px-4 py-2 text-sm font-semibold text-white pointer-events-none select-none focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                                    : 'bg-white hover:bg-gray-200 focus:z-20 focus:outline-offset-0',
                                index === 0 ? 'rounded-l-md' : '',
                                index === products.meta.links.lenght - 1
                                    ? 'rounded-r-md'
                                    : '',
                                !link.url
                                    ? 'bg-gray-100 text-gray-700 pointer-events-none select-none'
                                    : '',
                            ]"
                            v-html="link.label"
                        ></a>
                    </nav>
                </div>
            </div>
        </template>
    </div>
</template>
