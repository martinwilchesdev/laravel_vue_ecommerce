<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import NavBar from '../NavBar.vue'
import Sidebar from '../Sidebar.vue'
import Spinner from '../core/Spinner.vue'

import useUserStore from '../../store/user'

const props = defineProps({
    title: {
        type: String,
        default: '',
    },
})

const store = useUserStore()

const sideBarOpen = ref(true)

const toggleSidebar = () => {
    sideBarOpen.value = !sideBarOpen.value
}

// A partir del tamaño de la ventana se asigna el valor a sidebarOpen para ocultar o mostrar el menu lateral
const handleSidebarSize = () => {
    sideBarOpen.value = window.outerWidth >= 768 ? true : false
}

onMounted(() => {
    // Se obtiene el usuario autenticado y se guarda en el store
    store.getUser()

    handleSidebarSize()

    // Se asigna la funcion que calcula el tamaño de la ventana al escuchado de eventos `resize`
    window.addEventListener('resize', handleSidebarSize)
})

onUnmounted(() => {
    window.removeEventListener('resize', handleSidebarSize)
})
</script>

<template>
    <div v-if="store.getCurrentUser.id" class="flex min-h-full bg-gray-100">
        <!-- Sidebar -->
        <Sidebar @toggle-sidebar="toggleSidebar" :sideBarOpen="sideBarOpen" />
        <div class="flex-1">
            <!-- Header-->
            <NavBar />
            <main class="p-6">
                <RouterView />
            </main>
        </div>
    </div>
    <div v-else class="min-h-full flex justify-center items-center">
        <Spinner />
    </div>
</template>
