<template>
    <div>
      <div v-if="loading" class="py-8 flex justify-center">
        <n-spin size="large" />
      </div>
      <div v-else-if="error" class="mt-4">
        <n-alert type="error" title="Error">
          <p>{{ error }}</p>
        </n-alert>
      </div>
      <div v-else>
        <n-data-table
          :columns="columns"
          :data="agents"
          :bordered="false"
          :pagination="pagination"
          @row-click="onRowClick"
        />
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { h, computed } from 'vue'
  import type { DataTableColumns } from 'naive-ui'
  import { NDataTable, NSpin, NAlert, NButton } from 'naive-ui'
  import { Agent } from '~/types/agent.types'
  
  const props = defineProps<{
    agents: Agent[];
    loading: boolean;
    error: string | null;
  }>()
  
  const emit = defineEmits<{
    (e: 'view', agent: Agent): void
  }>()
  
  const pagination = { pageSize: 10 }
  
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
              emit('view', row)
            }
          },
          { default: () => 'View Details' }
        )
      }
    }
  ]
  
  function onRowClick(row: Agent) {
    emit('view', row)
  }
  </script>