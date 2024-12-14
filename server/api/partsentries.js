import axios from 'axios';

export default defineEventHandler(async (event) => {
  const jwtToken = getCookie(event, 'jwtToken'); // Cookie JWT-Token abrufen
  const baseURL = 'http://212.132.77.32:1337/partsentries';

  try {
    const response = await axios.get(baseURL, {
      headers: { Authorization: `Bearer ${jwtToken}` },
      params: { _limit: -1 }, // Alle Einträge abrufen
    });
    return response.data;
  } catch (error) {
  }
});