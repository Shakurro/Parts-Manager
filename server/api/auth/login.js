import axios from 'axios';

export default defineEventHandler(async (event) => {
  const { username, password } = await readBody(event);

  try {
    const response = await axios.post('', {
      identifier: username,
      password: password,
    });

    if (response.data.jwt) {
      const jwt = response.data.jwt;

      return { jwt };
    } else {
      throw new Error('Login failed: JWT not found');
    }
  } catch (error) {
    console.error('Login Error:', error.response?.data || error.message); // Fehlerdetails loggen

    throw createError({
      statusCode: error.response?.status || 401,
      message: error.response?.data?.message || 'Invalid credentials',
    });
  }
});
