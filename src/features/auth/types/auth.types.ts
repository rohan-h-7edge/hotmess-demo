import { z } from 'zod';

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface AuthSession extends AuthTokens {
  userId: string;
}

export interface RegisteredUser {
  id: string;
  username: string;
}

export const LoginSchema = z.object({
  username: z.string().trim().min(1, 'auth:validation.usernameRequired'),
  password: z.string().min(1, 'common:validation.passwordRequired'),
});

export type LoginInput = z.infer<typeof LoginSchema>;

export const RegisterSchema = z.object({
  firstName: z.string().trim().min(1, 'auth:validation.firstNameRequired'),
  lastName: z.string().trim().min(1, 'auth:validation.lastNameRequired'),
  email: z.string().trim().pipe(z.email('common:validation.emailInvalid')),
  username: z.string().trim().min(3, 'auth:validation.usernameTooShort'),
  password: z.string().min(8, 'common:validation.passwordTooShort'),
});

export type RegisterInput = z.infer<typeof RegisterSchema>;
