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
                v-model="filters.quantity"
                class="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-600 focus:border-gray-600 outline-none"
              >
                <option v-for="quantity in quantityOptions" :key="quantity" :value="quantity">
                  {{ quantity === '1-4' ? 'Standard: ' + quantity : quantity }}
                </option>
              </select>
            </div>
          </div>
        </div>

        <n-scrollbar style="max-height: 800px">
          <div class="bg-white rounded-lg shadow-sm">
            <table class="min-w-full table-auto">
              <thead>
                <tr class="bg-gray-50 border-b border-gray-200">
                  <th class="px-6 py-4 text-left text-sm font-semibold text-gray-600">Artikelnummer</th>
                  <th class="px-6 py-4 text-left text-sm font-semibold text-gray-600">Beschreibung</th>
                  <th class="px-6 py-4 text-left text-sm font-semibold text-gray-600">Menge</th>
                  <th class="px-6 py-4 text-left text-sm font-semibold text-gray-600">Reihe</th>
                  <th class="px-6 py-4 text-left text-sm font-semibold text-gray-600">Regal</th>
                  <th class="px-6 py-4 text-left text-sm font-semibold text-gray-600">Fach</th>
                  <th class="px-6 py-4 text-left text-sm font-semibold text-gray-600">Kategorie</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="part in filteredParts" :key="part.id" class="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <td class="px-6 py-4 text-sm">{{ part.partnumber }}</td>
                  <td class="px-6 py-4 text-sm">{{ truncateDescription(part.description) }}</td>
                  <td class="px-6 py-4 text-sm">
                    <span :class="getQuantityClass(part.instock)" class="px-3 py-1 text-white rounded-full">{{ part.instock }} Stk.</span>
                  </td>
                  <td class="px-6 py-4 text-sm">{{ part.reihe }}</td>
                  <td class="px-6 py-4 text-sm">{{ part.regal }}</td>
                  <td class="px-6 py-4 text-sm">{{ part.fach }}</td>
                  <td class="px-6 py-4 text-sm">{{ getCategoryName(part.category) }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </n-scrollbar>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed, onMounted } from 'vue';
  import { usePartsStore } from '~/stores/partsStore';
  
  const partsStore = usePartsStore();
  
  const searchQuery = ref('');
  const filterCriteria = ref('quantity');
  
  // New filter data
  const filters = ref({
    search: '',
    category: '',
    quantity: '1-4' // Default to 1-4
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
  
  // Quantity options
  const quantityOptions = ['1-4', '1-2', '2-4', '5-6'];
  
  // Computed properties for filtered items
  const filteredParts = computed(() => {
    const [min, max] = filters.value.quantity.split('-').map(Number);
    return partsStore.parts.filter(part => {
      const searchMatch = !filters.value.search || 
        part.partnumber.toLowerCase().includes(filters.value.search.toLowerCase()) ||
        part.description.toLowerCase().includes(filters.value.search.toLowerCase());

      const categoryMatch = !filters.value.category || 
        part.category === filters.value.category;

      const quantityMatch = part.instock >= min && part.instock <= max;

      return searchMatch && categoryMatch && quantityMatch;
    });
  });
  
  // Helper function to get category name
  function getCategoryName(categoryId) {
    const category = categories.value.find(cat => cat.id === categoryId);
    return category ? category.name : 'Unbekannt';
  }
  
  // Helper function to truncate description
  function truncateDescription(description) {
    if (description.length > 20) {
      return description.substring(0, 20) + '...';
    }
    return description;
  }
  
  // Helper function to get quantity class
  function getQuantityClass(instock) {
    if (instock <= 2) {
      return 'bg-red-500';
    } else if (instock <= 4) {
      return 'bg-orange-500';
    } else {
      return 'bg-green-500';
    }
  }
  
  // Method to reset date filters
  function resetDateFilters() {
    // This function is no longer needed, but kept for potential future use
  }
  
  onMounted(() => {
    partsStore.fetchAllItems();
  });
  
  </script>
  
  <style scoped>
  .grid {
    margin: 0 auto;
  }
  </style>