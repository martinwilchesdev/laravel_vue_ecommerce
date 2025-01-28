<script setup>
import {
    HomeIcon,
    UsersIcon,
    ListBulletIcon,
    ChartBarIcon,
    Bars3Icon,
} from '@heroicons/vue/24/outline'
import NavBarLink from './NavBarLink.vue'

const props = defineProps({
    sideBarOpen: {
        type: Boolean,
        default: true,
    },
})

const emit = defineEmits(['toggle-sidebar'])
</script>

<template>
    <nav
        :class="[
            sideBarOpen ? '' : '-ml-[200px]',
            'relative w-[200px] bg-indigo-700 text-white pt-20 px-2 transition-all',
        ]"
    >
        <!-- Bars icon menu -->
        <button
            @click="emit('toggle-sidebar')"
            class="fixed top-5 left-3 cursor-pointer"
        >
            <Bars3Icon
                :class="[sideBarOpen ? 'text-white' : 'text-black', 'size-10']"
            />
        </button>

        <!-- Menu links -->
        <div class="fixed">
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
            <NavBarLink path="app.products">
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
        </div>
    </nav>
</template>
