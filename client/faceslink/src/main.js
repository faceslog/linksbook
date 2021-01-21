import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueSweetalert2 from "vue-sweetalert2";

import '@/assets/css/tailwind.css'

// For development purpose
axios.defaults.baseURL = "http://localhost:4000";

createApp(App)
    .use(router)
    .use(VueAxios, axios)
    .use(VueSweetalert2)
    .mount('#app')
