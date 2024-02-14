import { axios } from "../../lib/axios";
import { Endpoint } from "../endpoints";

export const getUsersList = (pageNumber = 1, pageSize = 10, ...args) =>
  axios.get(`${Endpoint.Users}?page=${pageNumber}&pageSize=${pageSize}`, ...args);
