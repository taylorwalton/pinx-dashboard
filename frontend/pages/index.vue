<template>
	<div class="page">
	  <h1>Welcome to Pinx Dashboard</h1>
	  
	  <n-card title="Greeting Form" class="mt-6 max-w-lg">
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
	</div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue'
  import { NCard, NSpace, NForm, NFormItem, NInput, NButton, NSpin, NAlert } from 'naive-ui'
  import { useHelloService } from '~/services/hello.service'
  import { useErrorHandler } from '~/composables/useErrorHandler'
  
  definePageMeta({
	name: "HomePage",
	title: "Home",
	auth: true,
	roles: "all"
  })
  
  const name = ref('')
  const greeting = ref('')
  const loading = ref(false)
  const error = ref('')
  const helloService = useHelloService()
  const { handleError } = useErrorHandler()
  
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
  </script>
  
  <style scoped>
  .page {
	padding: 20px;
  }
  </style>