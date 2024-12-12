<template>
  <div class="min-h-screen bg-gray-100 py-12 px-4">
    <div class="max-w-6xl mx-auto">
      
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
        
        <!-- Ersatzteile - Für alle Benutzer -->
        <NuxtLink
          v-if="userStore.userData"
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

        <!-- Purchase Orders - Nur für Admin -->
        <NuxtLink
          v-if="userStore.isAdmin()"
          id="container5"
          to="/store/purchase-orders"
          class="w-full max-w-sm bg-white hover:bg-yellow-50 rounded-xl shadow-lg transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl p-6 flex flex-col items-center justify-center space-y-4"
        >
          <div class="p-3 bg-yellow-100 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </div>
          <h2 class="text-xl font-semibold text-gray-700">Purchase Orders</h2>
        </NuxtLink>

        <!-- Rechnungen - Nur für Admin -->
        <NuxtLink
          v-if="userStore.isAdmin()"
          id="container6"
          to="/store/invoices"
          class="w-full max-w-sm bg-white hover:bg-indigo-50 rounded-xl shadow-lg transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl p-6 flex flex-col items-center justify-center space-y-4"
        >
          <div class="p-3 bg-indigo-100 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h2 class="text-xl font-semibold text-gray-700">Rechnungen</h2>
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