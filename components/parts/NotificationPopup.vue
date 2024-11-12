<template>
  <div v-if="visible" class="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
    <div class="bg-white p-4 rounded shadow-lg text-center">
      <p class="text-lg font-bold">Deine Änderung</p>
      <p class="text-lg font-bold">wurde Gespeichert!</p>

      <button @click="close" class="mt-4 bg-gray-800 hover:bg-green-600 text-white px-4 py-2 rounded transition duration-300">Schließen</button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    visible: Boolean
  },
  methods: {
    close() {
      this.$emit('close');
    }
  }
};
</script>

<style scoped>
/* Add any additional styles here */
</style>
