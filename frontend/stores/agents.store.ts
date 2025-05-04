import { defineStore } from 'pinia'
import { useAgentService } from '~/services/agent.service'
import type { Agent } from '~/types/agent.types'
import { useErrorHandler } from '~/composables/useErrorHandler'

export const useAgentsStore = defineStore('agents', {
  state: () => ({
    agents: [] as Agent[],
    currentAgent: null as Agent | null,
    loading: false,
    error: null as string | null,
  }),
  
  actions: {
    async fetchAgents() {
      this.loading = true
      this.error = null
      
      try {
        const agentService = useAgentService()
        const data = await agentService.getAgents()
        this.agents = data
      } catch (err: any) {
        const { handleError } = useErrorHandler()
        this.error = handleError(err, 'Failed to fetch agents')
      } finally {
        this.loading = false
      }
    },
    
    async fetchAgentById(id: number | string) {
      this.loading = true
      this.error = null
      
      try {
        const agentService = useAgentService()
        const data = await agentService.getAgentById(id)
        this.currentAgent = data
      } catch (err: any) {
        const { handleError } = useErrorHandler()
        this.error = handleError(err, `Failed to fetch agent with ID: ${id}`)
      } finally {
        this.loading = false
      }
    }
  }
})