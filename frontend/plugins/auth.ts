import { useAuthStore } from '~/stores/auth';

export default defineNuxtPlugin(async (nuxtApp) => {
  // Initialize auth only on client-side
  if (process.client) {
    const authStore = useAuthStore();
    
    // Initialize authentication (connect to Keycloak)
    await authStore.initialize();
  }
});