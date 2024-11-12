<template>
    <NuxtLayout :name="layoutName">
        <NuxtPage />
    </NuxtLayout>
</template>

<script>
import '../assets/styles/global.css';

export default {
    computed: {
        layoutName() {
            return this.$route.name === 'login' ? 'login-all' : 'home-admin';
        }
    }
}
</script>