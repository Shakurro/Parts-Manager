import { useNuxtApp } from '#app';

export async function fetchPartsEntries() {
  try {
    return await $fetch('/api/partsentries');
  } catch (error) {
    throw error;
  }
}

export async function updatePartEntry(id, updatedData) {
  try {
    return await $fetch(`/api/partsentries/${id}`, {
      method: 'PUT',
      body: updatedData,
    });
  } catch (error) {
    console.error('Error updating part entry:', error);
    throw error;
  }
}

export async function addPartEntry(newData) {
  try {
    return await $fetch('/api/partsentries', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getCookie('jwtToken')}` // Falls erforderlich
      },
      body: JSON.stringify(newData),
    });
  } catch (error) {
    console.error('Error adding part entry:', error);
    throw error;
  }
}