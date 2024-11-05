<template>
  <div v-if="visible" class="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
    <div class="bg-white p-6 rounded shadow-md w-1/2">
      <h2 class="text-xl font-bold mb-4">Neues Ersatzteil hinzufügen</h2>
      <form @submit.prevent="submitForm">
        <!-- Form fields for new part details -->
        <div class="mb-4">
          <label for="partnumber" class="block text-sm font-medium text-gray-700">Teilenummer</label>
          <input id="partnumber" v-model="newPart.partnumber" placeholder="Partnumber" class="w-full p-2 border rounded" />
        </div>
        
        <div class="mb-4">
          <label for="description" class="block text-sm font-medium text-gray-700">Beschreibung</label>
          <input id="description" v-model="newPart.description" placeholder="Description" class="w-full p-2 border rounded" />
        </div>
        
        <div class="mb-4">
          <label for="instock" class="block text-sm font-medium text-gray-700">Lagerbestand</label>
          <input id="instock" v-model="newPart.instock" type="number" placeholder="InStock" class="w-full p-2 border rounded" />
        </div>
        
        <div class="mb-4">
          <label for="buying_price_eur" class="block text-sm font-medium text-gray-700">Einkaufspreis (EUR)</label>
          <input id="buying_price_eur" v-model="newPart.buying_price_eur" type="number" placeholder="Buying Price" class="w-full p-2 border rounded" />
        </div>
        
        <div class="mb-4">
          <label for="selling_price_eur" class="block text-sm font-medium text-gray-700">Verkaufspreis (EUR)</label>
          <input id="selling_price_eur" v-model="newPart.selling_price_eur" type="number" placeholder="Selling Price" class="w-full p-2 border rounded" />
        </div>

        <div class="flex justify-end">
          <button type="button" @click="$emit('close')" class="bg-gray-800 text-white py-2 px-4 rounded hover:bg-red-800 transition duration-200 mr-2">Abbrechen</button>
          <button type="submit" class="bg-gray-800 text-white py-2 px-4 rounded hover:bg-green-600 transition duration-200">Speichern</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  props: ['visible'],
  data() {
    return {
      newPart: {
        partnumber: '',
        description: '',
        instock: 0,
        buying_price_eur: 0,
        selling_price_eur: 0
      }
    };
  },
  methods: {
    submitForm() {
      this.$emit('add', this.newPart);
    }
  }
};
</script>

<style scoped>
/* Add any additional styles here */
</style>
