import { defineStore } from 'pinia';
import { fetchPartsEntries, updatePartEntry } from '../services/partsEntriesService';

export const usePartsEntriesStore = defineStore('partsEntries', {
  state: () => ({
    partsEntries: [],
  }),

  actions: {
    async fetchAllEntries() {
      try {
        this.partsEntries = await fetchPartsEntries();
      } catch (error) {
      }
    },

    async updateEntry(id, updatedData) {
      try {
        const updatedEntry = await updatePartEntry(id, updatedData);
        const index = this.partsEntries.findIndex(entry => entry.id === id);
        if (index !== -1) {
          this.partsEntries[index] = updatedEntry;
        }
      } catch (error) {
        console.error('Error updating entry:', error);
      }
    },
  },
});