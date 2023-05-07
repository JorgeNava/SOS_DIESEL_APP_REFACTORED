import axios from 'axios';
import LocalStorageService from '@/helpers/local-storage-service';

const BASE_URL = process.env.VUE_APP_SOS_DIESEL_API_BASE_URL;

class ApiClient {
  constructor() {
    this.client = axios.create({
      baseURL: BASE_URL,
    });

    this.client.interceptors.request.use(
      (config) => {
        if (config.url === '/users/login') {
          return config;
        }

        const token = LocalStorageService.getToken();

        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
      },
      (error) => Promise.reject(error)
    );

    this.client.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response && error.response.status === 401) {
          LocalStorageService.removeToken();
          window.location.replace('/login');
        }

        return Promise.reject(error);
      }
    );
  }

  async post(endpoint, data) {
    const response = await this.client.post(endpoint, data);
    return response.data;
  }

  async get(endpoint, params) {
    const response = await this.client.get(endpoint, { params });
    return response.data;
  }

  async delete(endpoint, params) {
    const response = await this.client.delete(endpoint, { params });
    return response.data;
  }

  async authenticate(email, password) {
    try {
      const response = await this.post('/users/login', { email, password });
      const { token } = response;
      LocalStorageService.setToken(token);
      return token;
    } catch (error) {
      return error;
    }
  }

  getUrl(endpoint) {
    return `${endpoint}`
  }
}

let instance = null;

export function getApiClient(baseUrl='') {
  if (!instance) {
    instance = new ApiClient(baseUrl);
  }
  return instance;
}
