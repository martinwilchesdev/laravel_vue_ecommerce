<script setup>
import { ref } from 'vue'

import useUserStore from '../store'
import { useRouter } from 'vue-router'

import GuestLayout from '../components/layouts/GuestLayout.vue'

const store = useUserStore()
const router = useRouter()

const loading = ref(false)
const errorMsg = ref('')

const user = {
    email: '',
    password: '',
    remember: false,
}

const login = async () => {
    loading.value = true

    try {
        await store.login(user)
        router.push({ name: 'app.dashboard' })
    } catch (e) {
        console.error('LOGIN ERROR: ', e.message)
        errorMsg.value = e.message
    } finally {
        loading.value = false
    }
}
</script>

<template>
    <GuestLayout title="Sign in to your account" @submit="login">
        <div>
            <label for="email" class="block text-sm/6 font-medium text-gray-900"
                >Email address</label
            >
            <div class="mt-2">
                <input
                    id="email"
                    name="email"
                    type="email"
                    autocomplete="email"
                    required=""
                    placeholder="Enter email"
                    class="block w-full rounded-xs border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                    v-model="user.email"
                />
            </div>
        </div>

        <div>
            <div class="flex items-center justify-between">
                <label
                    for="password"
                    class="block text-sm/6 font-medium text-gray-900"
                    >Password</label
                >
                <div class="text-sm">
                    <RouterLink
                        :to="{ name: 'requestPasswordReset' }"
                        class="font-semibold text-indigo-600 hover:text-indigo-500"
                        >Forgot password?</RouterLink
                    >
                </div>
            </div>
            <div class="mt-2">
                <input
                    id="password"
                    name="password"
                    type="password"
                    autocomplete="current-password"
                    required=""
                    placeholder="Enter password"
                    class="block w-full rounded-xs border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                    v-model="user.password"
                />
            </div>
        </div>

        <div>
            <button
                type="submit"
                :disabled="loading"
                :class="[
                    loading ? 'cursor-not-allowed bg-indigo-500' : '',
                    'flex w-full justify-center items-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600',
                ]"
            >
                <svg
                    class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    v-if="loading"
                >
                    <circle
                        class="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        stroke-width="4"
                    ></circle>
                    <path
                        class="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                </svg>
                Sign in
            </button>
        </div>
    </GuestLayout>
</template>
