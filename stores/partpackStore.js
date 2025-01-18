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
                    percentage: Number(partpack.percentage), // Stelle sicher, dass percentage ein Number ist
                    Partpack_worth: this.calculateTotalPrice(partpack.items) // Berechne den Gesamtpreis und füge ihn hinzu
                }));
            } catch (error) {
            }
        },
        getStatusString(progress) {
            switch (progress) {
                case 1:
                    return 'Neu';
                case 2:
                    return 'Pausiert';
                case 3:
                    return 'Error';
                case 4:
                    return 'Geschlossen';
                case 5:
                    return 'Info';
                default:
                    return 'Unbekannt'; // Standardwert, falls kein passender Status gefunden wird
            }
        },
        calculateTotalPrice(items) {
            return items.reduce((total, item) => {
                return total + (item.buying_price_eur || 0);
            }, 0);
        },
        addItemToPartpack(partpackName, item) {
            const partpack = this.partpacks.find(p => p.name === partpackName);
            if (partpack) {
                const existingItem = partpack.items.find(i => i.id === item.part.id);
                if (existingItem) {
                    existingItem.quantity += item.quantity;
                } else {
                    partpack.items.push({ ...item.part, quantity: item.quantity });
                }
            }
        },
        removeItemFromPartpack(partpackName, itemId) {
            const partpack = this.partpacks.find(p => p.name === partpackName);
            if (partpack) {
                partpack.items = partpack.items.filter(item => item.id !== itemId);
            }
        },
    },
});