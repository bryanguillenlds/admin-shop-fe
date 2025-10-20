import { tesloApi } from '@/api/tesloApi';

describe('tesloApi axios instance', () => {
  it('should have baseURL set to VITE_TESLO_API_URL', () => {
    expect(tesloApi.defaults.baseURL).toBe(import.meta.env.VITE_TESLO_API_URL);
  });

  it('should set authorization header with token if token is present', async () => {
    const token = 'myTestToken';
    localStorage.setItem('token', token);

    const response = await tesloApi.get('/api/');

    expect(response.config.headers?.Authorization).toBe(`Bearer ${token}`);
  });

  it('should not set authorization header if token is not present', async () => {
    localStorage.clear();

    const response = await tesloApi.get('/api/');

    expect(response.config.headers?.Authorization).toBeUndefined();
  });
});
