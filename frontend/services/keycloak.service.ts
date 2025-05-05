import Keycloak from 'keycloak-js';

class KeycloakService {
  private keycloak: Keycloak | null = null;
  private initialized = false;
  
  init() {
    if (this.initialized && this.keycloak) {
      return Promise.resolve({ authenticated: this.keycloak.authenticated, keycloak: this.keycloak });
    }
    
    // Debug runtime config
    const config = useRuntimeConfig();
    console.log("Runtime config:", config);
    
    // Use hardcoded defaults if environment variables aren't available
    const keycloakUrl = config.public?.keycloakUrl || 'http://localhost:8080/auth';
    const keycloakRealm = config.public?.keycloakRealm || 'pinx-dashboard';
    const keycloakClientId = config.public?.keycloakClientId || 'pinx-frontend';
    
    console.log("Using Keycloak config:", {
      url: keycloakUrl,
      realm: keycloakRealm,
      clientId: keycloakClientId
    });
    
    this.keycloak = new Keycloak({
      url: keycloakUrl,
      realm: keycloakRealm,
      clientId: keycloakClientId
    });
    
    return this.keycloak.init({
      onLoad: 'check-sso',
      silentCheckSsoRedirectUri: window.location.origin + '/silent-check-sso.html',
      pkceMethod: 'S256',
      checkLoginIframe: false,         // Disable iframe check
      checkLoginIframeInterval: 0,     // Set check interval to 0
      silentCheckSsoFallback: false,   // Disable fallback checks
      enableLogging: true              // Enable Keycloak internal logging
    }).then(authenticated => {
      this.initialized = true;
      console.log("Keycloak initialized successfully, authenticated:", authenticated);
      return { authenticated, keycloak: this.keycloak };
    }).catch(error => {
      console.error('Failed to initialize Keycloak', error);
      throw error;
    });
  }
  
  // Rest of your service remains the same
  getToken() {
    return this.keycloak?.token;
  }
  
  login() {
    if (!this.keycloak) throw new Error('Keycloak not initialized');
    return this.keycloak.login();
  }
  
  // No changes needed if this file already exists
  logout() {
    if (!this.keycloak) return Promise.resolve();
    return this.keycloak.logout();
  }
  
  updateToken(minValidity = 30) {
    if (!this.keycloak) throw new Error('Keycloak not initialized');
    return this.keycloak.updateToken(minValidity);
  }
  
  hasRealmRole(role: string) {
    if (!this.keycloak) return false;
    return this.keycloak.hasRealmRole(role);
  }
}

export const keycloakService = new KeycloakService();