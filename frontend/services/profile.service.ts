import { ApiService } from './api.service'
import type { UserProfile } from '@/types/auth.types'

export interface ProfileUpdateData {
  username?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
}

export class ProfileService extends ApiService {
  async updateProfile(profileData: ProfileUpdateData): Promise<UserProfile> {
    const response = await this.httpClient.put('/profile', profileData);
    return response.profile;
  }
}

export function useProfileService() {
  return new ProfileService();
}