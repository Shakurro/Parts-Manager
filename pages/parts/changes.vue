<template>
  <div class="min-h-screen bg-gray-100 flex flex-col">
    <!-- Include Header Layout -->
    <HeaderLayout />

    <!-- Main Content -->
    <main class="flex-1 container mx-auto px-4 py-6">
      <h2 class="text-xl font-bold mb-4">Änderungsprotokoll</h2>
      <div class="overflow-x-auto">
        <table class="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead class="bg-gray-800 text-white">
            <tr>
              <th class="px-4 py-2 text-left">Wer</th>
              <th class="px-4 py-2 text-left">Wann</th>
              <th class="px-4 py-2 text-left">Vorherige Änderung</th>
              <th class="px-4 py-2 text-left">Nach Änderung</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="change in changes" :key="change.id" class="border-b hover:bg-gray-100">
              <td class="px-4 py-2">{{ change.who }}</td>
              <td class="px-4 py-2">{{ change.when }}</td>
              <td class="px-4 py-2">{{ change.before_change }}</td>
              <td class="px-4 py-2">{{ change.after_change }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </main>

    <!-- Include Footer Layout -->
    <FooterLayout />
  </div>
</template>

<script>
import axios from 'axios';
import HeaderLayout from '../layouts/admin/HeaderLayout.vue';
import FooterLayout from '../layouts/admin/FooterLayout.vue';

export default {
  name: 'ChangeLog',
  components: {
    HeaderLayout,
    FooterLayout
  },
  data() {
    return {
      changes: []
    };
  },
  mounted() {
    this.fetchChanges();
  },
  methods: {
    async fetchChanges() {
      try {
        const response = await axios.get('http://localhost:1337/changes');
        this.changes = response.data;
      } catch (error) {
        console.error('Error fetching changes:', error);
      }
    }
  }
};
</script>

<style scoped>
/* Add any additional styles here */
</style>
