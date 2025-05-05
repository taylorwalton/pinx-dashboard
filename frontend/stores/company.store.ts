import { defineStore } from 'pinia'

interface Company {
  id: number;
  name: string;
}

export const useCompanyStore = defineStore('company', {
  state: () => ({
    companies: [] as Company[],
    loading: false,
    error: null as string | null
  }),
  
  actions: {
    async fetchCompanies() {
      this.loading = true;
      try {
        // Call your API to fetch companies
        const response = await $fetch('/api/companies');
        this.companies = response;
      } catch (error) {
        this.error = 'Failed to load companies';
        console.error('Error fetching companies:', error);
      } finally {
        this.loading = false;
      }
    }
  }
});