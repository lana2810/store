import httpService from "./http.service";

const productEndpoint = "products/";
const productService = {
  get: async () => {
    const { data } = await httpService.get(productEndpoint);
    return data;
  },
  update: async (payload) => {
    const { data } = await httpService.patch(
      `products/${payload._id}`,
      payload
    );
    return data;
  },
  remove: async (payload) => {
    const { data } = await httpService.delete(
      productEndpoint + payload._id,
      payload
    );
    return data;
  },
  create: async (payload) => {
    const { data } = await httpService.post(productEndpoint, payload);
    return data;
  }
};

export default productService;
