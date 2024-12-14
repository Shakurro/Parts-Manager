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
                v-model="form.productnumber"
                type="text"
                required
                class="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-600">Artikelname</label>
              <input
                v-model="form.productName"
                type="text"
                required
                class="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-600">Menge</label>
              <div class="flex items-center mt-2">
                <button
                  type="button"
                  @click="decrementQuantity"
                  class="px-2 py-1 bg-gray-200 rounded-l-md text-gray-700 hover:bg-gray-300"
                >-</button>
                <input
                  v-model.number="form.quantity"
                  type="number"
                  min="1"
                  required
                  class="w-16 text-center border-t border-b border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                />
                <button
                  type="button"
                  @click="incrementQuantity"
                  class="px-2 py-1 bg-gray-200 rounded-r-md text-gray-700 hover:bg-gray-300"
                >+</button>
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-600">Lieferant</label>
              <select
                v-model="form.supplier"
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
              class="px-4 py-2 bg-indigo-600 text-white rounded-md text-sm font-medium hover:bg-indigo-700 transition-colors duration-200"
            >
              Speichern
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { userStore } from '@/stores/userStore'; // Beispiel für Vuex

export default {
  data() {
    return {
      form: {
        productnumber: '',
        productName: '',
        quantity: 1,
        supplier: '',
        date: new Date().toISOString().split('T')[0]
      }
    }
  },
  computed: {
    fullName() {
      const { first_name, second_name } = userStore.userData || {};
      return `${first_name || ''} ${second_name || ''}`.trim();
    }
  },
  methods: {
    handleSubmit() {
      this.$emit('save', { ...this.form });
    },
    incrementQuantity() {
      this.form.quantity++;
    },
    decrementQuantity() {
      if (this.form.quantity > 1) {
        this.form.quantity--;
      }
    }
  }
}
</script> 