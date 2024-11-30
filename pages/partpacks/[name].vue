<template>
  <div class="min-h-screen bg-gray-100 p-8">
    <div class="grid grid-cols-1 md:grid-cols-[1fr_2fr_2fr] gap-6">
      <!-- Linker Container: Partpack-Informationen -->
      <div class="bg-white shadow-lg rounded-lg p-6" style="height: 380px;">
        <h2 class="text-xl font-bold text-gray-800 mb-4">Partpack-Details</h2>
        <div v-if="partpack" class="space-y-2">
          <div class="flex justify-between">
            <span class="font-medium text-gray-700">Partpack:</span>
            <span class="text-gray-900">{{ partpack.name }}</span>
          </div>
          <div class="flex justify-between">
            <span class="font-medium text-gray-700">Erstellt am:</span>
            <span class="text-gray-900">{{ formattedCreatedAt }}</span>
          </div>
          <div class="flex justify-between">
            <span class="font-medium text-gray-700">Ersatzteilmenge:</span>
            <span class="text-gray-900">{{ partpack.partsCount }}</span>
          </div>
          <div class="flex justify-between">
            <span class="font-medium text-gray-700">Partpack-Wert:</span>
            <span class="text-gray-900">{{ partpack.Partpack_worth }} EUR</span>
          </div>
          <div class="flex justify-between">
            <span class="font-medium text-gray-700">Updated am:</span>
            <span class="text-gray-900">{{ formattedUpdatedAt }}</span>
          </div>
          <div class="flex justify-between">
            <span class="font-medium text-gray-700">Status</span>
            <span class="text-gray-900">{{ partpack.status }}</span>
          </div>
        </div>
        <p v-else class="text-red-500 font-semibold">Partpack nicht gefunden.</p>
      </div>

      <!-- Mittlerer Container: Alle Teile im Lager -->
      <div class="bg-white shadow-lg rounded-lg p-6 h-full container-height">
        <h2 class="text-xl font-bold text-gray-800 mb-4">Teile im Lager</h2>
        <PartsList 
          :parts="allParts" 
          @add-part-to-partpack="handleAddPartToPartpack" 
          @update-instock="handleUpdateInstock" 
        />
      </div>

      <!-- Rechter Container: Teile im Partpack -->
      <div class="bg-white shadow-lg rounded-lg p-6 h-full container-height">
        <h2 class="text-xl font-bold text-gray-800 mb-4">Items im Partpack</h2>
        <ul v-if="partpack?.items && partpack.items.length > 0" class="space-y-2">
          <li v-for="item in partpack.items" :key="item.id" class="flex justify-between items-center bg-gray-50 p-4 rounded-lg shadow-sm hover:bg-gray-100 transition">
            <div class="flex flex-col">
              <span class="text-gray-700 font-semibold">{{ item.partnumber }}</span>
              <span class="text-gray-500 text-sm">{{ item.description }}</span>
            </div>
            <div class="flex items-center">
              <span class="text-gray-900 font-bold mr-4">Menge: {{ item.quantity }}</span>
              <button @click="removePartFromPartpack(item)" class="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition">Entfernen</button>
            </div>
          </li>
        </ul>
        <p v-else class="text-gray-600">Keine Items in diesem Partpack vorhanden.</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import { usePartpackStore } from '../stores/partpackStore';
import { usePartsStore } from '../stores/partsStore';
import PartsList from '../components/parts/PartsList.vue';

const route = useRoute();
const partpackStore = usePartpackStore();
const partsStore = usePartsStore();
const partpack = ref(null);
const allParts = ref([]);

onMounted(async () => {
  const partpackName = route.params.name;
  partpack.value = partpackStore.partpacks.find(p => p.name === partpackName);
  
  await partsStore.fetchAllItems();
  allParts.value = partsStore.parts;

  // Optional: Wenn die Items im Partpack nicht geladen sind, können Sie sie hier setzen
  if (partpack.value) {
    partpack.value.items = partpack.value.items || []; // Stellen Sie sicher, dass items existiert
  }
});

function handleAddPartToPartpack({ part, quantity }) {
  if (partpack.value) {
    partpackStore.addItemToPartpack(partpack.value.name, { part, quantity });
  }
}

function handleUpdateInstock({ partId, quantity }) {
  const part = partsStore.parts.find(p => p.id === partId);
  if (part) {
    part.instock = Math.max(0, part.instock - quantity);
  }
}

function removePartFromPartpack(item) {
  if (partpack.value) {
    partpackStore.removeItemFromPartpack(partpack.value.name, item.id);
    const part = partsStore.parts.find(p => p.id === item.id);
    if (part) {
      part.instock += item.quantity; // Restore the quantity to instock
    }
  }
}

const formattedCreatedAt = computed(() => {
  if (!partpack.value.created_at) return '';
  const date = new Date(partpack.value.created_at);
  return date.toLocaleDateString(); // Formatiert das Datum in das lokale Datumsformat
});

const formattedUpdatedAt = computed(() => {
  if (!partpack.value.updated_at) return '';
  const date = new Date(partpack.value.updated_at);
  return date.toLocaleDateString(); // Formatiert das Datum in das lokale Datumsformat
});
</script>

<style scoped>
/* Additional styles for better aesthetics */
.container-height {
  height: 680px; /* Or another desired height */
}

ul {
  list-style-type: none; /* Remove default list styling */
  padding: 0; /* Remove default padding */
}

li {
  border: 1px solid #e5e7eb; /* Light border for separation */
  margin-bottom: 8px; /* Space between items */
}

li:hover {
  background-color: #f3f4f6; /* Slightly darker background on hover */
}

.text-gray-700 {
  color: #374151; /* Darker gray for better contrast */
}

.text-gray-500 {
  color: #6b7280; /* Medium gray for descriptions */
}

.text-gray-900 {
  color: #111827; /* Darkest gray for emphasis */
}
</style>
