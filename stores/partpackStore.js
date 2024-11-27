// store/partpackStore.js
import { defineStore } from 'pinia';
import axios from 'axios'; // Importiere axios

export const usePartpackStore = defineStore('partpack', {
    state: () => ({
        partpacks: [],
    }),
    actions: {
        async loadPartpacks() {
            try {
                const response = await axios.get('/api/partpacks'); // Hole die Partpack-Daten von der API-Route
                this.partpacks = response.data.map(partpack => ({
                    ...partpack,
                    status: this.getStatusString(partpack.progress), // Setze den Status basierend auf dem Fortschritt
                    percentage: Number(partpack.percentage) // Stelle sicher, dass percentage ein Number ist
                }));
                console.log('Partpacks loaded:', this.partpacks); // Protokolliere die geladenen Partpacks
            } catch (error) {
                console.error('Error loading partpacks:', error); // Fehlerprotokollierung
            }
        },
        getStatusString(progress) {
            if (progress === 1) return 'default';
            if (progress === 2) return 'success';
            if (progress === 3) return 'error';
            if (progress === 4) return 'warning';
            if (progress === 5) return 'info';
            return 'default'; // Standardwert, falls kein passender Status gefunden wird
        }
    },
});