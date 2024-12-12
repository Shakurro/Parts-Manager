<template>
    <span>{{ getCategoryName(categoryId) }}</span>
  </template>
  
  <script setup>
  const props = defineProps({
    categoryId: {
      type: Number,
      required: true,
      default: 0  // Standardwert wenn null
    }
  })
  
  const categoryMap = {
    0: 'Keine Kategorie',
    1: 'Aufbau',
    2: 'Rahmen',
    3: 'Elektrik',
    4: 'Motor',
    5: 'Bremse',
    6: 'Achse',
    7: 'Betriebsstoffe',
    8: 'Schrauben',
    9: 'Ladeboardwand'
  }
  
  const getCategoryName = (categoryId) => {
    if (categoryId === null || categoryId === undefined) {
      return 'Keine Kategorie'
    }
    return categoryMap[categoryId] || 'Unbekannte Kategorie'
  }
  </script>