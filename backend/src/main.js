import router from './router'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './index.css'
import App from './App.vue'

const pinia = createPinia()
const app = createApp(App)

app.use(pinia).use(router)
app.mount('#app')
