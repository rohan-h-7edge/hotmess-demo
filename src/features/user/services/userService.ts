import { api } from '@/services/api';
import { toUpdateProfileRequest, toUserProfile } from '../acl/userMapper';
import { UpdateProfileInput, UpdateProfileSchema, UserProfile } from '../types/user.types';

export const userService = {
  getProfile: async (): Promise<UserProfile> => toUserProfile(await api.get('/auth/v1/user')),

  updateProfile: async (input: UpdateProfileInput): Promise<UserProfile> =>
    toUserProfile(await api.put('/auth/v1/user', toUpdateProfileRequest(UpdateProfileSchema.parse(input)))),
};
