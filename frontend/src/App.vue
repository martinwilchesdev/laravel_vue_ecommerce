<script setup>
import {ref, computed} from 'vue'
import useCounterStore from './store'

const store = useCounterStore()
const test = computed(() => store.counter)
</script >

<template>
    <RouterView />
</template>
