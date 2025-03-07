import axiosClient from '../../services/axios.js'
import { setToken, setUser, setProducts } from './mutations.js'

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

export async function getProducts(url, params = {}) {
    setProducts(true)

    url = url || 'products'

    const { data } = await axiosClient.get(url, {
        params: {
            sortDirection: params.sortDirection,
            sortField: params.sortField,
            perPage: params.perPage,
            search: params.search,
        },
    })

    setProducts(false, data)
    return data
}

export async function createProduct(product) {
    if (product.image instanceof Image) {
        const form = new FormData()
        form.append('title', product.title)
        form.append('image', product.image)
        form.append('price', product.price)
        form.append('description', product.description)
        product = form
    }

    await axiosClient.post('/products' , product)
}
