import { reactive } from 'vue';
import Cookies from 'js-cookie';

export const userStore = reactive({
  userData: null,

  // Rollenmapping
  getRoleFromPermission(permissionId) {
    const roleMap = {
      1: 'User',
      2: 'Manager',
      3: 'Admin'
    };
    return roleMap[permissionId] || 'Unknown';
  },

  // Rollenprüfungen
  hasMinPermission(level) {
    return (this.userData?.permissions || 0) >= level;
  },

  isAdmin() {
    return this.userData?.permissions === 3;
  },

  isManager() {
    return this.userData?.permissions >= 2;
  },

  // Bestehende Methoden
  setUserData(data) {
    this.userData = data;
    Cookies.set('userData', JSON.stringify(data), { expires: 1 });
  },

  clearUserData() {
    this.userData = null;
    Cookies.remove('userData');
  },

  loadUserDataFromCookies() {
    const userData = Cookies.get('userData');
    if (userData) {
      this.userData = JSON.parse(userData);
    }
  },
});
