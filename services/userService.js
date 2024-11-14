import axios from 'axios';

export async function fetchUserData(jwt) {
  try {
    const response = await axios.get('http://212.132.77.32:1337/users/me', {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw error;
  }
}
