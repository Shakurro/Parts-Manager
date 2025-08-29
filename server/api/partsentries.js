import axios from 'axios';

export default defineEventHandler(async (event) => {
  const jwtToken = getCookie(event, 'jwtToken'); // Cookie JWT-Token abrufen
  const baseURL = '';
  

  if (event.req.method === 'GET') {
    try {
      const response = await axios.get(baseURL, {
        headers: { Authorization: `Bearer ${jwtToken}` },
        params: { _limit: -1 }, // Alle Einträge abrufen
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching entries:', error);
      throw error;
    }
  } else if (event.req.method === 'POST') {
    try {
      const body = await useBody(event);
      console.log('Received body:', body); // Logge die empfangenen Daten

      const response = await axios.post(baseURL, body, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${jwtToken}`
        }
      });

      console.log('Response from external API:', response.data); // Logge die Antwort der externen API

      return response.data;
    } catch (error) {
      console.error('Error sending data to external API:', error.response ? error.response.data : error.message);
      throw error;
    }
  }
});
