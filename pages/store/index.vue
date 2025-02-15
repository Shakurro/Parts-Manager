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
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="h-8 w-8 text-blue-600">
              <path d="M12.378 1.602a.75.75 0 0 0-.756 0L3 6.632l9 5.25 9-5.25-8.622-5.03ZM21.75 7.93l-9 5.25v9l8.628-5.032a.75.75 0 0 0 .372-.648V7.93ZM11.25 22.18v-9l-9-5.25v8.57a.75.75 0 0 0 .372.648l8.628 5.033Z" />
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
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="h-8 w-8 text-blue-600">
              <path fill-rule="evenodd" d="M2.25 2.25a.75.75 0 0 0 0 1.5H3v10.5a3 3 0 0 0 3 3h1.21l-1.172 3.513a.75.75 0 0 0 1.424.474l.329-.987h8.418l.33.987a.75.75 0 0 0 1.422-.474l-1.17-3.513H18a3 3 0 0 0 3-3V3.75h.75a.75.75 0 0 0 0-1.5H2.25Zm6.54 15h6.42l.5 1.5H8.29l.5-1.5Zm8.085-8.995a.75.75 0 1 0-.75-1.299 12.81 12.81 0 0 0-3.558 3.05L11.03 8.47a.75.75 0 0 0-1.06 0l-3 3a.75.75 0 1 0 1.06 1.06l2.47-2.47 1.617 1.618a.75.75 0 0 0 1.146-.102 11.312 11.312 0 0 1 3.612-3.321Z" clip-rule="evenodd" />
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
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="h-8 w-8 text-blue-600">
              <path fill-rule="evenodd" d="M6.912 3a3 3 0 0 0-2.868 2.118l-2.411 7.838a3 3 0 0 0-.133.882V18a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3v-4.162c0-.299-.045-.596-.133-.882l-2.412-7.838A3 3 0 0 0 17.088 3H6.912Zm13.823 9.75-2.213-7.191A1.5 1.5 0 0 0 17.088 4.5H6.912a1.5 1.5 0 0 0-1.434 1.059L3.265 12.75H6.11a3 3 0 0 1 2.684 1.658l.256.513a1.5 1.5 0 0 0 1.342.829h3.218a1.5 1.5 0 0 0 1.342-.83l.256-.512a3 3 0 0 1 2.684-1.658h2.844Z" clip-rule="evenodd" />
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
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="h-8 w-8 text-green-600">
              <path fill-rule="evenodd" d="M5.478 5.559A1.5 1.5 0 0 1 6.912 4.5H9A.75.75 0 0 0 9 3H6.912a3 3 0 0 0-2.868 2.118l-2.411 7.838a3 3 0 0 0-.133.882V18a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3v-4.162c0-.299-.045-.596-.133-.882l-2.412-7.838A3 3 0 0 0 17.088 3H15a.75.75 0 0 0 0 1.5h2.088a1.5 1.5 0 0 1 1.434 1.059l2.213 7.191H17.89a3 3 0 0 0-2.684 1.658l-.256.513a1.5 1.5 0 0 1-1.342.829h-3.218a1.5 1.5 0 0 1-1.342-.83l-.256-.512a3 3 0 0 0-2.684-1.658H3.265l2.213-7.191Z" clip-rule="evenodd" />
              <path fill-rule="evenodd" d="M12 2.25a.75.75 0 0 1 .75.75v6.44l1.72-1.72a.75.75 0 1 1 1.06 1.06l-3 3a.75.75 0 0 1-1.06 0l-3-3a.75.75 0 0 1 1.06-1.06l1.72 1.72V3a.75.75 0 0 1 .75-.75Z" clip-rule="evenodd" />
            </svg>
          </div>
          <h2 class="text-xl font-semibold text-gray-700">Wareneingang</h2>
        </NuxtLink>

        <!-- Warenausgang - Ab Manager aufwärts -->
        <NuxtLink
          v-if="userStore.isManager()"
          id="container3"
          to="/store/exit"
          class="w-full max-w-sm bg-white hover:bg-red-50 rounded-xl shadow-lg transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl p-6 flex flex-col items-center justify-center space-y-4"
        >
          <div class="p-3 bg-red-100 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="h-8 w-8 text-red-600">
              <path fill-rule="evenodd" d="M7.5 3.75A1.5 1.5 0 0 0 6 5.25v13.5a1.5 1.5 0 0 0 1.5 1.5h6a1.5 1.5 0 0 0 1.5-1.5V15a.75.75 0 0 1 1.5 0v3.75a3 3 0 0 1-3 3h-6a3 3 0 0 1-3-3V5.25a3 3 0 0 1 3-3h6a3 3 0 0 1 3 3V9A.75.75 0 0 1 15 9V5.25a1.5 1.5 0 0 0-1.5-1.5h-6Zm10.72 4.72a.75.75 0 0 1 1.06 0l3 3a.75.75 0 0 1 0 1.06l-3 3a.75.75 0 1 1-1.06-1.06l1.72-1.72H9a.75.75 0 0 1 0-1.5h10.94l-1.72-1.72a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" />
            </svg>
          </div>
          <h2 class="text-xl font-semibold text-gray-700">Warenausgang</h2>
        </NuxtLink>

       
        <!-- Low Quantity Parts - Nur für Manager und Admin --> 
        <NuxtLink
          v-if="userStore.isManager() || userStore.isAdmin()"
          id="container7"
          to="/store/parts/lowquantity"
          class="w-full max-w-sm bg-white hover:bg-orange-50 rounded-xl shadow-lg transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl p-6 flex flex-col items-center justify-center space-y-4"
        >
          <div class="p-3 bg-orange-100 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="h-8 w-8 text-orange-600">
              <path d="M3.375 3C2.339 3 1.5 3.84 1.5 4.875v.75c0 1.036.84 1.875 1.875 1.875h17.25c1.035 0 1.875-.84 1.875-1.875v-.75C22.5 3.839 21.66 3 20.625 3H3.375Z" />
              <path fill-rule="evenodd" d="m3.087 9 .54 9.176A3 3 0 0 0 6.62 21h10.757a3 3 0 0 0 2.995-2.824L20.913 9H3.087ZM12 10.5a.75.75 0 0 1 .75.75v4.94l1.72-1.72a.75.75 0 1 1 1.06 1.06l-3 3a.75.75 0 0 1-1.06 0l-3-3a.75.75 0 1 1 1.06-1.06l1.72 1.72v-4.94a.75.75 0 0 1 .75-.75Z" clip-rule="evenodd" />
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
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="h-8 w-8 text-teal-600">
              <path fill-rule="evenodd" d="M4.125 3C3.089 3 2.25 3.84 2.25 4.875V18a3 3 0 0 0 3 3h15a3 3 0 0 1-3-3V4.875C17.25 3.839 16.41 3 15.375 3H4.125ZM12 9.75a.75.75 0 0 0 0 1.5h1.5a.75.75 0 0 0 0-1.5H12Zm-.75-2.25a.75.75 0 0 1 .75-.75h1.5a.75.75 0 0 1 0 1.5H12a.75.75 0 0 1-.75-.75ZM6 12.75a.75.75 0 0 0 0 1.5h7.5a.75.75 0 0 0 0-1.5H6Zm-.75 3.75a.75.75 0 0 1 .75-.75h7.5a.75.75 0 0 1 0 1.5H6a.75.75 0 0 1-.75-.75ZM6 6.75a.75.75 0 0 0-.75.75v3c0 .414.336.75.75.75h3a.75.75 0 0 0 .75-.75v-3A.75.75 0 0 0 9 6.75H6Z" clip-rule="evenodd" />
              <path d="M18.75 6.75h1.875c.621 0 1.125.504 1.125 1.125V18a1.5 1.5 0 0 1-3 0V6.75Z" />
            </svg>
          </div>
          <h2 class="text-xl font-semibold text-gray-700">News</h2>
        </NuxtLink>

        <!-- Inventur - Nur für Manager und Admin -->
        <NuxtLink
          v-if="userStore.isManager() || userStore.isAdmin()"
          id="container9"
          to="/store/inventorycontrol"
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
          to="/store/deliverynotes"
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