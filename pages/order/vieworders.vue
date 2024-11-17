<template>
  <div class="min-h-screen flex flex-col bg-gray-100">

    <main class="flex-1 container mx-auto w-fit px-4 py-6">
      <div class="bg-white p-6 rounded shadow-md col-span-1 flex items-center justify-between">
        <h1 class="text-lg font-bold mb-4">Partpacks</h1>
        <NuxtLink to="/">
          <button class="bg-gray-800 text-white py-2 px-4 rounded hover:bg-green-600 transition duration-200 flex items-center">
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
            </svg>
            Home
          </button>
        </NuxtLink>
      </div>

      <div class="mb-6"></div>

      
      <div class="overflow-y-auto ">
        <ul class="space-y-6">
          <li v-for="i in 10" :key="i" class="bg-white p-6 rounded shadow-md">
            <h3 class="text-xl font-bold mb-2">52500098{{ i.toString().padStart(3, '0') }}</h3>
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
   
  </div>
</template>

<script>
import naiveUI from 'naive-ui';

const { create, NTimeline, NTimelineItem } = naiveUI;
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