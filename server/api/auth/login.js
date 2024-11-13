// server/api/auth/login.js

import axios from 'axios';

export default defineEventHandler(async (event) => {
  const { username, password } = await readBody(event);

  try {
    const response = await axios.post('http://localhost:1337/auth/local', {
      identifier: username,
      password: password,
    });

    if (response.data.jwt) {
      // Erfolgreicher Login, JWT-Token zurückgeben
      return { jwt: response.data.jwt };
    } else {
      throw new Error('Login failed');
    }
  } catch (error) {
    // Fehler zurückgeben, damit die Komponente eine Meldung anzeigen kann
    throw createError({ statusCode: 401, message: 'Invalid credentials' });
  }
});
