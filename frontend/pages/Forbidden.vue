<template>
    <div class="page-forbidden">
      <n-result status="403" title="Access Denied" description="Sorry, you don't have permission to access this page.">
        <template #footer>
          <n-button @click="goBack">Go Back</n-button>
          <n-button type="primary" @click="goHome" class="ml-4">Go Home</n-button>
        </template>
      </n-result>
    </div>
  </template>
  
  <script setup lang="ts">
  import { useRouter } from 'vue-router'
  import { NResult, NButton } from 'naive-ui'
  
  definePageMeta({
    name: "Forbidden",
    title: "Access Denied",
    skipPin: true
  })
  
  const router = useRouter()
  
  function goBack() {
    router.back()
  }
  
  function goHome() {
    router.push('/')
  }
  </script>
  
  <style scoped>
  .page-forbidden {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 80vh;
  }
  </style>