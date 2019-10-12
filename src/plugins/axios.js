import axios from 'axios';

const baseURL = process.env.NODE_ENV === 'production'
  ? '/'
  : 'http://localhost:8080/';

const localConfig = {
  baseURL: baseURL,
  timeout: 60 * 1000,
  withCredentials: false
};

const localAxios = axios.create(localConfig);

export default localAxios;
