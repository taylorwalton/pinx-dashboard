<template>
	<div class="page">
	  <n-card class="header flex flex-col" content-class="p-0!">
		<div class="user-info flex flex-wrap">
		  <div class="propic">
			<n-avatar :size="100" :src="propic" round :img-props="{ alt: 'avatar' }" />
			<ImageCropper
			  v-slot="{ openCropper }"
			  placeholder="Select your profile picture"
			  @crop="setCroppedImage"
			>
			  <Icon :name="EditIcon" :size="16" class="edit" @click="openCropper()" />
			</ImageCropper>
		  </div>
		  <div class="info flex grow flex-col justify-center">
			<div class="name">
			  <h1>{{ user?.firstName }} {{ user?.lastName }}</h1>
			</div>
			<div class="details flex flex-wrap gap-6 mt-3">
			  <div class="item border-r pr-6 last:border-0">
				<n-tooltip placement="top">
				  <template #trigger>
					<div class="tooltip-wrap flex items-center gap-2">
					  <Icon :name="RoleIcon" />
					  <span>{{ primaryRole }}</span>
					</div>
				  </template>
				  <span>Role</span>
				</n-tooltip>
			  </div>
			  <div class="item border-r pr-6 last:border-0" v-if="companyName">
				<n-tooltip placement="top">
				  <template #trigger>
					<div class="tooltip-wrap flex items-center gap-2">
					  <Icon :name="CompanyIcon" />
					  <span>{{ companyName }}</span>
					</div>
				  </template>
				  <span>Company</span>
				</n-tooltip>
			  </div>
			  <div class="item last:border-0">
				<n-tooltip placement="top">
				  <template #trigger>
					<div class="tooltip-wrap flex items-center gap-2">
					  <Icon :name="MailIcon" />
					  <span>{{ user?.email }}</span>
					</div>
				  </template>
				  <span>Email</span>
				</n-tooltip>
			  </div>
			</div>
		  </div>
		  <div class="actions">
			<ImageCropper
			  v-slot="{ openCropper }"
			  placeholder="Select your profile picture"
			  @crop="setCroppedImage"
			>
			  <n-button size="large" type="primary" @click="openCropper()">Edit profile image</n-button>
			</ImageCropper>
		  </div>
		</div>
		<div class="section-selector">
		  <n-tabs v-model:value="tabActive">
			<n-tab name="activity">Activity</n-tab>
			<n-tab name="settings">Settings</n-tab>
		  </n-tabs>
		</div>
	  </n-card>
	  <div class="main">
		<n-tabs v-model:value="tabActive" tab-class="hidden!" animated>
		  <n-tab-pane name="activity">
			<n-card>
			  <ActivityTimeline :activities="userActivities" />
			</n-card>
		  </n-tab-pane>
		  <n-tab-pane name="settings">
			<ProfileSettings :user="user" />
		  </n-tab-pane>
		</n-tabs>
	  </div>
	</div>
  </template>
  
  <script lang="ts" setup>
  import type { ImageCropperResult } from "@/components/common/ImageCropper.vue"
  import Icon from "@/components/common/Icon.vue"
  import ImageCropper from "@/components/common/ImageCropper.vue"
  import ProfileSettings from "@/components/profile/ProfileSettings.vue"
  import ActivityTimeline, { type Activity } from "@/components/profile/ActivityTimeline.vue"
  import { NAvatar, NButton, NCard, NEmpty, NTab, NTabPane, NTabs, NTooltip } from "naive-ui"
  import { ref, computed } from "vue"
  import { useAuthStore } from "@/stores/auth"
  
  definePageMeta({
	auth: true,
	roles: "all"
  })
  
  const RoleIcon = "tabler:user"
  const LocationIcon = "tabler:map-pin"
  const EditIcon = "uil:image-edit"
  const MailIcon = "tabler:mail"
  const CompanyIcon = "tabler:building-skyscraper"
  
  const tabActive = ref("activity")
  const propic = ref("/images/avatar-200.jpg")
  
  // Get user info from auth store
  const authStore = useAuthStore()
  const user = computed(() => authStore.user)
  const companyName = computed(() => authStore.companyName)
  
  // Sample activity data for the test user
  const userActivities = ref<Activity[]>([
	{
	  id: 1,
	  type: 'login',
	  title: 'Logged In',
	  description: 'Successfully logged in to the system',
	  timestamp: new Date(new Date().getTime() - 5 * 60000).toISOString(), // 5 minutes ago
	  metadata: {
		ip: '192.168.1.105',
		browser: 'Chrome',
		device: 'Desktop'
	  }
	},
	{
	  id: 2,
	  type: 'update',
	  title: 'Profile Updated',
	  description: 'Updated profile information',
	  timestamp: new Date(new Date().getTime() - 2 * 3600000).toISOString(), // 2 hours ago
	  metadata: {
		changedFields: 'First Name, Last Name'
	  }
	},
	{
	  id: 3,
	  type: 'security',
	  title: 'Password Changed',
	  description: 'Password has been changed successfully',
	  timestamp: new Date(new Date().getTime() - 24 * 3600000).toISOString(), // 1 day ago
	},
	{
	  id: 4,
	  type: 'system',
	  title: 'System Notification',
	  description: 'Your account has been granted additional permissions',
	  timestamp: new Date(new Date().getTime() - 3 * 24 * 3600000).toISOString(), // 3 days ago
	  metadata: {
		addedRole: 'Agent Viewer',
		approvedBy: 'Admin'
	  }
	},
	{
	  id: 5,
	  type: 'login',
	  title: 'Logged In',
	  description: 'Successfully logged in to the system',
	  timestamp: new Date(new Date().getTime() - 5 * 24 * 3600000).toISOString(), // 5 days ago
	  metadata: {
		ip: '192.168.1.100',
		browser: 'Firefox',
		device: 'Mobile'
	  }
	},
	{
	  id: 6,
	  type: 'security',
	  title: 'Security Alert',
	  description: 'Unusual login attempt detected and blocked',
	  timestamp: new Date(new Date().getTime() - 7 * 24 * 3600000).toISOString(), // 7 days ago
	  metadata: {
		ip: '203.0.113.42',
		location: 'Unknown location',
		status: 'Blocked'
	  }
	},
	{
	  id: 7,
	  type: 'update',
	  title: 'Account Created',
	  description: 'Your account was created',
	  timestamp: new Date(new Date().getTime() - 14 * 24 * 3600000).toISOString(), // 14 days ago
	}
  ])
  
  // Get primary role (highest privilege)
  const primaryRole = computed(() => {
	const roles = authStore.roles
	if (roles.includes('admin')) return 'Administrator'
	if (roles.includes('moderator')) return 'Moderator'
	if (roles.includes('agent-viewer')) return 'Agent Viewer'
	if (roles.includes('user')) return 'User'
	return 'Guest'
  })
  
  function setCroppedImage(result: ImageCropperResult) {
	const canvas = result.canvas as HTMLCanvasElement
	propic.value = canvas.toDataURL()
  }
  </script>
  
  <style lang="scss" scoped>
  .page {
	padding: 20px;
  }
  
  .header {
	margin-bottom: 20px;
	
	.user-info {
	  padding: 20px;
	  
	  .propic {
		position: relative;
		margin-right: 1.5rem;
		
		.edit {
		  position: absolute;
		  bottom: 0;
		  right: 0;
		  background-color: var(--primary-color);
		  color: white;
		  border-radius: 50%;
		  padding: 5px;
		  cursor: pointer;
		  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
		}
	  }
	  
	  .info {
		.name {
		  h1 {
			font-size: 1.75rem;
			margin-bottom: 0.5rem;
		  }
		}
		
		.details {
		  margin-top: 0.75rem;
		  
		  .item {
			position: relative;
			
			.tooltip-wrap {
			  display: flex;
			  align-items: center;
			  color: var(--text-color-secondary);
			  
			  span {
				margin-left: 0.25rem;
			  }
			}
		  }
		}
	  }
	  
	  .actions {
		display: flex;
		align-items: center;
		margin-left: auto;
		
		@media (max-width: 768px) {
		  margin-top: 1rem;
		  margin-left: 0;
		  width: 100%;
		}
	  }
	  
	  @media (max-width: 768px) {
		flex-direction: column;
		
		.info {
		  margin-top: 1rem;
		  width: 100%;
		}
	  }
	}
	
	.section-selector {
	  border-top: 1px solid var(--border-color);
	}
  }
  
  .main {
	margin-top: 1rem;
  }
  </style>