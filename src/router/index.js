import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/Home.vue';
import About from '@/views/About.vue';
import TodoList from '@/views/TodoList.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: About
  },
  {
    path: '/todo',
    name: 'TodoList',
    component: TodoList
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
