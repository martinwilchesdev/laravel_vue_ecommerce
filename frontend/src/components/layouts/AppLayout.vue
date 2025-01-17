<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import NavBar from '../NavBar.vue'
import Sidebar from '../Sidebar.vue'
import Spinner from '../core/Spinner.vue'

import useUserStore from '../../store'

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

const handleSidebarSize = () => {
    sideBarOpen.value = window.outerWidth >= 768 ? true : false
}

onMounted(() => {
    store.getUser()

    handleSidebarSize()
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
