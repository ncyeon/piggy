import './assets/main.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import Goal from './components/goalPage.vue';

import App from './App.vue';
import router from './router';

const app = createApp(Goal);

app.use(createPinia());
app.use(router);
app.mount('#app');
