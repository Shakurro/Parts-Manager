import { reactive } from 'vue';
import Cookies from 'js-cookie';

export const userStore = reactive({
  userData: null,

  setUserData(data) {
    this.userData = data;
    // Speichere die Benutzerdaten in Cookies
    Cookies.set('userData', JSON.stringify(data), { expires: 1 }); // 1 Tag
  },

  clearUserData() {
    this.userData = null;
    // Entferne die Benutzerdaten aus den Cookies
    Cookies.remove('userData');
  },

  loadUserDataFromCookies() {
    const userData = Cookies.get('userData');
    if (userData) {
      this.userData = JSON.parse(userData);
    }
  },
});
