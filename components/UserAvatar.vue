<template>
  <div class="user-avatar" @click="toggleMenu">
    <img :src="avatarUrl" alt="User Avatar" class="avatar-image" />
    <div v-if="menuOpen" class="dropdown-menu">
      <ul>
        <li class="username-branch-display">{{ username }} ({{ branch }})</li>
        <li class="role-display">Rolle: {{ userRole }}</li>
        <li v-if="isAdmin" @click="navigateToSettings">Einstellungen</li>
        <li @click="logout">Abmelden</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      menuOpen: false,
      avatarUrl: 'https://loremflickr.com/150/150', // UserBild
      username: 'John Doe', // wird später über Datenbank bezogen
      userRole: 'Admin', // wird später über Datenbank bezogen
      branch: '0525' // wird später über Datenbank bezogen
    };
  },
  computed: {
    isAdmin() {
      return this.userRole.toLowerCase() === 'admin';
    }
  },
  methods: {
    toggleMenu() {
      this.menuOpen = !this.menuOpen;
    },
    viewProfile() {
      console.log('Profil anzeigen');
    },
    navigateToSettings() {
      if (this.isAdmin) {
        this.$router.push('/user/settings');
      } else {
        console.log('Zugriff verweigert: Nur Admins können die Einstellungen aufrufen.');
      }
    },
    logout() {
      if (process.client) {

        // Entferne den Token aus dem sessionStorage
        sessionStorage.removeItem('jwtToken');

        // TODO: die Cookies sollen schon nach 12-24 Std. der erstellung ablaufen,
        // TODO: der Token soll immer überprüft werden.
        document.cookie = 'jwtToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';

        console.log('JWT gelöscht');
        this.$router.push('/login');
      }
    }
  }
};
</script>

<style scoped>
.user-avatar {
  position: relative;
  display: inline-block;
  cursor: pointer;
}

.avatar-image {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}

.dropdown-menu {
  position: absolute;
  top: 60px;
  right: 0;
  background-color: white;
  border: 1px solid #ccc;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  width: 150px;
}

.dropdown-menu ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.dropdown-menu li {
  padding: 10px;
  cursor: pointer;
}

.dropdown-menu li:hover {
  background-color: #f0f0f0;
}

.username-branch-display,
.role-display {
  font-weight: bold;
  color: #333;
  margin-bottom: 5px;
  font-size: 0.875rem; /* Kleinere Schriftgröße */
  cursor: default; /* Kein Zeiger-Cursor */
}

.role-display {
  border-bottom: 1px solid #ccc;
  font-size: 0.75rem; /* Noch kleinere Schriftgröße */
}
</style>
