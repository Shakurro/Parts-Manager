export async function login(username, password) {
  try {
    const response = await $fetch('/api/auth/login', {
      method: 'POST',
      body: { username, password },
    });

    if (import.meta.client) {
      sessionStorage.setItem('jwtToken', response.jwt);
      document.cookie = `jwtToken=${response.jwt}; path=/;`;
    }

    return response.jwt;
  } catch (error) {
    console.error('Login failed:', error);
    throw new Error('Login failed: Please check your credentials.');
  }
}
