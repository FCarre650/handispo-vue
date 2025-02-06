import { createRouter, createWebHistory } from 'vue-router';

import Home from '/src/views/Home.vue'
import AssoList from '/src/views/AssoList.vue'
import SportsCatalog from '../views/SportsCatalog.vue';
import Map from '../views/Map.vue';
import Login from '../views/Login.vue';
import CreateAccount from '../views/CreateAccount.vue';
import UserAccount from '../views/UserAccount.vue';


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

   {
      path: '/login',
      component: Login,
   },
   
   {
      path: '/create-account',
      component: CreateAccount,
   },
   {
      path: '/user-account',
      component: UserAccount,
   }
 
]

const router = createRouter({
   history: createWebHistory('/'),
   routes
})

export default router