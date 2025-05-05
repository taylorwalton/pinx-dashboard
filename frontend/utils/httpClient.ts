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
    } catch (err: any) {
      // Extract only what we need before any processing
      const simpleError = {
        status: err.response?.status,
        message: typeof err.message === 'string' ? err.message : 'API request failed',
        statusText: typeof err.response?.statusText === 'string' ? err.response.statusText : ''
      };
      
      // Handle different error types
      if (simpleError.status === 401) {
        // Token expired, redirect to login
        authStore.logout();
        navigateTo('/login');
        // Return a Promise that never resolves to prevent further code execution
        return new Promise(() => {});
      }
      
      // Special handling for 403 errors - don't throw, return a structured error
      if (simpleError.status === 403) {
        console.warn('Permission denied:', simpleError.statusText || 'Forbidden');
        
        return {
          __error: true,
          __status: 403,
          __message: simpleError.statusText || 'Forbidden'
        } as any;
      }
      
      // Log all other errors with safe values only
      console.error('API request failed:', simpleError.message);
      
      // Create a completely new error without referencing the original
      const newError = new Error(simpleError.message);
      newError.name = 'HttpClientError';
      throw newError;
    }
  }
}