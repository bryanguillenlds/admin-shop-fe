import { tesloApi } from '@/api/tesloApi';
import type { Product } from '../interfaces/product.interface';
import { getProductImageAction } from './get-product-image.action';

export const getProductById = async (productId: string) => {
  if (productId === 'create') {
    return {
      id: '',
      images: [],
      title: '',
      slug: '',
      description: '',
      price: 0,
      stock: 0,
      gender: '' as any, //eslint-disable-line
      tags: [],
      sizes: [],
      user: {} as any, //eslint-disable-line
    };
  }

  try {
    const { data } = await tesloApi.get<Product>(`/products/${productId}`);

    return {
      ...data,
      images: data.images.map(getProductImageAction),
    };
  } catch (error) {
    console.error(error);
    throw new Error(`Failed to fetch product by id ${productId}`);
  }
};
