   // middleware/auth.global.ts
   import { defineNuxtRouteMiddleware, navigateTo } from 'nuxt/app';

   export default defineNuxtRouteMiddleware((to, from) => {
     let token;

        // TODO: 
        // Überprüfung des Token Serverside -> der Token sollte valide sein. 
        // Ablauf eines Tokeen berücksichtigen. 
     if (import.meta.server) {
       // Server-seitige Überprüfung
       const cookies = useCookie('jwtToken');
       token = cookies.value;
     } else if (import.meta.client) {
       // Client-seitige Überprüfung
       token = sessionStorage.getItem('jwtToken');
     }

     // Wenn kein Token vorhanden ist und die Route nicht '/login' ist, weiterleiten
     if (!token && to.path !== '/login') {
       return navigateTo('/login');
     }
   });