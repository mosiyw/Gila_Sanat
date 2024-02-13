import { axios } from "../../lib/axios";
import { Endpoint } from "../endpoints";

export const getProductsList = (pageNumber = 1, pageSize = 10, ...args) =>
  axios.get(`${Endpoint.Products}?page=${pageNumber}&pageSize=${pageSize}`, ...args);
