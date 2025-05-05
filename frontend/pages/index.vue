<template>
	<div class="page">
	  <h1>Welcome to Pinx Dashboard</h1>
	  
	  <div class="grid grid-cols-1 gap-6 mt-6">
		<!-- Greeting Form Card (First) -->
		<n-card title="Greeting Form" class="max-w-lg">
		  <n-space vertical>
			<n-form>
			  <n-form-item label="Your Name">
				<n-input v-model:value="name" placeholder="Enter your name" @keyup.enter="fetchGreeting" />
			  </n-form-item>
			  <n-button type="primary" @click="fetchGreeting">Get Greeting</n-button>
			</n-form>
			
			<div v-if="loading" class="mt-4">
			  <n-spin size="medium" />
			</div>
			<div v-else-if="error" class="mt-4">
			  <n-alert type="error" title="Error">
				<p>{{ error }}</p>
			  </n-alert>
			</div>
			<div v-else-if="greeting" class="mt-4">
			  <n-alert type="success">
				<h2 class="text-lg font-bold">{{ greeting }}</h2>
			  </n-alert>
			</div>
		  </n-space>
		</n-card>
		
		<!-- Agents Overview Card (Second) -->
		<n-card title="Agents Overview" class="max-w-lg">
		  <n-space vertical>
			<div v-if="agentsLoading" class="py-4 flex justify-center">
			  <n-spin size="medium" />
			</div>
			<div v-else-if="agentsError" class="mt-2">
			  <n-alert type="error" title="Error">
				<p>{{ agentsError }}</p>
			  </n-alert>
			</div>
			<div v-else class="flex items-center">
			  <div class="text-5xl font-bold text-primary mr-4">{{ agentsCount }}</div>
			  <div class="text-lg">Total Agents</div>
			</div>
			<n-button class="mt-4" @click="navigateToAgents">
			  View All Agents
			</n-button>
		  </n-space>
		</n-card>
	  </div>
	</div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted, computed } from 'vue'
  import { NCard, NSpace, NForm, NFormItem, NInput, NButton, NSpin, NAlert } from 'naive-ui'
  import { useHelloService } from '~/services/hello.service'
  import { useErrorHandler } from '~/composables/useErrorHandler'
  import { useAgentsStore } from '~/stores/agents.store'
  import { useRouter } from 'vue-router'
  
  definePageMeta({
	name: "HomePage",
	title: "Home",
	auth: true,
	roles: "all"
  })
  
  // For greeting functionality
  const name = ref('')
  const greeting = ref('')
  const loading = ref(false)
  const error = ref('')
  const helloService = useHelloService()
  const { handleError } = useErrorHandler()
  
  // For agents count functionality
  const agentsStore = useAgentsStore()
  const agentsLoading = ref(true)
  const agentsError = ref('')
  const router = useRouter()
  
  const agentsCount = computed(() => agentsStore.agents.length)
  
  // Fetch agents on page load
  onMounted(async () => {
	try {
	  await agentsStore.fetchAgents()
	} catch (err) {
	  agentsError.value = handleError(err, 'Failed to fetch agents')
	} finally {
	  agentsLoading.value = false
	}
  })
  
  async function fetchGreeting() {
	loading.value = true
	error.value = ''
	
	try {
	  const response = await helloService.getGreeting(name.value)
	  greeting.value = response.message
	} catch (err) {
	  error.value = handleError(err, 'Failed to get greeting')
	} finally {
	  loading.value = false
	}
  }
  
  function navigateToAgents() {
	router.push('/agents')
  }
  </script>
  
  <style scoped>
  .page {
	padding: 20px;
  }
  </style>