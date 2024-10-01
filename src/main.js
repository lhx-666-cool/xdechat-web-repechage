import { createApp } from 'vue'
import App from './App.vue'
import './style.css'
import router from './router'
import './assets/fonts/font.css'
import store from './store'
createApp(App).use(store).use(router).mount('#app')