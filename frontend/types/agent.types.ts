export interface Agent {
    id: number;
    name: string;
    type?: string;
    status?: string;
  }
  
  export interface AgentListResponse {
    items: Agent[];
    total: number;
  }