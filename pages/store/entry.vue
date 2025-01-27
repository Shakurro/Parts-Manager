<template>
  <div class="min-h-screen bg-gray-50 p-6">
    <!-- Header Section -->
    <div class="mb-8">
      <div class="flex justify-between items-center mb-6">
        <div>
          <div class="mb-4">
            <h1 class="text-3xl font-bold text-gray-800">Wareneingang Übersicht</h1>
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
        <button 
          @click="showNewEntryModal = true" 
          class="px-6 py-2.5 bg-gray-800 text-white rounded-lg hover:bg-green-600 transition-colors flex items-center gap-2 shadow-sm"
        >
          <i class="fas fa-plus"></i>
          Neuer Wareneingang
        </button>
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
              v-model="filters.supplier"
              class="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            >
              <option value="">Alle Lieferanten</option>
              <option value="Europart">Europart</option>
              <option value="Krone">Krone</option>
              <option value="Schmitz">Schmitz</option>
              <option value="Winkler">Winkler</option>
              <option value="Würth">Würth</option>
              <option value="Saxas">Saxas</option>
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
              <th class="px-6 py-4 text-left text-sm font-semibold text-gray-600">Lieferant</th>
              <th class="px-6 py-4 text-left text-sm font-semibold text-gray-600">Manager</th>
              <th class="px-6 py-4 text-left text-sm font-semibold text-gray-600">Erstellt am</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in filteredItems" :key="item.id" class="border-b border-gray-100 hover:bg-gray-50 transition-colors">
              <td class="px-6 py-4 text-sm">{{ item.partnumber }}</td>
              <td class="px-6 py-4 text-sm">{{ item.description }}</td>
              <td class="px-6 py-4 text-sm">
                <span class="px-3 py-1 bg-green-100 text-green-800 rounded-full">{{ item.value }} Stk.</span>
              </td>
              <td class="px-6 py-4 text-sm">{{ item.vendor }}</td>
              <td class="px-6 py-4 text-sm">{{ item.manager }}</td>
              <td class="px-6 py-4 text-sm">{{ formatDate(item.created_at) }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </n-scrollbar>

    <NewEntryModal 
      v-if="showNewEntryModal" 
      @close="showNewEntryModal = false"
      @save="handleNewEntry"
    />
  </div>
</template>

<script>
import { usePartsEntriesStore } from '~/stores/partsentriesStore';
import NewEntryModal from '~/components/entry/NewEntryModal.vue';
import BarcodeScanner from '~/components/entry/BarcodeScanner.vue';
import { ref, onMounted } from 'vue';

export default {
  components: {
    NewEntryModal,
    BarcodeScanner
  },
  created() {
    this.loadEntries();
  },
  setup() {
    const partsEntriesStore = usePartsEntriesStore();
    const partsEntries = ref([]);
    const showNewEntryModal = ref(false);

    const loadEntries = async () => {
      try {
        await partsEntriesStore.fetchAllEntries();
        partsEntries.value = partsEntriesStore.partsEntries;
      } catch (error) {
        // Fehlerbehandlung hier hinzufügen, falls nötig
      }
    };

    onMounted(() => {
      loadEntries();
    });

    const today = new Date();
    const oneMonthAgo = new Date(today.getFullYear(), today.getMonth() - 1, today.getDate());
    const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);

    const filters = ref({
      search: '',
      supplier: '',
      dateFrom: oneMonthAgo.toISOString().split('T')[0],
      dateTo: lastDayOfMonth.toISOString().split('T')[0]
    });

    return {
      partsEntries,
      loadEntries,
      showNewEntryModal,
      filters
    };
  },
  computed: {
    uniqueSuppliers() {
      return [...new Set(this.partsEntries.map(item => item.vendor))];
    },
    filteredItems() {
      return this.partsEntries.filter(item => {
        const searchMatch = !this.filters.search || 
          (item.description && item.description.toLowerCase().includes(this.filters.search.toLowerCase())) ||
          (item.partnumber && item.partnumber.toLowerCase().includes(this.filters.search.toLowerCase()));

        const supplierMatch = !this.filters.supplier || 
          item.vendor === this.filters.supplier;

        const itemDate = new Date(item.published_at);
        const dateFromMatch = !this.filters.dateFrom || 
          itemDate >= new Date(this.filters.dateFrom);
        const dateToMatch = !this.filters.dateTo || 
          itemDate <= new Date(this.filters.dateTo);

        return searchMatch && supplierMatch && dateFromMatch && dateToMatch;
      });
    }
  },
  watch: {
    'filters.search': function(newVal) {
      // Logik für die Suche
    },
    'filters.dateFrom': function(newVal) {
      // Logik für das Startdatum
    },
    'filters.dateTo': function(newVal) {
      // Logik für das Enddatum
    }
  },
  methods: {
    deleteItem(id) {
      console.log(`Löschen von Artikel mit ID: ${id}`);
      this.partsEntries = this.partsEntries.filter(item => item.id !== id);
    },
    formatDate(dateString) {
      return new Date(dateString).toLocaleDateString('de-DE', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
      });
    },
    handleNewEntry(newEntry) {
      const newId = Math.max(...this.partsEntries.map(item => item.id)) + 1;
      this.partsEntries.unshift({
        id: newId,
        ...newEntry
      });
      this.showNewEntryModal = false;
    },
    resetDateFilters() {
      const today = new Date();
      const oneMonthAgo = new Date(today.getFullYear(), today.getMonth() - 1, today.getDate());
      const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
      
      this.filters.dateFrom = oneMonthAgo.toISOString().split('T')[0];
      this.filters.dateTo = lastDayOfMonth.toISOString().split('T')[0];
    }
  }
};
</script>

<style scoped>

</style>
  