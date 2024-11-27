<script setup>

import { RouterLink, RouterView } from 'vue-router';
const props = defineProps({
    title: {
        type: String,
        default: '',
    },
})

const emit = defineEmits(['submit'])
</script>

<template>
    <div
        class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8"
    >
        <div class="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2
                class="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900"
            >
                Part of the layout
            </h2>
            <RouterView />
        </div>

    </div>
</template>
