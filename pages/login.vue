<template>
  <div class="min-h-screen flex flex-col bg-gradient-to-r from-gray-500 to-gray-700">
    <!-- Main Content -->
    <div class="flex-1 flex items-center justify-center">
      <div class="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 class="text-3xl font-bold mb-6 text-center text-gray-800">Parts Manager</h2>
        <form @submit.prevent="login">
          <div class="mb-4">
            <label for="username" class="block text-gray-700 font-semibold mb-2">Username</label>
            <input
              type="text"
              id="username"
              v-model="username"
              class="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div class="mb-4">
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
            class="w-full bg-gray-700 text-white py-2 rounded hover:bg-green-600 transition duration-200"
          >
            Login
          </button>
          <p v-if="errorMessage" class="text-red-500 mt-4 text-center">{{ errorMessage }}</p>
        </form>
      </div>
    </div>
    <!-- Footer -->
    <FooterLayout />
  </div>
</template>

<script>
import axios from 'axios';
import { useRouter } from 'vue-router';
import FooterLayout from '../layouts/admin/FooterLayout.vue';

export default {
  components: {
    FooterLayout
  },
  data() {
    return {
      username: '',
      password: '',
      errorMessage: ''
    };
  },
  setup() {
    const router = useRouter();
    return { router };
  },
  methods: {
    async login() {
      try {
        const response = await axios.post('http://localhost:1337/auth/local', {
          identifier: this.username,
          password: this.password
        });

        if (response.data.jwt) {
          const userRoleId = response.data.user.role.id; // Adjust based on your Strapi user model
          if (userRoleId >= 4) {
            this.router.push('/app'); // Redirect to app.vue
          } else {
            this.router.push('/order/new'); // Redirect to /order/new
          }
        } else {
          this.errorMessage = 'Login failed. Please check your credentials.';
        }
      } catch (error) {
        console.error('Error during login:', error);
        this.errorMessage = 'An error occurred. Please try again later.';
      }
    }
  }
};
</script>

<style scoped>
body {
  font-family: 'Inter', sans-serif;
}
</style>
