<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import NavBar from '../NavBar.vue'
import Sidebar from '../Sidebar.vue'

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
    <div class="min-h-full flex justify-center items-center" v-else>
        <svg
            class="animate-spin h-10 w-10 text-indigo-600"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
        >
            <circle
                class="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                stroke-width="4"
            ></circle>
            <path
                class="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
        </svg>
    </div>
</template>
