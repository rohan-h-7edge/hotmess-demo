import type { AuthSession, AuthTokens, LoginInput, RegisteredUser, RegisterInput } from '../types/auth.types';
import {
  AddUserRequestDto,
  AddUserResponseDtoSchema,
  LoginRequestDto,
  LoginResponseDtoSchema,
  RefreshRequestDto,
  RefreshResponseDtoSchema,
} from './auth.dto';

export const toAuthSession = (raw: unknown): AuthSession => {
  const dto = LoginResponseDtoSchema.parse(raw);
  return { userId: String(dto.id), accessToken: dto.accessToken, refreshToken: dto.refreshToken };
};

export const toAuthTokens = (raw: unknown): AuthTokens => {
  const dto = RefreshResponseDtoSchema.parse(raw);
  return { accessToken: dto.accessToken, refreshToken: dto.refreshToken };
};

export const toRegisteredUser = (raw: unknown): RegisteredUser => {
  const dto = AddUserResponseDtoSchema.parse(raw);
  return { id: String(dto.id), username: dto.username };
};

export const toLoginRequest = (input: LoginInput): LoginRequestDto => ({
  username: input.username,
  password: input.password,
});

export const toRefreshRequest = (refreshToken: string): RefreshRequestDto => ({ refreshToken });

export const toAddUserRequest = (input: RegisterInput): AddUserRequestDto => ({
  firstName: input.firstName,
  lastName: input.lastName,
  email: input.email,
  username: input.username,
  password: input.password,
});
