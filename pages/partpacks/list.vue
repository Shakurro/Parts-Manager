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
                :key="partpack.id" 
                class="relative p-6 bg-white border border-gray-200 rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-xl"
            >
                <!-- Menge an Ersatzteilen oben rechts -->
                <div class="absolute top-2 right-2">
                    <n-badge :value="partpack.partsCount" />
                </div>
                <div class="mb-4">
                    <div class="text-lg font-semibold">
                        <strong>{{ partpack.name }}</strong> 
                    </div>
                </div>
                <!-- Fortschrittsanzeige -->
                <div class="flex items-center justify-between mb-4">
                    <n-progress type="circle" :status="partpack.status" :percentage="partpack.percentage" class="mr-4" />
                    <div class="hidden sm:flex space-x-2">
                        <button 
                            @click="selectPartpack(partpack.name)" 
                            class="px-3 py-1 bg-gray-800 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2"
                        >
                            Auswählen
                        </button>
                        <button 
                            class="px-3 py-1 bg-gray-800 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2"
                        >
                            Abrechnen
                        </button>
                        <button 
                            class="px-3 py-1 bg-gray-800 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2"
                        >
                            Löschen
                        </button>
                    </div>
                </div>
            </div>
            <div v-if="filteredPartpacks.length === 0" class="col-span-full text-center text-gray-500">
                Keine Partpacks gefunden.
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { usePartpackStore } from '../stores/partpackStore'; // Relativer Import
import { NProgress, NBadge } from 'naive-ui'; // Importiere die Komponenten
import { useRouter } from 'vue-router'; // Importiere useRouter

const partpackStore = usePartpackStore(); // Erstelle eine Instanz des Stores
const searchQuery = ref('');
const router = useRouter(); // Erstelle eine Router-Instanz

// Lade die Partpack-Daten beim Mounten
onMounted(async () => {
    await partpackStore.loadPartpacks(); // Lade die Partpack-Daten
});

// Gefilterte Partpacks basierend auf der Suchanfrage
const filteredPartpacks = computed(() => {
    // Überprüfe, ob partpacks existiert und ein Array ist
    if (!partpackStore.partpacks || !Array.isArray(partpackStore.partpacks)) {
        return []; // Rückgabe eines leeren Arrays, wenn partpacks nicht verfügbar ist
    }
    
    return partpackStore.partpacks.filter(partpack =>
        partpack.name && partpack.name.includes(searchQuery.value) // Suche nach dem Namen
    );
});


function selectPartpack(partpackName) {
    router.push(`/partpacks/${partpackName}`); // Weiterleitung zur Partpack-Details-Seite
}
</script>

<style scoped>
/* Keine zusätzlichen Stile erforderlich, da Tailwind CSS verwendet wird */
</style>