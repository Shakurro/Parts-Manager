<template>
  <div class="part-details bg-gray-100 min-h-screen py-8">
    <div v-if="part" class="container mx-auto px-4">
      <!-- Verbesserter Zurück-Button -->
      <div class="mb-6">
        <button
          @click="$router.back()"
          class="bg-white shadow-md rounded-lg px-6 py-3 flex items-center hover:bg-gray-50 transition-colors duration-200"
        >
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          <span class="font-medium">Zurück zur Teileliste</span>
        </button>
      </div>

      <!-- Hauptinhalt mit angepasster Größe -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <!-- Bildbereich (kleiner skaliert) -->
        <div class="lg:col-span-3 bg-white rounded-lg shadow p-4">
          <div class="aspect-square bg-gray-200 rounded-lg flex items-center justify-center mb-3">
            <img 
              v-if="part.image" 
              :src="part.image" 
              :alt="part.name"
              class="max-w-full max-h-full object-contain"
            >
            <span v-else class="text-gray-400">
              Kein Bild verfügbar
            </span>
          </div>
          <button class="w-full bg-gray-800 text-white py-2 px-4 rounded hover:bg-gray-700 text-sm">
            Bild hochladen
          </button>
        </div>

        <!-- Basis Informationen (unverändert) -->
        <div class="lg:col-span-4 bg-white rounded-lg shadow p-6">
          <div class="flex justify-between items-center mb-4">
            <h1 class="text-2xl font-bold">{{ part.name }}</h1>
            <div class="flex items-center">
              <span class="mr-2 text-sm text-gray-600">Bearbeiten</span>
              <button 
                @click="isEditing = !isEditing" 
                class="relative inline-flex h-6 w-11 items-center rounded-full"
                :class="isEditing ? 'bg-blue-600' : 'bg-gray-200'"
              >
                <span 
                  class="inline-block h-4 w-4 transform rounded-full bg-white transition"
                  :class="isEditing ? 'translate-x-6' : 'translate-x-1'"
                />
              </button>
            </div>
          </div>
          <div class="space-y-3">
            <div class="flex justify-between border-b pb-2">
              <span class="text-gray-600">Artikelnummer:</span>
              <div v-if="isEditing">
                <input 
                  v-model="editedPart.partnumber" 
                  class="border rounded px-2 py-1 w-32 text-right"
                >
              </div>
              <span v-else class="font-medium">{{ part.partnumber }}</span>
            </div>
            <div class="flex justify-between border-b pb-2">
              <span class="text-gray-600">Kategorie:</span>
              <div v-if="isEditing">
                <select 
                  v-model="editedPart.category" 
                  class="border rounded px-2 py-1"
                >
                  <option v-for="(name, id) in categoryMap" :key="id" :value="Number(id)">
                    {{ name }}
                  </option>
                </select>
              </div>
              <span v-else class="font-medium">
                <CategoryName :category-id="part.category || 0" />
              </span>
            </div>
            <div class="flex justify-between border-b pb-2">
              <span class="text-gray-600">Lagerbestand:</span>
              <div v-if="isEditing">
                <input 
                  v-model.number="editedPart.instock" 
                  type="number"
                  class="border rounded px-2 py-1 w-20 text-right"
                >
              </div>
              <span v-else class="font-medium">{{ part.instock }} Stück</span>
            </div>
            <div class="flex justify-between border-b pb-2">
              <span class="text-gray-600">Lagerort:</span>
              <div v-if="isEditing" class="flex gap-2">
                <input v-model="editedPart.reihe" class="border rounded px-2 py-1 w-16" placeholder="Reihe">
                <input v-model="editedPart.regal" class="border rounded px-2 py-1 w-16" placeholder="Regal">
                <input v-model="editedPart.fach" class="border rounded px-2 py-1 w-16" placeholder="Fach">
              </div>
              <span v-else class="font-medium">
                Reihe {{ part.reihe }}, Regal {{ part.regal }}, Fach {{ part.fach }}
              </span>
            </div>
          </div>
          <div class="mt-4">
            <h3 class="font-semibold mb-2">Beschreibung:</h3>
            <div v-if="isEditing">
              <textarea 
                v-model="editedPart.description" 
                class="w-full border rounded p-2"
                rows="3"
              ></textarea>
            </div>
            <p v-else class="text-gray-600">{{ part.description }}</p>
          </div>
          
          <div v-if="isEditing" class="mt-4 flex justify-end gap-2">
            <button 
              @click="cancelEdit" 
              class="px-4 py-2 border rounded hover:bg-gray-50"
            >
              Abbrechen
            </button>
            <button 
              @click="saveChanges" 
              class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Speichern
            </button>
          </div>
        </div>

        <!-- Erweiterte Preisinformationen -->
        <div class="lg:col-span-5 bg-white rounded-lg shadow p-6">
          <h2 class="text-xl font-bold mb-4">Preisinformationen</h2>
          
          <!-- Verkaufspreise -->
          <div class="mb-6">
            <h3 class="text-lg font-semibold mb-3">Verkaufspreise</h3>
            <div class="space-y-3">
              <div class="bg-green-50 p-4 rounded-lg">
                <div class="flex justify-between items-center mb-1">
                  <span class="font-medium">Standardpreis</span>
                  <div v-if="isEditing">
                    <input 
                      v-model.number="editedPart.price" 
                      type="number"
                      step="0.01"
                      class="border rounded px-2 py-1 w-32 text-right bg-white"
                    >
                    <span class="ml-1">€</span>
                  </div>
                  <span v-else class="text-lg font-semibold text-green-800">{{ part.selling_price_eur}}€</span>
                </div>
              </div>
              <div class="bg-blue-50 p-4 rounded-lg">
                <div class="flex justify-between items-center mb-1">
                  <div class="flex items-center">
                    <span class="font-medium">Großkundenpreis</span>
                    <span class="text-sm text-gray-500 ml-2">(10% Rabatt)</span>
                  </div>
                  <span class="text-lg font-semibold text-blue-800">{{ (part.selling_price_eur * 0.9).toFixed(2) }}€</span>
                </div>
              </div>
              <div class="bg-purple-50 p-4 rounded-lg">
                <div class="flex justify-between items-center mb-1">
                  <div class="flex items-center">
                    <span class="font-medium">Händlerpreis</span>
                    <span class="text-sm text-gray-500 ml-2">(15% Rabatt)</span>
                  </div>
                  <span class="text-lg font-semibold text-purple-800">{{ (part.selling_price_eur * 0.85).toFixed(2) }}€</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Einkaufspreise -->
          <div class="mt-6">
            <h3 class="text-lg font-semibold mb-3">Einkaufspreise</h3>
            <div class="space-y-3">
              <div 
                v-for="(supplier, index) in editedSuppliers" 
                :key="supplier.id"
                :class="[
                  'p-4 rounded-lg border transition-colors duration-200',
                  supplier.preferred ? 'bg-yellow-50 border-yellow-200' : 'bg-gray-50 border-gray-200'
                ]"
              >
                <div class="flex justify-between items-center">
                  <div>
                    <div v-if="isEditing" class="flex items-center gap-2">
                      <input 
                        v-model="supplier.name"
                        class="border rounded px-2 py-1 bg-white"
                        placeholder="Lieferantenname"
                      >
                    </div>
                    <div v-else>
                      <span class="font-medium">{{ supplier.name }}</span>
                      <span v-if="supplier.preferred" class="ml-2 text-yellow-600 text-sm">(Bevorzugt)</span>
                    </div>
                  </div>
                  <div v-if="isEditing" class="flex items-center gap-2">
                    <input 
                      v-model.number="supplier.price"
                      type="number"
                      step="0.01"
                      class="border rounded px-2 py-1 w-24 text-right bg-white"
                    >
                    <span>€</span>
                  </div>
                  <span v-else class="text-lg font-semibold">{{ supplier.price }}€</span>
                </div>
                <div class="mt-2 flex justify-between items-center text-sm text-gray-600">
                  <div v-if="isEditing" class="flex items-center gap-2">
                    <input 
                      v-model="supplier.lastOrder"
                      type="date"
                      class="border rounded px-2 py-1 bg-white"
                    >
                    <button 
                      v-if="suppliers.length > 1"
                      @click="removeSupplier(index)" 
                      class="text-red-600 hover:text-red-800"
                    >
                      Entfernen
                    </button>
                  </div>
                  <span v-else>Letzte Bestellung: {{ supplier.lastOrder }}</span>
                  <button 
                    @click="togglePreferredSupplier(supplier.id)"
                    class="text-blue-600 hover:text-blue-800"
                  >
                    {{ supplier.preferred ? 'Bevorzugt entfernen' : 'Als bevorzugt markieren' }}
                  </button>
                </div>
              </div>
              
              <!-- Neuen Lieferanten hinzufügen -->
              <button 
                v-if="isEditing"
                @click="addNewSupplier"
                class="w-full py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-gray-400 hover:text-gray-700"
              >
                + Neuen Lieferanten hinzufügen
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Fehlermeldung wenn Teil nicht gefunden -->
    <div v-else class="container mx-auto px-4">
      <div class="bg-red-50 text-red-800 p-4 rounded-lg text-center">
        <h2 class="text-xl font-bold mb-2">Ersatzteil nicht gefunden</h2>
        <p class="text-red-600">Das gesuchte Ersatzteil konnte nicht gefunden werden.</p>
        <button
          @click="$router.back()"
          class="mt-4 bg-red-800 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Zurück zur Liste
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import { usePartsStore } from '@/stores/partsStore'
import CategoryName from '../components/parts/categorys.vue';

