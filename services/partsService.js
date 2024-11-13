// services/partsService.js

export async function fetchParts() {
    return await $fetch('/api/parts'); // GET-Route aus server/api/parts.js
  }
  
  export async function updatePart(part) {
    return await $fetch(`/api/parts`, {
      method: 'PUT',
      body: part,
    });
  }
  