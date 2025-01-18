<template>
  <div class="bg-gray-100 min-h-screen">
    <main class="container mx-auto px-4 py-6">
      <!-- Zurück-Button -->
      <button
          @click="$router.back()"
          class="bg-white mb-4 shadow-md rounded-lg px-6 py-3 flex items-center hover:bg-gray-50 transition-colors duration-200"
        >
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          <span class="font-medium">Zurück</span>
        </button>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        <!-- Total Parts Value -->
        <div class="bg-white p-6 rounded shadow-md">
          <h3 class="text-lg font-bold mb-2">Total Parts Value</h3>
          <p class="text-2xl font-semibold">{{ totalPartsValue }} €</p>
        </div>

        <!-- Total Partpacks -->
        <div class="bg-white p-6 rounded shadow-md">
          <h3 class="text-lg font-bold mb-2">Total Partpacks</h3>
          <p class="text-2xl font-semibold">{{ totalPartpacks }}</p>
        </div>

        <!-- Total Users -->
        <div class="bg-white p-6 rounded shadow-md">
          <h3 class="text-lg font-bold mb-2">Total Users</h3>
          <p class="text-2xl font-semibold">{{ totalUsers }}</p>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- Price Distribution -->
        <div class="bg-white p-6 rounded shadow-md">
          <h3 class="text-lg font-bold mb-2">Price Distribution</h3>
          <canvas id="priceDistributionChart" class="w-full h-64"></canvas>
        </div>

        <!-- Top Parts by Margin -->
        <div class="bg-white p-6 rounded shadow-md">
          <h3 class="text-lg font-bold mb-2">Top Parts by Margin</h3>
          <canvas id="topMarginPartsChart" class="w-full h-64"></canvas>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <!-- Parts by Quantity -->
        <div class="bg-white p-6 rounded shadow-md">
          <h3 class="text-lg font-bold mb-2">Parts by Quantity</h3>
          <canvas id="partsQuantityChart" class="w-full h-64"></canvas>
        </div>

        <!-- Additional Chart Example -->
        <div class="bg-white p-6 rounded shadow-md">
          <h3 class="text-lg font-bold mb-2">Additional Analysis</h3>
          <canvas id="additionalChart" class="w-full h-64"></canvas>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { onMounted, computed } from 'vue';
import { Chart, registerables } from 'chart.js';
import { usePartsStore } from '@/stores/partsStore';
import { usePartpackStore } from '@/stores/partpackStore';
import { userStore } from '@/stores/userStore';

// Registriere alle notwendigen Chart.js-Komponenten
Chart.register(...registerables);

const partsStore = usePartsStore();
const partpackStore = usePartpackStore();

// Berechne den Gesamtwert der Teile
const totalPartsValue = computed(() => {
  return partsStore.parts.reduce((sum, part) => sum + (part.selling_price_eur || 0), 0).toFixed(2);
});

// Berechne die Gesamtanzahl der Partpacks
const totalPartpacks = computed(() => {
  return partpackStore.partpacks.length;
});

// Berechne die Gesamtanzahl der Benutzer
const totalUsers = computed(() => {
  return userStore.userData ? userStore.userData.length : 0;
});

function goBack() {
  window.history.back();
}

onMounted(async () => {
  await partsStore.fetchAllItems();
  await partpackStore.loadPartpacks();

  // Price Distribution Chart
  const priceDistributionCtx = document.getElementById('priceDistributionChart').getContext('2d');
  new Chart(priceDistributionCtx, {
    type: 'line',
    data: {
      labels: partsStore.parts.map(part => part.description),
      datasets: [
        {
          label: 'Buying Price (€)',
          data: partsStore.parts.map(part => part.buying_price_eur),
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1,
          fill: false
        },
        {
          label: 'Selling Price (€)',
          data: partsStore.parts.map(part => part.selling_price_eur),
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1,
          fill: false
        }
      ]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });

  // Top Parts by Margin Chart
  const topMarginPartsCtx = document.getElementById('topMarginPartsChart').getContext('2d');
  const partsWithMargin = partsStore.parts.map(part => ({
    description: part.description,
    margin: (part.selling_price_eur || 0) - (part.buying_price_eur || 0)
  })).sort((a, b) => b.margin - a.margin).slice(0, 10);
  new Chart(topMarginPartsCtx, {
    type: 'bar',
    data: {
      labels: partsWithMargin.map(part => part.description),
      datasets: [{
        label: 'Margin (€)',
        data: partsWithMargin.map(part => part.margin),
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1
      }]
    },
    options: {
      indexAxis: 'y',
      scales: {
        x: {
          beginAtZero: true
        }
      }
    }
  });

  // Parts by Quantity Chart
  const partsQuantityCtx = document.getElementById('partsQuantityChart').getContext('2d');
  new Chart(partsQuantityCtx, {
    type: 'bar',
    data: {
      labels: partsStore.parts.map(part => part.description),
      datasets: [{
        label: 'Quantity',
        data: partsStore.parts.map(part => part.instock),
        backgroundColor: 'rgba(153, 102, 255, 0.2)',
        borderColor: 'rgba(153, 102, 255, 1)',
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });

  // Additional Chart Example
  const additionalCtx = document.getElementById('additionalChart').getContext('2d');
  new Chart(additionalCtx, {
    type: 'pie',
    data: {
      labels: ['Category 1', 'Category 2', 'Category 3'],
      datasets: [{
        label: 'Example Data',
        data: [10, 20, 30],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
      }]
    }
  });
});
</script>

<style scoped>
/* Add any additional styles here */
</style>