import type { Agent } from '~/types/agent.types';
import { ApiService } from './api.service';

export class AgentService extends ApiService {
  async getAgents(): Promise<Agent[]> {
    return this.httpClient.get<Agent[]>('/agents')
  }

  async getAgentById(id: number | string): Promise<Agent> {
    return this.httpClient.get<Agent>(`/agents/${id}`)
  }
}

export function useAgentService() {
  return new AgentService()
}