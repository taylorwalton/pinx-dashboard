<template>
	<n-card class="settings">
	  <n-form ref="refForm" :label-width="80" :model="formValue" :rules="formRules">
		<div class="title">General</div>
		<div class="flex flex-col justify-between md:flex-row md:gap-4">
		  <n-form-item label="Username" path="username" class="basis-1/2">
			<n-input v-model:value="formValue.username" placeholder="Type username">
			  <template #prefix>@</template>
			</n-input>
		  </n-form-item>
		  <n-form-item label="Email" path="email" class="basis-1/2">
			<n-input v-model:value="formValue.email" placeholder="Type email" />
		  </n-form-item>
		</div>
		
		<div class="title">Profile</div>
		<div class="flex flex-col justify-between md:flex-row md:gap-4">
		  <n-form-item label="First Name" path="firstName" class="basis-1/2">
			<n-input v-model:value="formValue.firstName" placeholder="First Name" />
		  </n-form-item>
		  <n-form-item label="Last Name" path="lastName" class="basis-1/2">
			<n-input v-model:value="formValue.lastName" placeholder="Last Name" />
		  </n-form-item>
		</div>
  
		<div class="flex flex-col justify-between md:flex-row md:gap-4">
		  <n-form-item label="Company" path="company" class="basis-1/2">
			<n-input v-model:value="formValue.company" disabled placeholder="Company" />
		  </n-form-item>
		  <n-form-item label="Role" path="role" class="basis-1/2">
			<n-input v-model:value="formValue.role" disabled placeholder="Role" />
		  </n-form-item>
		</div>
  
		<n-form-item>
		  <div class="flex gap-2">
			<n-button type="primary" :loading="loading" @click="handleSave">Save Changes</n-button>
			<n-button @click="resetForm">Reset</n-button>
		  </div>
		</n-form-item>
	  </n-form>
	</n-card>
  </template>
  
  <script setup lang="ts">
  import { NButton, NCard, NForm, NFormItem, NInput, useMessage } from "naive-ui"
  import { ref, onMounted, computed } from "vue"
  import { useAuthStore } from "@/stores/auth"
  import { useProfileService } from "@/services/profile.service"
  
  const props = defineProps({
	user: {
	  type: Object,
	  required: false,
	  default: null
	}
  })
  
  const authStore = useAuthStore()
  const message = useMessage()
  const profileService = useProfileService()
  const loading = ref(false)
  
  const formValue = ref({
	username: "",
	email: "",
	firstName: "",
	lastName: "",
	company: "",
	role: ""
  })
  
  const originalFormValue = ref({
	username: "",
	email: "",
	firstName: "",
	lastName: "",
	company: "",
	role: ""
  })
  
  const refForm = ref()
  
  const formRules = {
	username: {
	  required: true,
	  message: "Please input username",
	  trigger: "blur"
	},
	email: {
	  required: true,
	  message: "Please input email",
	  trigger: ["blur", "input"]
	}
  }
  
  // Primary role for display
  const primaryRole = computed(() => {
	const roles = authStore.roles
	if (roles.includes('admin')) return 'Administrator'
	if (roles.includes('moderator')) return 'Moderator'
	if (roles.includes('agent-viewer')) return 'Agent Viewer'
	if (roles.includes('user')) return 'User'
	return 'Guest'
  })
  
  onMounted(() => {
	// Populate form with user data
	if (props.user) {
	  formValue.value.username = props.user.username || "";
	  formValue.value.email = props.user.email || "";
	  formValue.value.firstName = props.user.firstName || props.user.given_name || "";
	  formValue.value.lastName = props.user.lastName || props.user.family_name || "";
	}
	
	// Add company info
	formValue.value.company = authStore.companyName || "Not assigned";
	
	// Add role info
	formValue.value.role = primaryRole.value;
  
	// Store original values for reset functionality
	originalFormValue.value = { ...formValue.value };
  })
  
  const resetForm = () => {
	// Reset form to original values
	formValue.value = { ...originalFormValue.value };
	refForm.value?.restoreValidation();
  }
  
  const handleSave = async () => {
  refForm.value?.validate(async (errors) => {
    if (!errors) {
      loading.value = true;
      try {
        // Prepare the update data
        const updateData = {
          username: formValue.value.username,
          email: formValue.value.email,
          firstName: formValue.value.firstName,
          lastName: formValue.value.lastName
        };
        
        // Call the actual API service
        const updatedProfile = await profileService.updateProfile(updateData);
        
        // Update the original values after successful save
        originalFormValue.value = { ...formValue.value };
        
        // If you want to update the auth store with the new profile data
        // authStore.updateUserProfile(updatedProfile);
        
        message.success("Profile updated successfully");
      } catch (error) {
        console.error('Error updating profile:', error);
        message.error("Failed to update profile. Please try again.");
      } finally {
        loading.value = false;
      }
    } else {
      message.error("Please fix the form errors");
    }
  });
}
  </script>
  
  <style lang="scss" scoped>
  .settings {
	.title {
	  font-size: 20px;
	  font-weight: 600;
	  margin-bottom: 20px;
  
	  &:not(:first-child) {
		margin-top: 20px;
	  }
	}
  }
  </style>