import { HttpClient } from '~/utils/httpClient';

export function useApiClient() {
  const config = useRuntimeConfig();
  
  const httpClient = new HttpClient({
    baseURL: config.public.apiBase,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return httpClient;
}