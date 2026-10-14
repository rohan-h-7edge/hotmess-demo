import { z } from 'zod';

const UserDtoSchema = z.object({
  id: z.string(),
  email: z.string(),
});

export const SessionDtoSchema = z.object({
  access_token: z.string(),
  refresh_token: z.string(),
  user: UserDtoSchema,
});

// Signup returns a session when email confirmation is off, otherwise only the user.
export const SignUpResponseDtoSchema = z.union([SessionDtoSchema, UserDtoSchema]);

export interface PasswordGrantRequestDto {
  email: string;
  password: string;
}

export interface RefreshTokenGrantRequestDto {
  refresh_token: string;
}

export interface SignUpRequestDto {
  email: string;
  password: string;
  data: {
    first_name: string;
    last_name: string;
    username: string;
  };
}
