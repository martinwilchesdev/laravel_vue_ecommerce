<script setup>
import { RouterLink, RouterView } from 'vue-router'
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
    <div class="flex min-h-full">
        <!-- Sidebar -->
        <Sidebar />
        <div class="flex-1">
            <header class="h-8 shadow bg-white">Header</header>
            <main>
                <RouterView />
            </main>
        </div>
    </div>
</template>
