// server/api/partpacks.js
import { defineEventHandler, getCookie } from 'h3';
import axios from 'axios'; // Importiere axios

export default defineEventHandler(async (event) => {
    const baseURL = 'http://212.132.77.32:1337/partpacks'; // Externe API-URL
    const jwtToken = getCookie(event, 'jwtToken'); // Hole den JWT-Token aus den Cookies

    if (!jwtToken) {
        throw createError({ statusCode: 401, message: 'Unauthorized: No token provided' }); // Fehler, wenn kein Token vorhanden ist
    }

    try {
        const response = await axios.get(baseURL, {
            headers: {
                Authorization: `Bearer ${jwtToken}`, // Füge den Token in den Header ein
            },
        });
        return response.data; // Gebe die Daten zurück
    } catch (error) {
        console.error('Error fetching partpacks:', error); // Fehlerprotokollierung
        throw createError({ statusCode: 500, message: 'Error fetching partpacks' }); // Fehlerbehandlung
    }
});