<template>
  <div class="min-h-screen bg-gray-100 flex flex-col">
    <!-- Include Header Layout -->
    <HeaderLayout />

    <!-- Main Content -->
    <main class="flex-1 container mx-auto px-4 py-6 flex">
      <!-- Sidebar with Search and Filters -->
      <aside class="w-1/4 h-1/2 bg-white p-4 rounded shadow-md mr-4">
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
      <div class="w-3/4 bg-white p-6 rounded shadow-md">
        <h2 class="text-xl font-bold mb-4">Parts List</h2>
        <div class="overflow-x-auto">
          <table class="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
            <thead class="bg-gray-800 text-white">
              <tr>
                <th class="w-1/3 px-4 py-2 text-left">Part Name</th>
                <th class="w-1/3 px-4 py-2 text-left">Description</th>
                <th class="w-1/3 px-4 py-2 text-left">Price</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="part in filteredParts" :key="part.id" class="border-b hover:bg-gray-100">
                <td class="px-4 py-2">{{ part.name }}</td>
                <td class="px-4 py-2">{{ part.description }}</td>
                <td class="px-4 py-2">{{ part.price }}</td>
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
      parts: [
        { id: 1, name: 'Part A', description: 'Description for Part A', price: '$10' },
        { id: 2, name: 'Part B', description: 'Description for Part B', price: '$20' },
        { id: 3, name: 'Part C', description: 'Description for Part C', price: '$30' },
        { id: 4, name: 'Part D', description: 'Description for Part D', price: '$40' },
        { id: 5, name: 'Part E', description: 'Description for Part E', price: '$50' },
        { id: 6, name: 'Part F', description: 'Description for Part F', price: '$60' },
        { id: 7, name: 'Part G', description: 'Description for Part G', price: '$70' },
        { id: 8, name: 'Part H', description: 'Description for Part H', price: '$80' },
        { id: 9, name: 'Part I', description: 'Description for Part I', price: '$90' },
        { id: 10, name: 'Part J', description: 'Description for Part J', price: '$100' },
        { id: 11, name: 'Part K', description: 'Description for Part K', price: '$110' },
        { id: 12, name: 'Part L', description: 'Description for Part L', price: '$120' },
        { id: 13, name: 'Part M', description: 'Description for Part M', price: '$130' },
        { id: 14, name: 'Part N', description: 'Description for Part N', price: '$140' },
        { id: 11, name: 'Part K', description: 'Description for Part K', price: '$110' },
        { id: 12, name: 'Part L', description: 'Description for Part L', price: '$120' },
        { id: 13, name: 'Part M', description: 'Description for Part M', price: '$130' },
        { id: 14, name: 'Part N', description: 'Description for Part N', price: '$140' },
      ],
      currentPage: 1,
      partsPerPage: 13,
    };
  },
  computed: {
    filteredParts() {
      const start = (this.currentPage - 1) * this.partsPerPage;
      const end = this.currentPage * this.partsPerPage;
      return this.parts
        .filter(part => 
          part.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          part.description.toLowerCase().includes(this.searchQuery.toLowerCase())
        )
        .slice(start, end);
    },
    totalPages() {
      return Math.ceil(this.parts.length / this.partsPerPage);
    }
  },
  methods: {
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
