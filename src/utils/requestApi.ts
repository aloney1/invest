import axios from 'axios';
import { GRAPHQL_BASE_URL, SEP_GRAPHQL_BASE_URL } from '@/config';
import { CHAIN_ID_KEY } from '@/config/constants.ts';

const TIMEOUT = 100000;
const request = axios.create({
  timeout: TIMEOUT,
});

const errorHandler = (err: unknown) => {
  Promise.reject(err);
};

request.interceptors.response.use(res => {
  return res.data;
}, errorHandler);

request.interceptors.request.use(config => {
  const chainID = localStorage.getItem(CHAIN_ID_KEY);
  config.baseURL = chainID === '42161' ? GRAPHQL_BASE_URL : SEP_GRAPHQL_BASE_URL;
  return config;
}, errorHandler);

export default request;
