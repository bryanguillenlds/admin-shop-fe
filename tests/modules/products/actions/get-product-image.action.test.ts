import { getProductImageAction } from '@/modules/products/actions';

describe('getProductImageAction', () => {
  it('should return image name with http if it did not have it previously', () => {
    const imageName = 'test-image.jpg';

    const resultImgName = getProductImageAction(imageName);

    const expectedResult = `${import.meta.env.VITE_TESLO_API_URL}/files/product/${imageName}`;

    expect(resultImgName).toBe(expectedResult);
  });
});
