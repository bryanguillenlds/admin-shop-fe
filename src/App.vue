<template>
  <FullScreenLoader v-if="authStore.isChecking" />
  <RouterView v-else />
  <!-- <VueQueryDevtools /> -->
</template>

<script setup lang="ts">
import { useAuthStore } from './modules/auth/stores/auth/auth.store';
import { AuthStatus } from './modules/auth/interfaces';
import { useRoute, useRouter } from 'vue-router';
import FullScreenLoader from './modules/common/components/FullScreenLoader.vue';
// import { VueQueryDevtools } from '@tanstack/vue-query-devtools'

const authStore = useAuthStore();

const route = useRoute();
const router = useRouter();

authStore.$subscribe(
  (mutation, state) => {
    if (state.authStatus === AuthStatus.CHECKING) {
      authStore.checkAuthStatus();
      return;
    }

    if (state.authStatus === AuthStatus.AUTHENTICATED && route.path.includes('/auth')) {
      router.replace({ name: 'home' });
      return;
    }
  },
  {
    immediate: true,
  }
);
</script>

<style scoped></style>
