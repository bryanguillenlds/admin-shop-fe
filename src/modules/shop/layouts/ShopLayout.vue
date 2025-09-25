<template>
  <div class="min-h-screen flex flex-col">
    <TopMenu />
    <!-- Title -->
    <div class="pt-32 bg-white">
      <h1 class="text-center text-2xl font-bold text-gray-800">All Products</h1>
    </div>

    <!-- Main content area that grows to fill space -->
    <main class="flex-1 bg-gray-100">
      <RouterView />
    </main>

    <CustomFooter />
  </div>
</template>

<script setup lang="ts">
import TopMenu from '../components/TopMenu.vue'
import CustomFooter from '../components/CustomFooter.vue'
</script>

<style scoped></style>
