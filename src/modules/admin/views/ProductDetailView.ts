import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ProductDetailView',
  setup() {
    console.log('ProductDetailView');

    return {
      //Props

      //Getters
      allSizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],

      //Actions
    };
  },
});
