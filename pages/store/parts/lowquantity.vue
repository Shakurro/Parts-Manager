<template>
    <div class="min-h-screen bg-gray-50 p-6">
        
      <div class="mb-8">
        <h1 class="text-2xl font-bold text-gray-800 mb-6">Low Quantity Parts</h1>
        
        <button
        @click="$router.back()"
        class="bg-white shadow-md rounded-lg px-6 py-3 flex items-center hover:bg-gray-50 transition-colors duration-200 mb-4"
      >
        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        <span class="font-medium">Zurück</span>
      </button>   
        <!-- Search and Filter Section -->
        <div class="bg-white p-4 rounded-lg shadow-sm mb-6">
          <div class="flex gap-4 flex-wrap">
            <div class="flex-1 min-w-[200px]">
              <input
                v-model="filters.search"
                type="search"
                placeholder="Suche nach Artikeln..."
                class="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-600 focus:border-gray-600 outline-none"
              />
            </div>
            <div class="min-w-[200px]">
              <select 
                v-model="filters.category"
                class="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-600 focus:border-gray-600 outline-none"
              >
                <option value="">Alle Kategorien</option>
                <option v-for="category in categories" :key="category.id" :value="category.id">
                  {{ category.name }}
                </option>
              </select>
            </div>
            <div class="min-w-[200px]">
              <select 
                v-model="filters.price"
                class="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-600 focus:border-gray-600 outline-none"
              >
                <option value="">Alle Preise</option>
                <option v-for="price in priceOptions" :key="price" :value="price">
                  Bis {{ price }}€
                </option>
              </select>
            </div>
            <div class="min-w-[200px]">
              <select 
                v-model="filters.quantity"
                class="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-600 focus:border-gray-600 outline-none"
              >
                <option value="">Alle Mengen</option>
                <option v-for="quantity in quantityOptions" :key="quantity" :value="quantity">
                  Bis {{ quantity }}
                </option>
              </select>
            </div>
          </div>
        </div>

        <div v-if="filteredParts.length" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div v-for="part in filteredParts" :key="part.id" class="bg-white rounded-lg shadow-md p-4">
            <h2 class="text-lg font-semibold text-gray-700">{{ part.name }}</h2>
            <p class="text-gray-600">Quantity: {{ part.quantity }}</p>
            <p class="text-gray-600">Price: {{ part.price }}</p>
          </div>
        </div>
        <div v-else class="text-center text-gray-600">
          <p>No parts with low quantity found.</p>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue';
  import { usePartsStore } from '~/stores/partsStore'; // Importiere den partsStore
  
  const partsStore = usePartsStore();
  const searchQuery = ref('');
  const filterCriteria = ref('quantity');
  
  // New filter data
  const filters = ref({
    search: '',
    category: '',
    price: '',
    quantity: ''
  });
  
  // Categories data
  const categories = ref([
    { id: 1, name: 'Aufbau' },
    { id: 2, name: 'Rahmen' },
    { id: 3, name: 'Elektrik' },
    { id: 4, name: 'Motor' },
    { id: 5, name: 'Bremse' },
    { id: 6, name: 'Achse' },
    { id: 7, name: 'Betriebsstoffe' },
    { id: 8, name: 'Schrauben' },
    { id: 9, name: 'Ladeboardwand' }
  ]);
  
  // Price and quantity options
  const priceOptions = [50, 100, 150, 200, 250, 300];
  const quantityOptions = [1, 2, 3, 4, 5, 6, 7, 8];
  
  // Computed properties for filtered items
  const filteredParts = computed(() => {
    return partsStore.parts.filter(part => {
      const searchMatch = !filters.value.search || 
        part.name.toLowerCase().includes(filters.value.search.toLowerCase());

      const categoryMatch = !filters.value.category || 
        part.category === filters.value.category;

      const priceMatch = !filters.value.price || 
        part.price <= filters.value.price;

      const quantityMatch = !filters.value.quantity || 
        part.quantity <= filters.value.quantity;

      return searchMatch && categoryMatch && priceMatch && quantityMatch;
    });
  });
  
  // Method to reset date filters
  function resetDateFilters() {
    // This function is no longer needed, but kept for potential future use
  }
  </script>
  
  <style scoped>
  .grid {
    margin: 0 auto;
  }
  </style>