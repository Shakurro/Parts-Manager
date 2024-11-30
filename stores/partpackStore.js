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
        },
        calculateTotalPrice(items) {
            console.log('Items:', items); // Protokolliere die Artikel
            return items.reduce((total, item) => {
                console.log('Item:', item); // Protokolliere jedes Item
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