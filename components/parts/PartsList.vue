<script>
import { ref, computed } from 'vue';

export default {
  name: 'PartsList',
  props: {
    parts: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      searchQuery: '',
      visiblePartsCount: 25,
    };
  },
  computed: {
    filteredParts() {
      return this.parts
        .filter(part => {
          const partNumberMatch = part.partnumber.toLowerCase().includes(this.searchQuery.toLowerCase());
          const descriptionMatch = part.description.toLowerCase().includes(this.searchQuery.toLowerCase());
          return partNumberMatch || descriptionMatch;
        })
        .sort((a, b) => a.id - b.id)
        .slice(0, this.visiblePartsCount);
    },
  },
  methods: {
    addPart(part) {
      console.log(`Hinzufügen: ${part.partnumber}, Menge: ${part.quantity}`);
      this.$emit('add-part-to-partpack', { part, quantity: part.quantity });
      this.$emit('update-instock', { partId: part.id, quantity: part.quantity });
    },
    increaseQuantity(part) {
      part.quantity = (part.quantity || 0) + 1;
    },
    decreaseQuantity(part) {
      if (part.quantity > 0) {
        part.quantity--;
      }
    },
    handleLoad() {
      this.visiblePartsCount += 10;
    },
    scan() {
      console.log('Scannen-Button wurde gedrückt');
    },
    truncateDescription(description) {
      return description.length > 20 ? description.substring(0, 20) + '...' : description;
    },
    checkQuantity(part) {
      if (part.quantity > 0 && part.quantity > part.instock) {
        part.quantity = part.instock;
      }
    },
    isQuantityValid(part) {
      return part.quantity === 0 || part.quantity <= part.instock;
    },
  },
};
</script>

<template>
  <div>
    <div class="flex items-center mb-4">
      <input
        type="text"
        v-model="searchQuery"
        placeholder="Suche nach Partnummer oder Beschreibung"
        class="border border-gray-300 p-2 w-full"
      />
      <button @click="scan" class="bg-gray-800 text-white px-6 py-2 ml-2 rounded">Scannen</button>
    </div>
    <n-infinite-scroll style="height: 510px; overflow-y: auto;" :distance="10" @load="handleLoad">
      <table class="min-w-full border-collapse border border-gray-200">
        <thead>
          <tr class="bg-gray-800 text-white">
            <th class="border border-gray-300 p-2">Ersatzteil-Nr.</th>
            <th class="border border-gray-300 p-2">Beschreibung</th>
            <th class="border border-gray-300 p-2">Menge</th>
            <th class="border border-gray-300 p-2" style="width: 120px;"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="part in filteredParts" :key="part.id">
            <td class="border border-gray-300 p-2">{{ part.partnumber }}</td>
            <td class="border border-gray-300 p-2">{{ truncateDescription(part.description) }}</td>
            <td class="border border-gray-300 p-2 flex items-center">
              <button 
                @click="decreaseQuantity(part)" 
                class="bg-gray-800 hover:bg-gray-600 text-white font-bold py-1 px-3 rounded-full transition duration-300">
                -
              </button>
              <input
                type="number"
                v-model.number="part.quantity"
                min="0"
                placeholder="0"
                class="border border-gray-300 p-1 w-12 text-center mx-2 no-arrows"
                :class="{'border-red-500': part.quantity > 0 && !isQuantityValid(part)}"
                @input="checkQuantity(part)"
              />
              <button 
                @click="increaseQuantity(part)" 
                class="bg-gray-800 hover:bg-gray-600 text-white font-bold py-1 px-3 rounded-full transition duration-300">
                +
              </button>
            </td>
            <td class="border border-gray-300 p-2">
              <button 
                v-if="part.quantity > 0 && isQuantityValid(part)"
                @click="addPart(part)" 
                class="bg-gray-800 hover:bg-green-600 text-white px-2 py-1 rounded">
                Hinzufügen
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </n-infinite-scroll>
  </div>
</template>

<style scoped>
/* Stil für die Tabelle */
table {
  width: 100%;
  border-collapse: collapse;
}
th, td {
  text-align: left;
}

/* Remove arrows from number input */
input[type=number]::-webkit-inner-spin-button, 
input[type=number]::-webkit-outer-spin-button { 
  -webkit-appearance: none; 
  margin: 0; 
}
</style>