<template>
  <div class="min-h-screen flex flex-col bg-gray-100">
    <!-- Include Header Layout -->
    <HeaderLayout />

    <!-- Main Content -->
    <main class="flex-1 container mx-auto px-4 py-6">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

        <!-- New Order -->
        <div class="bg-white p-6 rounded shadow-md col-span-1">
          <h3 class="text-lg font-bold mb-4">New Order</h3>
          <ul>
            <li>
              <NuxtLink to="/order/new"><button class="bg-gray-800 text-white py-2 px-4 rounded hover:bg-gray-600 transition duration-200">New Order</button></NuxtLink>
            </li>
          </ul>
        </div>

        <div class="col-span-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <!-- Active Orders -->
          <div class="bg-white p-6 rounded shadow-md">
            <h3 class="text-lg font-bold mb-4">Active Orders</h3>
            <ul>
              <li v-for="order in activeOrders" :key="order.id" class="mb-2">
                {{ order.name }} - {{ order.status }}
              </li>
            </ul>
          </div>

          <!-- Open Orders -->
          <div class="bg-white p-6 rounded shadow-md">
            <h3 class="text-lg font-bold mb-4">Open Orders</h3>
            <ul>
              <li v-for="order in openOrders" :key="order.id" class="mb-2">
                {{ order.name }} - {{ order.status }}
              </li>
            </ul>
          </div>

          <!-- Last 10 Orders -->
          <div class="bg-white p-6 rounded shadow-md">
            <h3 class="text-lg font-bold mb-4">Last 10 Orders</h3>
            <ul>
              <li v-for="order in last10Orders" :key="order.id" class="mb-2">
                {{ order.name }} - {{ order.status }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </main>

    <!-- Include Footer Layout -->
    <FooterLayout />
  </div>
</template>

<script>
import HeaderLayout from '../layouts/admin/HeaderLayout.vue';
import FooterLayout from '../layouts/admin/FooterLayout.vue';

export default {
  name: 'Orders',
  components: {
    HeaderLayout,
    FooterLayout,
  },
  data() {
    return {
      activeOrders: [
        { id: 1, name: 'Order 101', status: 'Active' },
        { id: 2, name: 'Order 102', status: 'Active' },
        // Weitere aktive Bestellungen
      ],
      openOrders: [
        { id: 3, name: 'Order 103', status: 'Open' },
        { id: 4, name: 'Order 104', status: 'Open' },
        // Weitere offene Bestellungen
      ],
      last10Orders: [
        { id: 5, name: 'Order 105', status: 'Completed' },
        { id: 6, name: 'Order 106', status: 'Completed' },
        { id: 7, name: 'Order 105', status: 'Completed' },
        { id: 8, name: 'Order 106', status: 'Completed' },
        { id: 9, name: 'Order 105', status: 'Completed' },
        { id: 10, name: 'Order 106', status: 'Completed' },
        { id: 11, name: 'Order 105', status: 'Completed' },
        { id: 12, name: 'Order 106', status: 'Completed' },
        { id: 13, name: 'Order 105', status: 'Completed' },
        { id: 14, name: 'Order 106', status: 'Completed' },

        // Weitere Bestellungen, um die letzten 10 zu füllen
      ]
    };
  },
  methods: {
    navigateToNewOrder() {
      this.$router.push({ name: 'NewOrder' });
    }
  }
};
</script>

<style scoped>
/* Add any additional styles here */
</style>