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
              <span>{{ part.name }} - {{ part.price }}</span>
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
                class="flex justify-between items-center p-4 border-b border-gray-200 text-lg"
              >
                <span>{{ item.name }} - {{ item.price }}</span>
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
import HeaderLayout from '../layouts/HeaderLayoutUser.vue';
import FooterLayout from '../layouts/FooterLayout.vue';

export default {
  name: 'NewOrder',
  components: {
    HeaderLayout,
    FooterLayout
  },
  data() {
    return {
      searchQuery: '',
      parts: [
        { id: 1, name: 'Part A', price: '$10' },
        { id: 2, name: 'Part B', price: '$20' },
        { id: 3, name: 'Part C', price: '$30' },
        // Weitere Teile hinzufügen
      ],
      cart: [],
      workpackNumber: '' // Workpacknummer
    };
  },
  computed: {
    filteredParts() {
      return this.parts.filter(part =>
        part.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }
  },
  methods: {
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
</style>
