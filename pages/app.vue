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
            <h3 class="text-lg font-bold mb-2">Neue Buchungen</h3>
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
            <p class="text-gray-700">Mechanic Peters is now active</p>
            <p class="text-gray-700">Mechanic Meters is now active</p>
            <p class="text-gray-700">Mechanic Feters is now active</p>
            <p class="text-gray-700">Mechanic Keters is now active</p>
          </div>

          <!-- Sales Overview -->
          <div class="bg-white p-6 rounded shadow-md">
            <h3 class="text-lg font-bold mb-2">Total Parts used</h3>
            <p class="text-gray-700">Es wurden im Juni 172 Parts verbaut.</p>
          </div>
        </div>
      </main>

      <!-- Include Footer Layout -->
      <FooterLayout />
    </div>
  </NuxtLayout>
</template>

<script>
import HeaderLayout from './layouts/admin/HeaderLayout.vue';
import FooterLayout from './layouts/admin/FooterLayout.vue';

export default {
  name: 'App',
  components: {
    HeaderLayout,
    FooterLayout
  },
  data() {
    return {
      parts: [],
      recentOrders: [
        { id: 1, name: 'Order 101', status: 'Pending' },
        { id: 2, name: 'Order 102', status: 'Pending' },
        { id: 3, name: 'Order 103', status: 'Pending' },
        // Add more orders as needed
      ]
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
    this.fetchAllParts();
  },
  methods: {
    async fetchAllParts() {
      try {
        let allParts = [];
        let page = 1;
        const pageSize = 100;

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
        console.log('Total parts fetched:', allParts.length);
      } catch (error) {
        console.error('Error fetching parts:', error);
      }
    }
  }
};
</script>

<style scoped>
/* Add any additional styles here */
</style>
