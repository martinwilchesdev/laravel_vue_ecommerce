<script setup>
import AppHeader from '../AppHeader.vue'
import Sidebar from '../Sidebar.vue'

const props = defineProps({
    title: {
        type: String,
        default: '',
    },
})

const toggleSidebar = () => {
    console.log('test')
}
</script>

<template>
    <div class="flex min-h-full bg-gray-100">
        <!-- Sidebar -->
        <Sidebar @toggle-sidebar="toggleSidebar" />
        <div class="flex-1">
            <!-- Header-->
            <AppHeader />
            <main class="p-6">
                <RouterView />
            </main>
        </div>
    </div>
</template>
