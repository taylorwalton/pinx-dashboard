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
    companyId: null as number | null,
    companyName: null as string | null,
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
          
          // Extract company info from token
          const companyId = tokenParsed.company_id ? parseInt(tokenParsed.company_id) : null;
          const companyName = tokenParsed.company_name || null;
          
          // Store company info in state
          this.companyId = companyId;
          this.companyName = companyName;
          
          // Extract user info from token with company info
          this.user = {
            id: tokenParsed.sub,
            username: tokenParsed.preferred_username || '',
            email: tokenParsed.email || '',
            firstName: tokenParsed.given_name || '',
            lastName: tokenParsed.family_name || '',
            roles: tokenParsed.realm_access?.roles || [],
            companyId: companyId,
            companyName: companyName
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
    
    async logout() {
      if (process.server) return;
      
      try {
        // Reset state FIRST before calling Keycloak logout
        this.logged = false;
        this.roles = [];
        this.user = null;
        this.token = null;
        this.companyId = null;
        this.companyName = null;
        
        // Only try to call Keycloak after state is reset
        if (typeof window !== 'undefined' && keycloakService?.logout) {
          // Specify redirectUri for proper Keycloak logout flow
          return keycloakService.logout({ 
            redirectUri: window.location.origin + '/auth/login'
          }).catch(err => {
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
    },
    
    // Company-related getters
    hasCompany(state) {
      return state.companyId !== null;
    },
    
    currentCompany(state) {
      return {
        id: state.companyId,
        name: state.companyName
      };
    },
    
    isAdmin(state) {
      return state.roles.includes('admin');
    },
    
    // Helper for API requests to determine if company filtering is needed
    needsCompanyFilter(state) {
      return state.logged && !state.roles.includes('admin') && state.companyId !== null;
    }
  },
  
  persist: {
    storage: piniaPluginPersistedstate.localStorage,
    paths: ['logged', 'roles', 'token', 'companyId', 'companyName']
  }
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot))
}