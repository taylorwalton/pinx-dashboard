import { ApiService } from './api.service'

export interface Vulnerability {
  id: number
  agent_id: number
  agent_name?: string
  name: string
  description: string
  cve: string
  severity: 'Critical' | 'High' | 'Medium' | 'Low'
  status: 'Open' | 'Mitigated' | 'Patched'
  discovered: string
  company_id: number
}

export class VulnerabilitiesService extends ApiService {
  async fetchVulnerabilities(): Promise<Vulnerability[]> {
    return this.httpClient.get<Vulnerability[]>('/vulnerabilities')
  }
  
  async fetchVulnerability(id: number): Promise<Vulnerability> {
    return this.httpClient.get<Vulnerability>(`/vulnerabilities/${id}`)
  }
}

// Create a composable to use the service
export function useVulnerabilitiesService() {
  return new VulnerabilitiesService()
}