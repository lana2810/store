import httpService from "./http.service";

const tagEndpoint = "tag/";
const tagService = {
  get: async () => {
    const { data } = await httpService.get(tagEndpoint);
    return data;
  }
};

export default tagService;
