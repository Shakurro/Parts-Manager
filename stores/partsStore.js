import { defineStore } from 'pinia';
import axios from 'axios';

export const usePartsStore = defineStore('parts', {
  state: () => ({
    parts: [],
    searchQuery: '',
    selectedCategories: []
  }),
  
  actions: {
    async fetchAllItems() {
      try {
        const jwtToken = document.cookie.split('; ')
          .find(row => row.startsWith('jwtToken=')).split('=')[1];
        
        const response = await axios.get(`http://localhost:1337/items`, {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${jwtToken}`
          },
          params: {
            _limit: -1 
          }
        });

        this.parts = response.data;
      } catch (error) {
        console.error('Error fetching items:', error);
      }
    },
    
    updateSearchQuery(query) {
      this.searchQuery = query;
    },
    
    updateSelectedCategories(categories) {
      this.selectedCategories = categories;
    },
    
    async updatePartInDatabase(editablePart) {
      try {
        const jwtToken = document.cookie.split('; ')
          .find(row => row.startsWith('jwtToken=')).split('=')[1];

        const response = await axios.put(`http://localhost:1337/items/${editablePart.id}`, {
          ...editablePart,
          category: editablePart.category_id
        }, {
          headers: {
            Authorization: `Bearer ${jwtToken}`
          }
        });

        const partIndex = this.parts.findIndex(p => p.id === editablePart.id);
        if (partIndex !== -1) {
          this.parts[partIndex] = response.data;
        }
      } catch (error) {
        console.error('Error updating part in database:', error);
      }
    }
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
    lowQuantityParts(state) {
      return state.parts.filter(part => part.instock < 3 && part.selling_price_eur < 30);
    }
  }
});
