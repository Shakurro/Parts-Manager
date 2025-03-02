<template>
  <div>
    <div class="min-h-screen flex flex-col bg-gradient-to-r from-gray-500 to-gray-700">
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
                class="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-800"
                required
              />
            </div>
            <div class="mb-4">
              <label for="password" class="block text-gray-700 font-semibold mb-2">Password</label>
              <input
                type="password"
                id="password"
                v-model="password"
                class="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-800"
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
          <div class="text-center py-4">
            <p class="text-gray-800">© Created by Jan Zetzmann</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useRouter } from 'vue-router';
import { login } from '@/services/authService';
import { fetchUserData } from '@/services/userService';
import { userStore } from '@/stores/userStore';

export default {
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
        const jwtToken = await login(this.username, this.password);
        if (jwtToken) {
          const userData = await fetchUserData(jwtToken);
          userStore.setUserData(userData);

          this.router.push('/store');
        } else {
          this.errorMessage = 'Falscher Benutzername oder falsches Passwort.';
        }
      } catch (error) {
        console.error('Error during login:', error);
        this.errorMessage = 'Falscher Benutzername oder falsches Passwort';
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
