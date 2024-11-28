<script setup>
import GuestLayout from '../components/layouts/GuestLayout.vue'

const requestPasswordReset = () => {
    // TODO
}
</script>

<template>
    <GuestLayout title="Reset password" @submit="requestPasswordReset">
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
                />
            </div>
        </div>

        <div>
            <div class="flex items-center justify-start">
                <div class="text-sm">
                    <RouterLink
                        :to="{ name: 'login' }"
                        class="font-semibold text-indigo-600 hover:text-indigo-500"
                        >Back to login page</RouterLink
                    >
                </div>
            </div>
        </div>

        <div>
            <button
                type="submit"
                class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
                Submit
            </button>
        </div>
    </GuestLayout>
</template>
