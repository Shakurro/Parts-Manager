// server/api/auth/login.js

import axios from 'axios';
import { fetchUserData } from '../../../services/userService';
import { userStore } from '@/stores/userStore';

export default defineEventHandler(async (event) => {
  const { username, password } = await readBody(event);

  try {
    const response = await axios.post('http://212.132.77.32:1337/auth/local', {
      identifier: username,
      password: password,
    });

    if (response.data.jwt) {
      // Erfolgreicher Login, JWT-Token zurückgeben
      const jwt = response.data.jwt;
      
      // Fetch user data and store it
      const userData = await fetchUserData(jwt);
      userStore.setUserData(userData);

      return { jwt };
    } else {
      throw new Error('Login failed');
    }
  } catch (error) {
    // Fehler zurückgeben, damit die Komponente eine Meldung anzeigen kann
    throw createError({ statusCode: 401, message: 'Invalid credentials' });
  }
});
