import { createRouter, createWebHistory } from 'vue-router';
import Goal from '@/components/goalPage.vue';

const routes = [{ path: '/', component: Goal }];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
