<template>
  <div class="news-container min-h-screen bg-gray-100 py-12 px-4">
    
    <div class="max-w-6xl mx-auto">
      <h1 class="text-3xl font-bold text-center mb-8">News & Patch Notes</h1>
      
      <div class="mb-4">
          <button
          @click="$router.back()"
          class="bg-white shadow-md rounded-lg px-6 py-3 flex items-center hover:bg-gray-50 transition-colors duration-200"
        >
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          <span class="font-medium">Zurück</span>
        </button>
      </div>
      <!-- Nachrichtenartikel -->
      <div class="mb-12">
        <h2 class="text-2xl font-semibold mb-4">News</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div v-for="article in newsArticles" :key="article.id" class="bg-white rounded-lg shadow-md p-6">
            <h3 class="text-xl font-semibold mb-2">{{ article.title }}</h3>
            <p class="text-gray-700 mb-4">{{ article.summary }}</p>
          </div>
        </div>
      </div>

      <!-- Patchnotes -->
      <div class="mb-12">
        <h2 class="text-2xl font-semibold mb-4">Patch Notes</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div v-for="note in patchNotes" :key="note.id" class="bg-white rounded-lg shadow-md p-6">
            <h3 class="text-xl font-semibold mb-2">{{ note.version }}</h3>
            <p class="text-gray-700 mb-4">{{ note.description }}</p>
          </div>
        </div>
      </div>

      <!-- Roadmap -->
      <Roadmap />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import Roadmap from '~/components/roadmap.vue';

const newsArticles = ref([
  { id: 1, title: 'Neues Dashboard für Admins eingeführt', summary: 'Wir freuen uns, die Einführung eines neuen Dashboards für Admins bekannt zu geben. Dieses Dashboard bietet eine umfassende Übersicht über alle Bestellungen, Lagerbestände und wichtige Kennzahlen, um die Verwaltung zu erleichtern.' },
  { id: 2, title: 'Benachrichtigungsfunktion für niedrige Lagerbestände', summary: 'Um sicherzustellen, dass keine wichtigen Teile ausgehen, haben wir eine neue Benachrichtigungsfunktion eingeführt. Diese Funktion informiert Manager und Admins automatisch, wenn die Lagerbestände unter einen bestimmten Schwellenwert fallen.' },
  { id: 3, title: 'Optimierung der Ladezeiten', summary: 'Wir haben die Ladezeiten für die Seiten "Wareneingang" und "Warenausgang" erheblich verbessert. Dies sorgt für eine schnellere und effizientere Nutzung der Plattform.' },
]);

const patchNotes = ref([
  { id: 1, version: 'v1.1.0', description: 'Neue Funktionen: Einführung eines Dashboards für Admins zur besseren Übersicht über Bestellungen und Lagerbestände. Hinzufügen einer Benachrichtigungsfunktion für niedrige Lagerbestände. Verbesserungen: Optimierung der Ladezeiten für die Seiten "Wareneingang" und "Warenausgang". Verbesserte Benutzeroberfläche für die Verwaltung von Bestellungen.' },
  { id: 2, version: 'v1.0.4', description: 'Fehlerbehebungen: Behebung eines Problems, bei dem Manager keine Bestellungen sehen konnten. Korrektur der Berechtigungen für den Zugriff auf die Seite "Ersatzteile". Sicherheitsupdates: Aktualisierung der Authentifizierungsmechanismen zur Verbesserung der Sicherheit.' },
  { id: 3, version: 'v1.0.3', description: 'Kleinere Updates: Aktualisierung der Icons für eine konsistentere Benutzererfahrung. Verbesserte Fehlermeldungen bei fehlgeschlagenen API-Anfragen.' },
]);
</script>

<style scoped>
.news-container {
  margin: 0 auto;
}
</style>
