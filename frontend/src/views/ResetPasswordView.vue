<script setup>
import GuestLayout from '../components/layouts/GuestLayout.vue'

const resetPassword = () => {
    // TODO
}
</script>

<template>
    <GuestLayout @submit="resetPassword">
        <div>
            <div class="flex items-center justify-between">
                <label
                    for="password"
                    class="block text-sm/6 font-medium text-gray-900"
                    >New password</label
                >
            </div>
            <div class="mt-2">
                <input
                    id="password"
                    name="password"
                    type="password"
                    autocomplete="current-password"
                    required=""
                    placeholder="Enter new password"
                    class="block w-full rounded-xs border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                />
            </div>
        </div>

        <div>
            <div class="flex items-center justify-between">
                <label
                    for="confirm-password"
                    class="block text-sm/6 font-medium text-gray-900"
                    >Confirm password</label
                >
            </div>
            <div class="mt-2">
                <input
                    id="confirm-password"
                    name="confirm-password"
                    type="password"
                    autocomplete="off"
                    required=""
                    placeholder="Confirm new password"
                    class="block w-full rounded-xs border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                />
            </div>
        </div>

        <div>
            <div class="flex items-center justify-start">
                <div class="text-sm flex">
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
