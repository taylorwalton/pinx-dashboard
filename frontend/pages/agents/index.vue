<template>
  <div class="page">
    <h1>Agents</h1>
    
    <!-- Status Summary Cards -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <n-card>
        <div class="flex items-center gap-3">
          <div class="text-3xl font-bold">{{ agents.length }}</div>
          <div>Total Agents</div>
        </div>
      </n-card>
      
      <n-card class="col-span-2">
        <div class="flex items-center">
          <div style="height: 180px; width: 180px;">
            <v-chart class="chart" :option="chartOption" autoresize />
          </div>
          <div class="ml-6">
            <div class="mb-3">
              <div class="flex items-center">
                <div class="w-4 h-4 rounded-full bg-green-500 mr-2"></div>
                <div><span class="font-bold">{{ statusCounts.Active || 0 }}</span> Active Agents</div>
              </div>
            </div>
            <div class="mb-3">
              <div class="flex items-center">
                <div class="w-4 h-4 rounded-full bg-gray-500 mr-2"></div>
                <div><span class="font-bold">{{ statusCounts.Inactive || 0 }}</span> Inactive Agents</div>
              </div>
            </div>
            <div>
              <div class="flex items-center">
                <div class="w-4 h-4 rounded-full bg-blue-500 mr-2"></div>
                <div><span class="font-bold">{{ statusCounts.Other || 0 }}</span> Other Status</div>
              </div>
            </div>
          </div>
        </div>
      </n-card>
    </div>
    
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
            :data="agentsWithVulnCounts"
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
  import { h, ref, onMounted, computed } from 'vue'
  import { 
    NCard, 
    NSpace, 
    NSpin, 
    NAlert, 
    NDataTable, 
    NButton,
    NTag,
    useMessage
  } from 'naive-ui'
  import type { DataTableColumns } from 'naive-ui'
  import { useRouter } from 'vue-router'
  import type { Agent } from '~/types/agent.types'
  import { useAgentsService } from '~/services/agent.service'
  import { useVulnerabilitiesStore } from '~/stores/vulnerabilities.store'
  import { use } from 'echarts/core'
  import { PieChart } from 'echarts/charts'
  import {
    TitleComponent,
    TooltipComponent,
    LegendComponent
  } from 'echarts/components'
  import { CanvasRenderer } from 'echarts/renderers'
  import VChart from 'vue-echarts'

  // Register ECharts components
  use([
    PieChart,
    TitleComponent,
    TooltipComponent,
    LegendComponent,
    CanvasRenderer
  ])

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
  const vulnerabilitiesStore = useVulnerabilitiesStore()
  
  // State
  const agents = ref<Agent[]>([])
  const pending = ref(true)
  const error = ref<string | null>(null)
  
  // Configure table pagination
  const pagination = {
    pageSize: 10
  }
  
  // Compute status counts for the chart
  const statusCounts = computed(() => {
    const counts: Record<string, number> = {
      Active: 0,
      Inactive: 0,
      Other: 0
    }
    
    agents.value.forEach(agent => {
      const status = agent.status || 'Active' // Default to Active if status is undefined
      if (status === 'Active') counts.Active++
      else if (status === 'Inactive') counts.Inactive++
      else counts.Other++
    })
    
    return counts
  })
  
  // Chart configuration
  const chartOption = computed(() => ({
    tooltip: {
      trigger: 'item',
      formatter: '{b}: {c} ({d}%)'
    },
    series: [
      {
        type: 'pie',
        radius: ['50%', '70%'], // Donut chart
        avoidLabelOverlap: false,
        label: {
          show: false,
        },
        emphasis: {
          label: {
            show: false
          }
        },
        data: [
          { value: statusCounts.value.Active, name: 'Active', itemStyle: { color: '#10b981' } },
          { value: statusCounts.value.Inactive, name: 'Inactive', itemStyle: { color: '#6b7280' } },
          { value: statusCounts.value.Other, name: 'Other', itemStyle: { color: '#3b82f6' } }
        ]
      }
    ]
  }))
  
  // Computed property to add vulnerability counts to agents
  const agentsWithVulnCounts = computed(() => {
    return agents.value.map(agent => {
      // Count vulnerabilities for this agent
      const vulnCount = vulnerabilitiesStore.vulnerabilities.filter(
        vuln => vuln.agent_id === agent.id
      ).length;
      
      // Return enhanced agent object
      return {
        ...agent,
        vulnerabilityCount: vulnCount
      }
    })
  })
  
  // Define table columns with TypeScript types
  const columns: DataTableColumns<Agent & { vulnerabilityCount?: number }> = [
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
      title: 'Status',
      key: 'status',
      render(row) {
        const status = row.status || 'Active';
        const type = status === 'Active' ? 'success' : 
                    status === 'Inactive' ? 'default' : 'info';
        
        return h(
          NTag,
          { type },
          { default: () => status }
        );
      }
    },
    {
      title: 'Vulnerabilities',
      key: 'vulnerabilityCount',
      render(row) {
        const count = row.vulnerabilityCount || 0;
        const type = count > 0 ? 'warning' : 'success';
        
        return h(
          NTag,
          { 
            type, 
            size: 'medium',
            round: true,
            style: {
              cursor: count > 0 ? 'pointer' : 'default'
            },
            onClick: count > 0 ? (e) => {
              e.stopPropagation();
              router.push(`/vulnerabilities?agent=${row.id}`);
            } : undefined
          },
          { default: () => count.toString() }
        );
      },
      sorter: (a, b) => (a.vulnerabilityCount || 0) - (b.vulnerabilityCount || 0)
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
      // Fetch both agents and vulnerabilities in parallel
      const [agentsData] = await Promise.all([
        agentsService.getAgents(),
        vulnerabilitiesStore.fetchVulnerabilities()
      ])
      
      agents.value = agentsData
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

.chart {
  height: 100%;
  width: 100%;
}
</style>