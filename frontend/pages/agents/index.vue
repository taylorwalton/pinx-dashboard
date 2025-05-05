<template>
    <div class="page">
      <h1>Agents</h1>
      
      <n-card class="mt-6">
        <n-space vertical>
          <div v-if="pending" class="py-8 flex justify-center">
            <n-spin size="large" />
          </div>
          <div v-else-if="error" class="mt-4">
            <n-alert type="error" title="Error loading agents">
              <p>{{ error }}</p>
            </n-alert>
          </div>
          <div v-else>
            <n-data-table
              :columns="columns"
              :data="agents"
              :bordered="false"
              :pagination="pagination"
              @row-click="handleRowClick"
            />
          </div>
        </n-space>
      </n-card>
    </div>
  </template>
  
  <script setup lang="ts">
    import { h, ref, onMounted } from 'vue'
    import { 
      NCard, 
      NSpace, 
      NSpin, 
      NAlert, 
      NDataTable, 
      NButton,
      useMessage
    } from 'naive-ui'
    import type { DataTableColumns } from 'naive-ui'
    import { useRouter } from 'vue-router'
    import type { Agent } from '~/types/agent.types'
    import { useAgentsService } from '~/services/agent.service'
  
    // Define page metadata for Nuxt
    definePageMeta({
      name: "AgentsPage",
      title: "Agents",
      auth: true,
      roles: "all"
    })
    
    // Setup
    const message = useMessage()
    const router = useRouter()
    const agentsService = useAgentsService()
    
    // State
    const agents = ref<Agent[]>([])
    const pending = ref(true)
    const error = ref<string | null>(null)
    
    // Configure table pagination
    const pagination = {
      pageSize: 10
    }
    
    // Define table columns with TypeScript types
    const columns: DataTableColumns<Agent> = [
      {
        title: 'ID',
        key: 'id',
        sorter: 'default'
      },
      {
        title: 'Name',
        key: 'name',
        sorter: (a, b) => a.name.localeCompare(b.name)
      },
      {
        title: 'Actions',
        key: 'actions',
        render(row) {
          return h(
            NButton,
            {
              size: 'small',
              quaternary: true,
              type: 'info',
              onClick: (e) => {
                e.stopPropagation()
                handleViewAgent(row)
              }
            },
            { default: () => 'View Details' }
          )
        }
      }
    ]
    
    // Fetch agents data on page load
    onMounted(async () => {
      pending.value = true
      error.value = null
      
      try {
        agents.value = await agentsService.getAgents()
      } catch (err: any) {
        error.value = err.message || 'Failed to load agents'
        message.error(`Failed to load agents: ${error.value}`)
      } finally {
        pending.value = false
      }
    })
    
    // Handler for view button and row click
    function handleViewAgent(agent: Agent) {
      router.push(`/agents/${agent.id}`)
    }
    
    function handleRowClick(row: Agent) {
      handleViewAgent(row)
    }
  </script>
  
  <style scoped>
  .page {
    padding: 20px;
  }
  </style>