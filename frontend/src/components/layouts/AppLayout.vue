<script setup>
import AppHeader from '../AppHeader.vue'
import Sidebar from '../Sidebar.vue'

const props = defineProps({
    title: {
        type: String,
        default: '',
    },
})

const emit = defineEmits(['submit'])
</script>

<template>
    <div class="flex min-h-full bg-gray-100">
        <!-- Sidebar -->
        <Sidebar />
        <div class="flex-1">
            <!-- Header-->
            <AppHeader />
            <main class="p-6">
                <RouterView />
            </main>
        </div>
    </div>
</template>
