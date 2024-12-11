import useUserStore from '../store'

export function setToken(token) {
    const store = useUserStore()

    token
        ? sessionStorage.setItem('TOKEN', token)
        : sessionStorage.removeItem('TOKEN')
    store.user.token = token
}

export function setUser(user) {
    const store = useUserStore()

    store.user.data = user
}
