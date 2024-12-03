import { createWebHistory, createRouter } from 'vue-router'

// Layouts
import AppLayout from '../components/layouts/AppLayout.vue'

// Views
import RequestPasswordResetView from '../Views/RequestPasswordResetView.vue'
import ResetPasswordView from '../Views/ResetPasswordView.vue'
import DashboardView from '../Views/DashboardView.vue'
import ProductsView from '../views/ProductsView.vue'
import LoginView from '../Views/LoginView.vue'

// Store
import useUserStore from '../store'

const routes = [
    {
        path: '/app',
        name: 'app',
        component: AppLayout,
        meta: {
            requiresAuth: true // Especifica que la navegacion en la navegacion en la ruta requiere autorizacion
        },
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
        meta: {
            authGuest: true
        }
    },
    {
        path: '/request-password-reset',
        name: 'requestPasswordReset',
        component: RequestPasswordResetView,
        meta: {
            authGuest: true
        }
    },
    {
        path: '/reset-password/:token',
        name: 'resetPassword',
        component: ResetPasswordView,
        meta: {
            authGuest: true
        }
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})


/**
 * to es la ruta a la que se desea navegar
 * from es la ruta origen
 * next es una funcion que debe ser llamada para permitir la navegacion a otra pagina
*/
router.beforeEach((to, from, next) => {
    const store = useUserStore()
    if (to.meta.requiresAuth && !store.user.token) {
        next({name: 'login'}) // Si el usuario no esta autenticadado y la ruta requiere autenticacion, se redirigira a la vista de login
    } else if (to.meta.authGuest && store.user.token) {
        next({name: 'app.dashboard'}) // Si el usuario esta autenticado, no podra acceder a las rutas de invitado
    } else {
        next() // En caso contrario se redirigira al usuario a la ruta a la que intenta acceder
    }
})

export default router
