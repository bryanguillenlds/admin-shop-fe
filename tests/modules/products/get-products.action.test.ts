import { getProductsAction } from '@/modules/products/actions';

describe('getProducts action', async () => {
  const products = await getProductsAction(1, 10);

  it('should return the expected products', async () => {
    expect(products.length).toBe(10);

    expect(products[0]).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        title: expect.any(String),
        price: expect.any(Number),
        description: expect.any(String),
        slug: expect.any(String),
        stock: expect.any(Number),
        sizes: expect.any(Array),
        gender: expect.any(String),
        tags: expect.any(Array),
        images: expect.any(Array),
        user: {
          id: expect.any(String),
          email: expect.any(String),
          fullName: expect.any(String),
          isActive: expect.any(Boolean),
          roles: expect.any(Array),
        },
      })
    );
  });

  it('should return correct image urls', async () => {
    const products = await getProductsAction(1, 10);

    products.forEach((product) => {
      product.images.forEach((image) => {
        expect(image).toMatch(import.meta.env.VITE_TESLO_API_URL + '/files/product/');
      });
    });
  });
});
