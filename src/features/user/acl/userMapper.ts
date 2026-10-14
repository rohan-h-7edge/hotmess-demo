import type { UpdateProfileInput, UserProfile } from '../types/user.types';
import { AuthUserDtoSchema, UpdateAuthUserRequestDto } from './user.dto';

export const toUserProfile = (raw: unknown): UserProfile => {
  const dto = AuthUserDtoSchema.parse(raw);
  return {
    id: dto.id,
    email: dto.email,
    firstName: dto.user_metadata.first_name ?? '',
    lastName: dto.user_metadata.last_name ?? '',
    username: dto.user_metadata.username ?? '',
  };
};

export const toUpdateProfileRequest = (input: UpdateProfileInput): UpdateAuthUserRequestDto => ({
  data: {
    first_name: input.firstName,
    last_name: input.lastName,
    username: input.username,
  },
});