const route = useRoute()
const partsStore = usePartsStore()
const partnumber = route.params.partnumber
const isEditing = ref(false)

// Beispiel-Lieferantendaten zuerst definieren
const suppliers = ref([
  {
    id: 1,
    name: 'Hauptlieferant GmbH',
    price: 75.00,
    lastOrder: '15.03.2024',
    preferred: true
  },
  {
    id: 2,
    name: 'Ersatzteile AG',
    price: 82.50,
    lastOrder: '02.03.2024',
    preferred: false
  },
  {
    id: 3,
    name: 'Teile Direct',
    price: 79.99,
    lastOrder: '10.03.2024',
    preferred: false
  }
])

// Dann erst editedSuppliers definieren
const editedSuppliers = ref([...suppliers.value])

// Computed property für das Teil
const part = computed(() => {
  return partsStore.parts.find(p => p.partnumber === partnumber)
})

// Initialisiere editedPart basierend auf part
const editedPart = ref({...part.value})

// Methoden für das Bearbeiten
const startEditing = () => {
  isEditing.value = true
  editedPart.value = { ...part.value }
}

const saveChanges = () => {
  // Hier die Änderungen speichern
  isEditing.value = false
}

const cancelEditing = () => {
  isEditing.value = false
  editedPart.value = { ...part.value }
}

function addNewSupplier() {
  editedSuppliers.value.push({
    id: Date.now(), // Temporäre ID
    name: '',
    price: 0,
    lastOrder: new Date().toISOString().split('T')[0],
    preferred: false
  })
}

function removeSupplier(index) {
  editedSuppliers.value.splice(index, 1)
}

function togglePreferredSupplier(supplierId) {
  const supplier = editedSuppliers.value.find(s => s.id === supplierId)
  if (supplier) {
    supplier.preferred = !supplier.preferred
  }
}

</script>
