import { AxiosResponse } from "axios";

const axios = require("axios").default;

export const DataPost = async (url: string, data: Record<number, string>) => {
  const config = { headers: { "Content-Type": "application/json" } };
  return axios.post(url, data, config).then((response: AxiosResponse) => {
    return response.data;
  });
};
