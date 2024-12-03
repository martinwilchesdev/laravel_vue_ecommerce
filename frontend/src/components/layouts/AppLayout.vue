<script setup>
import { handleError, onMounted, onUnmounted, ref } from 'vue'
import NavBar from '../NavBar.vue'
import Sidebar from '../Sidebar.vue'

const props = defineProps({
    title: {
        type: String,
        default: '',
    },
})

const sideBarOpen = ref(true)

const toggleSidebar = () => {
    sideBarOpen.value = !sideBarOpen.value
}

const handleSidebarSize = () => {
    sideBarOpen.value = window.outerWidth >= 768 ? true : false
}

onMounted(() => {
    handleSidebarSize()
    window.addEventListener('resize', handleSidebarSize)
})

onUnmounted(() => {
    window.removeEventListener('resize', handleSidebarSize)
})
</script>

<template>
    <div class="flex min-h-full bg-gray-100">
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
</template>
