import { createPinia } from 'pinia'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(router);
app.use(ElementPlus);
app.mount('#app');