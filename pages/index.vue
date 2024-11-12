<template>
    <div class="min-h-screen bg-gray-100 flex flex-col">

      <main class="flex-1 container mx-auto px-4 py-6">
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div class="bg-white p-6 rounded shadow-md">
            <h3 class="text-lg font-bold mb-2">Parts in Stock</h3>
            <p class="text-gray-700">Es sind {{ totalParts }} Teile im Lager</p>
          </div>

          <div class="bg-white p-6 rounded shadow-md">
            <h3 class="text-lg font-bold mb-2">Total Selling Price</h3>
            <p class="text-gray-700">Gesamtverkaufspreis: {{ totalSellingPrice }} €</p>
          </div>

          <div class="bg-white p-6 rounded shadow-md">
            <h3 class="text-lg font-bold mb-2">Placeholder</h3>
            <ul class="text-gray-700">
              
            </ul>
          </div>

          <div class="bg-white p-6 rounded shadow-md">
            <h3 class="text-lg font-bold mb-2">Active Mechanics</h3>
            <p class="text-gray-700">12 Mechanics are now active</p>
          </div>

          <div class="bg-white p-6 rounded shadow-md">
            <h3 class="text-lg font-bold mb-2">Active Workpacks</h3>
            <p class="text-gray-700">52500098457</p>
            <p class="text-gray-700">52500097584</p>
            <p class="text-gray-700">52500097845</p>
            <p class="text-gray-700">52500098745</p>
          </div>

          <div class="bg-white p-6 rounded shadow-md">
            <h3 class="text-lg font-bold mb-2">News</h3>
            <p class="text-gray-700">Es wurden weitere 78 Ersatzteile hinzugefügt.</p>
            <p class="text-gray-700">Die Benutzeroberfläche wurde aktualisiert, um die Navigation zu verbessern.</p>
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