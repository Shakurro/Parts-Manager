<template>
  <div class="min-h-screen bg-gray-100 flex flex-col">

    <main class="flex-1 container mx-auto px-4 py-6 flex flex-col md:flex-row">
      <aside class="w-full md:w-1/5 bg-white p-4 rounded shadow-md mb-4 md:mb-0 md:mr-4 flex flex-col space-y-4 max-h-[550px] overflow-auto">
        <div>
          <h3 class="text-lg font-bold mb-4">Suche und Scannen</h3>
          <input type="text" placeholder="Suchen..." class="w-full p-2 mb-4 border rounded" v-model="partsStore.searchQuery" />

          <div id="interactive" class="viewport"></div>

          <hr class="border-t border-gray-300 my-4">

          <div class="mb-4">
            <h4 class="text-md font-semibold mb-2">Filter nach Kategorie</h4>
            <div>
              <label class="block text-gray-700" v-for="category in categories" :key="category.id">
                <input type="checkbox" v-model="partsStore.selectedCategories" :value="category.id" class="mr-2" />
                {{ category.name }}
              </label>
            </div>
          </div>

          <div class="mb-4"></div>

          <div class="flex justify-between mb-4">
            <button 
              @click="clearFilters"
              class="bg-gray-800 text-white py-2 px-4 rounded hover:bg-red-800 transition duration-200"
            >
              Filter entfernen
            </button>
          </div>
        </div>
      </aside>

      <div class="w-full md:w-4/5 bg-white p-6 rounded shadow-md">
        <div class="flex justify-between items-center mb-4">
          <button
          @click="$router.back()"
          class="bg-white shadow-md rounded-lg px-6 py-3 flex items-center hover:bg-gray-50 transition-colors duration-200"
        >
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          <span class="font-medium">Zurück</span>
        </button>
          <div class="timer">
           Aktualisierung in: {{ formattedTime }}
          </div>
        </div>
        <div class="overflow-x-auto">
          <table class="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
            <thead class="bg-gray-800 text-white">
              <tr>
                <th class="w-1/12 px-4 py-2 text-left">ID</th>
                <th class="w-2/12 px-4 py-2 text-left">Ersatzteil</th>
                <th class="w-4/12 px-4 py-2 text-left">Beschreibung</th>
                <th class="w-1/12 px-4 py-2 text-left">Verfügbar</th>
                <th class="w-1/12 px-4 py-2 text-left">Reihe</th>
                <th class="w-1/12 px-4 py-2 text-left">Regal</th>
                <th class="w-1/12 px-4 py-2 text-left">Fach</th>
                <th class="w-2/12 px-4 py-2 text-left">Kategorie</th>
              </tr>
            </thead>
            <tbody>
              <tr 
                v-for="part in partsStore.filteredParts" 
                :key="part.id" 
                class="border-b hover:bg-gray-100 cursor-pointer"
                @click="viewPart(part)"
              >
                <td class="px-4 py-2">{{ part.id }}</td>
                <td class="px-4 py-2">{{ part.partnumber }}</td>
                <td class="px-4 py-2">{{ truncateDescription(part.description) }}</td>
                <td class="px-4 py-2">{{ part.instock }}</td>
                <td class="px-4 py-2">{{ part.reihe }}</td>
                <td class="px-4 py-2">{{ part.regal }}</td>
                <td class="px-4 py-2">{{ part.fach }}</td>
                <td class="px-4 py-2">
                  <CategoryName :category-id="part.category || 0" />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </main>

    <NotificationPopup 
      :visible="isNotificationVisible" 
      @close="closeNotification"
    />

    <AddPartPopup 
      :visible="isAddPopupVisible" 
      @close="isAddPopupVisible = false" 
      @add="addPart"
    />
  </div>
</template>

