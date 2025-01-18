<template>
    <div class="p-4">
        <!-- Menüleiste -->
        <div class="flex items-center justify-center mb-4 p-4">
            <input 
                type="text" 
                v-model="searchQuery" 
                placeholder="Partpack suchen..." 
                class="p-2 flex-grow max-w-lg border border-gray-300 rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-gray-800 transition duration-300 ease-in-out transform hover:scale-105"
            />
        </div>
        <div class="flex items-center justify-between mb-4 p-4">
            <button
                @click="$router.back()"
                class="bg-white shadow-md rounded-lg px-6 py-3 flex items-center hover:bg-gray-50 transition-colors duration-200"
            >
                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                <span class="font-medium">Zurück</span>
            </button>
            <button
                @click="createNewPartpack"
                class="bg-gray-800 text-white shadow-md rounded-lg px-6 py-3 flex items-center hover:bg-gray-900 transition-colors duration-200"
            >
                <span class="font-medium">Neues Partpack</span>
            </button>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div 
                v-for="partpack in filteredPartpacks" 
                :key="partpack.id" 
                class="relative p-6 bg-white border border-gray-200 rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-xl"
                @click="selectPartpack(partpack.name)"
            >
                <!-- Menge an Ersatzteilen oben rechts -->
                <div class="absolute top-2 right-2 flex items-center">
                    <n-badge :value="partpack.partsCount" />
                    <span class="ml-1 text-sm text-gray-600">Parts</span>
                </div>
                <div class="mb-4">
                    <h3 class="text-lg font-semibold text-gray-800">
                        Partpack:
                    </h3>
                    <p class="text-lg font-semibold text-gray-800">
                        {{ partpack.name }}
                    </p>
                </div>
                <!-- Fortschrittsanzeige -->
                <div class="flex items-center justify-between mb-4">
                    <div class="hidden sm:flex space-x-2" v-show="windowWidth >= 1500">
                        <button 
                            @click.stop="selectPartpack(partpack.name)"
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
                <!-- Statusanzeige unten rechts -->
                <div class="absolute bottom-2 right-2 px-3 py-1 text-white rounded-md" :class="statusClass(partpack.status)">
                     {{ partpack.status }}
                </div>
            </div>
            <div v-if="filteredPartpacks.length === 0" class="col-span-full text-center text-gray-500">
                Keine Partpacks gefunden.
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { usePartpackStore } from '../stores/partpackStore'; 
import { NProgress, NBadge } from 'naive-ui'; 
import { useRouter } from 'vue-router'; 

const partpackStore = usePartpackStore(); 
const searchQuery = ref('');
const router = useRouter(); 
const windowWidth = ref(typeof window !== 'undefined' ? window.innerWidth : 0);

const updateWindowWidth = () => {
    if (typeof window !== 'undefined') {
        windowWidth.value = window.innerWidth;
    }
};

onMounted(() => {
    if (typeof window !== 'undefined') {
        window.addEventListener('resize', updateWindowWidth);
    }
    partpackStore.loadPartpacks();
});

onUnmounted(() => {
    if (typeof window !== 'undefined') {
        window.removeEventListener('resize', updateWindowWidth);
    }
});

const filteredPartpacks = computed(() => {
    if (!partpackStore.partpacks || !Array.isArray(partpackStore.partpacks)) {
        return []; 
    }
    
    return partpackStore.partpacks.filter(partpack =>
        partpack.name && partpack.name.includes(searchQuery.value)
    );
});

function selectPartpack(partpackName) {
    router.push(`/partpacks/${partpackName}`); 
}

function statusClass(status) {
    switch (status) {
        case 'Neu':
            return 'bg-blue-700';
        case 'Pausiert':
            return 'bg-yellow-500';
        case 'Geschlossen':
            return 'bg-green-700';
        case 'Error':
            return 'bg-red-700';
        default:
            return 'bg-gray-700';
    }
}
</script>

<style scoped>

</style>