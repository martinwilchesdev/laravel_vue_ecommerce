<script setup>
import { computed, onUpdated, ref } from 'vue'
import {
    TransitionRoot,
    TransitionChild,
    Dialog,
    DialogPanel,
    DialogTitle,
} from '@headlessui/vue'

import Spinner from '../../components/core/Spinner.vue'

import useProductStore from '../../store/product'

const props = defineProps({
    modelValue: {
        type: Boolean,
        default: false,
    },
    product: {
        required: true,
        type: Object,
    },
})

const productStore = useProductStore()

const emit = defineEmits(['update:modelValue', 'close'])

const loading = ref(false)
const product = ref({
    id: props.product.id,
    title: props.product.title,
    image: props.product.image,
    price: props.product.price,
    description: props.product.description,
})

const show = computed({
    get: () => props.modelValue, // Obtener el valor de la prop
    set: (value) => emit('update:modelValue', value), // Emitir un evento al padre (actualizar el valor de la prop recibida)
})

onUpdated(() => {
    product.value = {
        id: props.product.id,
        title: props.product.title,
        image: props.product.image,
        price: props.product.price,
        description: props.product.description,
    }
})

function closeModal() {
    show.value = false
    emit('close')
}

function onSubmit() {
    loading.value = true

    try {
        if (product.value.id) {
            productStore.updateProduct(product)
            closeModal()
        } else {
            productStore.createProduct(product)
            closeModal
        }
    } catch (e) {
        console.log('Error: ', e)
    }
}
</script>

<template>
    <TransitionRoot appear :show="show" as="template">
        <Dialog as="div" @close="closeModal" class="relative z-10">
            <TransitionChild
                as="template"
                enter="duration-300 ease-out"
                enter-from="opacity-0"
                enter-to="opacity-100"
                leave="duration-200 ease-in"
                leave-from="opacity-100"
                leave-to="opacity-0"
            >
                <div class="fixed inset-0 bg-black/25" />
            </TransitionChild>

            <div class="fixed inset-0 overflow-y-auto">
                <div
                    class="flex min-h-full items-center justify-center p-4 text-center"
                >
                    <TransitionChild
                        as="template"
                        enter="duration-300 ease-out"
                        enter-from="opacity-0 scale-95"
                        enter-to="opacity-100 scale-100"
                        leave="duration-200 ease-in"
                        leave-from="opacity-100 scale-100"
                        leave-to="opacity-0 scale-95"
                    >
                        <DialogPanel
                            class="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all"
                        >
                            <Spinner v-if="loading" />
                            <header
                                class="py-3 px-4 flex justify-between items-center"
                            >
                                <DialogTitle> </DialogTitle>
                                <button
                                    @click="closeModal"
                                    class="w-8 h-8 flex items-center justify-center rounded-full transition-colors cursor-pointer hover:bg-[rgba(0,0,0,0.06)]"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke-width="1.5"
                                        stroke="currentColor"
                                        class="size-6"
                                    >
                                        <path
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            d="M6 18 18 6M6 6l12 12"
                                        />
                                    </svg>
                                </button>
                            </header>

                            <form @submit.prevent="onSubmit">
                                <div class="bg-white px-4 pt-5 pb-4">
                                    <CustomInput
                                        class="mb-2"
                                        v-model="product.title"
                                        label="Product title"
                                    />
                                    <CustomInput
                                        type="file"
                                        v-model="product.image"
                                        label="Product image"
                                        @change="
                                            (file) => (product.image = file)
                                        "
                                    />
                                    <CustomInput
                                        type="textarea"
                                        class="mb-2"
                                        v-model="product.description"
                                        label="Product description"
                                    />
                                    <CustomInput
                                        type="number"
                                        class="mb-2"
                                        v-model="product.price"
                                        label="Price"
                                    />
                                </div>
                                <footer
                                    class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse"
                                >
                                    <button
                                        type="button"
                                        class="inline-flex w-full justify-center rounded-md bg-indigo-700 px-3 py-2 text-sm font-semibold text-white shadow-xs transition-colors hover:bg-indigo-800 sm:ml-3 sm:w-auto"
                                    >
                                        Submit
                                    </button>
                                    <button
                                        type="button"
                                        class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 shadow-xs ring-gray-300 ring-inset hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                        @click="closeModal"
                                    >
                                        Cancel
                                    </button>
                                </footer>
                            </form>
                        </DialogPanel>
                    </TransitionChild>
                </div>
            </div>
        </Dialog>
    </TransitionRoot>
</template>
