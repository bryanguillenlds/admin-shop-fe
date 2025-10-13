import { tesloApi } from '@/api/tesloApi';
import type { Product } from '../interfaces/product.interface';

export const createUpdateProductAction = async (product: Partial<Product>) => {
  if (product.id && product.id !== '') {
    //Update product
    return await updateProduct(product);
  } else {
    //Create product
    return await createProduct(product);
  }
};

const updateProduct = async (product: Partial<Product>) => {
  const images: string[] =
    product.images?.map((image) => {
      if (image.startsWith('http')) {
        const imageName = image.split('/').pop();

        return imageName ? imageName : '';
      }

      return image;
    }) ?? [];

  //Extract id to send in url (but removing from product object so it isn't sent in the body for security)
  const productId = product.id;
  delete product.id;
  delete product.user;
  product.images = images;

  try {
    const { data } = await tesloApi.patch(`/products/${productId}`, product);

    return data;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to update product');
  }
};

const createProduct = async (product: Partial<Product>) => {
  const images: string[] =
    product.images?.map((image) => {
      if (image.startsWith('http')) {
        const imageName = image.split('/').pop();

        return imageName ? imageName : '';
      }

      return image;
    }) ?? [];

  //Removing id and user from product object so it isn't sent in the body for security
  delete product.id;
  delete product.user;
  product.images = images;

  try {
    const { data } = await tesloApi.post(`/products`, product);

    return data;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to create product');
  }
};
