import { ApiService } from './api.service';
import type { Agent } from '~/types/agent.types';

export class AgentsService extends ApiService {
  async getAgents(): Promise<Agent[]> {
    return this.httpClient.get<Agent[]>('/agents');
  }

  async getAgent(id: number): Promise<Agent> {
    return this.httpClient.get<Agent>(`/agents/${id}`);
  }
}

export function useAgentsService() {
  return new AgentsService();
}