<script setup>
import { usePartsStore } from '@/stores/partsStore';
import { onMounted, onUnmounted, computed, ref } from 'vue';
import NotificationPopup from '../components/parts/NotificationPopup.vue';
import AddPartPopup from '../components/parts/AddPartPopup.vue';
import { useRouter } from 'vue-router';
import CategoryName from '../components/parts/categorys.vue';

const partsStore = usePartsStore();

const isNotificationVisible = ref(false);
const isAddPopupVisible = ref(false);
const updateInterval = 30;
const remainingTime = ref(updateInterval);

const categories = ref([
  { id: 1, name: 'Aufbau' },
  { id: 2, name: 'Rahmen' },
  { id: 3, name: 'Elektrik' },
  { id: 4, name: 'Motor' },
  { id: 5, name: 'Bremse' },
  { id: 6, name: 'Achse' },
  { id: 7, name: 'Betriebsstoffe' },
  { id: 8, name: 'Schrauben' },
  { id: 9, name: 'Ladeboardwand' }
]);

const router = useRouter();

onMounted(() => {
  partsStore.fetchAllItems();

  const intervalId = setInterval(() => {
    partsStore.refreshAllItems();
    remainingTime.value = updateInterval;
  }, updateInterval * 1000);

  const countdown = setInterval(() => {
    if (remainingTime.value > 0) {
      remainingTime.value--;
    }
  }, 1000);

  onUnmounted(() => {
    clearInterval(intervalId);
    clearInterval(countdown);
  });
});

function viewPart(part) {
  router.push(`/store/parts/${part.partnumber}`);
}

function clearFilters() {
  partsStore.updateSearchQuery('');
  partsStore.updateSelectedCategories([]);
}

function updatePart(updatedPart) {
  partsStore.updatePartInDatabase(updatedPart);
}

function closeNotification() {
  isNotificationVisible.value = false;
}

function addPart(newPart) {
  partsStore.addPart(newPart);
  isAddPopupVisible.value = false;
  isNotificationVisible.value = true;
}

function getCategoryName(categoryId) {
  const categoryMap = {
    1: 'Aufbau',
    2: 'Rahmen',
    3: 'Elektrik',
    4: 'Motor',
    5: 'Bremse',
    6: 'Achse',
    7: 'Betriebsstoffe',
    8: 'Schrauben',
    9: 'Ladeboardwand'
  };
  return categoryMap[categoryId] || 'fehlt';
}

function truncateDescription(description) {
  if (description.length > 20) {
    return description.substring(0, 20) + '...';
  }
  return description;
}

const formattedTime = computed(() => {
  const minutes = String(Math.floor(remainingTime.value / 60)).padStart(2, '0');
  const seconds = String(remainingTime.value % 60).padStart(2, '0');
  return `${minutes}:${seconds}`;
});

function startBarcodeScanner() {
  Quagga.init({
    inputStream: {
      type: "LiveStream",
      target: document.querySelector('#interactive'),
      constraints: {
        width: 640,
        height: 480,
        facingMode: "environment" // Rückkamera
      }
    },
    decoder: {
      readers: ["code_128_reader", "ean_reader", "ean_8_reader", "code_39_reader", "code_39_vin_reader", "codabar_reader", "upc_reader", "upc_e_reader"]
    }
  }, (err) => {
    if (err) {
      console.error(err);
      return;
    }
    Quagga.start();
  });

  Quagga.onDetected((result) => {
    const code = result.codeResult.code;
    partsStore.value.searchQuery = code; // Setze den Barcode in die Suchleiste
    Quagga.stop(); // Stoppe den Scanner nach erfolgreicher Erkennung
  });
}
</script>

<style scoped>
.timer {
  font-weight: bold;
}

.table th, .table td {
  padding: 12px;
  text-align: left;
}

.table th {
  background-color: #2d3748;
  color: white;
}

.table tr:nth-child(even) {
  background-color: #f7fafc;
}

.table tr:hover {
  background-color: #edf2f7;
}
</style>