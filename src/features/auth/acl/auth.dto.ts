import { z } from 'zod';

export const LoginResponseDtoSchema = z.object({
  id: z.number(),
  accessToken: z.string(),
  refreshToken: z.string(),
});

export const RefreshResponseDtoSchema = z.object({
  accessToken: z.string(),
  refreshToken: z.string(),
});

export const AddUserResponseDtoSchema = z.object({
  id: z.number(),
  username: z.string(),
});

export interface LoginRequestDto {
  username: string;
  password: string;
}

export interface RefreshRequestDto {
  refreshToken: string;
}

export interface AddUserRequestDto {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password: string;
}
