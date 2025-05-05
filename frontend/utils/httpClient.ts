import { useAuthStore } from '~/stores/auth';

interface FetchOptions {
  headers?: Record<string, string>;
  timeout?: number;
  [key: string]: any;
}

interface HttpClientConfig {
  baseURL: string;
  headers?: Record<string, string>;
  timeout?: number;
}

export class HttpClient {
  private baseURL: string;
  private defaultOptions: FetchOptions;

  constructor(config: HttpClientConfig) {
    this.baseURL = config.baseURL;
    this.defaultOptions = {
      headers: config.headers || {},
      timeout: config.timeout || 30000,
    };
  }

  async get<T>(url: string, options: FetchOptions = {}): Promise<T> {
    return this.request<T>(url, { ...options, method: 'GET' });
  }

  async post<T>(url: string, data?: any, options: FetchOptions = {}): Promise<T> {
    return this.request<T>(url, { ...options, method: 'POST', body: data });
  }

  async put<T>(url: string, data?: any, options: FetchOptions = {}): Promise<T> {
    return this.request<T>(url, { ...options, method: 'PUT', body: data });
  }

  async delete<T>(url: string, options: FetchOptions = {}): Promise<T> {
    return this.request<T>(url, { ...options, method: 'DELETE' });
  }

  private async request<T>(url: string, options: FetchOptions = {}): Promise<T> {
    // Add auth token if available
    const authStore = useAuthStore();
    const headers = { ...this.defaultOptions.headers, ...options.headers };
    
    if (authStore.isLogged && authStore.token) {
      headers['Authorization'] = `Bearer ${authStore.token}`;
    }
    
    const mergedOptions: FetchOptions = {
      ...this.defaultOptions,
      ...options,
      headers,
    };

    try {
      return await $fetch<T>(`${this.baseURL}${url}`, mergedOptions);
    } catch (error: any) {
      // Handle 401 Unauthorized errors
      if (error.response?.status === 401) {
        // Token expired, redirect to login
        authStore.logout();
        navigateTo('/login');
      }
      
      console.error('API request failed:', error);
      throw error;
    }
  }
}