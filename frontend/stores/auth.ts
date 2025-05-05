import type { Role, Roles, UserProfile } from "@/types/auth.d"
import _castArray from "lodash/castArray"
import { acceptHMRUpdate, defineStore } from "pinia"
import { piniaPluginPersistedstate } from "#imports"
import { keycloakService } from '~/services/keycloak.service'

export const useAuthStore = defineStore("auth", {
  state: () => ({
    logged: false,
    roles: [] as Role[],
    user: null as UserProfile | null,
    token: null as string | null,
    initialized: false
  }),
  
  actions: {
    async initialize() {
      if (process.server) return;
      
      try {
        const { authenticated, keycloak } = await keycloakService.init();
        this.initialized = true;
        
        if (authenticated) {
          const tokenParsed = keycloak.tokenParsed as any;
          
          // Extract user info from token
          this.user = {
            id: tokenParsed.sub,
            username: tokenParsed.preferred_username || '',
            email: tokenParsed.email || '',
            firstName: tokenParsed.given_name || '',
            lastName: tokenParsed.family_name || '',
            roles: tokenParsed.realm_access?.roles || []
          };
          
          // Save token and roles
          this.token = keycloak.token;
          this.roles = tokenParsed.realm_access?.roles || [];
          this.logged = true;
          
          // Set up token refresh
          keycloak.onTokenExpired = () => {
            keycloak.updateToken(30).catch(() => {
              this.logout();
            });
          };
        }
        
      } catch (error) {
        console.error('Failed to initialize authentication:', error);
      }
    },
    
    async login() {
      if (process.server) return;
      
      try {
        await keycloakService.login();
      } catch (error) {
        console.error('Login error:', error);
        throw error;
      }
    },
    
    // In your auth store
async logout() {
	if (process.server) return;
	
	try {
	  // Reset state FIRST before calling Keycloak logout
	  this.logged = false;
	  this.roles = [];
	  this.user = null;
	  this.token = null;
	  
	  // Only try to call Keycloak after state is reset
	  if (typeof window !== 'undefined' && keycloakService?.logout) {
		return keycloakService.logout().catch(err => {
		  console.warn('Non-critical error during Keycloak logout:', err);
		});
	  }
	} catch (error) {
	  console.error('Logout error:', error);
	}
  }
  },
  
  getters: {
    isLogged(state) {
      return state.logged;
    },
    
    userRoles(state) {
      return state.roles;
    },
    
    isRoleGranted(state) {
      return (roles?: Roles) => {
        if (!roles) {
          return true;
        }
        
        if (state.roles.length === 0) {
          return false;
        }
        
        const arrRoles: Role[] = _castArray(roles);
        
        if (arrRoles.includes("all")) {
          return true;
        }
        
        return arrRoles.some(role => state.roles.includes(role));
      };
    }
  },
  
  persist: {
    storage: piniaPluginPersistedstate.localStorage,
    paths: ['logged', 'roles', 'token']
  }
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot))
}