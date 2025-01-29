<template>
  <div class="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center transition-opacity duration-300">
    <div class="relative bg-white rounded-lg shadow-lg max-w-lg w-full mx-4">
      <!-- Modal Header -->
      <div class="flex items-center justify-between p-5 border-b border-gray-200">
        <h3 class="text-2xl font-semibold text-gray-800">Neuer Wareneingang</h3>
        <button @click="$emit('close')" class="text-gray-500 hover:text-gray-700 transition-colors duration-200">
          <i class="fas fa-times"></i>
        </button>
      </div>

      <!-- Modal Body -->
      <div class="p-6">
        <form @submit.prevent="handleSubmit">
          <div class="space-y-5">
            <div>
              <label class="block text-sm font-medium text-gray-600">Artikelnummer</label>
              <input
                v-model="form.partnumber"
                @blur="fetchPartDescription"
                type="text"
                required
                class="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
              <button type="button" @click="openScanner" class="mt-2 text-indigo-600 hover:underline">
                Barcode scannen
              </button>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-600">Artikelname</label>
              <input
                v-model="form.description"
                type="text"
                required
                readonly
                class="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-600">Lieferant</label>
              <select
                v-model="form.vendor"
                required
                class="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              >
                <option value="">Bitte wählen</option>
                <option value="Europart">Europart</option>
                <option value="Krone">Krone</option>
                <option value="Schmitz">Schmitz</option>
                <option value="Winkler">Winkler</option>
                <option value="Würth">Würth</option>
                <option value="Saxas">Saxas</option>
              </select>
            </div>

            <div class="mt-4">
              <label class="block text-sm font-medium text-gray-600">Menge</label>
              <div class="flex items-center">
                <button 
                  type="button"
                  @click="decrementQuantity" 
                  :disabled="isSaveButtonDisabled || form.quantity <= 1"
                  :class="{'bg-gray-400 cursor-not-allowed': isSaveButtonDisabled || form.quantity <= 1, 'bg-gray-800 text-white hover:bg-gray-700': !(isSaveButtonDisabled || form.quantity <= 1)}"
                  class="w-8 h-8 flex items-center justify-center rounded-full transition-colors duration-200"
                >
                  -
                </button>
                <input
                  v-model.number="form.quantity"
                  type="number"
                  min="1"
                  required
                  :disabled="isSaveButtonDisabled"
                  class="w-16 text-center border-t border-b border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                />
                <button 
                  type="button"
                  @click="incrementQuantity" 
                  :disabled="isSaveButtonDisabled"
                  :class="{'bg-gray-400 cursor-not-allowed': isSaveButtonDisabled, 'bg-gray-800 text-white hover:bg-gray-700': !isSaveButtonDisabled}"
                  class="w-8 h-8 flex items-center justify-center rounded-full transition-colors duration-200"
                >
                  +
                </button>
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-600">Eingangsdatum</label>
              <span class="mt-2 block w-full rounded-md border-gray-300 shadow-sm bg-gray-100 p-2">
                {{ form.date }}
              </span>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-600">Manager</label>
              <span class="mt-2 block w-full rounded-md border-gray-300 shadow-sm bg-gray-100 p-2">
                {{ fullName }}
              </span>
            </div>
          </div>

          <!-- Modal Footer -->
          <div class="mt-6 flex justify-end space-x-4">
            <button
              type="button"
              @click="$emit('close')"
              class="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors duration-200"
            >
              Abbrechen
            </button>
            <button
              type="submit"
              :disabled="isSaveButtonDisabled"
              :class="{'bg-gray-400 cursor-not-allowed': isSaveButtonDisabled, 'bg-gray-800 hover:bg-green-600': !isSaveButtonDisabled}"
              class="px-4 py-2 text-white rounded-md transition-colors duration-200"
            >
              Speichern
            </button>
          </div>
        </form>
      </div>
    </div>

    <BarcodeScanner 
      v-if="isScannerOpen" 
      @scanned="handleScanned" 
      @close="isScannerOpen = false" 
    />
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue';
import { userStore } from '@/stores/userStore';
import BarcodeScanner from '~/components/entry/BarcodeScanner.vue';
import { usePartsStore } from '@/stores/partsStore';

export default {
  components: {
    BarcodeScanner
  },
  setup() {
    const form = ref({
      partnumber: '',
      description: '',
      vendor: '',
      manager: '',
      quantity: 1,
      date: new Date().toISOString().split('T')[0]
    });

    const fullName = computed(() => {
      const { first_name, second_name } = userStore.userData || {};
      return `${first_name || ''} ${second_name || ''}`.trim();
    });

    const isScannerOpen = ref(false);

    const handleSubmit = async () => {
      try {
        const payload = {
          partnumber: form.value.partnumber || null,
          description: form.value.description || "",
          vendor: form.value.vendor || "",
          importdate: form.value.importdate || "",
          manager: form.value.manager || "",
          quantity: form.value.quantity || null,
          item: form.value.item || null
        };

        console.log('Sending data:', payload);

        const response = await fetch('/api/partsentries', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(payload)
        });

        const data = await response.json();
        console.log('Server response:', data);

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        console.log('Entry successfully added:', data);

        form.value = {
          partnumber: '',
          description: '',
          vendor: '',
          manager: fullName,
          quantity: 1
        };

        // Optionally close the modal
        // $emit('close');
      } catch (error) {
        console.error('Error adding entry:', error);
      }
    };

    const openScanner = () => {
      isScannerOpen.value = true;
    };

    const handleScanned = (barcode) => {
      console.log('Scanned Barcode:', barcode);
      form.value.partnumber = barcode;
      fetchPartDescription();
      isScannerOpen.value = false;
    };

    const fetchPartDescription = async () => {
      const partsStore = usePartsStore();
      const partNumber = form.value.partnumber;

      if (partNumber) {
        const part = partsStore.parts.find(item => item.partnumber === partNumber);
        if (part) {
          form.value.description = part.description;
        } else {
          form.value.description = 'Unbekannt';
        }
      }
    };

    const fetchPartsEntries = async () => {
      const partsStore = usePartsStore();
      await partsStore.fetchAllItems();
    };

    const isSaveButtonDisabled = computed(() => {
      return !form.value.description || form.value.description === 'Unbekannt' || form.value.vendor === '';
    });

    const incrementQuantity = () => {
      form.value.quantity += 1;
    };

    const decrementQuantity = () => {
      if (form.value.quantity > 1) {
        form.value.quantity -= 1;
      }
    };

    onMounted(() => {
      fetchPartsEntries();
      fetchPartDescription();
    });

    return {
      form,
      fullName,
      handleSubmit,
      isScannerOpen,
      openScanner,
      handleScanned,
      fetchPartDescription,
      isSaveButtonDisabled,
      incrementQuantity,
      decrementQuantity
    };
  }
}
</script>

<style scoped>
/* Füge hier deine Styles hinzu, falls nötig */
</style>