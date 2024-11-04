<template>
    <header class="bg-gray-800 shadow-md">
      <div class="container mx-auto px-4 py-4 flex justify-between items-center">
        <h1 class="text-2xl font-bold text-white">Parts Manager</h1>
        <nav class="flex space-x-4 items-center ml-auto">
          <NuxtLink to="/order/new" class="text-gray-300 hover:text-white">New Order</NuxtLink>
          <NuxtLink to="/order/my" class="text-gray-300 hover:text-white">My Orders</NuxtLink>
          <UserAvatar />
        </nav>
      </div>
    </header>
  </template>
  
  <script>
  import UserAvatar from '~/components/UserAvatar.vue';
  
  export default {
    name: 'HeaderLayout',
    components: {
      UserAvatar
    }
  };
  </script>
  
  <style scoped>
  /* Add any additional styles here */
  </style>
    