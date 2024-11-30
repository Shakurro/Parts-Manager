import { defineStore } from 'pinia';
import { fetchParts, updatePart } from '../services/partsService';

export const usePartsStore = defineStore('parts', {
  state: () => ({
    parts: [],
    searchQuery: '',
    selectedCategories: [],
  }),

  actions: {
    async fetchAllItems() {
      try {
        this.parts = await fetchParts(); // Nutzung des services/partsService.js
      } catch (error) {
        console.error('Error fetching items:', error);
      }
    },

    async refreshAllItems() {
      try {
        const updatedParts = await fetchParts();
        this.parts = updatedParts;
      } catch (error) {
        console.error('Error refreshing items:', error);
      }
    },

    async updatePartInDatabase(editablePart) {
      try {
        const updatedPart = await updatePart({
          id: editablePart.id,
          ...editablePart,
          category: editablePart.category_id,
        });

        const partIndex = this.parts.findIndex(p => p.id === editablePart.id);
        if (partIndex !== -1) {
          this.parts[partIndex] = updatedPart;
        }
      } catch (error) {
        console.error('Error updating part in database:', error);
      }
    },

    updateSearchQuery(query) {
      this.searchQuery = query;
    },

    updateSelectedCategories(categories) {
      this.selectedCategories = categories;
    },

    updateInstock(partId, quantity) {
      const part = this.parts.find(p => p.id === partId);
      if (part) {
        part.instock = Math.max(0, part.instock - quantity); // Ensure instock doesn't go below 0
      }
    },
  },

  getters: {
    filteredParts(state) {
      return state.parts
        .filter(part => {
          const matchesSearchQuery = part.description.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
                                     part.partnumber.toLowerCase().includes(state.searchQuery.toLowerCase());
          const matchesCategory = state.selectedCategories.length === 0 ||
                                  (part.category !== null && state.selectedCategories.includes(part.category));
          return matchesSearchQuery && matchesCategory;
        })
        .sort((a, b) => a.id - b.id);
    },

    totalParts(state) {
      return state.parts.length;
    },

    totalSellingPrice(state) {
      return state.parts.reduce((sum, part) => sum + (part.selling_price_eur || 0), 0).toFixed(2);
    },

    totalBuyingPrice(state){
      return state.parts.reduce((sum, part)  => sum + (part.buying_price_eur || 0), 0).toFixed(2);
    },

    lowQuantityParts(state) {
      return state.parts.filter(part => part.instock < 3 && part.selling_price_eur < 30);
    },
  },
});
