import { tesloApi } from '@/api/tesloApi';
import type { Product } from '../interfaces/product.interface';
import { getProductImageAction } from './get-product-image.action';

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
  const productId = product.id;

  const productPayload = await prepareProductPayload(product);

  try {
    const { data } = await tesloApi.patch(`/products/${productId}`, productPayload);

    return {
      ...data,
      images: data.images.map(getProductImageAction),
    };
  } catch (error) {
    console.error(error);
    throw new Error('Failed to update product');
  }
};

const createProduct = async (product: Partial<Product>) => {
  const productPayload = await prepareProductPayload(product);

  try {
    const { data } = await tesloApi.post(`/products`, productPayload);

    return {
      ...data,
      images: data.images.map(getProductImageAction),
    };
  } catch (error) {
    console.error(error);
    throw new Error('Failed to create product');
  }
};

const prepareProductPayload = async (product: Partial<Product>) => {
  // Upload any File objects to get their URLs
  if (product.images && product.images.length > 0) {
    const images = product.images as (string | File)[];
    product.images = await uploadImages(images);
  }

  const images: string[] =
    product.images?.map((image) => {
      if (image.startsWith('http')) {
        const imageName = image.split('/').pop();
        return imageName ? imageName : ''; // ← Return FILENAME, not full URL
      }
      return image;
    }) ?? [];

  // Clean product for API (remove sensitive fields)
  delete product.id;
  delete product.user;
  product.images = images;

  return product;
};

const uploadImages = async (imageFiles: (string | File)[]) => {
  const imageFilesToUpload = imageFiles.filter((imageFile) => imageFile instanceof File) as File[];
  const currentImages = imageFiles.filter((imageFile) => typeof imageFile === 'string') as string[];

  const uploadPromises = imageFilesToUpload.map(async (imageFile) => {
    try {
      const formData = new FormData();
      formData.append('file', imageFile);

      const { data } = await tesloApi.post<{ secureUrl: string }>(`/files/product`, formData);

      return data.secureUrl;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to upload images');
    }
  });

  const uploadedImages = await Promise.all(uploadPromises);

  return [...currentImages, ...uploadedImages];
};
