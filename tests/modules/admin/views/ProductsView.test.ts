import { shallowMount } from '@vue/test-utils';

import ProductsView from '@/modules/admin/views/ProductsView.vue';
import { fakeProducts } from '../../../fake/products.fake';
import type { Mock } from 'vitest';
import { useQuery, useQueryClient } from '@tanstack/vue-query';
import { createRouter, createWebHistory } from 'vue-router';

// Create a temporary router so that we can avoid dealing with guards, etc.
const tempRouter = createRouter({
  history: createWebHistory(),
  routes: [{ path: '/', component: ProductsView }],
});

// We need to mock the implementation of tanstack query for now as they do not offer official testing utilities
vi.mock('@tanstack/vue-query', () => {
  return {
    useQueryClient: vi.fn().mockReturnValue({
      prefetchQuery: vi.fn(),
    }),
    useQuery: vi.fn(),
  };
});

describe('ProductsView', () => {
  // Mock what useQuery returns so that it returns our fake products
  (useQuery as Mock).mockReturnValue({
    data: fakeProducts,
  });

  //Mock window.scrollTo (because it was called due to pagination)
  (window as any).scrollTo = vi.fn(); //eslint-disable-line

  const wrapper = shallowMount(ProductsView, {
    global: {
      plugins: [tempRouter],
    },
  });

  it('should render with default values', async () => {
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should prefetch query on mounted', async () => {
    await tempRouter.replace('/?page=2');

    expect(window.scrollTo).toHaveBeenCalledWith({
      top: 0,
      behavior: 'smooth',
    });

    expect(useQueryClient().prefetchQuery).toHaveBeenCalledWith({
      queryKey: ['products', { page: 3 }],
      queryFn: expect.any(Function),
    });
  });
});
