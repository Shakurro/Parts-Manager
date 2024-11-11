<template>
  <div class="min-h-screen flex flex-col bg-gray-100">
    <HeaderLayout />

    <main class="flex-1 container mx-auto w-1/2 px-4 py-6">
      <div class="bg-white p-6 rounded shadow-md col-span-1">
        <h3 class="text-lg font-bold mb-4">New Order</h3>
        <ul>
          <li>
            <NuxtLink to="/app">
              <button class="bg-gray-800 text-white py-2 px-4 rounded hover:bg-gray-600 transition duration-200">New Order</button>
            </NuxtLink>
          </li>
        </ul>
      </div>

      <div class="mb-6"></div>

      
      <div class="overflow-y-auto max-h-96">
        <ul class="space-y-6">
          <li v-for="i in 10" :key="i" class="bg-white p-6 rounded shadow-md">
            <h3 class="text-xl font-bold mb-2">52500098{{ i.toString().padStart(3, '0') }}</h3>
            <p>Ersatzteile können hier gebucht werden</p>
            
            <div style="overflow: auto">
              <n-timeline horizontal>
                <n-timeline-item content="pending" />
                <n-timeline-item
                  type="info"
                  title="Erstellt"
                  content=""
                  time="11.11.2024 20:46"
                />
                <n-timeline-item
                  type="warning"
                  title="In Bearbeitung"
                  content=""
                  time=""
                />
                <n-timeline-item
                  type="error"
                  title="zur Abrechnung"
                  content=""
                  time=""
                />
                <n-timeline-item
                  type="success"
                  title="Abgeschlossen"
                  content=""
                  time=""
                />
                <div class="flex justify-center space-x-4 pl-5">
                  <button class="bg-gray-800 text-white py-2 px-4 rounded hover:bg-gray-600 transition duration-200">Ersatzteil hinzufügen</button>
                  <button class="bg-gray-800 text-white py-2 px-4 rounded hover:bg-gray-600 transition duration-200">zur Abrechnung</button>
                </div>
              </n-timeline>
            </div>
          </li>
        </ul>
      </div>
    </main>
   
    <FooterLayout />
  </div>
</template>

<script>
import HeaderLayout from '../layouts/admin/HeaderLayout.vue';
import FooterLayout from '../layouts/admin/FooterLayout.vue';

export default {
  name: 'Orders',
  components: {
    HeaderLayout,
    FooterLayout,
  },
  methods: {
    navigateToNewOrder() {
      this.$router.push({ name: 'NewOrder' });
    }
  }
};
</script>

<style scoped>
.space-y-6 > :not(:last-child) {
  margin-bottom: 1.5rem;
}

.overflow-y-auto {
  overflow-y: auto;
}

.max-h-96 {
  max-height: 24rem; /* Adjust the height as needed */
}
</style>