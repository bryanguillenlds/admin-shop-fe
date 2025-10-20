describe('Main.ts', () => {
  it('should return proper env values', () => {
    const apiUrl = import.meta.env.VITE_TESLO_API_URL;

    expect(apiUrl).toBeDefined();
    expect(apiUrl).toBe('http://localhost:3000/api');
  });
});
