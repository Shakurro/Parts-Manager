<template>
    <div class="p-4">
        <!-- Menüleiste -->
        <div class="flex items-center justify-center mb-4 p-4 bg-gray-100 rounded-lg shadow-sm">
            <input 
                type="text" 
                v-model="searchQuery" 
                placeholder="Partpack suchen..." 
                class="p-2 flex-grow max-w-md border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-800"
            />
        </div>
        <!-- Flexibles Layout für Partpacks -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div 
                v-for="partpack in filteredPartpacks" 
                :key="partpack.number" 
                class="relative p-6 bg-white border border-gray-200 rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-xl"
            >
                <!-- Menge an Ersatzteilen oben rechts -->
                <div class="absolute top-2 right-2">
                    <n-badge :value="partpack.quantity" />
                </div>
                <div class="mb-4">
                    <div class="text-lg font-semibold">
                        <strong>{{ partpack.number }}</strong> 
                    </div>
                </div>
                <!-- Fortschrittsanzeige -->
                <div class="flex items-center justify-between mb-4">
                    <n-progress type="circle" :status="partpack.status" :percentage="partpack.percentage" class="mr-4" />
                    <div class="hidden sm:flex space-x-2">
                        <button 
                            @click="bookParts(partpack.number)" 
                            class="px-3 py-1 bg-gray-800 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2"
                        >
                            Auswählen
                        </button>
                        <button 
                            v-if="userRole >= 2" 
                            class="px-3 py-1 bg-gray-800 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2"
                        >
                            Abrechnen
                        </button>
                        <button 
                            v-if="userRole >= 3" 
                            class="px-3 py-1 bg-gray-800 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2"
                        >
                            Löschen
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { NProgress, NBadge, NAvatar } from 'naive-ui'; // Importiere die Komponenten

// Beispiel-Daten für Partpacks mit Status
const partpacks = ref([
    { number: '52500012323', quantity: 10, status: 'default', percentage: 58},
    { number: '52500012324', quantity: 5, status: 'warning', percentage: 100},
    { number: '52500012325', quantity: 3, status: 'info', percentage: 34},
    { number: '52500012326', quantity: 1, status: 'error', percentage: 100},
    // Weitere Partpacks hier hinzufügen
]);

const searchQuery = ref('');
const userRole = ref(1); // Beispiel: Benutzerrolle, setze dies entsprechend deiner Logik

// Gefilterte Partpacks basierend auf der Suchanfrage
const filteredPartpacks = computed(() => {
    return partpacks.value.filter(partpack =>
        partpack.number.includes(searchQuery.value)
    );
});

// Funktion zum Buchen von Ersatzteilen
function bookParts(partpackNumber) {
    console.log(`Ersatzteile für Partpack ${partpackNumber} buchen`);
}

// Beispiel-Funktion zur Berechnung des Prozentsatzes
function calculatePercentage(quantity) {
    // Hier kannst du die Logik anpassen, um den Prozentsatz basierend auf der Menge zu berechnen
    return (quantity / 10) * 100; // Beispiel: 10 ist die maximale Menge
}
</script>

<style scoped>
/* Keine zusätzlichen Stile erforderlich, da Tailwind CSS verwendet wird */
</style>