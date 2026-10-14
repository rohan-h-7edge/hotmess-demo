import { z } from 'zod';

export interface UserProfile {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  username: string;
}

export const UpdateProfileSchema = z.object({
  firstName: z.string().trim().min(1, 'common:validation.firstNameRequired'),
  lastName: z.string().trim().min(1, 'common:validation.lastNameRequired'),
  username: z.string().trim().min(3, 'common:validation.usernameTooShort'),
});

export type UpdateProfileInput = z.infer<typeof UpdateProfileSchema>;
