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

<script setup>
import { usePartsStore } from '@/stores/partsStore';
import { computed, ref } from 'vue';

const partsStore = usePartsStore();
const isExpanded = ref(false);

const displayedParts = computed(() => {
  const parts = partsStore.lowQuantityParts;
  return isExpanded.value ? parts : parts.slice(0, 6);
});

function toggleExpand() {
  isExpanded.value = !isExpanded.value;
}
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
