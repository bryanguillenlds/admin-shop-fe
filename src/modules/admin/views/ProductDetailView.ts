import { defineComponent } from 'vue';
import { useQuery } from '@tanstack/vue-query';
import { getProductById } from '@/modules/products/actions';
import { watchEffect } from 'vue';
import { useRouter } from 'vue-router';
import { useForm } from 'vee-validate';
import * as yup from 'yup';

import CustomInput from '@/modules/common/components/CustomInput.vue';
import CustomTextArea from '@/modules/common/components/CustomTextArea.vue';

const validationSchema = yup.object({
  title: yup.string().required('Title is required').min(3, 'Title must be at least 3 characters'),
  slug: yup.string().required('Slug is required'),
  description: yup.string().required('Description is required'),
  price: yup.number().required('Price is required'),
  stock: yup.number().min(1).required('Stock is required'),
  gender: yup.string().required('Gender is required').oneOf(['kid', 'women', 'men']),
  tags: yup.array().of(yup.string()).required('Tags are required'),
});

export default defineComponent({
  name: 'ProductDetailView',

  components: {
    CustomInput,
    CustomTextArea,
  },

  props: {
    productId: {
      type: String,
      required: true,
    },
  },

  setup(props) {
    const router = useRouter();

    const { values, defineField, errors, handleSubmit } = useForm({
      validationSchema,
    });

    const [title, titleAttrs] = defineField('title');
    const [slug, slugAttrs] = defineField('slug');
    const [description, descriptionAttrs] = defineField('description');
    const [price, priceAttrs] = defineField('price');
    const [stock, stockAttrs] = defineField('stock');
    const [gender, genderAttrs] = defineField('gender');
    const [tags, tagsAttrs] = defineField('tags');
    // const [images, imagesAttrs] = defineField('images');
    // const [sizes, sizesAttrs] = defineField('sizes');

    const onSubmit = handleSubmit((values) => {
      console.log('values', values);
    });

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

      // Form fields
      values,
      errors,
      title,
      titleAttrs,
      slug,
      slugAttrs,
      description,
      descriptionAttrs,
      price,
      priceAttrs,
      stock,
      stockAttrs,
      gender,
      genderAttrs,
      tags,
      tagsAttrs,

      //Getters
      allSizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],

      //Actions
      onSubmit,
    };
  },
});
