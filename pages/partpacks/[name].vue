<template>
  <div class="min-h-screen bg-gray-100 p-8">
     <button
        @click="$router.back()"
        class="bg-white shadow-md rounded-lg px-6 py-3 flex items-center hover:bg-gray-50 transition-colors duration-200 mb-4"
      >
        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        <span class="font-medium">Zurück</span>
      </button>   
    <div :class="gridClass">
      <!-- Linker Container: Partpack-Informationen -->
      <div v-if="!isWideScreen" class="bg-white shadow-lg rounded-lg p-6" style="height: 380px;">
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
      <div class="bg-white shadow-lg rounded-lg p-6 h-full container-height" style="height: 500px; overflow-y: auto;">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-xl font-bold text-gray-800">Ersatzteile scannen</h2>
          <button @click="openScanner" class="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-900 transition">Scannen</button>
        </div>
        <BarcodeScanner v-if="isScannerOpen" @scanned="handleScannedPart" @close="closeScanner" />
        <ul v-if="scannedParts.length > 0" class="space-y-2 mt-4">
          <li v-for="(part, index) in scannedParts" :key="index" :class="['flex justify-between items-center p-2 rounded-lg shadow-sm hover:bg-gray-100 transition', { 'bg-gray-50': !part.highlight, 'highlight': part.highlight }]">
            <div class="flex-1">
              <span class="text-gray-700 font-semibold">{{ part.partnumber }}</span>
            </div>
            <div class="flex-1">
              <span class="text-gray-500 text-sm">{{ part.description }}</span>
            </div>
            <div class="flex-1">
              <span class="text-gray-500 text-sm">Verfügbar: {{ part.instock }}</span>
            </div>
            <div class="flex-1">
              <input type="number" v-model.number="part.quantity" :max="part.instock" min="1" class="p-1 border rounded w-full" placeholder="Menge" />
            </div>
          </li>
        </ul>
        <button v-if="scannedParts.length > 0" @click="addScannedPartsToPartpack" class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition mt-4">Hinzufügen</button>
      </div>

      <!-- Rechter Container: Teile im Partpack -->
      <div class="bg-white shadow-lg rounded-lg p-6 h-full container-height" style="height: 500px; overflow-y: auto;">
        <h2 class="text-xl font-bold text-gray-800 mb-4">Ersatzteile im Partpack</h2>
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
        <p v-else class="text-gray-600">Keine Ersatzteile in diesem Partpack vorhanden.</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, onUnmounted } from 'vue';
import { useRoute } from 'vue-router';
import { usePartpackStore } from '../stores/partpackStore';
import { usePartsStore } from '../stores/partsStore';
import BarcodeScanner from '../components/entry/BarcodeScanner.vue';

const route = useRoute();
const partpackStore = usePartpackStore();
const partsStore = usePartsStore();
const partpack = ref(null);
const allParts = ref([]);
const isWideScreen = ref(false);
const isScannerOpen = ref(false);
const scannedParts = ref([]);

onMounted(async () => {
  const partpackName = route.params.name;
  partpack.value = partpackStore.partpacks.find(p => p.name === partpackName);
  
  await partsStore.fetchAllItems();
  allParts.value = partsStore.parts;

  // Optional: Wenn die Items im Partpack nicht geladen sind, können Sie sie hier setzen
  if (partpack.value) {
    partpack.value.items = partpack.value.items || []; // Stellen Sie sicher, dass items existiert
  }

  const updateScreenWidth = () => {
    isWideScreen.value = window.innerWidth < 1650;
  };

  updateScreenWidth();
  window.addEventListener('resize', updateScreenWidth);

  // Clean up the event listener when the component is unmounted
  onUnmounted(() => {
    window.removeEventListener('resize', updateScreenWidth);
  });
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

const gridClass = computed(() => {
  return isWideScreen.value 
    ? 'grid grid-cols-1 md:grid-cols-[1fr_1fr] gap-6' // Zwei gleich breite Spalten bei großem Bildschirm
    : 'grid grid-cols-1 md:grid-cols-[1fr_4fr_3fr] gap-6'; // Standardbreite
});

function openScanner() {
  isScannerOpen.value = true;
}

function closeScanner() {
  isScannerOpen.value = false;
}

function handleScannedPart(scannedCode) {
  // Check if the part is already scanned
  const alreadyScannedIndex = scannedParts.value.findIndex(p => p.partnumber === scannedCode);
  if (alreadyScannedIndex !== -1) {
    // Highlight the already scanned part
    scannedParts.value[alreadyScannedIndex].highlight = true;
    setTimeout(() => scannedParts.value[alreadyScannedIndex].highlight = false, 2000); // Remove highlight after 2 seconds
    alert('Dieses Teil wurde bereits gescannt.');
    return;
  }

  // Search for the part by part number
  const part = partsStore.parts.find(p => p.partnumber === scannedCode);
  if (part) {
    // Add the part to the scannedParts list with a default quantity
    scannedParts.value.push({ ...part, quantity: 1, highlight: false });
  } else {
    alert('Teil nicht gefunden.');
  }
}

function addScannedPartsToPartpack() {
  if (partpack.value) {
    scannedParts.value.forEach(part => {
      partpackStore.addItemToPartpack(partpack.value.name, { part, quantity: part.quantity });
    });
    scannedParts.value = [];
  }
}
</script>

<style scoped>
/* Additional styles for better aesthetics */


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

.highlight {
  background-color: #ffeb3b; /* Yellow highlight */
}
</style>
