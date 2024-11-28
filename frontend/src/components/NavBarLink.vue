<script setup>
const props = defineProps({
    path: {
        type: String,
        default: '',
    },
})
</script>

<template>
    <RouterLink
        :to="{ name: path }"
        class="flex items-center gap-1 py-1 px-2 my-2 rounded transition-colors hover:bg-black/20"
    >
        <slot></slot>
    </RouterLink>
</template>
