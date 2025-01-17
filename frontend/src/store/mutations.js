import useUserStore from '../store'

export function setToken(token) {
    const store = useUserStore()

    token
        ? sessionStorage.setItem('TOKEN', token)
        : sessionStorage.removeItem('TOKEN')
    store.state.user.token = token
}

export function setUser(user) {
    const store = useUserStore()

    store.state.user.data = user
}

export function setProducts(loading = false, products = []) {
    const store = useUserStore()

    store.state.products.loading = loading
    store.state.products.data = products
}
