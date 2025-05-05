<template>
    <div class="page">
      <!-- Show Forbidden message when access is denied -->
      <n-result 
        v-if="vulnerabilitiesStore.isForbidden"
        status="403"
        title="Access Denied"
        description="Sorry, you don't have permission to view this vulnerability's details."
      >
        <template #footer>
          <n-button @click="router.back()">Go Back</n-button>
          <n-button type="primary" @click="router.push('/vulnerabilities')" class="ml-4">Back to Vulnerabilities</n-button>
        </template>
      </n-result>
      
      <!-- Loading state -->
      <div v-else-if="loading" class="flex justify-center py-12">
        <n-spin size="large" />
      </div>
      
      <!-- Error state -->
      <div v-else-if="error" class="py-6">
        <n-alert type="error" title="Error">
          {{ error }}
        </n-alert>
        <div class="mt-4 flex">
          <n-button @click="router.back()">Go Back</n-button>
        </div>
      </div>
      
      <!-- Content when data is loaded -->
      <template v-else-if="vulnerability">
        <!-- Back button -->
        <div class="mb-4">
          <n-button @click="router.back()">
            <template #icon>
              <n-icon>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M20 11H7.83l5.59-5.59L12 4l-8 8l8 8l1.41-1.41L7.83 13H20v-2z"/>
                </svg>
              </n-icon>
            </template>
            Back
          </n-button>
        </div>
        
        <!-- Header -->
        <div class="flex items-center justify-between mb-6">
          <div>
            <h1 class="text-2xl font-bold flex items-center gap-2">
              {{ vulnerability.name }}
              <n-tag :type="severityColor" size="small">{{ vulnerability.severity }}</n-tag>
            </h1>
            <div class="text-gray-500">{{ vulnerability.cve }}</div>
          </div>
          
          <n-tag :type="statusColor" size="medium">{{ vulnerability.status }}</n-tag>
        </div>
        
        <!-- Main content -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <!-- Left column with details -->
          <n-card title="Vulnerability Details" class="col-span-2">
            <n-descriptions bordered>
              <n-descriptions-item label="Description" span="3">
                {{ vulnerability.description }}
              </n-descriptions-item>
              <n-descriptions-item label="Agent">
                {{ vulnerability.agent_name }}
              </n-descriptions-item>
              <n-descriptions-item label="Discovered">
                {{ vulnerability.discovered }}
              </n-descriptions-item>
              <n-descriptions-item label="Status">
                {{ vulnerability.status }}
              </n-descriptions-item>
              <n-descriptions-item label="Severity">
                {{ vulnerability.severity }}
              </n-descriptions-item>
              <n-descriptions-item label="CVE">
                <a :href="`https://cve.mitre.org/cgi-bin/cvename.cgi?name=${vulnerability.cve}`" 
                   target="_blank" 
                   class="text-blue-500 hover:underline">
                  {{ vulnerability.cve }}
                </a>
              </n-descriptions-item>
            </n-descriptions>
          </n-card>
          
          <!-- Right column with actions -->
          <div class="col-span-1">
            <n-card title="Actions">
              <div class="flex flex-col gap-3">
                <n-button type="primary" block>Mark as Mitigated</n-button>
                <n-button type="success" block>Mark as Patched</n-button>
                <n-button type="error" block>Flag as Critical</n-button>
              </div>
            </n-card>
          </div>
        </div>
      </template>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, computed, onMounted } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  import { NButton, NSpin, NAlert, NCard, NDescriptions, NDescriptionsItem, NTag, NIcon, NResult } from 'naive-ui'
  import { useVulnerabilitiesStore } from '@/stores/vulnerabilities.store'
  import { useVulnerabilitiesService } from '@/services/vulnerabilities.service'
  import { useErrorHandler } from '@/composables/useErrorHandler'
  import type { Vulnerability } from '@/services/vulnerabilities.service'
  
  definePageMeta({
    name: "VulnerabilityDetails",
    title: "Vulnerability Details",
    auth: true,
    roles: ["admin", "agent-viewer", "user"]
  })
  
  const route = useRoute()
  const router = useRouter()
  const vulnerabilitiesStore = useVulnerabilitiesStore()
  const vulnerabilityService = useVulnerabilitiesService()
  const { handleError } = useErrorHandler()
  
  const vulnerability = ref<Vulnerability | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)
  
  // Computed properties for styling
  const severityColor = computed(() => {
    if (!vulnerability.value) return 'default'
    const colors = {
      'Critical': 'error',
      'High': 'warning',
      'Medium': 'info',
      'Low': 'success'
    }
    return colors[vulnerability.value.severity] || 'default'
  })
  
  const statusColor = computed(() => {
    if (!vulnerability.value) return 'default'
    const colors = {
      'Open': 'error',
      'Mitigated': 'warning',
      'Patched': 'success'
    }
    return colors[vulnerability.value.status] || 'default'
  })
  
  // Fetch the vulnerability details on component mount
  onMounted(async () => {
    const id = parseInt(route.params.id as string)
    if (isNaN(id)) {
      error.value = 'Invalid vulnerability ID'
      return
    }
    
    loading.value = true
    try {
      vulnerability.value = await vulnerabilityService.fetchVulnerability(id)
    } catch (err) {
      error.value = handleError(err, 'Failed to fetch vulnerability details')
    } finally {
      loading.value = false
    }
  })
  </script>
  
  <style scoped>
  .page {
    padding: 20px;
  }
  </style>