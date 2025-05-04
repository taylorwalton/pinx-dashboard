import type { FetchOptions as OfetchOptions } from 'ofetch/dist/node'

// Create our own FetchOptions type
interface FetchOptions extends Partial<OfetchOptions> {
  headers?: Record<string, string>;
  timeout?: number;
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

  private async request<T>(url: string, options: FetchOptions = {}): Promise<T> {
    const mergedOptions: FetchOptions = {
      ...this.defaultOptions,
      ...options,
      headers: {
        ...this.defaultOptions.headers,
        ...options.headers,
      },
    };

    try {
      return await $fetch<T>(`${this.baseURL}${url}`, mergedOptions);
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }
}