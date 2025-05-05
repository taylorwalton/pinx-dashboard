import { defineStore } from 'pinia'
import type { Vulnerability } from '@/services/vulnerabilities.service'
import { useVulnerabilitiesService } from '@/services/vulnerabilities.service'
import { useErrorHandler } from '@/composables/useErrorHandler'

export const useVulnerabilitiesStore = defineStore('vulnerabilities', {
  state: () => ({
    vulnerabilities: [] as Vulnerability[],
    loading: false,
    error: null as string | null,
    isForbidden: false
  }),
  
  actions: {
    async fetchVulnerabilities() {
      const { handleError } = useErrorHandler()
      this.loading = true
      this.error = null
      this.isForbidden = false
      
      try {
        const service = useVulnerabilitiesService()
        const response = await service.fetchVulnerabilities()
        this.vulnerabilities = response
      } catch (error: any) {
        if (error?.statusCode === 403) {
          this.isForbidden = true
        }
        this.error = handleError(error, 'Failed to fetch vulnerabilities')
      } finally {
        this.loading = false
      }
    }
  },
  
  getters: {
    criticalCount: (state) => state.vulnerabilities.filter(v => v.severity === 'Critical').length,
    highCount: (state) => state.vulnerabilities.filter(v => v.severity === 'High').length,
    mediumCount: (state) => state.vulnerabilities.filter(v => v.severity === 'Medium').length,
    lowCount: (state) => state.vulnerabilities.filter(v => v.severity === 'Low').length,
    
    openCount: (state) => state.vulnerabilities.filter(v => v.status === 'Open').length,
    
    totalCount: (state) => state.vulnerabilities.length
  }
})