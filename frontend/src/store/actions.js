import axiosClient from '../services/axios'
import { setToken, setUser } from './mutations.js'

export async function getUser() {
    const {
        data: { data },
    } = await axiosClient.get('/user')

    setUser(data)
    return data
}

export async function login(config) {
    const { data } = await axiosClient.post('/login', config)

    setToken(data.token)
    setUser(data.user)
    return data
}

export async function logout() {
    const { data } = await axiosClient.post('/logout')

    setToken(null)
    setUser({})
    return data
}
