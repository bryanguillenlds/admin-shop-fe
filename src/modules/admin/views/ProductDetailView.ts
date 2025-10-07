import { defineComponent } from 'vue';
import { useQuery } from '@tanstack/vue-query';
import { getProductById } from '@/modules/products/actions';
import { watchEffect } from 'vue';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'ProductDetailView',

  props: {
    productId: {
      type: String,
      required: true,
    },
  },

  setup(props) {
    const router = useRouter();
    const {
      data: product,
      isLoading,
      isError,
    } = useQuery({
      queryKey: ['product', props.productId],
      queryFn: () => getProductById(props.productId),
      retry: false,
    });

    watchEffect(() => {
      if (isError.value && isLoading.value) {
        router.replace('/admin/products');
      }
    });

    return {
      //Props
      product,

      //Getters
      allSizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],

      //Actions
    };
  },
});
