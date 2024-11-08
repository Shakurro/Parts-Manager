<template>
  <transition name="fade">
    <div v-if="visible" class="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center" @click.self="close">
      <div class="bg-white p-8 rounded-lg shadow-lg w-3/4 max-w-2xl relative">
        <button @click="close" class="absolute top-2 right-2 text-gray-800 text-3xl font-bold">×</button>
        <h2 class="text-2xl font-bold mb-6 text-center">Ersatzteil Details bearbeiten</h2>
        <div v-if="part">
          <form @submit.prevent="saveChanges" class="space-y-4">
            <div class="flex space-x-4">
              <div class="flex-1">
                <label class="block text-gray-700">Partnumber:</label>
                <input v-model="editablePart.partnumber" class="w-full p-2 border rounded" type="text" />
              </div>
              <div class="flex-1">
                <label class="block text-gray-700">InStock:</label>
                <input v-model.number="editablePart.instock" class="w-full p-2 border rounded" type="number" />
              </div>
            </div>
            <div>
              <label class="block text-gray-700">Description:</label>
              <textarea v-model="editablePart.description" class="w-full p-2 border rounded" rows="3"></textarea>
            </div>
            <div class="flex space-x-4">
              <div class="flex-1">
                <label class="block text-gray-700">Buying Price (€):</label>
                <input v-model.number="editablePart.buying_price_eur" class="w-full p-2 border rounded" type="number" step="0.01" />
              </div>
              <div class="flex-1">
                <label class="block text-gray-700">Selling Price (€):</label>
                <input v-model.number="editablePart.selling_price_eur" class="w-full p-2 border rounded" type="number" step="0.01" />
              </div>
            </div>
            <div class="flex space-x-4">
              <div class="flex-1">
                <label class="block text-gray-700">Category:</label>
                <select v-model="editablePart.category_id" class="w-full p-2 border rounded">
                  <option v-for="category in categories" :key="category.id" :value="category.id">
                    {{ category.name }}
                  </option>
                </select>
              </div>
            </div>
            <div class="text-center">
              <button type="submit" class="bg-gray-800 hover:bg-green-600 text-white px-6 py-2 rounded-lg transition duration-300">Speichern</button>
            </div>
          </form>
        </div>
        <div v-else>
          <p class="text-center">Loading...</p>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import axios from 'axios';

export default {
  props: {
    visible: Boolean,
    part: Object
  },
  data() {
    return {
      editablePart: this.initializeEditablePart(this.part),
      categories: [
        { id: 1, name: 'Aufbau' },
        { id: 2, name: 'Rahmen' },
        { id: 3, name: 'Elektrik' },
        { id: 4, name: 'Motor' },
        { id: 5, name: 'Bremse' },
        { id: 6, name: 'Achse' },
        { id: 7, name: 'Betriebsstoffe' },
        { id: 8, name: 'Schrauben' },
        { id: 9, name: 'Ladeboardwand' }
      ]
    };
  },
  watch: {
    part: {
      immediate: true,
      handler(newPart) {
        this.editablePart = this.initializeEditablePart(newPart);
      }
    }
  },
  methods: {
    initializeEditablePart(part) {
      console.log('Part data:', part);

      return {
        ...part,
        category_id: part && part.category ? part.category.id : null
      };
    },
    close() {
      this.$emit('close');
    },
    async saveChanges() {
      try {
        console.log('Saving part with category_id:', this.editablePart.category_id);

        const response = await axios.put(`http://localhost:1337/items/${this.editablePart.id}`, {
          ...this.editablePart,
          category: this.editablePart.category_id
        });
        console.log('Update successful:', response.data);
        this.$emit('update', response.data);
        this.close();
      } catch (error) {
        console.error('Error updating part:', error);
      }
    }
  }
};
</script>

<style scoped>
</style>
