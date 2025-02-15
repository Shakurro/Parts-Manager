<template>
    <div class="inventory-control">
      <h1 class="text-2xl font-bold mb-4">Inventur-Manager</h1>
      
      <div>
          <button
          @click="$router.back()"
          class="bg-white shadow-md rounded-lg px-6 py-3 flex items-center hover:bg-gray-50 transition-colors duration-200 mb-4"
        >
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          <span class="font-medium">Zurück</span>
        </button>
        </div>

      <!-- Filter- und Suchbereich -->
      <div class="bg-white p-4 rounded-lg shadow-sm mb-6">
        <div class="flex gap-4 flex-wrap items-center">
          <div class="flex-1 min-w-[200px]">
            <input 
              id="search-input"
              v-model="searchQuery" 
              type="text" 
              placeholder="Artikel suchen..." 
              class="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
          </div>
          <div class="min-w-[150px]">
            <select id="row-select" v-model="selectedRow" class="w-full px-2 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none">
              <option value="">Alle Reihen</option>
              <option v-for="row in uniqueRows" :key="row" :value="row">{{ row }}</option>
            </select>
          </div>
          <div class="flex items-end">
            <button 
              @click="scanBarcode" 
              class="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              Barcode scannen
            </button>
          </div>
        </div>
      </div>
  
      <!-- Inventur-Checkliste -->
      <div class="inventory-list mb-4">
        <h2 class="text-xl font-semibold mb-2">Inventur-Checkliste</h2>
        <table class="min-w-full bg-white border-collapse">
          <thead>
            <tr class="bg-gray-100">
              <th class="py-2 px-4 border-b">Artikelnummer</th>
              <th class="py-2 px-4 border-b">Name</th>
              <th class="py-2 px-4 border-b">Aktuelle Menge</th>
              <th class="py-2 px-4 border-b">Gezählte Menge</th>
              <th class="py-2 px-4 border-b">Letzte Zählung</th>
              <th class="py-2 px-4 border-b">Status</th>
              <th class="py-2 px-4 border-b">Aktion</th>
            </tr>
          </thead>
          <tbody>
            <tr 
              v-for="item in filteredInventoryItems" 
              :key="item.id" 
              :class="{'bg-gray-100': !item.isActive, 'hover:bg-gray-50': item.isActive}" 
              @click="toggleActive(item)"
            >
              <td class="py-2 px-4 border-b">{{ item.number }}</td>
              <td class="py-2 px-4 border-b">{{ item.name }}</td>
              <td class="py-2 px-4 border-b text-center">{{ item.currentQuantity }}</td>
              <td class="py-2 px-4 border-b text-center">
                <div v-if="item.isActive" class="flex items-center justify-center">
                  <button 
                    @mousedown.stop="startDecrement(item)" 
                    @mouseup.stop="stopChange" 
                    @mouseleave.stop="stopChange"
                    class="bg-gray-800 text-white px-3 py-1 rounded-full hover:bg-gray-700"
                  >
                    -
                  </button>
                  <span class="mx-4">{{ item.countedQuantity }}</span>
                  <button 
                    @mousedown.stop="startIncrement(item)" 
                    @mouseup.stop="stopChange" 
                    @mouseleave.stop="stopChange"
                    class="bg-gray-800 text-white px-3 py-1 rounded-full hover:bg-gray-700"
                  >
                    +
                  </button>
                </div>
                <div v-else class="text-gray-500">
                  {{ item.countedQuantity }}
                </div>
              </td>
              <td class="py-2 px-4 border-b text-center">{{ item.lastCountedDate }}</td>
              <td class="py-2 px-4 border-b text-center">
                <span :class="{'bg-green-100 text-green-700': item.checked, 'bg-red-100 text-red-700': !item.checked}" class="px-2 py-1 rounded-full">
                  {{ item.checked ? 'Überprüft' : 'Ausstehend' }}
                </span>
              </td>
              <td class="py-2 px-4 border-b text-center">
                <button 
                  v-if="item.countedQuantity > 0" 
                  @click="updateInventory(item)" 
                  class="bg-gray-800 text-white px-2 py-1 rounded hover:bg-gray-700"
                >
                  Lager anpassen
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </template>
  
  <script setup>
  // Importiere notwendige Bibliotheken und Komponenten
  import { ref, computed } from 'vue'
  
  // Beispielhafte Daten für die Inventur mit isActive Eigenschaft standardmäßig auf false
  const inventoryItems = ref([
    { id: 1, number: 'A001', name: 'Artikel 1', currentQuantity: 100, countedQuantity: 0, notes: '', checked: false, row: 'Reihe 1', lastCountedDate: '2023-09-01', isActive: false },
    { id: 2, number: 'A002', name: 'Artikel 2', currentQuantity: 50, countedQuantity: 0, notes: '', checked: false, row: 'Reihe 2', lastCountedDate: '2023-08-15', isActive: false },
    // Weitere Artikel...
  ])
  
  const selectedRow = ref('')
  const searchQuery = ref('')
  
  // Berechne die einzigartigen Reihen
  const uniqueRows = computed(() => {
    const rows = inventoryItems.value.map(item => item.row)
    return [...new Set(rows)]
  })
  
  // Filtere die Artikel basierend auf der ausgewählten Reihe und Suchanfrage
  const filteredInventoryItems = computed(() => {
    return inventoryItems.value.filter(item => {
      const matchesRow = !selectedRow.value || item.row === selectedRow.value
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.value.toLowerCase())
      return matchesRow && matchesSearch
    })
  })
  
  function saveItem(item) {
    // Logik zum Speichern des Ersatzteils
    console.log('Ersatzteil gespeichert:', item)
    // Hier könnte man die Daten speichern oder eine API-Anfrage senden
  }
  
  function scanBarcode() {
    // Logik zum Scannen eines Barcodes
    console.log('Barcode scannen...')
    // Hier könnte man eine Barcode-Scanner-Integration hinzufügen
  }

  function updateInventory(item) {
    // Logik zum Aktualisieren der Lagerbestandsmenge
    console.log('Lagerbestand aktualisiert für:', item)
    // Hier könnte man die Daten speichern oder eine API-Anfrage senden
  }

  let changeInterval = null;

  function startIncrement(item) {
    stopChange(); // Ensure any existing interval is cleared
    incrementCount(item);
    changeInterval = setInterval(() => incrementCount(item), 100);
  }

  function startDecrement(item) {
    stopChange(); // Ensure any existing interval is cleared
    decrementCount(item);
    changeInterval = setInterval(() => decrementCount(item), 100);
  }

  function stopChange() {
    if (changeInterval) {
      clearInterval(changeInterval);
      changeInterval = null;
    }
  }

  function incrementCount(item) {
    item.countedQuantity += 1;
  }

  function decrementCount(item) {
    if (item.countedQuantity > 0) {
      item.countedQuantity -= 1;
    }
  }

  function toggleActive(item) {
    item.isActive = !item.isActive;
  }
  </script>
  
  <style scoped>
  .inventory-control {
    padding: 20px;
    background-color: #f9f9f9;
  }
  
  table {
    width: 100%;
    border-spacing: 0;
  }
  
  th, td {
    text-align: left;
    padding: 8px;
  }
  
  th {
    background-color: #f1f1f1;
  }
  
  tr:hover {
    background-color: #f5f5f5;
  }
  
  .filter-search-container {
    display: flex;
    align-items: center;
    gap: 16px;
  }
  
  @media (max-width: 768px) {
    .filter-search-container {
      flex-direction: column;
      align-items: stretch;
    }
  }
  </style>