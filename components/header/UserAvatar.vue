<template>
  <div class="user-avatar" @click="toggleMenu">
    <img :src="avatarUrl" alt="User Avatar" class="avatar-image" />
    <div v-if="menuOpen" class="dropdown-menu">
      <ul>
        <li class="username-branch-display">{{ fullName }} ({{ branch }})</li>
        <li class="role-display">Rolle: {{ userRole }}</li>
        <li v-if="isAdmin" @click="navigateToUserPanel">User Panel</li>
        <li v-if="isAdmin" @click="navigateToSettings">Einstellungen</li>
        <li @click="logout">Abmelden</li>
      </ul>
    </div>
  </div>
</template>

<script>
import { userStore } from '@/stores/userStore'; // Korrigierter Importpfad

export default {
  data() {
    return {
      menuOpen: false,
      avatarUrl: 'https://loremflickr.com/150/150', // UserBild
      branch: '0525' // wird später über Datenbank bezogen
    };
  },
  mounted() {
    document.addEventListener('click', this.handleOutsideClick);
  },
  beforeDestroy() {
    document.removeEventListener('click', this.handleOutsideClick);
  },
  computed: {
    fullName() {
      const { first_name, second_name } = userStore.userData || {};
      return `${first_name || ''} ${second_name || ''}`.trim();
    },
    userRole() {
      const roleMap = {
        1: 'User',
        2: 'Manager',
        3: 'Admin'
      };
      const roleId = userStore.userData?.permissions;
      return roleMap[roleId] || 'Unknown'; // Fallback auf 'Unknown', falls die Rolle nicht definiert ist
    },
    isAdmin() {
      return this.userRole === 'Admin';
    }
  },
  methods: {
    toggleMenu() {
      this.menuOpen = !this.menuOpen;
    },
    handleOutsideClick(event) {
      if (this.menuOpen && !this.$el.contains(event.target)) {
        this.menuOpen = false;
      }
    },
    viewProfile() {
    },
    navigateToSettings() {
      if (this.isAdmin) {
        this.$router.push('/user/settings');
      } else {
      }
    },
    navigateToUserPanel() {
      if (this.isAdmin) {
        this.$router.push('/admin/panel');
      } else {
      }
    },
    logout() {
      if (process.client) {
        // Entferne den Token aus dem sessionStorage
        sessionStorage.removeItem('jwtToken');

        // Entferne die Benutzerdaten aus dem userStore und den Cookies
        userStore.clearUserData();

        // TODO: die Cookies sollen schon nach 12-24 Std. der Erstellung ablaufen,
        // TODO: der Token soll immer überprüft werden.
        document.cookie = 'jwtToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';

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
  background-color: #ffffff;
  border: 1px solid #e0e0e0;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  z-index: 1000;
  width: 180px;
  border-radius: 8px;
  padding: 10px 0;
}

.dropdown-menu ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.dropdown-menu li {
  padding: 12px 20px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.dropdown-menu li:hover {
  background-color: #f5f5f5;
}

.username-branch-display,
.role-display {
  font-weight: bold;
  color: #333;
  margin-bottom: 8px;
  font-size: 0.875rem;
  cursor: default;
}

.role-display {
  border-bottom: 1px solid #e0e0e0;
  font-size: 0.75rem;
  padding-bottom: 8px;
}
</style>
