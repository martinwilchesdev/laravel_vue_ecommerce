import { createWebHistory, createRouter } from 'vue-router'

/**
 * Layouts
**/
import AppLayout from '../components/layouts/AppLayout.vue'

/**
 * Views
**/

/* Password management */
import RequestPasswordResetView from '../views/RequestPasswordResetView.vue'
import ResetPasswordView from '../views/ResetPasswordView.vue'

/* Products */
import ProductsView from '../views/Products/ProductsView.vue'

/* Main views */
import DashboardView from '../views/DashboardView.vue'
import NotFoundView from '../views/NotFoundView.vue'
import LoginView from '../views/LoginView.vue'

// Store
import useUserStore from '../store/user'

const routes = [
    {
        path: '/app',
        name: 'app',
        component: AppLayout,
        meta: {
            requiresAuth: true, // Especifica que la navegacion en la navegacion en la ruta requiere autorizacion
        },
        children: [
            {
                path: 'dashboard',
                name: 'app.dashboard',
                component: DashboardView,
                meta: {
                    title: 'Dashboard',
                },
            },
            {
                path: 'products',
                name: 'app.products',
                component: ProductsView,
                meta: {
                    title: 'Products',
                },
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
            authGuest: true,
            title: 'Login',
        },
    },
    {
        path: '/request-password-reset',
        name: 'requestPasswordReset',
        component: RequestPasswordResetView,
        meta: {
            authGuest: true,
            title: 'Request password reset',
        },
    },
    {
        path: '/reset-password/:token',
        name: 'resetPassword',
        component: ResetPasswordView,
        meta: {
            authGuest: true,
            title: 'Reset password',
        },
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'notFound',
        component: NotFoundView,
        meta: {
            title: 'Not found',
        },
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
router.beforeEach((to, from) => {
    document.title = `${to.meta.title}`
})

router.beforeEach((to, from, next) => {
    const store = useUserStore()
    if (to.meta.requiresAuth && !store.state.user.token) {
        next({ name: 'login' }) // Si el usuario no esta autenticadado y la ruta requiere autenticacion, se redirigira a la vista de login
    } else if (to.meta.authGuest && store.state.user.token) {
        next({ name: 'app.dashboard' }) // Si el usuario esta autenticado, no podra acceder a las rutas de invitado
    } else {
        next() // En caso contrario se redirigira al usuario a la ruta a la que intenta acceder
    }
})

export default router
