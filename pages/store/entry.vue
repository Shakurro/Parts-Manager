<template>
    <div class="min-h-screen bg-gray-100 p-6">
      <!-- Header Section -->
      <div class="flex justify-between items-center mb-6">
        <h1 class="text-3xl font-semibold text-gray-800">Wareneingang Übersicht</h1>
        <button class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          Neuer Wareneingang
        </button>
      </div>
  
      <n-scrollbar style="max-height: 800px">
      <div class="overflow-x-auto bg-white rounded-lg shadow-lg">
        <table class="min-w-full table-auto">
          <thead class="bg-gray-200 text-gray-700">
            <tr>
                <th class="px-4 py-3 text-left">Artikelnummer</th>
              <th class="px-4 py-3 text-left">Artikelname</th>
              <th class="px-4 py-3 text-left">Menge</th>
              <th class="px-4 py-3 text-left">Lieferant</th>
              <th class="px-4 py-3 text-left">Wareneingangsdatum</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in incomingItems" :key="item.id" class="border-t hover:bg-gray-50">
              <td class="px-4 py-3">{{ item.productnumber }}</td>
              <td class="px-4 py-3">{{ item.productName }}</td>
              <td class="px-4 py-3">{{ item.quantity }}</td>
              <td class="px-4 py-3">{{ item.supplier }}</td>
              <td class="px-4 py-3">{{ item.date }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </n-scrollbar>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        incomingItems: [
          { id: 1, productnumber:'0123456789', productName: 'Laptop', quantity: 15, supplier: 'TechCo', date: '2024-12-05' },
          { id: 2, productName: 'Tastatur', quantity: 50, supplier: 'ComTech', date: '2024-12-07' },
          { id: 3, productName: 'Monitor', quantity: 30, supplier: 'VisionSupplies', date: '2024-12-08' },
        ],
      };
    },
    methods: {
      editItem(id) {
        console.log(`Bearbeiten von Artikel mit ID: ${id}`);
      },
      deleteItem(id) {
        console.log(`Löschen von Artikel mit ID: ${id}`);
        this.incomingItems = this.incomingItems.filter(item => item.id !== id);
      }
    }
  };
  </script>
  
  <style scoped>
  /* Optional: Füge benutzerdefinierte Stile hinzu, falls gewünscht */
  </style>
  