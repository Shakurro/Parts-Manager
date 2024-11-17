<template>
    <div class="min-h-screen bg-gray-100 flex flex-col">

      <main class="flex-1 container mx-auto px-4 py-6">
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div class="bg-white p-6 rounded shadow-md">
            <h3 class="text-lg font-bold mb-2">Parts in Stock</h3>
            <ul class="text-gray-700">
              <li>Es sind {{ totalParts }} Ersatzteile im Lager</li>
            </ul>
          </div>

          <div class="bg-white p-6 rounded shadow-md">
            <h3 class="text-lg font-bold mb-2">Aktueller Lagerwert</h3>
            <ul class="text-gray-700">
              <li>Gesamtverkaufspreis: {{ totalSellingPrice }} €</li>
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
              <li>Mechanic 1</li>
              <li>Mechanic 2</li>
              <li>Mechanic 3</li>
            </ul>
          </div>

          <div class="bg-white p-6 rounded shadow-md">
            <h3 class="text-lg font-bold mb-2">Active Partpacks</h3>
            <ul class="text-gray-700 list-disc pl-5">
              <li>52500098457</li>
              <li>52500097584</li>
              <li>52500097845</li>
              <li>52500098745</li>
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

        <LowQuantityParts />
      </main>

    </div>
</template>

<script setup>
import { usePartsStore } from '@/stores/partsStore';
import LowQuantityParts from '../components/parts/LowQuantityParts.vue';

const partsStore = usePartsStore();

const totalParts = computed(() => partsStore.totalParts);
const totalSellingPrice = computed(() => partsStore.totalSellingPrice);


onMounted(() => {
  partsStore.fetchAllItems();
});
</script>

<style scoped>

</style>