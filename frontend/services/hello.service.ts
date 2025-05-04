import { ApiService } from './api.service';

export class HelloService extends ApiService {
  async getGreeting(name?: string): Promise<{ message: string }> {
    const url = name ? `/hello?name=${encodeURIComponent(name)}` : '/hello';
    return this.httpClient.get<{ message: string }>(url);
  }
}

export function useHelloService() {
  return new HelloService();
}