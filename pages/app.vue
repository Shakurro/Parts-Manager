<template>
  <NuxtLayout>
    <div class="min-h-screen bg-gray-100 flex flex-col">
      <!-- Include Header Layout -->
      <HeaderLayout />

      <!-- Main Content -->
      <main class="flex-1 container mx-auto px-4 py-6">
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <!-- Parts in Stock -->
          <div class="bg-white p-6 rounded shadow-md">
            <h3 class="text-lg font-bold mb-2">Parts in Stock</h3>
            <p class="text-gray-700">Es sind {{ totalParts }} Teile im Lager</p>
          </div>

          <!-- Total Selling Price -->
          <div class="bg-white p-6 rounded shadow-md">
            <h3 class="text-lg font-bold mb-2">Total Selling Price</h3>
            <p class="text-gray-700">Gesamtverkaufspreis: {{ totalSellingPrice }} €</p>
          </div>

          <!-- Recent Orders -->
          <div class="bg-white p-6 rounded shadow-md">
            <h3 class="text-lg font-bold mb-2">Placeholder</h3>
            <ul class="text-gray-700">
              <li v-for="order in recentOrders" :key="order.id">
                {{ order.name }} - {{ order.status }}
              </li>
            </ul>
          </div>

          <!-- Active Users -->
          <div class="bg-white p-6 rounded shadow-md">
            <h3 class="text-lg font-bold mb-2">Active Mechanics</h3>
            <p class="text-gray-700">12 Mechanics are now active</p>
          </div>

          <!-- Active Warenkörbe -->
          <div class="bg-white p-6 rounded shadow-md">
            <h3 class="text-lg font-bold mb-2">Active Warenkörbe</h3>
            <p class="text-gray-700">52500098457</p>
            <p class="text-gray-700">52500097584</p>
            <p class="text-gray-700">52500097845</p>
            <p class="text-gray-700">52500098745</p>
          </div>

          <!-- Sales Overview -->
          <div class="bg-white p-6 rounded shadow-md">
            <h3 class="text-lg font-bold mb-2">News</h3>
            <p class="text-gray-700">Es wurden weiter 78 Ersatzteile hinzugefügt.</p>
            <p class="text-gray-700">Die Benutzeroberfläche wurde aktualisiert, um die Navigation zu verbessern.</p>
          </div>
        </div>

        <!-- Use the LowQuantityParts component -->
        <LowQuantityParts />
      </main>

      <!-- Include Footer Layout -->
      <FooterLayout />
    </div>
  </NuxtLayout>
</template>

<script>
import HeaderLayout from './layouts/admin/HeaderLayout.vue';
import FooterLayout from './layouts/admin/FooterLayout.vue';
import LowQuantityParts from '../components/LowQuantityParts.vue'; // Import the new component

export default {
  name: 'App',
  components: {
    HeaderLayout,
    FooterLayout,
    LowQuantityParts // Register the new component
  },
  data() {
    return {
      parts: [],
      recentOrders: [] // Initialize recentOrders here
    };
  },
  computed: {
    totalParts() {
      return this.parts.length;
    },
    totalSellingPrice() {
      return this.parts.reduce((sum, part) => sum + (part.selling_price_eur || 0), 0).toFixed(2);
    }
  },
  mounted() {
    this.fetchParts();
  },
  methods: {
    async fetchParts() {
      try {
        let allParts = [];
        let page = 1;
        const pageSize = 800; // Set the limit to 800

        while (true) {
          const response = await fetch(`http://localhost:1337/items?_start=${(page - 1) * pageSize}&_limit=${pageSize}`);
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();
          allParts = allParts.concat(data);

          if (data.length < pageSize) {
            break; // Exit loop if fewer items than pageSize are returned
          }

          page++;
        }

        this.parts = allParts;

        // Log a summary of the fetched parts
      } catch (error) {
        console.error('Error fetching parts:', error);
      }
    }
  },

};
</script>

<style scoped>
/* Add any additional styles here */
</style>