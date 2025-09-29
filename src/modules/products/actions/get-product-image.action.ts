export const getProductImageAction = (imageName: string) => {
  return imageName.includes('http')
    ? imageName
    : `${import.meta.env.VITE_TESLO_API_URL}/files/product/${imageName}`
}
