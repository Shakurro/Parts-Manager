<template>
    <NuxtLayout :name="layoutName">
        <NuxtPage />
    </NuxtLayout>
</template>

<script>
import '../assets/styles/global.css';
import { userStore } from '@/stores/userStore';

export default {
    computed: {
        layoutName() {
            return this.$route.name === 'login' ? 'login-all' : 'home-admin';
        }
    },
    created() {
        userStore.loadUserDataFromCookies();
    }
}
</script>