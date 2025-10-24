import ProductDetailView from '@/modules/admin/views/ProductDetailView.vue';
import { shallowMount } from '@vue/test-utils';
import { createRouter, createWebHistory, useRouter } from 'vue-router';
import { fakeProducts } from '../../../fake/products.fake';
import { useMutation, useQuery } from '@tanstack/vue-query';
import type { Mock } from 'vitest';
import { ref } from 'vue';

// We need to mock the implementation of tanstack query for now as they do not offer official testing utilities
vi.mock('@tanstack/vue-query');

vi.mock('vue-router', async () => {
  const originalRouter = await import('vue-router');
  return {
    ...originalRouter,
    useRouter: vi.fn(),
  };
});

// Create a temporary router so that we can avoid dealing with guards, etc.
const tempRouter = createRouter({
  history: createWebHistory(),
  routes: [{ path: '/', component: ProductDetailView }],
});

beforeEach(() => {
  vi.clearAllMocks();
});

describe('ProductDetailView', () => {
  const fakeProduct = fakeProducts[0];

  const mutationSpy = vi.fn();
  const replaceSpy = vi.fn();

  (useMutation as Mock).mockReturnValue({
    mutate: mutationSpy,
    isPending: ref(false),
    isSuccess: ref(false),
    data: ref(fakeProduct),
  });

  (useRouter as Mock).mockReturnValue({
    replace: replaceSpy,
  });

  it('should redirect to products view if id in param props is not found', async () => {
    (useQuery as Mock).mockReturnValue({
      data: ref({}),
      isLoading: ref(false),
      isError: ref(true),
      refetch: vi.fn(),
    });

    shallowMount(ProductDetailView, {
      props: {
        productId: 'xxxxx',
      },
      global: {
        plugins: [tempRouter],
      },
    });

    expect(replaceSpy).toHaveBeenCalledWith('/admin/products');
  });

  it('should render page with product', async () => {
    (useQuery as Mock).mockReturnValue({
      data: ref(fakeProduct),
      isLoading: ref(false),
      isError: ref(false),
      refetch: vi.fn(),
    });

    const wrapper = shallowMount(ProductDetailView, {
      props: {
        productId: 'ABC123',
      },
      global: {
        plugins: [tempRouter],
      },
    });

    const customInputs = wrapper.findAllComponents({ name: 'CustomInput' });
    const customTextAreas = wrapper.findAllComponents({ name: 'CustomTextArea' });
    const sizeButtons = wrapper.findAll('.button.flex-1');

    const productValues = Object.values(fakeProduct);

    expect(customInputs.length).toBe(4);
    expect(customTextAreas.length).toBe(1);

    customInputs.forEach((input) => {
      const modelValue = input.props('modelValue');

      expect(productValues).toContain(modelValue);
    });

    customTextAreas.forEach((textarea) => {
      const modelValue = textarea.props('modelValue');

      expect(productValues).toContain(modelValue);
    });

    sizeButtons.forEach((btn) => {
      if (fakeProduct.sizes.includes(btn.text())) {
        expect(btn.classes()).toContain('bg-blue-500');
      } else {
        expect(btn.classes()).toContain('bg-blue-100');
      }
    });
  });

  it('should submit a form if data is valid', async () => {
    (useQuery as Mock).mockReturnValue({
      data: ref(fakeProduct),
      isLoading: ref(false),
      isError: ref(false),
      refetch: vi.fn(),
    });

    const wrapper = shallowMount(ProductDetailView, {
      props: {
        productId: 'ABC123',
      },
      global: {
        plugins: [tempRouter],
      },
    });

    const form = wrapper.find('form');
    form.trigger('submit');

    // Wait for any pending asynchronous operations to complete before
    // making assertions about the expected behavior
    await new Promise((resolve) => setTimeout(resolve, 100));

    expect(mutationSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        ...fakeProduct,
      })
    );
  });

  it('should not call mutation if form is invalid', async () => {
    (useQuery as Mock).mockReturnValue({
      data: ref(fakeProduct),
      isLoading: ref(false),
      isError: ref(false),
      refetch: vi.fn(),
    });

    const wrapper = shallowMount(ProductDetailView, {
      props: {
        productId: 'ABC123',
      },
      global: {
        plugins: [tempRouter],
      },
    });

    // Set any invalid value for any form input field so that it triggers validation errors
    const titleInput = wrapper.findComponent({ name: 'CustomInput' });
    titleInput.setValue('');

    const form = wrapper.find('form');
    form.trigger('submit');

    // Wait for any pending asynchronous operations to complete before
    // making assertions about the expected behavior
    await new Promise((resolve) => setTimeout(resolve, 100));

    expect(mutationSpy).not.toHaveBeenCalled();
  });
});
