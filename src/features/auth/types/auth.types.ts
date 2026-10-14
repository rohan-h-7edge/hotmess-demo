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
  email: string;
  needsEmailConfirmation: boolean;
}

const EmailSchema = z.string().trim().pipe(z.email('common:validation.emailInvalid'));

export const LoginSchema = z.object({
  email: EmailSchema,
  password: z.string().min(1, 'common:validation.passwordRequired'),
});

export type LoginInput = z.infer<typeof LoginSchema>;

export const RegisterSchema = z.object({
  firstName: z.string().trim().min(1, 'common:validation.firstNameRequired'),
  lastName: z.string().trim().min(1, 'common:validation.lastNameRequired'),
  email: EmailSchema,
  username: z.string().trim().min(3, 'common:validation.usernameTooShort'),
  password: z.string().min(8, 'common:validation.passwordTooShort'),
});

export type RegisterInput = z.infer<typeof RegisterSchema>;
