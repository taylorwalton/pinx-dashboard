<template>
    <div class="page">
      <!-- Show Forbidden message when access is denied -->
      <n-result 
        v-if="agentsStore.isForbidden"
        status="403"
        title="Access Denied"
        description="Sorry, you don't have permission to view this agent's details."
      >
        <template #footer>
          <n-button @click="router.back()">Go Back</n-button>
          <n-button type="primary" @click="router.push('/agents')" class="ml-4">Back to Agents</n-button>
        </template>
      </n-result>
      
      <!-- Regular content when access is allowed -->
      <template v-else>
        <div class="mb-4">
          <n-button @click="router.back()">
            <template #icon>
              <n-icon>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24">
                  <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m15 18l-6-6l6-6" />
                </svg>
              </n-icon>
            </template>
            Back to Agents
          </n-button>
        </div>
    
        <n-card>
          <template #header>
            <div class="text-xl font-bold">Agent Details</div>
          </template>
          
          <AgentDetails
            :agent="agent"
            :loading="loading"
            :error="error"
          />
        </n-card>
    
        <n-card v-if="agent" title="Raw Data" class="mt-4">
          <pre class="text-sm bg-gray-100 p-4 rounded">{{ JSON.stringify(agent, null, 2) }}</pre>
        </n-card>
      </template>
    </div>
  </template>
  
  <script setup lang="ts">
  import { onMounted, computed } from 'vue'
  import { NCard, NButton, NIcon, NResult } from 'naive-ui'
  import { useRouter, useRoute } from 'vue-router'
  import { useAgentsStore } from '~/stores/agents.store'
  import AgentDetails from '~/components/agents/AgentDetails.vue'
  
  definePageMeta({
    name: "AgentDetailPage",
    title: "Agent Details",
    auth: true,
    roles: "all"
  })
  
  const router = useRouter()
  const route = useRoute()
  const agentId = computed(() => route.params.id as string)
  
  const agentsStore = useAgentsStore()
  const agent = computed(() => agentsStore.currentAgent)
  const loading = computed(() => agentsStore.loading)
  const error = computed(() => agentsStore.error)
  
  onMounted(async () => {
    await agentsStore.fetchAgentById(agentId.value)
  })
  </script>
  
  <style scoped>
  .page {
    padding: 20px;
  }
  </style>