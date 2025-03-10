import useUserStore from '../store/user'
import router from '../router'

import axios from 'axios'

// Se crea una instancia de axios a traves del metodo `create`
const axiosClient = axios.create({
    baseURL: `${import.meta.env.VITE_API_BASE_URL}/api`, // Se obtiene la url del archivo .env
})

// `interceptors` es una funcion que se ejecuta antes y despues de que las peticiones HTTP sean realizadas
axiosClient.interceptors.request.use((response) => {
    // Se agrega el token de autenticacion guardado en el store a la cabecera de la peticion
    response.headers.Authorization = `Bearer ${useUserStore().state.user.token}`
    return response
})

axiosClient.interceptors.request.use(
    (response) => {
        return response
    },
    (error) => {
        // Si el codigo de estado de la peticion es `401`, se remueve el token de autorizacion del sessionStorage
        if (error.response.status === 401) {
            sessionStorage.removeItem('token')
            router.push({ name: 'login' })
        }

        throw error
    }
)

export default axiosClient
