import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './style.css'
import Home from './views/Home.vue'
import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            component: Home
        }
    ]
})

createApp(App).use(router).mount('#app')