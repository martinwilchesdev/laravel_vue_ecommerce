import { createWebHistory, createRouter } from 'vue-router'

import RequestPasswordResetView from '../Views/RequestPasswordResetView.vue'
import ResetPasswordView from '../Views/ResetPasswordView.vue'
import DashboardView from '../Views/DashboardView.vue'
import LoginView from '../Views/LoginView.vue'

const routes = [
    {
        path: '/',
        name: 'dashboard',
        component: DashboardView
    },
    {
        path: '/login',
        name: 'login',
        component: LoginView
    },
    {
        path: '/request-password-reset',
        name: 'requestPasswordReset',
        component: RequestPasswordResetView
    },
    {
        path: '/reset-password/:token',
        name: 'resetPassword',
        component: ResetPasswordView
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
