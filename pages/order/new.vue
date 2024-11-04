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
              <button class="ml-4 bg-gray-800 text-white py-2 px-4 rounded hover:bg-gray-600 transition duration-200 flex items-center justify-center">Scannen</button>
            </div>
            <ul>
              <li
                v-for="part in filteredParts"
                :key="part.id"
                class="flex justify-between items-center p-2 border-b border-gray-200"
              >
                <span>{{ part.Partnumber }} - {{ part.Beschreibung }}</span>
                <button
                  @click="addToCart(part)"
                  class="bg-gray-800 text-white py-1 px-3 rounded hover:bg-gray-600 transition duration-200"
                >
                  Hinzufügen
                </button>
              </li>
            </ul>
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
                  <span class="cart-item-text">{{ item.Partnumber }} - {{ item.Beschreibung }}</span>
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
  import axios from 'axios'; // Importiere Axios oder eine andere HTTP-Bibliothek
  
  export default {
    name: 'NewOrder',
    components: {
      HeaderLayout,
      FooterLayout
    },
    data() {
      return {
        searchQuery: '',
        parts: [],
        cart: [],
        workpackNumber: ''
      };
    },
    computed: {
      filteredParts() {
        return this.parts.filter(part =>
          part.Beschreibung.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          part.Partnumber.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      }
    },
    methods: {
      async fetchParts() {
        try {
          const response = await axios.get('http://localhost:1337/parts');
          console.log('API Response:', response.data);
          this.parts = response.data;
        } catch (error) {
          console.error('Fehler beim Abrufen der Teile:', error);
        }
      },
      addToCart(part) {
        const cartItem = this.cart.find(item => item.id === part.id);
        if (cartItem) {
          cartItem.quantity += 1;
        } else {
          this.cart.push({ ...part, quantity: 1 });
        }
      },
      removeFromCart(item) {
        const cartItem = this.cart.find(part => part.id === item.id);
        if (cartItem.quantity > 1) {
          cartItem.quantity -= 1;
        } else {
          this.cart = this.cart.filter(part => part.id !== item.id);
        }
      },
      completeOrder() {
        console.log('Bestellung abgeschlossen:', this.cart, 'Workpacknummer:', this.workpackNumber);
        // Logik zum Abschließen der Bestellung implementieren
      }
    },
    mounted() {
      this.fetchParts(); // Teile beim Laden der Komponente abrufen
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
  