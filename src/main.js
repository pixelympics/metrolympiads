import './assets/main.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import vueAwesomeSidebar from 'vue-awesome-sidebar'
import 'vue-awesome-sidebar/dist/vue-awesome-sidebar.css'
import App from './App.vue';
import router from './router';

import './index.css';

const app = createApp(App);

app.use(createPinia());
app.use(vueAwesomeSidebar);
app.use(router);

app.mount('#app');
