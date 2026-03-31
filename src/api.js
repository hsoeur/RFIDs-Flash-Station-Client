import axios from "axios";
import config from "./config";

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
      `${config.ApiData}/SolderingProgram/latest-by-manufacturing-order?manufacturingOfUid=${manufacturingOfUid}`
    ),
};
