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