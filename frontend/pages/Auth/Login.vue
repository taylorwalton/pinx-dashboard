<template>
	<div class="page-auth">
	  <Settings v-if="!isLogged" v-model:align="align" v-model:active-color="activeColor" />
  
	  <div v-if="!isLogged" class="wrapper flex justify-center">
		<div v-if="align === 'right'" class="image-box basis-2/3" />
		<div class="form-box flex basis-1/3 items-center justify-center" :class="{ centered: align === 'center' }">
		  <div class="w-full max-w-96 min-w-64">
			<div class="my-10">
			  <Logo mini :dark="isDark" class="mb-4" max-height="40px" />
			  <div class="font-display mb-4 text-4xl font-bold">Welcome Back</div>
			  <div class="text-secondary mb-12 text-lg">
				Today is a new day. It's your day. You shape it. Sign in to start managing your projects.
			  </div>
			</div>
  
			<n-spin v-if="loading" size="large" />
			<template v-else>
			  <n-button type="primary" block size="large" @click="handleLogin">
				Login with Keycloak
			  </n-button>
			</template>
		  </div>
		</div>
		<div v-if="align === 'left'" class="image-box basis-2/3" />
	  </div>
	</div>
  </template>
  
  <script setup lang="ts">
  import { ref, computed, onMounted } from 'vue';
  import { NSpin, NButton } from 'naive-ui';
  import { useAuthStore } from '~/stores/auth';
  import { useThemeStore } from '@/stores/theme';
  import { Layout } from '@/types/theme.d';
  import Logo from '@/app-layouts/common/Logo.vue';
  import Settings from '@/components/auth/Settings.vue';
  import type { Align } from "@/components/auth/Settings.vue";
  
  definePageMeta({
	name: "Login",
	alias: "/login",
	title: "Login",
	theme: { layout: Layout.Blank, boxed: { enabled: false }, padded: { enabled: false } },
	checkAuth: true,
	skipPin: true
  });
  
  const loading = ref(false);
  const authStore = useAuthStore();
  const themeStore = useThemeStore();
  const align = ref<Align>("left");
  const activeColor = ref("");
  const isDark = computed<boolean>(() => themeStore.isThemeDark);
  const isLogged = computed(() => authStore.isLogged);
  
  onMounted(async () => {
	// Check if user is already authenticated
	if (authStore.isLogged) {
	  navigateTo('/');
	}
  });
  
  async function handleLogin() {
	loading.value = true;
	try {
	  await authStore.login();
	} catch (error) {
	  console.error('Login failed:', error);
	} finally {
	  loading.value = false;
	}
  }
  </script>
  
  <style lang="scss" scoped>
  @import "../Auth/main.scss";
  
  .page-auth {
	.wrapper {
	  .image-box {
		background-color: v-bind(activeColor);
	  }
	}
  }
  </style>