import { defineComponent } from 'vue';
import { useMutation, useQuery } from '@tanstack/vue-query';
import { createUpdateProductAction, getProductById } from '@/modules/products/actions';
import { watchEffect, watch, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useForm, useFieldArray } from 'vee-validate';
import { useToast } from 'vue-toastification';
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
  images: yup.array().of(yup.string()).default([]),
  sizes: yup.array().of(yup.string()).default([]),
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
    const toast = useToast();

    const {
      data: product,
      isLoading,
      isError,
      refetch,
    } = useQuery({
      queryKey: ['product', props.productId],
      queryFn: () => getProductById(props.productId),
      retry: false,
    });

    const {
      mutate,
      isPending,
      isSuccess: isUpdateSuccess,
      data: updatedProduct,
    } = useMutation({
      mutationFn: createUpdateProductAction,
    });

    const { values, defineField, errors, handleSubmit, resetForm, meta } = useForm({
      validationSchema,
      initialValues: product.value as any, //eslint-disable-line
    });

    const [title, titleAttrs] = defineField('title');
    const [slug, slugAttrs] = defineField('slug');
    const [description, descriptionAttrs] = defineField('description');
    const [price, priceAttrs] = defineField('price');
    const [stock, stockAttrs] = defineField('stock');
    const [gender, genderAttrs] = defineField('gender');
    const [tags, tagsAttrs] = defineField('tags');

    const { fields: images } = useFieldArray<string>('images');
    const { fields: sizes, remove: removeSize, push: pushSize } = useFieldArray<string>('sizes');

    const imageFiles = ref<File[]>([]);

    const onSubmit = handleSubmit((values) => {
      const productFormValues = {
        ...values,
        images: [...values.images, ...imageFiles.value],
      };

      mutate(productFormValues); // Calls createUpdateProductAction action
    });

    const toggleSize = (size: string) => {
      // Get current selected sizes from form field selectors
      const currentSizes = sizes.value.map((s) => s.value);

      // If size is already selected, remove it (toogle it)
      if (currentSizes.includes(size)) {
        removeSize(currentSizes.indexOf(size));
      } else {
        // If size is not selected, add it
        pushSize(size);
      }
    };

    const onFileChange = (event: Event) => {
      const fileList = (event.target as HTMLInputElement).files;
      if (!fileList || fileList.length === 0) return;

      imageFiles.value = Array.from(fileList);
    };

    const hasSize = (size: string) => {
      const currentSizes = sizes.value.map((s) => s.value);

      return currentSizes.includes(size);
    };

    const tempImageUrl = (file: File) => {
      return URL.createObjectURL(file);
    };

    watchEffect(() => {
      if (isError.value && isLoading.value) {
        router.replace('/admin/products');
      }
    });

    watch(
      product,
      () => {
        if (!product) return;

        resetForm({
          values: product.value as any, //eslint-disable-line
        });
      },
      { deep: true, immediate: true }
    );

    watch(isUpdateSuccess, (value) => {
      if (!value) return;

      toast.success('Product updated successfully');

      router.replace(`/admin/products/${updatedProduct.value?.id}`);

      resetForm({
        values: updatedProduct.value ?? {},
      });

      imageFiles.value = [];
    });

    // Watching the url for changes in the productId (or create)
    // because they id may have changed but the product values may not have been updated yet
    // During that delay, (tanstack updating the product after the url has already changed)
    // we may have stale data in the form, so we need to refetch the product data manually as soon
    // as the url has changed. (the watcher for product will react and populate the form)
    watch(
      () => props.productId,
      () => {
        refetch();
      }
    );

    return {
      //Props
      product,
      isPending,

      // Form fields
      values,
      errors,
      meta,

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

      images,
      sizes,

      imageFiles,
      tempImageUrl,

      //Getters
      allSizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],

      //Actions
      onSubmit,
      toggleSize,
      hasSize,
      onFileChange,
    };
  },
});
