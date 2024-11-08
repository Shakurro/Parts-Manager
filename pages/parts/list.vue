<template>
  <div class="min-h-screen bg-gray-100 flex flex-col">
    <!-- Include Header Layout -->
    <HeaderLayout />

    <!-- Main Content -->
    <main class="flex-1 container mx-auto px-4 py-6 flex flex-col md:flex-row">
      <!-- Sidebar with Search and Filters -->
      <aside class="w-full md:w-1/4 bg-white p-4 rounded shadow-md mb-4 md:mb-0 md:mr-4 flex flex-col space-y-4" style="display: inline-block;">
        <div>
          <h3 class="text-lg font-bold mb-4">Suche und Filter</h3>
          <input type="text" placeholder="Suchen..." class="w-full p-2 mb-4 border rounded" v-model="searchQuery" />
          
          <!-- Container for the category filters -->
          <div class="mb-4">
            <h4 class="text-md font-semibold mb-2">Filter nach Kategorie</h4>
            <div>
              <label class="block text-gray-700">
                <input type="checkbox" v-model="selectedCategories" value="1" class="mr-2" />
                Aufbau
              </label>
              <label class="block text-gray-700">
                <input type="checkbox" v-model="selectedCategories" value="2" class="mr-2" />
                Rahmen
              </label>
              <label class="block text-gray-700">
                <input type="checkbox" v-model="selectedCategories" value="3" class="mr-2" />
                Elektrik
              </label>
              <label class="block text-gray-700">
                <input type="checkbox" v-model="selectedCategories" value="4" class="mr-2" />
                Motor
              </label>
              <label class="block text-gray-700">
                <input type="checkbox" v-model="selectedCategories" value="5" class="mr-2" />
                Bremse
              </label>
              <label class="block text-gray-700">
                <input type="checkbox" v-model="selectedCategories" value="6" class="mr-2" />
                Achse
              </label>
              <label class="block text-gray-700">
                <input type="checkbox" v-model="selectedCategories" value="7" class="mr-2" />
                Betriebsstoffe
              </label>
              <label class="block text-gray-700">
                <input type="checkbox" v-model="selectedCategories" value="8" class="mr-2" />
                Schrauben
              </label>
              <label class="block text-gray-700">
                <input type="checkbox" v-model="selectedCategories" value="9" class="mr-2" />
                Ladeboardwand
              </label>
            </div>
          </div>

          <!-- Added space between the two sections -->
          <div class="mb-4"></div>

          <!-- Container for the filter button -->
          <div class="flex justify-between mb-4">
            <button 
              @click="clearFilters"
              class="bg-gray-800 text-white py-2 px-4 rounded hover:bg-red-800 transition duration-200"
            >
              Filter entfernen
            </button>
          </div>
        </div>
      </aside>

      <!-- Parts List -->
      <div class="w-full md:w-3/4 bg-white p-6 rounded shadow-md">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-xl font-bold">Teileliste</h2>
          <button 
            class="bg-gray-800 text-white py-2 px-4 rounded hover:bg-green-600 transition duration-200"
            @click="isAddPopupVisible = true"
          >
            Hinzufügen
          </button>
        </div>
        <div class="overflow-x-auto">
          <table class="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
            <thead class="bg-gray-800 text-white">
              <tr>
                <th class="w-1/12 px-4 py-2 text-left">ID</th>
                <th class="w-2/12 px-4 py-2 text-left">Partnumber</th>
                <th class="w-4/12 px-4 py-2 text-left">Description</th>
                <th class="w-1/12 px-4 py-2 text-left">InStock</th>
                <th class="w-2/12 px-4 py-2 text-left">Buying-Prices</th>
                <th class="w-2/12 px-4 py-2 text-left">Selling-Prices</th>
                <th class="w-2/12 px-4 py-2 text-left">Category</th>
              </tr>
            </thead>
            <tbody>
              <tr 
                v-for="part in paginatedParts" 
                :key="part.id" 
                class="border-b hover:bg-gray-100 cursor-pointer"
                @click="viewPart(part)"
              >
                <td class="px-4 py-2">{{ part.id }}</td>
                <td class="px-4 py-2">{{ part.partnumber }}</td>
                <td class="px-4 py-2">{{ part.description }}</td>
                <td class="px-4 py-2">{{ part.instock }}</td>
                <td class="px-4 py-2">{{ part.buying_price_eur }}-€</td>
                <td class="px-4 py-2">{{ part.selling_price_eur }}€</td>
                <td class="px-4 py-2">{{ getCategoryName(part.category) }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <!-- Pagination Controls -->
        <div class="flex justify-between mt-4">
          <button 
            :disabled="currentPage === 1" 
            @click="goToPage(currentPage - 1)"
            class="bg-gray-800 text-white py-2 px-4 rounded hover:bg-green-600 transition duration-200"
          >
            Vorherige Seite
          </button>
          <span>Seite {{ currentPage }} von {{ totalPages }}</span>
          <button 
            :disabled="currentPage === totalPages" 
            @click="goToPage(currentPage + 1)"
            class="bg-gray-800 text-white py-2 px-4 rounded hover:bg-green-600 transition duration-200"
          >
            Nächste Seite
          </button>
        </div>
      </div>
    </main>

    <!-- Footer Layout -->
    <FooterLayout />

    <!-- PartDetailPopup with transition -->
    <transition name="scale">
      <PartDetailPopup 
        v-if="isPopupVisible" 
        :visible="isPopupVisible" 
        :part="selectedPart" 
        @close="isPopupVisible = false" 
        @update="updatePart"
      />
    </transition>

    <!-- NotificationPopup -->
    <NotificationPopup 
      :visible="isNotificationVisible" 
      @close="closeNotification"
    />
    <!-- AddPartPopup -->
    <AddPartPopup 
      :visible="isAddPopupVisible" 
      @close="isAddPopupVisible = false" 
      @add="addPart"
    />
  </div>
</template>

<script>
import axios from 'axios';
import HeaderLayout from '../layouts/admin/HeaderLayout.vue';
import FooterLayout from '../layouts/admin/FooterLayout.vue';
import PartDetailPopup from '../components/PartDetailPopup.vue';
import NotificationPopup from '../components/NotificationPopup.vue';
import AddPartPopup from '../components/AddPartPopup.vue';

export default {
  name: 'Parts',
  components: {
    HeaderLayout,
    FooterLayout,
    PartDetailPopup,
    NotificationPopup,
    AddPartPopup
  },
  data() {
    return {
      searchQuery: '',
      parts: [],
      currentPage: 1,
      partsPerPage: 20,
      selectedCategories: [],
      selectedCategory: '',
      isPopupVisible: false,
      isNotificationVisible: false,
      selectedPart: null,
      isAddPopupVisible: false,
    };
  },
  computed: {
    filteredParts() {
      console.log('Selected Categories:', this.selectedCategories);
      return this.parts.filter(part => {
        const matchesSearchQuery = part.description.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
                                   part.partnumber.toLowerCase().includes(this.searchQuery.toLowerCase());
        const matchesCategory = this.selectedCategories.length === 0 || 
                                (part.category !== null && this.selectedCategories.includes(part.category.toString()));
        return matchesSearchQuery && matchesCategory;
      });
    },
    sortedFilteredParts() {
      return this.filteredParts.sort((a, b) => a.id - b.id);
    },
    paginatedParts() {
      const start = (this.currentPage - 1) * this.partsPerPage;
      const end = this.currentPage * this.partsPerPage;
      return this.sortedFilteredParts.slice(start, end);
    },
    totalPages() {
      return Math.ceil(this.sortedFilteredParts.length / this.partsPerPage);
    }
  },
  mounted() {
    this.fetchAllItems();
  },
  methods: {
    async fetchAllItems() {
      let allItems = [];
      let page = 1;
      const pageSize = 800; 

      try {
        while (true) {
          const response = await axios.get(`http://localhost:1337/items`, {
            params: {
              _start: (page - 1) * pageSize,
              _limit: pageSize
            }
          });

          const items = response.data;
          if (items.length === 0) {
            break;
          }

          allItems = allItems.concat(items);
          page++;
        }

        this.parts = allItems;
      } catch (error) {
        console.error('Error fetching items:', error);
      }
    },
    goToPage(page) {
      if (page > 0 && page <= this.totalPages) {
        this.currentPage = page;
      }
    },
    viewPart(part) {
      this.selectedPart = part;
      this.isPopupVisible = true;
    },
    applyFilter() {
      // This method can be used to trigger any additional logic if needed
      console.log('Filter applied:', this.selectedCategories);
    },
    clearFilters() {
      this.selectedCategories = [];
      this.searchQuery = '';
      console.log('Filters cleared');
    },
    async updatePart(updatedPart) {
      const index = this.parts.findIndex(part => part.id === updatedPart.id);
      if (index !== -1) {
        const originalPart = { ...this.parts[index] };

        try {
          this.parts[index] = updatedPart; // Aktualisierte Daten zuweisen

          // Änderungen protokollieren
          const changeLog = {
            who: 'currentUser', // Ersetzen Sie dies durch die tatsächliche Benutzeridentifikation
            when: new Date().toISOString(),
            before_change: JSON.stringify(originalPart),
            after_change: JSON.stringify(updatedPart)
          };

          console.log('Logging change:', changeLog);

          // Übermitteln der Änderungen an die API
          await axios.post('http://localhost:1337/changes', changeLog);
        } catch (error) {
          console.error('Error logging change:', error.response ? error.response.data : error.message);
          // Rückgängig machen der Änderungen
          this.parts[index] = originalPart;
        }
      }
      this.isPopupVisible = false;
      this.isNotificationVisible = true;
      this.fetchAllItems();
    },
    closeNotification() {
      this.isNotificationVisible = false;
    },
    async addPart(newPart) {
      try {
        // Save the new part to the database
        const response = await axios.post('http://localhost:1337/items', newPart);
        this.parts.push(response.data);
        this.isAddPopupVisible = false;
        this.isNotificationVisible = true; 
      } catch (error) {
        console.error('Error adding part:', error.response ? error.response.data : error.message);
      }
    },
    getCategoryName(categoryId) {
      const categoryMap = {
        1: 'Aufbau',
        2: 'Rahmen',
        3: 'Elektrik',
        4: 'Motor',
        5: 'Bremse',
        6: 'Achse',
        7: 'Betriebsstoffe',
        8: 'Schrauben',
        9: 'Ladeboardwand'
      };
      return categoryMap[categoryId] || 'fehlt';
    }
  },
  watch: {
    selectedCategories() {
      this.currentPage = 1;
    }
  }
};
</script>

<style scoped>
</style>
