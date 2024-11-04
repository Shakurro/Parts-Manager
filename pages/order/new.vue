<template>
  <NuxtLayout>
    <div class="min-h-screen bg-gray-100 flex flex-col">
      <!-- Ursprüngliches Header Layout -->
      <HeaderLayout />

      <!-- Main Content -->
      <main class="flex-1 container mx-auto px-4 py-6 flex">
        <!-- Teileliste mit Suchleiste -->
        <div class="w-full md:w-2/3 bg-white p-6 rounded shadow-md mr-12">
          <h2 class="text-2xl font-bold mb-4">Teileliste</h2>
          <div class="flex items-center mb-4">
            <input
              type="text"
              v-model="searchQuery"
              placeholder="Teile suchen..."
              class="w-1/2 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-800"
            />
            <button @click="fetchAllItems" class="ml-4 bg-gray-800 text-white py-2 px-4 rounded hover:bg-gray-600 transition duration-200 flex items-center justify-center">Aktualisieren</button>
          </div>
          <ul>
            <li
              v-for="item in paginatedItems"
              :key="item.id"
              class="flex justify-between items-center p-2 border-b border-gray-200"
            >
              <span>{{ item.partnumber }} - {{ item.description }}</span>
              <button
                @click="addToCart(item)"
                class="bg-gray-800 text-white py-1 px-3 rounded hover:bg-gray-600 transition duration-200"
              >
                Hinzufügen
              </button>
            </li>
          </ul>
          <!-- Pagination Controls -->
          <div class="flex justify-between mt-4">
            <button 
              :disabled="currentPage === 1" 
              @click="goToPage(currentPage - 1)"
              class="bg-gray-800 text-white py-2 px-4 rounded hover:bg-gray-600 transition duration-200"
            >
              Vorherige Seite
            </button>
            <span>Seite {{ currentPage }} von {{ totalPages }}</span>
            <button 
              :disabled="currentPage === totalPages" 
              @click="goToPage(currentPage + 1)"
              class="bg-gray-800 text-white py-2 px-4 rounded hover:bg-gray-600 transition duration-200"
            >
              Nächste Seite
            </button>
          </div>
        </div>

        <!-- Warenkorb -->
        <div class="w-full md:w-1/3 bg-white p-6 rounded shadow-md flex flex-col justify-between">
          <div>
            <h2 class="text-2xl font-bold mb-4">Warenkorb</h2>
            <ul>
              <li
                v-for="item in cart"
                :key="item.id"
                class="flex justify-between items-center p-4 border-b border-gray-200"
              >
                <span class="cart-item-text">{{ item.partnumber }} - {{ item.description }}</span>
                <div class="flex items-center">
                  <span class="text-xl font-semibold mr-4">{{ item.quantity }}x</span>
                  <button
                    @click="removeFromCart(item)"
                    class="bg-red-500 text-white py-1 px-2 rounded hover:bg-red-600 transition duration-200 text-sm"
                  >
                    Entfernen
                  </button>
                </div>
              </li>
            </ul>
          </div>
          <div class="mt-4">
            <label for="workpack" class="block text-gray-700 font-semibold mb-2">Workpacknummer</label>
            <input
              type="text"
              id="workpack"
              v-model="workpackNumber"
              class="workpack-input"
            />
            <button
              @click="completeOrder"
              class="complete-order-btn"
            >
              Bestellung abschließen
            </button>
          </div>
        </div>
      </main>

      <!-- Include Footer Layout -->
      <FooterLayout />
    </div>
  </NuxtLayout>
</template>

<script>
import HeaderLayout from '../layouts/user/HeaderLayoutUser.vue';
import FooterLayout from '../layouts/user/FooterLayoutUser.vue';
import axios from 'axios';

export default {
  name: 'NewOrder',
  components: {
    HeaderLayout,
    FooterLayout
  },
  data() {
    return {
      searchQuery: '',
      items: [],
      cart: [],
      workpackNumber: '',
      currentPage: 1,
      itemsPerPage: 15
    };
  },
  computed: {
    filteredItems() {
      return this.items.filter(item =>
        item.description.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        item.partnumber.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    },
    paginatedItems() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = this.currentPage * this.itemsPerPage;
      return this.filteredItems.slice(start, end);
    },
    totalPages() {
      return Math.ceil(this.filteredItems.length / this.itemsPerPage);
    }
  },
  methods: {
    async fetchAllItems() {
      try {
        let allItems = [];
        let page = 1;
        const pageSize = 100;

        while (true) {
          const response = await axios.get(`http://localhost:1337/items?_start=${(page - 1) * pageSize}&_limit=${pageSize}`);
          const items = response.data;
          allItems = allItems.concat(items);

          if (items.length < pageSize) {
            break; // Exit loop if fewer items than pageSize are returned
          }

          page++;
        }

        this.items = allItems;
        console.log('Total items fetched:', allItems.length);
      } catch (error) {
        console.error('Fehler beim Abrufen der Teile:', error);
      }
    },
    goToPage(page) {
      if (page > 0 && page <= this.totalPages) {
        this.currentPage = page;
      }
    },
    addToCart(item) {
      const cartItem = this.cart.find(cartItem => cartItem.id === item.id);
      if (cartItem) {
        cartItem.quantity += 1;
      } else {
        this.cart.push({ ...item, quantity: 1 });
      }
    },
    removeFromCart(item) {
      const cartItem = this.cart.find(cartItem => cartItem.id === item.id);
      if (cartItem.quantity > 1) {
        cartItem.quantity -= 1;
      } else {
        this.cart = this.cart.filter(cartItem => cartItem.id !== item.id);
      }
    },
    completeOrder() {
      console.log('Bestellung abgeschlossen:', this.cart, 'Workpacknummer:', this.workpackNumber);
      // Logik zum Abschließen der Bestellung implementieren
    }
  },
  mounted() {
    this.fetchAllItems(); // Teile beim Laden der Komponente abrufen
  }
};
</script>

<style scoped>
.workpack-input {
  background-color: #f9f9f9;
  color: #333;
  border: 1px solid #ccc;
  padding: 12px;
  border-radius: 5px;
  width: 45%;
  margin-bottom: 10px;
  transition: border-color 0.3s;
}

.workpack-input:focus {
  border-color: #000000;
  outline: none;
}

.complete-order-btn {
  background-color: #2d3748; 
  color: #fff;
  border: none;
  padding: 14px 28px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s;
  float: right;
}

.complete-order-btn:hover {
  background-color: #75fb6f;
  transform: translateY(-2px);
}

/* New style for cart item text */
.cart-item-text {
  font-size: 0.875rem; /* Adjust the font size as needed */
}
</style>
  