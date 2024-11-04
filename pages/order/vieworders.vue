<template>
  <div class="min-h-screen flex flex-col bg-gray-100">
    <!-- Include Header Layout -->
    <HeaderLayout />

    <!-- Main Content -->
    <main class="flex-1 container mx-auto w-1/2 px-4 py-6">
    <div class="bg-white p-6 rounded shadow-md col-span-1">
          <h3 class="text-lg font-bold mb-4">New Order</h3>
          <ul>
            <li>
              <NuxtLink to="/order/new"><button class="bg-gray-800 text-white py-2 px-4 rounded hover:bg-gray-600 transition duration-200">New Order</button></NuxtLink>
            </li>
          </ul>
        </div> 

        <div class="mb-6"></div> <!-- Added spacing between the two sections -->

      
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