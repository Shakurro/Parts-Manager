<template>
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">Ersatzteil Informationen</h1>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
      <div class="bg-white shadow-md rounded-lg p-6 col-span-1">
        <h2 class="text-xl font-semibold">Bild</h2>
        <img :src="imageUrl" alt="Ersatzteil Bild" class="w-full h-auto rounded-lg" />
      </div>

      <div class="bg-white shadow-md rounded-lg p-6 col-span-2">
        <h2 class="text-xl font-semibold">Basisinformationen</h2>
        <p><strong>Partnummer:</strong> {{ partNumber }}</p>
        <p><strong>Beschreibung:</strong> {{ description }}</p>
        <p><strong>Aktuelle Menge im Lager:</strong> {{ stockQuantity }}</p>
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
      <div class="bg-white shadow-md rounded-lg p-6 col-span-1">
        <h2 class="text-xl font-semibold">Weitere Infos</h2>
        <!-- Hier kannst du zusätzliche Informationen hinzufügen -->
      </div>

      <div class="bg-white shadow-md rounded-lg p-6 col-span-2">
        <h2 class="text-xl font-semibold">Verschiedene Preise bei verschiedenen Händlern</h2>
        <ul>
          <li v-for="dealer in dealers" :key="dealer.name">
            <strong>{{ dealer.name }}:</strong> {{ dealer.price }} €
          </li>
        </ul>
      </div>
    </div>

    <div class="bg-white shadow-md rounded-lg p-6 mb-4 col-span-3">
      <h2 class="text-xl font-semibold">Preisediagramm der letzten 12 Monate</h2>
      <!-- Hier kannst du das Preisediagramm einfügen -->
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      partNumber: '12345',
      description: 'Ersatzteil Beschreibung',
      stockQuantity: 10,
      dealers: [
        { name: 'Händler A', price: 50 },
        { name: 'Händler B', price: 55 },
        { name: 'Händler C', price: 52 },
      ],
      imageUrl: 'path/to/image.jpg',
    };
  },
};
</script>

<style scoped>
/* Hier kannst du zusätzliche Stile hinzufügen, falls nötig */
</style>
  