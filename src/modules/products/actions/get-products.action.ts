import { tesloApi } from '@/api/tesloApi'
import type { Product } from '../interfaces/product.interface'
import { getProductImageAction } from './get-product-image.action'

export const getProductsAction = async (page: number = 1, limit: number = 10) => {
  try {
    const { data } = await tesloApi.get<Product[]>('/products', {
      params: {
        offset: page * limit,
        limit,
      },
    })

    return data.map((product) => ({
      ...product,
      images: product.images.map(getProductImageAction), //Call the action for each image string
    }));
  } catch (error) {
    console.error(error)
    throw new Error('Failed to fetch products')
  }
}
