import httpService from "./http.service";

const productEndpoint = "cart/";
const cartService = {
  get: async () => {
    const { data } = await httpService.get(productEndpoint);
    return data;
  },
  update: async (payload) => {
    const { data } = await httpService.patch(
      productEndpoint + payload._id,
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
    alert(`Спасибо за заказ! ${data._id}`);
    return data;
  }
};

export default cartService;
