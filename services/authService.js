// services/authService.js

export async function login(username, password) {
    const response = await $fetch('/api/auth/login', {
      method: 'POST',
      body: { username, password },
    });
  
    if (import.meta.client) {
      sessionStorage.setItem('jwtToken', response.jwt);
      document.cookie = `jwtToken=${response.jwt}; path=/;`;
      console.log('JWT gespeichert:', response.jwt);
    }
  
    return response.jwt;
  }
  