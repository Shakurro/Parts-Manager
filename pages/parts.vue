<template>
  <div class="min-h-screen bg-gray-100 flex flex-col">
    <!-- Include Header Layout -->
    <HeaderLayout />

    <!-- Main Content -->
    <main class="flex-1 container mx-auto px-4 py-6">
      <div class="bg-white p-6 rounded shadow-md">
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
              <tr v-for="part in parts" :key="part.id" class="border-b hover:bg-gray-100">
                <td class="px-4 py-2">{{ part.name }}</td>
                <td class="px-4 py-2">{{ part.description }}</td>
                <td class="px-4 py-2">{{ part.price }}</td>
              </tr>
            </tbody>
          </table>
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
      ]
    };
  }
};
</script>

<style scoped>

</style>
