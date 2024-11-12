<template>
  <transition name="fade">
    <div v-if="visible" class="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center" @click.self="close">
      <div class="bg-white rounded-lg shadow-lg w-4/5 max-w-4xl relative">
        <!-- Header Section -->
        <div class="bg-gray-800 text-white p-4 rounded-t-lg flex justify-between items-center">
          <h2 class="text-2xl font-bold">Ersatzteil Details</h2>
          <button @click="close" class="text-white text-3xl font-bold">×</button>
        </div>
        <!-- Content Section -->
        <div class="p-8 flex space-x-8">
          <!-- Left Section: Part Information -->
          <div class="flex-1 space-y-4">
            <div>
              <label class="block text-gray-700">Ersatzteil:</label>
              <input v-model="editablePart.partnumber" class="w-full p-2 border rounded" type="text" />
            </div>
            <div>
              <label class="block text-gray-700">Verfügbar:</label>
              <input v-model.number="editablePart.instock" class="w-full p-2 border rounded" type="number" />
            </div>
            <div>
              <label class="block text-gray-700">Beschreibung:</label>
              <textarea v-model="editablePart.description" class="w-full p-2 border rounded" rows="3"></textarea>
            </div>
            <div class="flex space-x-4">
              <div class="flex-1">
                <label class="block text-gray-700">Reihe:</label>
                <input v-model="editablePart.reihe" class="w-full p-2 border rounded" type="text" />
              </div>
              <div class="flex-1">
                <label class="block text-gray-700">Regal:</label>
                <input v-model="editablePart.regal" class="w-full p-2 border rounded" type="text" />
              </div>
              <div class="flex-1">
                <label class="block text-gray-700">Fach:</label>
                <input v-model="editablePart.fach" class="w-full p-2 border rounded" type="text" />
              </div>
            </div>
            <div>
              <label class="block text-gray-700">Kategorie:</label>
              <select v-model="editablePart.category_id" class="w-full p-2 border rounded" required>
                <option value="" disabled>Wähle eine Kategorie</option>
                <option v-for="category in categories" :key="category.id" :value="category.id">
                  {{ category.name }}
                </option>
              </select>
            </div>
          </div>
          <!-- Right Section: Prices -->
          <div class="flex-1 space-y-4">
            <div>
              <label class="block text-gray-700">Einkaufs Preis (€):</label>
              <input v-model.number="editablePart.buying_price_eur" class="w-full p-2 border rounded" type="number" step="0.01" />
            </div>
            <div>
              <label class="block text-gray-700">Listen Preis (€):</label>
              <input v-model.number="editablePart.selling_price_eur" class="w-full p-2 border rounded" type="number" step="0.01" />
            </div>
            <div>
              <label class="block text-gray-700">Walter Preis (€):</label>
              <input v-model.number="editablePart.walter_price_eur" class="w-full p-2 border rounded" type="number" step="0.01" />
            </div>
          </div>
        </div>
        <!-- Save Button -->
        <form @submit.prevent="saveChanges" class="flex space-x-8">
          <div class="absolute bottom-4 right-4">
            <button type="submit" class="bg-gray-800 hover:bg-green-600 text-white px-6 py-2 rounded-lg transition duration-300">
              Speichern
            </button>
          </div>
        </form>
      </div>
    </div>
  </transition>
</template>

<script>
import { usePartsStore } from '../stores/partsStore'; // Importiere den Teile-Store

export default {
  props: {
    part: Object,
    categories: {
      type: Array,
      default: () => [] // Setze einen Standardwert
    },
    visible: Boolean // Definiere visible als Prop
  },
  data() {
    return {
      editablePart: { 
        ...this.part,
        category_id: this.part.category_id || (this.categories && this.categories.length > 0 ? this.categories[0].id : '') // Initialisiere category_id
      }
    };
  },
  methods: {
    async saveChanges() {
      try {
        const partsStore = usePartsStore(); // Greife auf den Teile-Store zu

        // Stelle sicher, dass category_id gesetzt ist
        if (!this.editablePart.category_id) {
          throw new Error('category_id is not set');
        }

        // Rufe die Store-Aktion auf, um die Datenbank und den Store zu aktualisieren
        await partsStore.updatePartInDatabase(this.editablePart);
        
        this.$emit('update', this.editablePart);
        this.close();
      } catch (error) {
        
      }
    },
    close() {
      this.$emit('close');
    }
  }
};
</script>

<style scoped>
</style>
