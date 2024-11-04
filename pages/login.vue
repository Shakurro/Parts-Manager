<template>
  <div class="min-h-screen flex flex-col bg-gradient-to-r from-gray-500 to-gray-700">
    <!-- Main Content -->
    <div class="flex-1 flex items-center justify-center">
      <div class="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 class="text-3xl font-bold mb-6 text-center text-gray-800">Parts Manager</h2>
        <form @submit.prevent="handleLogin">
          <div class="mb-4">
            <label for="email" class="block text-gray-700 font-semibold mb-2">Email</label>
            <input
              type="email"
              id="email"
              v-model="email"
              class="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div class="mb-6">
            <label for="password" class="block text-gray-700 font-semibold mb-2">Password</label>
            <input
              type="password"
              id="password"
              v-model="password"
              class="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            class="w-1/2 bg-gray-700 text-white py-2 rounded hover:bg-green-600 transition duration-200"
          >
            Login
          </button>
          <!--
          <button
          type="request"
          class="w-1/2 bg-gray-700 text-white py-2 rounded hover:bg-green-600 transition duration-200"
          >Benutzer Anfordern</button>
          -->
        </form>
      </div>
    </div>
    <!-- Footer -->
    <FooterLayout />
  </div>
</template>

<script>
import FooterLayout from '../layouts/FooterLayout.vue';

export default {
  data() {
    return {
      email: '',
      password: ''
    };
  },
  components: {
    FooterLayout
  },
  methods: {
    handleLogin() {
      console.log('Email:', this.email);
      console.log('Password:', this.password);
    }
  }
};
</script>

<style scoped>
/* Zusätzliche Stile für ein besseres Aussehen */
body {
  font-family: 'Inter', sans-serif;
}
</style>
