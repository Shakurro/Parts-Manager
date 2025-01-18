<template>
  <div class="min-h-screen bg-gray-100 py-12 px-4">
    <div class="max-w-6xl mx-auto">
      
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">

        <NuxtLink
          v-if="userStore.isManager()"
          id="container1"
          to="/partpacks/list"
          class="w-full max-w-sm bg-white hover:bg-blue-50 rounded-xl shadow-lg transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl p-6 flex flex-col items-center justify-center space-y-4"
        >
          <div class="p-3 bg-blue-100 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
            </svg>
          </div>
          <h2 class="text-xl font-semibold text-gray-700">Partpacks</h2>
        </NuxtLink>

         <!-- Dashboard - Für Manager-->
         <NuxtLink
          v-if="userStore.isAdmin()"  
          id="container1"
          to="/"
          class="w-full max-w-sm bg-white hover:bg-blue-50 rounded-xl shadow-lg transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl p-6 flex flex-col items-center justify-center space-y-4"
        >
          <div class="p-3 bg-blue-100 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-blue-600" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 13H5v-2h14v2z" />
              <path d="M7 10l5 5 5-5H7z" />
              <path d="M21 3H3v10h18V3zm-1 4H4v4h16v-4z" />
            </svg>
          </div>
          <h2 class="text-xl font-semibold text-gray-700">Dashboard</h2>
        </NuxtLink>
        
        <!-- Ersatzteile - Für alle Benutzer -->
        <NuxtLink
          v-if="userStore.isManager()"
          id="container1"
          to="/store/parts/list"
          class="w-full max-w-sm bg-white hover:bg-blue-50 rounded-xl shadow-lg transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl p-6 flex flex-col items-center justify-center space-y-4"
        >
          <div class="p-3 bg-blue-100 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
            </svg>
          </div>
          <h2 class="text-xl font-semibold text-gray-700">Ersatzteile</h2>
        </NuxtLink>

        <!-- Wareneingang - Ab Manager aufwärts -->
        <NuxtLink
          v-if="userStore.isManager()"
          id="container2"
          to="/store/entry"
          class="w-full max-w-sm bg-white hover:bg-green-50 rounded-xl shadow-lg transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl p-6 flex flex-col items-center justify-center space-y-4"
        >
          <div class="p-3 bg-green-100 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </div>
          <h2 class="text-xl font-semibold text-gray-700">Wareneingang</h2>
        </NuxtLink>

        <!-- Warenausgang - Ab Manager aufwärts -->
        <NuxtLink
          v-if="userStore.isManager()"
          id="container3"
          to="/store/output"
          class="w-full max-w-sm bg-white hover:bg-red-50 rounded-xl shadow-lg transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl p-6 flex flex-col items-center justify-center space-y-4"
        >
          <div class="p-3 bg-red-100 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16l-4-4m0 0l4-4m-4 4h18" />
            </svg>
          </div>
          <h2 class="text-xl font-semibold text-gray-700">Warenausgang</h2>
        </NuxtLink>

        <!-- Bestellungen - Nur für Admin -->
        <NuxtLink
          v-if="userStore.isAdmin()"
          id="container4"
          to="/store/orders"
          class="w-full max-w-sm bg-white hover:bg-purple-50 rounded-xl shadow-lg transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl p-6 flex flex-col items-center justify-center space-y-4"
        >
          <div class="p-3 bg-purple-100 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
          </div>
          <h2 class="text-xl font-semibold text-gray-700">Bestellungen</h2>
        </NuxtLink>

        <!-- Low Quantity Parts - Nur für Manager und Admin --> 
        <NuxtLink
          v-if="userStore.isManager() || userStore.isAdmin()"
          id="container7"
          to="/store/parts/lowquantity"
          class="w-full max-w-sm bg-white hover:bg-orange-50 rounded-xl shadow-lg transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl p-6 flex flex-col items-center justify-center space-y-4"
        >
          <div class="p-3 bg-orange-100 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h18v18H3V3z" />
            </svg>
          </div>
          <h2 class="text-xl font-semibold text-gray-700">Low Quantity Parts</h2>
        </NuxtLink>

        <!-- News - Für alle Benutzer -->
        <NuxtLink
          id="container8"
          to="/store/news"
          class="w-full max-w-sm bg-white hover:bg-teal-50 rounded-xl shadow-lg transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl p-6 flex flex-col items-center justify-center space-y-4"
        >
          <div class="p-3 bg-teal-100 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h18v18H3V3z" />
            </svg>
          </div>
          <h2 class="text-xl font-semibold text-gray-700">News</h2>
        </NuxtLink>

        <!-- Inventur - Nur für Manager und Admin -->
        <NuxtLink
          v-if="userStore.isManager() || userStore.isAdmin()"
          id="container9"
          to="/store/inventory"
          class="w-full max-w-sm bg-white hover:bg-cyan-50 rounded-xl shadow-lg transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl p-6 flex flex-col items-center justify-center space-y-4"
        >
          <div class="p-3 bg-cyan-100 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-cyan-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h18v18H3V3z" />
            </svg>
          </div>
          <h2 class="text-xl font-semibold text-gray-700">Inventur</h2>
        </NuxtLink>

        <!-- Lieferscheine - Nur für Admin -->
        <NuxtLink
          v-if="userStore.isAdmin()"
          id="container10"
          to="/store/delivery-notes"
          class="w-full max-w-sm bg-white hover:bg-pink-50 rounded-xl shadow-lg transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl p-6 flex flex-col items-center justify-center space-y-4"
        >
          <div class="p-3 bg-pink-100 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-pink-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h18v18H3V3z" />
            </svg>
          </div>
          <h2 class="text-xl font-semibold text-gray-700">Lieferscheine</h2>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import { userStore } from '~/stores/userStore';
</script>

<style scoped>
.grid {
  margin: 0 auto;
}
</style>