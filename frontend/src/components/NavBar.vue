<script setup>
import {
    ChevronDownIcon,
    ArrowLeftStartOnRectangleIcon,
    UserCircleIcon,
} from '@heroicons/vue/20/solid'
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue'

import useUserStore from '../store/user'
import { useRouter } from 'vue-router'

const store = useUserStore()
const router = useRouter()

const logout = async () => {
    try {
        await store.logout()
        router.push({ name: 'login' })
    } catch (e) {
        console.error('LOGOUT ERROR ', e.message)
    }
}
</script>

<template>
    <header class="sticky top-0 shadow p-4 bg-white z-10">
        <div class="flex justify-end">
            <Menu as="div" class="relative inline-block text-left">
                <div>
                    <MenuButton class="flex items-center">
                        <img
                            src="https://randomuser.me/api/portraits/lego/7.jpg"
                            class="mr-2 rounded-full w-12"
                            alt="Profile pic"
                        />
                        <span>{{ store.getCurrentUser.name }}</span>
                        <ChevronDownIcon
                            class="ml-2 mt-[2px] h-5 w-5 text-gray-400 hover:text-gray-200"
                            aria-hidden="true"
                        />
                    </MenuButton>
                </div>

                <transition
                    enter-active-class="transition duration-100 ease-out"
                    enter-from-class="transform scale-95 opacity-0"
                    enter-to-class="transform scale-100 opacity-100"
                    leave-active-class="transition duration-75 ease-in"
                    leave-from-class="transform scale-100 opacity-100"
                    leave-to-class="transform scale-95 opacity-0"
                >
                    <MenuItems
                        class="absolute right-0 mt-2 w-40 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none"
                    >
                        <div class="px-1 py-1">
                            <MenuItem v-slot="{ active }">
                                <button
                                    :class="[
                                        active
                                            ? 'bg-indigo-700 text-white'
                                            : 'text-gray-900',
                                        'group flex w-full items-center rounded-md px-2 py-2 text-sm',
                                    ]"
                                >
                                    <UserCircleIcon
                                        :active="active"
                                        class="mr-2 h-5 w-5 text-indigo-400"
                                        aria-hidden="true"
                                    />
                                    Profile
                                </button>
                            </MenuItem>
                            <MenuItem v-slot="{ active }">
                                <button
                                    :class="[
                                        active
                                            ? 'bg-indigo-700 text-white'
                                            : 'text-gray-900',
                                        'group flex w-full items-center rounded-md px-2 py-2 text-sm',
                                    ]"
                                    @click="logout"
                                >
                                    <ArrowLeftStartOnRectangleIcon
                                        :active="active"
                                        class="mr-2 h-5 w-5 text-indigo-400 hover:text-white"
                                        aria-hidden="true"
                                    />
                                    Logout
                                </button>
                            </MenuItem>
                        </div>
                    </MenuItems>
                </transition>
            </Menu>
        </div>
    </header>
</template>
