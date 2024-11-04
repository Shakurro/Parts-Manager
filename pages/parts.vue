<template>
  <div class="min-h-screen bg-gray-100 flex flex-col">
    <!-- Include Header Layout -->
    <HeaderLayout />

    <!-- Main Content -->
    <main class="flex-1 container mx-auto px-4 py-6 flex flex-col md:flex-row">
      <!-- Sidebar with Search and Filters -->
      <aside class="w-full md:w-1/4 h-auto bg-white p-4 rounded shadow-md mb-4 md:mb-0 md:mr-4">
        <h3 class="text-lg font-bold mb-4">Suche und Filter</h3>
        <input type="text" placeholder="Suchen..." class="w-full p-2 mb-4 border rounded" v-model="searchQuery" />
        
        <h4 class="text-md font-semibold mb-2">Filter nach Kategorie</h4>
        <div class="mb-4">
          <label class="block text-gray-700">
            <input type="checkbox" v-model="selectedCategories" value="Aufbau" class="mr-2" />
            Aufbau
          </label>
          <label class="block text-gray-700">
            <input type="checkbox" v-model="selectedCategories" value="Rahmen" class="mr-2" />
            Rahmen
          </label>
          <label class="block text-gray-700">
            <input type="checkbox" v-model="selectedCategories" value="Elektrik" class="mr-2" />
            Elektrik
          </label>
          <label class="block text-gray-700">
            <input type="checkbox" v-model="selectedCategories" value="Motor" class="mr-2" />
            Motor
          </label>
          <label class="block text-gray-700">
            <input type="checkbox" v-model="selectedCategories" value="Betriebsstoffe" class="mr-2" />
            Betriebsstoffe
          </label>
          <label class="block text-gray-700">
            <input type="checkbox" v-model="selectedCategories" value="Schrauben" class="mr-2" />
            Schrauben
          </label>
        </div>
        
        <h4 class="text-md font-semibold mb-2">Kategorie</h4>
        <select class="w-full p-2 mb-4 border rounded" v-model="selectedCategory">
          <option value="">Alle Kategorien</option>
          <option value="Kategorie A">Kategorie A</option>
          <option value="Kategorie B">Kategorie B</option>
          <option value="Kategorie C">Kategorie C</option>
        </select>
        <button class="bg-gray-800 text-white py-2 px-4 rounded hover:bg-green-600 transition duration-200">Anwenden</button>
      </aside>

      <!-- Parts List -->
      <div class="w-full md:w-3/4 bg-white p-6 rounded shadow-md">
        <h2 class="text-xl font-bold mb-4">Teileliste</h2>
        <div class="overflow-x-auto">
          <table class="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
            <thead class="bg-gray-800 text-white">
              <tr>
                <th class="w-1/6 px-4 py-2 text-left">ID</th>
                <th class="w-1/6 px-4 py-2 text-left">Partnumber</th>
                <th class="w-1/3 px-4 py-2 text-left">Beschreibung</th>
                <th class="w-1/6 px-4 py-2 text-left">InStock</th>
                <th class="w-1/6 px-4 py-2 text-left">EKPreis</th>
                <th class="w-1/6 px-4 py-2 text-left">VKPreis</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="part in paginatedParts" :key="part.id" class="border-b hover:bg-gray-100">
                <td class="px-4 py-2">{{ part.id }}</td>
                <td class="px-4 py-2">{{ part.Partnumber }}</td>
                <td class="px-4 py-2">{{ part.Beschreibung }}</td>
                <td class="px-4 py-2">{{ part.InStock }}</td>
                <td class="px-4 py-2">{{ part.EKPreis }}</td>
                <td class="px-4 py-2">{{ part.VKPreis }}</td>
              </tr>
            </tbody>
          </table>
        </div>
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

    <!-- Include Footer Layout -->
    <FooterLayout />
  </div>
</template>

<script>
import axios from 'axios';
import HeaderLayout from '../layouts/HeaderLayout.vue';
import FooterLayout from '../layouts/FooterLayout.vue';

export default {
  name: 'Parts',
  components: {
    HeaderLayout,
    FooterLayout,
  },
  data() {
    return {
      searchQuery: '',
      parts: [],
      currentPage: 1,
      partsPerPage: 20,
      selectedCategories: [],
      selectedCategory: ''
    };
  },
  computed: {
    paginatedParts() {
      const start = (this.currentPage - 1) * this.partsPerPage;
      const end = this.currentPage * this.partsPerPage;
      return this.parts.slice(start, end);
    },
    totalPages() {
      return Math.ceil(this.parts.length / this.partsPerPage);
    }
  },
  mounted() {
    this.fetchParts();
  },
  methods: {
    async fetchParts() {
      try {
        const response = await axios.get('http://localhost:1337/parts');
        console.log(response.data); // Check the structure of the data
        this.parts = response.data.sort((a, b) => a.id - b.id);
      } catch (error) {
        console.error('Fehler beim Abrufen der Teile:', error);
      }
    },
    goToPage(page) {
      if (page >= 1 && page <= this.totalPages) {
        this.currentPage = page;
      }
    }
  }
};
</script>

<style scoped>
/* Add any additional styles here */
</style>
