import path from 'path';
import fs from 'fs';

import { tesloApi } from '@/api/tesloApi';
import { loginAction } from '@/modules/auth/actions';
import { createUpdateProductAction, getProductsAction } from '@/modules/products/actions';
import type { Size } from '@/modules/products/interfaces/product.interface';

describe('createUpdateProductAction', () => {
  beforeAll(async () => {
    const resp = await loginAction('test1@google.com', 'Abc123');

    if (!resp.ok) {
      throw new Error('Failed to login');
    }

    localStorage.setItem('token', resp.token);
  });

  it('should create a new product', async () => {
    const product = await createUpdateProductAction({
      id: '',
      title: 'Men’s Chill Crew Nek',
      price: 75,
      description:
        'Introducing the Tesla Chill Collection. The Men’s Chill Crew Neck Sweatshirt has a premium, heavyweight exterior and soft fleece interior for comfort in any season. The sweatshirt features a subtle thermoplastic polyurethane T logo on the chest and a Tesla wordmark below the back collar. Made from 60% cotton and 40% recycled polyester.',
      slug: 'mens_chill_crew_neck_sweathirt',
      stock: 7,
      sizes: ['XS', 'S', 'L', 'XL', 'XXL'] as Size[],
      gender: 'men',
      tags: ['sweatshirt'],
      images: ['t-shirt.jpg'],
    });

    expect(product).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        title: 'Men’s Chill Crew Nek',
        price: 75,
        description:
          'Introducing the Tesla Chill Collection. The Men’s Chill Crew Neck Sweatshirt has a premium, heavyweight exterior and soft fleece interior for comfort in any season. The sweatshirt features a subtle thermoplastic polyurethane T logo on the chest and a Tesla wordmark below the back collar. Made from 60% cotton and 40% recycled polyester.',
        slug: 'mens_chill_crew_neck_sweathirt',
      })
    );

    await tesloApi.delete(`/products/${product.id}`);
  });

  it('should update an existing product', async () => {
    const products = await getProductsAction();
    const productToUpdate = products[0];

    const updatedProduct = await createUpdateProductAction({
      id: productToUpdate.id,
      title: 'Updated Product',
      description: 'Updated Description',
    });

    expect(updatedProduct.id).toEqual(productToUpdate.id);
    expect(updatedProduct).toEqual(
      expect.objectContaining({
        title: 'Updated Product',
        description: 'Updated Description',
      })
    );
  });

  it('should upload product image', async () => {
    const products = await getProductsAction();
    const productToUpdate = products[0];

    const imagePath = path.join(__dirname, '../../../fake', 't-shirt.jpg');
    const image = fs.readFileSync(imagePath);

    const imageFile = new File([image], 't-shirt.jpg', { type: 'image/jpeg' });

    const updatedProduct = await createUpdateProductAction({
      id: productToUpdate.id,
      images: [imageFile] as any, //eslint-disable-line
    });

    expect(updatedProduct.id).toEqual(productToUpdate.id);
    expect(updatedProduct.images.length).toBe(1);
    expect(updatedProduct.images[0]).toMatch(
      import.meta.env.VITE_TESLO_API_URL + '/files/product/'
    );
  });
});
