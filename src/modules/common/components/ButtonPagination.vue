<template>
  <div class="flex justify-center py-10 bg-gray-100 space-x-3">
    <button
      class="flex items-center space-x-1.5 rounded-lg px-4 py-1.5 text-white bg-blue-500 disabled:bg-gray-300"
      :disabled="isFirstPage"
      @click="handlePrevious"
    >
      <span>Previous</span>
      <LeftArrow />
    </button>
    <button
      class="flex items-center space-x-1.5 rounded-lg px-4 py-1.5 text-white bg-blue-500 disabled:bg-gray-300"
      :disabled="isLastPage"
      @click="handleNext"
    >
      <span>Next</span>
      <RightArrow />
    </button>
  </div>
</template>

<script setup lang="ts">
import RightArrow from '@/icons/RightArrow.vue';
import LeftArrow from '@/icons/LeftArrow.vue';
import { useRouter } from 'vue-router';

interface Props {
  page: number;
  isFirstPage: boolean;
  isLastPage: boolean;
}

const router = useRouter();

const props = defineProps<Props>();

const handlePrevious = () => {
  router.push({ query: { page: props.page - 1 } })
};

const handleNext = () => {
  router.push({ query: { page: props.page + 1 } })
};
</script>

<style scoped></style>