<template>
  <div>
    <BarChart :chart-data="chartData" :options="chartOptions" />
  </div>
</template>

<script>
import { Bar } from 'vue-chartjs';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

export default {
  name: 'PartsChart',
  components: {
    BarChart: Bar
  },
  props: {
    parts: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      chartData: {
        labels: [],
        datasets: []
      }
    };
  },
  watch: {
    parts: {
      immediate: true,
      handler(newParts) {
        this.chartData = {
          labels: newParts.map(part => part.name),
          datasets: [
            {
              label: 'Price',
              backgroundColor: '#42A5F5',
              data: newParts.map(part => parseFloat(part.price.replace('$', '')))
            }
          ]
        };
      }
    }
  },
  computed: {
    chartOptions() {
      return {
        responsive: true,
        maintainAspectRatio: false
      };
    }
  }
};
</script>

<style scoped>
/* Add any additional styles here */
</style> 