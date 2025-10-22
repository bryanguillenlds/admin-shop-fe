import { getProductById } from '@/modules/products/actions/get-product-by-id.action';
import { getProductsAction } from '@/modules/products/actions';

describe('getProductById action', () => {
  it('should create empty product on create mode', async () => {
    const product = await getProductById('create');

    expect(product).toEqual(
      expect.objectContaining({
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
      })
    );
  });

  it('should return the expected product', async () => {
    const products = await getProductsAction();
    const product = await getProductById(products[0].id);

    // Sort images in both objects before comparing
    const sortedProduct = {
      ...product,
      images: [...product.images].sort(),
    };

    const sortedExpected = {
      ...products[0],
      images: [...products[0].images].sort(),
    };

    expect(sortedProduct).toEqual(sortedExpected);
  });

  it('should throw error if product is not found', async () => {
    await expect(getProductById('invalid-id')).rejects.toThrow(
      'Failed to fetch product by id invalid-id'
    );
  });
});
