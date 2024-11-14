<template>
  <NuxtLayout>
    <div class="h-screen bg-gray-100 flex flex-col">

      <!-- Main Content -->
      <main class="flex-1 container mx-auto px-4 py-6">
        <div class="flex flex-wrap">
          <!-- TOP Picture Section -->
          <div class="w-full md:w-1/4 p-4">
            <div class="bg-white p-4 shadow-md h-full flex flex-col justify-between">
              <div class="h-48 bg-gray-200 mb-4 border-4 border-gray-600"></div>
            </div>
          </div>

          <!-- TOP -->
          <div class="w-full md:w-3/4 p-4">
            <div class="bg-white p-4 shadow-md h-full flex">
              <div class="w-1/2 p-2">
                <h3><b><u>Part Info</u></b></h3>
                <div class="my-3"></div>
                <div v-if="part">
                  <div class="mb-2">ID: {{ part.id }}</div>
                  <div class="mb-2">Partnumber: {{ part.Partnumber }}</div>
                  <div class="mb-2">Beschreibung: {{ part.Beschreibung }}</div>
                </div>
                <div v-else>
                  <div>Loading...</div>
                </div>
              </div>
              <div class="w-px bg-gray-400"></div>
              <div class="w-1/2 p-2">
                <h3><b><u>Part Prices</u></b></h3>
                <div class="my-3"></div>
                <div class="h-6 bg-gray-300 mb-2 border-4 border-gray-600"></div>
                <div class="h-6 bg-gray-300 mb-2 border-4 border-gray-600"></div>
                <div class="h-6 bg-gray-300 border-4 border-gray-600"></div>
              </div>
              <div class="w-px bg-gray-400"></div>
              <div class="w-1/2 p-2">
                <h3><b><u>Part Filler</u></b></h3>
                <div class="my-3"></div>
                <div class="h-6 bg-gray-300 mb-2 border-4 border-gray-600"></div>
                <div class="h-6 bg-gray-300 mb-2 border-4 border-gray-600"></div>
                <div class="h-6 bg-gray-300 border-4 border-gray-600"></div>
              </div>
            </div>
          </div>
        </div> 
        <div class="my-10"></div>

        <!-- Bottom Section -->
        <div class="w-full p-4">
          <div class="bg-white p-4 shadow-md">
            <div class="flex">
              <div class="w-1/3 h-48 bg-gray-200 mr-2 border-4 border-gray-600"></div>
              <div class="w-1/3 h-48 bg-gray-200 mx-2 border-4 border-gray-600"></div>
              <div class="w-1/3 h-48 bg-gray-200 ml-2 border-4 border-gray-600"></div>
              <div class="w-1/3 h-48 bg-gray-200 ml-2 border-4 border-gray-600"></div>
            </div>
          </div>
        </div>
      </main>

    </div>
  </NuxtLayout>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      part: null
    };
  },
  created() {
    const partId = parseInt(this.$route.params.id, 10);
    if (!isNaN(partId)) {
      this.fetchPartDetails(partId);
    } else {
      console.error('Invalid Part ID:', this.$route.params.id);
    }
  },
  methods: {
    async fetchPartDetails(id) {
      try {
        const response = await axios.get(`http://localhost:1337/items/${id}`);
        this.part = response.data;
      } catch (error) {
        console.error('Error fetching part details:', error);
      }
    }
  }
};
</script>

<style scoped>
/* Add any additional styles here */
</style>