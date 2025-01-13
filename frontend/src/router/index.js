import { createRouter, createWebHistory } from 'vue-router';

import Home from '/src/views/Home.vue'
import AssoList from '/src/views/AssoList.vue'
import SportsCatalog from '../views/SportsCatalog.vue';
import Map from '../views/Map.vue';



const routes = [
    {
        path: '/',
        redirect: '/home',
    },

   {
      path: '/home',
      component: Home,
   },

   {
    path: '/asso-list',
    component: AssoList,
   },

   {
    path: '/sports-catalog',
    component: SportsCatalog,
   },

   {
    path: '/map',
    component: Map,
   },

 
]

const router = createRouter({
   history: createWebHistory('/'),
   routes
})

export default router