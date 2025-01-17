import useUserStore from '../store'
import router from '../router'

import axios from 'axios'

// Se crea una instancia de axios
const axiosClient = axios.create({
    baseURL: `${import.meta.env.VITE_API_BASE_URL}/api`, // Se obtiene la url del archivo .env
})

// interceptors es una funcion que se ejecuta antes y despues de que las peticiones sean realizadas
axiosClient.interceptors.request.use((response) => {
    response.headers.Authorization = `Bearer ${useUserStore().state.user.token}` // Se agrega el token a la cabecera de la peticion
    return response
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
