<template>
  <div class="bg-white p-6 rounded shadow-md mt-6">
    <h3 class="text-lg font-bold mb-2">Parts with Low Quantity</h3>
    <div class="overflow-y-auto" style="max-height: 400px;">
      <table class="min-w-full border-collapse border border-gray-300">
        <thead>
          <tr class="bg-gray-800 text-white">
            <th class="border border-gray-300 p-2">Part Number</th>
            <th class="border border-gray-300 p-2">Description</th>
            <th class="border border-gray-300 p-2">Verfügbar</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="part in partsStore.lowQuantityParts" :key="part.id" class="border border-gray-300 hover:bg-gray-50">
            <td class="border border-gray-300 p-2">{{ part.partnumber }}</td>
            <td class="border border-gray-300 p-2">{{ part.description }}</td>
            <td class="border border-gray-300 p-2">{{ part.instock }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { usePartsStore } from '@/stores/partsStore';

const partsStore = usePartsStore();
</script>

<style scoped>
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
