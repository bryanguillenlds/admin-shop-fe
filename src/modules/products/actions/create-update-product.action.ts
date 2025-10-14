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

const prepareProductPayload = (product: Partial<Product>) => {
  const images: string[] =
    product.images?.map((image) => {
      if (image.startsWith('http')) {
        const imageName = image.split('/').pop();
        return imageName ? imageName : '';
      }

      return image;
    }) ?? [];

  //Removing from product object so it isn't sent in the body for security
  delete product.id;
  delete product.user;
  product.images = images;

  return product;
};

const updateProduct = async (product: Partial<Product>) => {
  const productId = product.id;
  const productPayload = prepareProductPayload(product);

  try {
    const { data } = await tesloApi.patch(`/products/${productId}`, productPayload);

    return data;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to update product');
  }
};

const createProduct = async (product: Partial<Product>) => {
  const productPayload = prepareProductPayload(product);

  try {
    const { data } = await tesloApi.post(`/products`, productPayload);

    return data;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to create product');
  }
};

const uploadImages = async (imageFiles: (string | File)[]) => {
  const formData = new FormData();

  imageFiles.forEach((imageFile) => {
    formData.append('file', imageFile);
  });

  try {
    const { data } = await tesloApi.post<{ secureUrl: string }>(`/files/product`, formData);

    return data.secureUrl;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to upload images');
  }
};
