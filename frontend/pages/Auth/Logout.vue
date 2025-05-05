<template>
	<div class="logout-page">
	  <div class="logout-container">
		<n-card>
		  <template #header>
			<div class="text-xl font-bold">Logging Out</div>
		  </template>
		  <div class="flex items-center justify-center flex-col gap-4 p-6">
			<n-spin size="large" />
			<div>{{ statusMessage }}</div>
		  </div>
		</n-card>
	  </div>
	</div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted } from 'vue'
  import { useAuthStore } from '@/stores/auth'
  import { NSpin, NCard } from 'naive-ui'
  import { keycloakService } from '~/services/keycloak.service'
  
  definePageMeta({
	name: "Logout",
	alias: "/logout",
	title: "Logout",
	skipPin: true
  })
  
  const authStore = useAuthStore()
  const statusMessage = ref('Signing you out...')
  
  // Reset local storage first to avoid DataView errors
  function cleanupStorageData() {
	try {
	  // Manually remove storage items without triggering store persistence
	  localStorage.removeItem('auth')
	  sessionStorage.removeItem('keycloak-token')
	  
	  // Clear cookies
	  document.cookie.split(";").forEach(function(c) {
		document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
	  });
	} catch (e) {
	  console.warn('Error cleaning storage:', e)
	}
  }
  
  onMounted(() => {
	setTimeout(() => {
	  try {
		statusMessage.value = 'Ending your session...'
		
		// First clean up storage manually
		cleanupStorageData()
		
		// Instead of using the store logout method, directly control the Keycloak logout
		// with a redirect URI to prevent infinite loops
		const loginPath = '/auth/login'; // Assuming this is your login path
		const redirectUri = window.location.origin + loginPath;
		
		try {
		  // Use keycloakService directly with redirectUri option
		  keycloakService.logout({ redirectUri });
		} catch (err) {
		  console.warn('Keycloak logout warning (can be ignored):', err);
		  // Fallback redirect if Keycloak logout fails
		  window.location.href = loginPath;
		}
		
	  } catch (error) {
		console.error('Logout error:', error);
		statusMessage.value = 'Error during logout. Redirecting to login...';
		window.location.href = '/auth/login';
	  }
	}, 100);
  });
  </script>
  
  <style scoped>
  .logout-page {
	display: flex;
	align-items: center;
	justify-content: center;
	min-height: 80vh;
  }
  
  .logout-container {
	width: 100%;
	max-width: 400px;
  }
  </style>