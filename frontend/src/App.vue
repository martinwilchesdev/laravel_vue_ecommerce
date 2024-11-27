<script setup>
import {ref, computed} from 'vue'
import useCounterStore from './store'
import { RouterView } from 'vue-router'

const store = useCounterStore()
const test = computed(() => store.counter)
</script >

<template>
    <RouterView />
</template>
