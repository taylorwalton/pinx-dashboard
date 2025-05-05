export type Role = "all" | "admin" | "moderator" | "user" | "agent-viewer"
export type Roles = Role | Role[]

export interface RouteMetaAuth {
  checkAuth?: boolean
  authRedirect?: string
  auth?: boolean
  roles?: Roles
}

export interface UserProfile {
  id: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  roles: string[];
}

export interface UserProfile {
  id: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  roles: string[];
  companyId: number | null;
  companyName: string | null;
}