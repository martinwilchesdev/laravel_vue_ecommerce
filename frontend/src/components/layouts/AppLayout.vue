<script setup>
import { ref } from 'vue'
import AppHeader from '../AppHeader.vue'
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
</script>

<template>
    <div class="flex min-h-full bg-gray-100">
        <!-- Sidebar -->
        <Sidebar
            @toggle-sidebar="toggleSidebar"
            :class="[sideBarOpen ? '' : '-ml-[200px]']"
            :sideBarOpen="sideBarOpen"
        />
        <div class="flex-1">
            <!-- Header-->
            <AppHeader />
            <main class="p-6">
                <RouterView />
            </main>
        </div>
    </div>
</template>
