<template>
  <NuxtLayout>
    <div class="min-h-screen bg-gray-100 flex flex-col">
      <HeaderLayout />

      <main class="flex-1 container mx-auto px-4 py-6">
        <div class="bg-white p-6 rounded shadow-md">
          <h2 class="text-2xl font-bold mb-4">Einstellungen</h2>
          <form @submit.prevent="saveSettings">
            <div class="flex space-x-4">
              <div class="bg-gray-300 p-4 rounded mb-4 shadow-sm w-1/2 space-y-4">
                <div>
                  <label for="username" class="block text-gray-700 font-semibold mb-1">Benutzername</label>
                  <input
                    type="text"
                    id="username"
                    v-model="settings.username"
                    class="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label for="birthday" class="block text-gray-700 font-semibold mb-1">Geburtstag</label>
                  <input
                    type="date"
                    id="birthday"
                    v-model="settings.birthday"
                    class="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label for="role" class="block text-gray-700 font-semibold mb-1">Rolle</label>
                  <input
                    type="text"
                    id="role"
                    v-model="settings.role"
                    class="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              

              <div class="bg-gray-300 p-4 rounded mb-4 shadow-sm w-1/2">
                <label for="password" class="block text-gray-700 font-semibold mb-2">Neues Passwort</label>
                <input
                  type="password"
                  id="password"
                  v-model="settings.newPassword"
                  class="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <label for="confirmPassword" class="block text-gray-700 font-semibold mb-2 mt-4">Passwort bestätigen</label>
                <input
                  type="password"
                  id="confirmPassword"
                  v-model="settings.confirmPassword"
                  class="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="button"
                  @click="changePassword"
                  class="bg-gray-800 text-white py-2 px-4 mt-4 rounded hover:bg-green-600 transition duration-200"
                >
                  Passwort ändern
                </button>
                <p v-if="passwordError" class="text-red-500 mt-2">{{ passwordError }}</p>
              </div>
            </div>

            <div class="flex space-x-4">
              <div class="bg-gray-300 p-4 rounded mb-4 shadow-sm w-1/2">
                <label class="block text-gray-700 font-semibold mb-2">E-Mail Benachrichtigungen</label>
                <div class="flex items-center">
                  <input type="checkbox" v-model="settings.emailNotifications" class="toggle-switch" disabled checked />
                </div>
                
                <label class="block text-gray-700 font-semibold mb-2">Push Benachrichtigungen</label>
                <div class="flex items-center">
                  <input type="checkbox" v-model="settings.smsNotifications" class="toggle-switch" disabled checked />
                </div>
                
                <label class="block text-gray-700 font-semibold mb-2">System Benachrichtigungen</label>
                <div class="flex items-center">
                  <input type="checkbox" v-model="settings.pushNotifications" class="toggle-switch" disabled checked />
                </div>
              </div>

              <div class="bg-gray-300 p-4 rounded mb-4 shadow-sm w-1/2">
                <label class="block text-gray-700 font-semibold mb-2">Layout der Website</label>
                <select v-model="settings.layout" class="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="light">Helles Layout</option>
                  <option value="dark">Dunkles Layout</option>
                  <option value="rainbow">Rainbow Layout</option>
                  <option value="negative">Negativ Layout</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              class="bg-gray-800 text-white py-2 px-4 rounded hover:bg-green-600 transition duration-200"
            >
              Speichern
            </button>
          </form>
        </div>
      </main>

      <FooterLayout />
    </div>
  </NuxtLayout>
</template>

<script>
import HeaderLayout from '../layouts/admin/HeaderLayout.vue';
import FooterLayout from '../layouts/admin/FooterLayout.vue';

export default {
  name: 'Settings',
  components: {
    HeaderLayout,
    FooterLayout
  },
  data() {
    return {
      settings: {
        username: 'John Doe',
        newPassword: '', 
        confirmPassword: '',
        emailNotifications: true, // Beispielwert
        smsNotifications: true, // Beispielwert
        pushNotifications: true, // Beispielwert
        layout: 'light' // layout
      },
      passwordError: ''
    };
  },
  methods: {
    saveSettings() {
      console.log('Einstellungen gespeichert:', this.settings);
    },
    changePassword() {
      if (this.settings.newPassword !== this.settings.confirmPassword) {
        this.passwordError = 'Die Passwörter stimmen nicht überein.';
      } else {
        this.passwordError = '';
        console.log('Passwort geändert:', this.settings.newPassword);
      }
    }
  }
};
</script>

<style scoped>
.toggle-switch {
  appearance: none;
  width: 40px;
  height: 20px;
  background-color: #ccc;
  border-radius: 10px;
  position: relative;
  outline: none;
  cursor: pointer;
  transition: background-color 0.2s;
}

.toggle-switch:checked {
  background-color: #4caf50;
}

.toggle-switch:before {
  content: '';
  position: absolute;
  width: 18px;
  height: 18px;
  background-color: white;
  border-radius: 50%;
  top: 1px;
  left: 1px;
  transition: transform 0.2s;
}

.toggle-switch:checked:before {
  transform: translateX(20px);
}
</style>
