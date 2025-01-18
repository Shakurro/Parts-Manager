<template>
  <div class="min-h-screen bg-gray-50 p-6">
    <!-- Header Section -->
    <div class="mb-8">
      <div class="flex justify-between items-center mb-6">
        <div>
          <div class="mb-4">
            <h1 class="text-3xl font-bold text-gray-800">Warenausgang Übersicht</h1>
          </div>
          <button
            @click="$router.back()"
            class="bg-white shadow-md rounded-lg px-6 py-3 flex items-center hover:bg-gray-50 transition-colors duration-200"
          >
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span class="font-medium">Zurück</span>
          </button>
        </div>
      </div>

      <!-- Search and Filter Section -->
      <div class="bg-white p-4 rounded-lg shadow-sm mb-6">
        <div class="flex gap-4 flex-wrap">
          <div class="flex-1 min-w-[200px]">
            <input
              v-model="filters.search"
              type="search"
              placeholder="Suche nach Artikeln..."
              class="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
          </div>
          <div class="min-w-[200px]">
            <select 
              v-model="filters.recipient"
              class="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            >
              <option value="">Alle Empfänger</option>
              <option v-for="recipient in uniqueRecipients" :key="recipient" :value="recipient">
                {{ recipient }}
              </option>
            </select>
          </div>
          <div class="flex gap-2 min-w-[400px]">
            <input
              v-model="filters.dateFrom"
              type="date"
              class="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
            <span class="flex items-center text-gray-500">bis</span>
            <input
              v-model="filters.dateTo"
              type="date"
              class="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
            <button 
              @click="resetDateFilters"
              class="px-3 py-2 text-gray-600 hover:text-blue-600 transition-colors"
              title="Auf aktuellen Monat zurücksetzen"
            >
              <i class="fas fa-sync-alt"></i>
            </button>
          </div>
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
              <th class="px-6 py-4 text-left text-sm font-semibold text-gray-600">Empfänger</th>
              <th class="px-6 py-4 text-left text-sm font-semibold text-gray-600">Manager</th>
              <th class="px-6 py-4 text-left text-sm font-semibold text-gray-600">Erstellt am</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in filteredItems" :key="item.id" class="border-b border-gray-100 hover:bg-gray-50 transition-colors">
              <td class="px-6 py-4 text-sm">{{ item.partnumber }}</td>
              <td class="px-6 py-4 text-sm">{{ item.description }}</td>
              <td class="px-6 py-4 text-sm">
                <span class="px-3 py-1 bg-red-100 text-red-800 rounded-full">{{ item.value }} Stk.</span>
              </td>
              <td class="px-6 py-4 text-sm">{{ item.recipient }}</td>
              <td class="px-6 py-4 text-sm">{{ item.manager }}</td>
              <td class="px-6 py-4 text-sm">{{ formatDate(item.created_at) }}</td>
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
    const today = new Date();
    const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);

    return {
      partsExits: [
        { id: 1, partnumber: 'A123', description: 'Produkt A', value: 10, recipient: 'Kunde X', manager: 'Manager 1', created_at: '2023-10-01' },
        { id: 2, partnumber: 'B456', description: 'Produkt B', value: 5, recipient: 'Kunde Y', manager: 'Manager 2', created_at: '2023-10-02' },
        { id: 3, partnumber: 'C789', description: 'Produkt C', value: 20, recipient: 'Kunde Z', manager: 'Manager 3', created_at: '2023-10-03' },
        // Weitere Warenausgangsdaten hier hinzufügen
      ],
      filters: {
        search: '',
        recipient: '',
        dateFrom: firstDayOfMonth.toISOString().split('T')[0],
        dateTo: lastDayOfMonth.toISOString().split('T')[0]
      }
    };
  },
  computed: {
    uniqueRecipients() {
      return [...new Set(this.partsExits.map(item => item.recipient))];
    },
    filteredItems() {
      return this.partsExits.filter(item => {
        const searchMatch = !this.filters.search || 
          item.description.toLowerCase().includes(this.filters.search.toLowerCase()) ||
          item.partnumber?.toLowerCase().includes(this.filters.search.toLowerCase());

        const recipientMatch = !this.filters.recipient || 
          item.recipient === this.filters.recipient;

        const itemDate = new Date(item.created_at);
        const dateFromMatch = !this.filters.dateFrom || 
          itemDate >= new Date(this.filters.dateFrom);
        const dateToMatch = !this.filters.dateTo || 
          itemDate <= new Date(this.filters.dateTo);

        return searchMatch && recipientMatch && dateFromMatch && dateToMatch;
      });
    }
  },
  methods: {
    formatDate(dateString) {
      return new Date(dateString).toLocaleDateString('de-DE', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
      });
    },
    resetDateFilters() {
      const today = new Date();
      const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
      const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
      
      this.filters.dateFrom = firstDayOfMonth.toISOString().split('T')[0];
      this.filters.dateTo = lastDayOfMonth.toISOString().split('T')[0];
    }
  }
};
</script>

<style scoped>

</style>