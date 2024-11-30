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
            <span class="font-medium text-gray-700">Ersatzteilmenge:</span>
            <span class="text-gray-900">{{ partpack.partsCount }}</span>
          </div>
          <div class="flex justify-between">
            <span class="font-medium text-gray-700">Partpack-Wert:</span>
            <span class="text-gray-900">{{ partpack.Partpack_worth }} EUR</span>
          </div>
          <div class="flex justify-between">
            <span class="font-medium text-gray-700">Partpack-Status:</span>
            <span class="text-gray-900">{{ partpack.status }}</span>
          </div>
        </div>
        <p v-else class="text-red-500 font-semibold">Partpack nicht gefunden.</p>
      </div>

      <!-- Mittlerer Container: Alle Teile im Lager -->
      <div class="bg-white shadow-lg rounded-lg p-6 h-full container-height">
        <h2 class="text-xl font-bold text-gray-800 mb-4">Teile im Lager</h2>
        <PartsList :parts="allParts" />
      </div>

      <!-- Rechter Container: Teile im Partpack -->
      <div class="bg-white shadow-lg rounded-lg p-6 h-full container-height">
        <h2 class="text-xl font-bold text-gray-800 mb-4">Items im Partpack</h2>
        <ul v-if="partpack?.items && partpack.items.length > 0" class="space-y-2">
          <li v-for="item in partpack.items" :key="item.id" class="flex justify-between">
            <span class="text-gray-700">{{ item.partnumber }}</span>
            <span class="text-gray-900">{{ item.description }}</span>
          </li>
        </ul>
        <p v-else class="text-gray-600">Keine Items in diesem Partpack vorhanden.</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
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
</script>

<style>
/* In Ihrer CSS-Datei oder im <style> Block */
.container-height {
  height: 680px; /* Oder eine andere gewünschte Höhe */
}
</style>
