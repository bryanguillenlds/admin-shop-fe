import { shallowMount } from '@vue/test-utils';
import { RouterView } from 'vue-router';
import ShopLayout from '@/modules/shop/layouts/ShopLayout.vue';
import TopMenu from '@/modules/shop/components/TopMenu.vue';
import CustomFooter from '@/modules/shop/components/CustomFooter.vue';

describe('ShopLayout.vue', () => {
  it('should render top menu, router view and footer', () => {
    const wrapper = shallowMount(ShopLayout, {
      global: {
        stubs: ['RouterView'],
      },
    });

    expect(wrapper.findComponent(TopMenu).exists()).toBe(true);
    expect(wrapper.findComponent(RouterView).exists()).toBe(true);
    expect(wrapper.findComponent(CustomFooter).exists()).toBe(true);
  });
});
