<template>
  <div class="bg-white p-6 rounded shadow-md mt-6">
    <h3 class="text-lg font-bold mb-2">Parts with Low Quantity</h3>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div v-for="part in displayedParts" :key="part.id" class="border rounded p-4 shadow-sm">
        <h4 class="font-semibold">{{ part.partnumber }}</h4>
        <p class="text-gray-600">{{ part.description }}</p>
        <p class="text-gray-800">Verfügbar: {{ part.instock }}</p>
      </div>
    </div>
    <button @click="toggleExpand" class="mt-4 bg-gray-700 text-white py-2 px-4 rounded hover:bg-green-600 transition duration-200">
      {{ isExpanded ? 'Show Less' : 'Show More' }}
    </button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      lowQuantityParts: [],
      isExpanded: false
    };
  },
  computed: {
    displayedParts() {
      return this.isExpanded ? this.lowQuantityParts : this.lowQuantityParts.slice(0, 6);
    }
  },
  mounted() {
    this.fetchLowQuantityParts();
  },
  methods: {
    async fetchLowQuantityParts() {
      try {
        let allParts = [];
        let page = 0;
        const pageSize = 100; // Fetch 100 items per request

        while (true) {
          const response = await fetch(`http://localhost:1337/items?_start=${page * pageSize}&_limit=${pageSize}`);
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();
          console.log(`Fetched batch ${page + 1}:`, data); // Debugging: Log each batch of fetched parts
          allParts = allParts.concat(data);

          if (data.length < pageSize) {
            break; // Exit loop if fewer items than pageSize are returned
          }

          page++;
        }

        // Filter parts with instock < 3 and selling_price_eur < 30
        this.lowQuantityParts = allParts.filter(part => part.instock < 3 && part.selling_price_eur < 30);
        console.log('Low quantity and low price parts:', this.lowQuantityParts); // Debugging: Log low quantity and low price parts
      } catch (error) {
        console.error('Error fetching parts:', error);
      }
    },
    toggleExpand() {
      this.isExpanded = !this.isExpanded;
    }
  }
};
</script>

<style scoped>
/* Add any additional styles here */
.grid {
  display: grid;
}

.grid-cols-1 {
  grid-template-columns: repeat(1, minmax(0, 1fr));
}

.md\:grid-cols-2 {
  @media (min-width: 768px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

.lg\:grid-cols-3 {
  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

.gap-4 {
  gap: 1rem;
}
</style>
