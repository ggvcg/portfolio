import axios, { AxiosInstance } from 'axios';

const API_URL = 'http://localhost:3000/api';

export const api: AxiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

interface LoginResponse {
  user: {
    id: string;
    username: string;
    email: string;
  };
  token: string;
}

interface RegisterResponse {
  user: {
    id: string;
    username: string;
    email: string;
  };
  token: string;
}

export const authApi = {
  login: async (email: string, password: string): Promise<LoginResponse> => {
    const response = await api.post<LoginResponse>('/auth/login', { email, password });
    return response.data;
  },
  register: async (username: string, email: string, password: string): Promise<RegisterResponse> => {
    const response = await api.post<RegisterResponse>('/auth/register', {
      username,
      email,
      password,
    });
    return response.data;
  },
  changePassword: async (oldPassword: string, newPassword: string): Promise<void> => {
    await api.post('/auth/change-password', {
      oldPassword,
      newPassword,
    });
  },
  deleteAccount: async (password: string): Promise<void> => {
    await api.post('/auth/delete-account', { password });
  },
}; 