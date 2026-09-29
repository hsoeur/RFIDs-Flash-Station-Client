import axios from "axios";
import config from "./config";
import { apiDataEndpoints } from "./apiDataEndpoints";

axios.interceptors.request.use(
  (request) => {
    console.log(`[API Request] ${request.method?.toUpperCase()} ${request.url}`, {
      params: request.params,
      data: request.data,
    });
    return request;
  },
  (error) => {
    console.error("[API Request Error]", error);
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response) => {
    console.log(
      `[API Response] ${response.status} ${response.config.method?.toUpperCase()} ${response.config.url}`,
      { data: response.data }
    );
    return response;
  },
  (error) => {
    const { config: reqConfig, response } = error;
    console.error(
      `[API Response Error] ${response?.status ?? "N/A"} ${reqConfig?.method?.toUpperCase()} ${reqConfig?.url}`,
      { data: response?.data, message: error.message }
    );
    return Promise.reject(error);
  }
);

const escapePath = "/serial/SendEscape";

export const apiHardware = {
  sendEscape: () => axios.post(`${config.ApiHardware}${escapePath}`),
  sendToken: (tokenProgram, tokenStation) =>
    axios.post(
      `${config.ApiHardware}/serial/SendToken?tokenProgram=${tokenProgram}&tokenStation=${tokenStation}`
    ),
  readToken: (programInitialized) =>
    axios.get(
      `${config.ApiHardware}/serial/ReadToken?programInitialized=${programInitialized}`
    ),
  readTokenRaw: () => axios.get(`${config.ApiHardware}/serial/ReadTokenRaw`),
};

export const apiData = {
  getSolderingProgramByManufacturingOrderUidLatestOne: (manufacturingOfUid) =>
    axios.get(
      apiDataEndpoints.getSolderingProgramByManufacturingOrderUidLatestOne(
        config.ApiData,
        manufacturingOfUid
      )
    ),
};
