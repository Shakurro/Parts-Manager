<template>
    <div class="min-h-screen bg-gray-100 py-12 px-4">
        <button
        @click="$router.back()"
        class="bg-white shadow-md rounded-lg px-6 py-3 flex items-center hover:bg-gray-50 transition-colors duration-200 mb-4"
      >
        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        <span class="font-medium">Zurück</span>
      </button>   
      <div class="max-w-6xl mx-auto">
        <h1 class="text-2xl font-bold text-gray-800 mb-6">Low Quantity Parts</h1>
        <div v-if="lowQuantityParts.length" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div v-for="part in lowQuantityParts" :key="part.id" class="bg-white rounded-lg shadow-md p-4">
            <h2 class="text-lg font-semibold text-gray-700">{{ part.name }}</h2>
            <p class="text-gray-600">Quantity: {{ part.quantity }}</p>
          </div>
        </div>
        <div v-else class="text-center text-gray-600">
          <p>No parts with low quantity found.</p>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { computed } from 'vue';
  import { usePartsStore } from '~/stores/partsStore'; // Importiere den partsStore
  
  const partsStore = usePartsStore();
  
  // Berechne die Teile mit niedriger Menge
  const lowQuantityParts = computed(() => {
    return partsStore.parts.filter(part => part.quantity < 10); // Beispiel: Teile mit Menge < 10
  });
  </script>
  
  <style scoped>
  .grid {
    margin: 0 auto;
  }
  </style>