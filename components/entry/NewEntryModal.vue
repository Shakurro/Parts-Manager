<template>
  <div class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
    <div class="relative bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
      <!-- Modal Header -->
      <div class="flex items-center justify-between p-4 border-b">
        <h3 class="text-xl font-semibold text-gray-900">Neuer Wareneingang</h3>
        <button @click="$emit('close')" class="text-gray-400 hover:text-gray-500">
          <i class="fas fa-times"></i>
        </button>
      </div>

      <!-- Modal Body -->
      <div class="p-6">
        <form @submit.prevent="handleSubmit">
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700">Artikelnummer</label>
              <input
                v-model="form.productnumber"
                type="text"
                required
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700">Artikelname</label>
              <input
                v-model="form.productName"
                type="text"
                required
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700">Menge</label>
              <input
                v-model.number="form.quantity"
                type="number"
                min="1"
                required
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700">Lieferant</label>
              <select
                v-model="form.supplier"
                required
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="">Bitte wählen</option>
                <option value="TechCo">TechCo</option>
                <option value="ComTech">ComTech</option>
                <option value="VisionSupplies">VisionSupplies</option>
              </select>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700">Eingangsdatum</label>
              <input
                v-model="form.date"
                type="date"
                required
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </div>

          <!-- Modal Footer -->
          <div class="mt-6 flex justify-end space-x-3">
            <button
              type="button"
              @click="$emit('close')"
              class="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Abbrechen
            </button>
            <button
              type="submit"
              class="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700"
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
  methods: {
    handleSubmit() {
      this.$emit('save', { ...this.form });
    }
  }
}
</script> 