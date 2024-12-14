<template>
  <div class="bg-gray-100 flex flex-col">
    <main class="flex-1 container mx-auto px-4 py-6">
      <button
        @click="$router.back()"
        class="bg-white shadow-md rounded-lg px-6 py-3 flex items-center hover:bg-gray-50 transition-colors duration-200 mb-4"
      >
        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        <span class="font-medium">Zurück</span>
      </button>   
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div class="bg-white p-6 rounded shadow-md">
          <h3 class="text-lg font-bold mb-2">Parts Info</h3>
          <ul class="text-gray-700 list-disc pl-5">
            <li>Es sind {{ totalParts }} Ersatzteile im Lager</li>
            <li>Gesamtverkaufspreis: {{ totalSellingPrice }} €</li>
          </ul>
        </div>

        <div class="bg-white p-6 rounded shadow-md">
          <h3 class="text-lg font-bold mb-2">Assigned to Me</h3>
          <ul class="text-gray-700">  
          </ul>
        </div>

        <div class="bg-white p-6 rounded shadow-md">
          <h3 class="text-lg font-bold mb-2">Roadmap</h3>
          <ul class="text-gray-700">
          </ul>
          <NuxtLink to="/news/roadmap" class="mt-4 inline-block px-4 py-2 bg-gray-800 text-white rounded hover:bg-green-600">
            GoTo Roadmap
          </NuxtLink>
        </div>

        <div class="bg-white p-6 rounded shadow-md">
          <h3 class="text-lg font-bold mb-2">Active Mechanics</h3>
          <ul class="text-gray-700 list-disc pl-5">
          </ul>
        </div>

        <div class="bg-white p-6 rounded shadow-md">
          <h3 class="text-lg font-bold mb-2">Open Partpacks</h3>
          <ul class="text-gray-700 list-disc pl-5">
          </ul>
        </div>

        <div class="bg-white p-6 rounded shadow-md">
          <h3 class="text-lg font-bold mb-2">News</h3>
          <ul class="text-gray-700 list-disc pl-5">
            <li>Die Benutzeroberfläche wurde aktualisiert, um die Navigation zu verbessern.</li>
            <li>Roadmap 2024/2025 ist nun verfügbar.</li>
          </ul>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { usePartsStore } from '@/stores/partsStore';

const partsStore = usePartsStore();

const totalParts = computed(() => partsStore.totalParts);
const totalSellingPrice = computed(() => partsStore.totalSellingPrice);

onMounted(() => {
  partsStore.fetchAllItems();
});
</script>

<style scoped>
</style>