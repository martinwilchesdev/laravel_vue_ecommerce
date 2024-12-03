import { createWebHistory, createRouter } from 'vue-router'

// Layouts
import AppLayout from '../components/layouts/AppLayout.vue'

// Views
import RequestPasswordResetView from '../Views/RequestPasswordResetView.vue'
import ResetPasswordView from '../Views/ResetPasswordView.vue'
import DashboardView from '../Views/DashboardView.vue'
import ProductsView from '../views/ProductsView.vue'
import LoginView from '../Views/LoginView.vue'

const routes = [
    {
        path: '/app',
        name: 'app',
        component: AppLayout,
        children: [
            {
                path: 'dashboard',
                name: 'app.dashboard',
                component: DashboardView,
            },
            {
                path: 'products',
                name: 'app.products',
                component: ProductsView,
            },
            {
                path: 'users',
                name: 'app.users',
                component: DashboardView,
            },
            {
                path: 'reports',
                name: 'app.reports',
                component: DashboardView,
            },
        ],
    },
    {
        path: '/login',
        name: 'login',
        component: LoginView,
    },
    {
        path: '/request-password-reset',
        name: 'requestPasswordReset',
        component: RequestPasswordResetView,
    },
    {
        path: '/reset-password/:token',
        name: 'resetPassword',
        component: ResetPasswordView,
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router
