<template>
    <div>
      <div v-if="loading" class="py-8 flex justify-center">
        <n-spin size="large" />
      </div>
      <div v-else-if="error" class="mt-4">
        <n-alert type="error" title="Error loading agent details">
          <p>{{ error }}</p>
        </n-alert>
      </div>
      <div v-else-if="agent">
        <n-descriptions label-placement="top" title="Agent Information">
          <n-descriptions-item>
            <template #label>ID</template>
            {{ agent.id }}
          </n-descriptions-item>
          <n-descriptions-item label="Name">
            {{ agent.name }}
          </n-descriptions-item>
          <n-descriptions-item label="Type">
            {{ agent.type || 'Standard' }}
          </n-descriptions-item>
          <n-descriptions-item label="Details" :span="2">
            Agent ID: {{ agent.id }}<br>
            Agent Name: {{ agent.name }}
          </n-descriptions-item>
          <n-descriptions-item label="Status">
            {{ agent.status || 'Active' }}
          </n-descriptions-item>
        </n-descriptions>
      </div>
      <div v-else>
        <n-empty description="Agent not found" />
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { NSpin, NAlert, NDescriptions, NDescriptionsItem, NEmpty } from 'naive-ui'
  import type { Agent } from '~/types/agent.types'
  
  defineProps<{
    agent: Agent | null;
    loading: boolean;
    error: string | null;
  }>()
  </script>