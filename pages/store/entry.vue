<template>
  <div class="min-h-screen bg-gray-50 p-6">
    <!-- Header Section -->
    <div class="mb-8">
      <div class="flex justify-between items-center mb-6">
        <div>
          <h1 class="text-3xl font-bold text-gray-800">Wareneingang Übersicht</h1>
          <p class="text-gray-600 mt-1">Verwalten Sie hier Ihre Wareneingänge</p>
        </div>
        <button 
          @click="showNewEntryModal = true" 
          class="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 shadow-sm"
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
              <option v-for="supplier in uniqueSuppliers" :key="supplier" :value="supplier">
                {{ supplier }}
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

export default {
  components: {
    NewEntryModal
  },
  setup() {
    const partsEntriesStore = usePartsEntriesStore();

    // Verwende async/await, um sicherzustellen, dass die Daten vollständig geladen werden
    const loadEntries = async () => {
      try {
        await partsEntriesStore.fetchAllEntries();
        console.log('Parts Entries in Component:', partsEntriesStore.partsEntries); // Logge die Daten in der Komponente
      } catch (error) {
        console.error('Error loading parts entries:', error);
      }
    };

    // Lade die Einträge beim Setup
    loadEntries();

    return {
      partsEntries: partsEntriesStore.partsEntries,
    };
  },
  data() {
    // Berechne Start- und Enddatum des aktuellen Monats
    const today = new Date();
    const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);

    return {
      showNewEntryModal: false,
      filters: {
        search: '',
        supplier: '',
        dateFrom: firstDayOfMonth.toISOString().split('T')[0],
        dateTo: lastDayOfMonth.toISOString().split('T')[0]
      }
    };
  },
  computed: {
    uniqueSuppliers() {
      return [...new Set(this.partsEntries.map(item => item.vendor))];
    },
    filteredItems() {
      return this.partsEntries.filter(item => {
        // Suchtextfilter
        const searchMatch = !this.filters.search || 
          item.description.toLowerCase().includes(this.filters.search.toLowerCase()) ||
          item.partnumber?.toLowerCase().includes(this.filters.search.toLowerCase());

        // Lieferantenfilter
        const supplierMatch = !this.filters.supplier || 
          item.vendor === this.filters.supplier;

        // Datumsfilter
        const itemDate = new Date(item.importdate);
        const dateFromMatch = !this.filters.dateFrom || 
          itemDate >= new Date(this.filters.dateFrom);
        const dateToMatch = !this.filters.dateTo || 
          itemDate <= new Date(this.filters.dateTo);

        return searchMatch && supplierMatch && dateFromMatch && dateToMatch;
      });
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
      // Generate a new ID (in production, this would typically come from the backend)
      const newId = Math.max(...this.partsEntries.map(item => item.id)) + 1;
      this.partsEntries.unshift({
        id: newId,
        ...newEntry
      });
      this.showNewEntryModal = false;
    },
    // Neue Methode zum Zurücksetzen der Filter auf den aktuellen Monat
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
/* Optional: Füge benutzerdefinierte Stile hinzu, falls gewünscht */
</style>
  