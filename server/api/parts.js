// server/api/parts.js

import axios from 'axios';

export default defineEventHandler(async (event) => {
  const jwtToken = getCookie(event, 'jwtToken'); // Cookie JWT-Token abrufen
  const method = event.node.req.method;

  // Base URL der externen API
  const baseURL = 'http://localhost:1337/items';

  if (method === 'GET') {
    try {
      const response = await axios.get(baseURL, {
        headers: { Authorization: `Bearer ${jwtToken}` },
        params: { _limit: -1 },
      });
      return response.data;
    } catch (error) {
      throw createError({ statusCode: 500, message: 'Error fetching items' });
    }
  } else if (method === 'PUT') {
    try {
      const { id, ...updatedPart } = await readBody(event);
      const response = await axios.put(`${baseURL}/${id}`, updatedPart, {
        headers: { Authorization: `Bearer ${jwtToken}` },
      });
      return response.data;
    } catch (error) {
      throw createError({ statusCode: 500, message: 'Error updating part' });
    }
  }
});
