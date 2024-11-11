<template>
  <div class="min-h-screen bg-gray-100 flex flex-col">
    <!-- Include Header Layout -->
    <HeaderLayout />
    <div><h1>Hallo</h1></div>
    <FooterLayout />
  </div>
</template>

<script>
import HeaderLayout from '../layouts/admin/HeaderLayout.vue';
import FooterLayout from '../layouts/admin/FooterLayout.vue';

export default {
  name: 'AdminDashboard',
  components: {
    HeaderLayout,
    FooterLayout
  },
  data() {
    return {
    };
  },
  methods: {
  }
};
</script>

<style scoped>
</style> 