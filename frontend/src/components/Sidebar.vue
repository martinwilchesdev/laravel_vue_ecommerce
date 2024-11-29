<script setup>
import {
    HomeIcon,
    UsersIcon,
    ListBulletIcon,
    ChartBarIcon,
    Bars3Icon,
} from '@heroicons/vue/24/outline'
import NavBarLink from './NavBarLink.vue'

const emit = defineEmits(['toggle-sidebar'])
</script>

<template>
    <nav class="w-[200px] bg-indigo-700 text-white py-4 px-2">
        <!-- Bars icon menu -->
        <button @click="emit('toggle-sidebar')" class="mb-8 cursor-pointer">
            <Bars3Icon class="size-8" />
        </button>

        <!-- Menu links -->
        <NavBarLink path="app.dashboard">
            <span>
                <HomeIcon class="size-6" />
            </span>
            <span class="text-md">Dashboard</span>
        </NavBarLink>
        <NavBarLink path="app.products">
            <span>
                <ListBulletIcon class="size-6" />
            </span>
            <span class="text-md">Products</span>
        </NavBarLink>
        <NavBarLink path="app.users">
            <span>
                <UsersIcon class="size-6" />
            </span>
            <span class="text-md">Users</span>
        </NavBarLink>
        <NavBarLink path="app.reports">
            <span>
                <ChartBarIcon class="size-6" />
            </span>
            <span class="text-md">Reports</span>
        </NavBarLink>
    </nav>
</template>
