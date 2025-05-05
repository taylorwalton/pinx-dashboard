import { defineStore } from 'pinia'
import { useAgentsService } from '~/services/agent.service'
import type { Agent } from '~/types/agent.types'
import { useErrorHandler } from '~/composables/useErrorHandler'

export const useAgentsStore = defineStore('agents', {
  state: () => ({
    agents: [] as Agent[],
    currentAgent: null as Agent | null,
    loading: false,
    error: null as string | null,
    isForbidden: false, // Add this flag to track permission errors
  }),
  
  actions: {
    async fetchAgents() {
      this.loading = true
      this.error = null
      this.isForbidden = false
      
      try {
        const agentsService = useAgentsService()
        const data = await agentsService.getAgents()
        this.agents = data
      } catch (err: any) {
        const { handleError } = useErrorHandler()
        
        // Check if this is a permission error
        if (err.response?.status === 403) {
          this.isForbidden = true // Set flag instead of navigating
          return
        }
        
        this.error = handleError(err, 'Failed to fetch agents')
      } finally {
        this.loading = false
      }
    },
    
    async fetchAgentById(id: number | string) {
        this.loading = true;
        this.error = null;
        this.isForbidden = false;
        
        try {
          const agentsService = useAgentsService();
          const data = await agentsService.getAgent(id);
          
          // Check if the response is our special error format
          if (data && (data as any).__error === true && (data as any).__status === 403) {
            this.isForbidden = true;
            return;
          }
          
          this.currentAgent = data;
        } catch (err: any) {
          const { handleError } = useErrorHandler();
          this.error = handleError(err, `Failed to fetch agent with ID: ${id}`);
        } finally {
          this.loading = false;
        }
      }
  }
})