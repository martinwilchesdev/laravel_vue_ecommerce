import useUserStore from '../store'
import router from '../router'

import axios from 'axios'

const axiosClient = axios.create({
    baseURL: `${import.meta.VITE_API_BASE_URL}/api`,
})

// interceptors es una funcion que se ejecuta antes y despues de que las peticiones sean realizadas
axiosClient.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${useUserStore().user.token}` // Se valida que el encabezado de la peticion contenga el token de autenticacion
    return config
})

axiosClient.interceptors.request.use(
    (response) => {
        return response
    },
    (error) => {
        if (error.response.status === 401) {
            sessionStorage.removeItem('token')
            router.push({ name: 'login' })
        }

        throw error
    }
)

export default axiosClient
