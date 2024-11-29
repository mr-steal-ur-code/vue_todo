
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { useAuthStore } from './stores/auth'
import App from './App.vue'
import router from './router'
import './assets/main.css'

const app = createApp(App);

app.use(createPinia());


const auth = useAuthStore();
auth.initAuthListener();

app.use(router);

app.mount('#app')