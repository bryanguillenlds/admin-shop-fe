import { useRoute } from 'vue-router';
import { computed, watch } from 'vue';

export const usePagination = () => {
  const route = useRoute();
  const page = computed(() => (route.query.page ? Number(route.query.page) : 1));

  // Watch for page changes and scroll to top smoothly
  watch(page, () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  });

  return {
    page,
  };
};
