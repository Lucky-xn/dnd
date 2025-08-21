import { createApp } from 'vue'
import router from './router/router'
import './assets/style.css'
import App from './App.vue'
import vClickOutside from 'v-click-outside'

const app = createApp(App);

app.use(router).use(vClickOutside).mount('#app');
