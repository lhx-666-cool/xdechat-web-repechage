import { createApp } from 'vue'
import App from './App.vue'
import './style.css'
import router from './router'
import './assets/fonts/font.css'

createApp(App).use(router).mount('#app')