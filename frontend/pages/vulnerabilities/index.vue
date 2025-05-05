<template>
    <div class="page">
      <h1 class="text-2xl font-bold mb-6">Vulnerabilities</h1>
      
      <!-- Summary Cards -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <n-card>
          <div class="flex items-center gap-3">
            <div class="text-3xl font-bold">{{ vulnerabilitiesStore.totalCount }}</div>
            <div>Total Vulnerabilities</div>
          </div>
        </n-card>
        
        <n-card>
          <div class="flex items-center gap-3">
            <div class="text-3xl font-bold text-red-500">{{ vulnerabilitiesStore.criticalCount }}</div>
            <div>Critical</div>
          </div>
        </n-card>
        
        <n-card>
          <div class="flex items-center gap-3">
            <div class="text-3xl font-bold text-orange-500">{{ vulnerabilitiesStore.highCount }}</div>
            <div>High</div>
          </div>
        </n-card>
        
        <n-card>
          <div class="flex items-center gap-3">
            <div class="text-3xl font-bold text-blue-500">{{ vulnerabilitiesStore.openCount }}</div>
            <div>Open</div>
          </div>
        </n-card>
      </div>
      
      <!-- Filters -->
<n-card class="mb-6">
  <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
    <n-form-item label="Severity" class="mb-0">
      <n-select
        v-model:value="filters.severity"
        placeholder="All Severities"
        :options="severityOptions"
        clearable
        class="w-full"
      />
    </n-form-item>
    
    <n-form-item label="Status" class="mb-0">
      <n-select
        v-model:value="filters.status"
        placeholder="All Statuses"
        :options="statusOptions"
        clearable
        class="w-full"
      />
    </n-form-item>
    
    <n-form-item label="Agent" class="mb-0">
      <n-select
        v-model:value="filters.agentId"
        placeholder="All Agents"
        :options="agentOptions"
        clearable
        class="w-full"
      />
    </n-form-item>
  </div>
</n-card>
      
      <!-- Data Table -->
      <n-card>
        <div v-if="vulnerabilitiesStore.loading" class="py-8 flex justify-center">
          <n-spin size="large" />
        </div>
        <div v-else-if="vulnerabilitiesStore.error" class="py-4">
          <n-alert type="error" title="Error">
            {{ vulnerabilitiesStore.error }}
          </n-alert>
        </div>
        <div v-else>
          <n-data-table
            :columns="columns"
            :data="filteredVulnerabilities"
            :pagination="pagination"
          />
        </div>
      </n-card>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, computed, onMounted, h } from 'vue'
  import { useRouter } from 'vue-router'
  import { NCard, NDataTable, NSpin, NAlert, NSelect, NFormItem, NTag } from 'naive-ui'
  import { useVulnerabilitiesStore } from '@/stores/vulnerabilities.store'
  import type { DataTableColumns } from 'naive-ui'
  import type { Vulnerability } from '@/services/vulnerabilities.service'
  
  // Set page metadata
  definePageMeta({
    name: "Vulnerabilities",
    title: "Vulnerabilities",
    auth: true,
    roles: ["admin", "agent-viewer", "user"]
  })
  
  const router = useRouter()
  const vulnerabilitiesStore = useVulnerabilitiesStore()
  
  // Fetch data on component mount
  onMounted(() => {
    vulnerabilitiesStore.fetchVulnerabilities()
  })
  
  // Pagination settings
  const pagination = ref({
    page: 1,
    pageSize: 10,
    showSizePicker: true,
    pageSizes: [10, 20, 50],
    onChange: (page) => {
      pagination.value.page = page
    },
    onPageSizeChange: (pageSize) => {
      pagination.value.pageSize = pageSize
      pagination.value.page = 1
    }
  })
  
  // Filter settings
  const filters = ref({
    severity: null,
    status: null,
    agentId: null
  })
  
  // Filter options
  const severityOptions = [
    { label: 'Critical', value: 'Critical' },
    { label: 'High', value: 'High' },
    { label: 'Medium', value: 'Medium' },
    { label: 'Low', value: 'Low' }
  ]
  
  const statusOptions = [
    { label: 'Open', value: 'Open' },
    { label: 'Mitigated', value: 'Mitigated' },
    { label: 'Patched', value: 'Patched' }
  ]
  
  // Agent options - computed from the list of vulnerabilities
  const agentOptions = computed(() => {
    const agents = new Map()
    vulnerabilitiesStore.vulnerabilities.forEach(vuln => {
      agents.set(vuln.agent_id, { value: vuln.agent_id, label: vuln.agent_name || `Agent ${vuln.agent_id}` })
    })
    return Array.from(agents.values())
  })
  
  // Apply filters to the vulnerabilities list
  const filteredVulnerabilities = computed(() => {
    return vulnerabilitiesStore.vulnerabilities.filter(vuln => {
      // Filter by severity
      if (filters.value.severity && vuln.severity !== filters.value.severity) {
        return false
      }
      
      // Filter by status
      if (filters.value.status && vuln.status !== filters.value.status) {
        return false
      }
      
      // Filter by agent
      if (filters.value.agentId && vuln.agent_id !== filters.value.agentId) {
        return false
      }
      
      return true
    })
  })
  
  // Table columns definition
  const columns = [
    {
      title: 'ID',
      key: 'id',
      width: 70
    },
    {
      title: 'Name',
      key: 'name',
      render: (row: Vulnerability) => {
        return h(
          'a',
          {
            href: '#',
            onClick: (e) => {
              e.preventDefault()
              router.push(`/vulnerabilities/${row.id}`)
            }
          },
          row.name
        )
      }
    },
    {
      title: 'CVE',
      key: 'cve',
      width: 140
    },
    {
      title: 'Severity',
      key: 'severity',
      width: 120,
      render: (row: Vulnerability) => {
        const colors = {
          'Critical': 'error',
          'High': 'warning',
          'Medium': 'info',
          'Low': 'success'
        }
        return h(NTag, { type: colors[row.severity] as any }, { default: () => row.severity })
      }
    },
    {
      title: 'Status',
      key: 'status',
      width: 120,
      render: (row: Vulnerability) => {
        const colors = {
          'Open': 'error',
          'Mitigated': 'warning',
          'Patched': 'success'
        }
        return h(NTag, { type: colors[row.status] as any }, { default: () => row.status })
      }
    },
    {
      title: 'Agent',
      key: 'agent_name',
      width: 120
    },
    {
      title: 'Discovered',
      key: 'discovered',
      width: 120
    },
    {
      title: 'Description',
      key: 'description',
      ellipsis: {
        tooltip: true
      }
    }
  ] as DataTableColumns<Vulnerability>
  </script>
  
  <style scoped>
  .page {
    padding: 20px;
  }
  </style>