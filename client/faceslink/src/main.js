import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import '@/assets/css/tailwind.css'
import '@/assets/css/global.css'

// For development purpose
axios.defaults.baseURL = "http://localhost:4000";

createApp(App)
    .use(router)
    .use(VueAxios, axios)
    .mount('#app')
