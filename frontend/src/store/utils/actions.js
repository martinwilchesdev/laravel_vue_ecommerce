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

    const { data } = await axiosClient.get(url ?? 'products', {
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
    // Si `product.image` es una instancia de `Image`, los datos son enviados en la peticion mediante un nuevo `FormData()`
    if (product.image instanceof File) {
        const form = new FormData()
        form.append('title', product.title)
        form.append('image', product.image)
        form.append('price', product.price)
        form.append('description', product.description)
        product = form
    }

    // En caso contrario se envia el objeto que contiene los datos para crear un nuevo producto
    await axiosClient.post('/products' , product)
}

export async function updateProduct(product) {
    const id = product.id
    if (product.image instanceof File) {
        const form = new FormData()
        form.append('title', product.title)
        form.append('image', product.image)
        form.append('price', product.price)
        form.append('description', product.description)
        // Al realizar un `update`, se debe informar de forma explicita el metodo `PUT` junto al resto de la data
        form.append('_method', 'PUT')
        product = form
    } else {
        product._method = 'PUT'
    }

    await axiosClient.post(`/products/${id}`, product)
}
