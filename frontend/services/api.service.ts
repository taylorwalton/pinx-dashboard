import { useApiClient } from '~/composables/useApiClient';

export class ApiService {
  protected httpClient;
  
  constructor() {
    this.httpClient = useApiClient();
  }
}