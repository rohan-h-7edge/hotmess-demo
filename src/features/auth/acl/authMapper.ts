import type { AuthSession, AuthTokens, LoginInput, RegisteredUser, RegisterInput } from '../types/auth.types';
import {
  PasswordGrantRequestDto,
  RefreshTokenGrantRequestDto,
  SessionDtoSchema,
  SignUpRequestDto,
  SignUpResponseDtoSchema,
} from './auth.dto';

export const toAuthSession = (raw: unknown): AuthSession => {
  const dto = SessionDtoSchema.parse(raw);
  return { userId: dto.user.id, accessToken: dto.access_token, refreshToken: dto.refresh_token };
};

export const toAuthTokens = (raw: unknown): AuthTokens => {
  const dto = SessionDtoSchema.parse(raw);
  return { accessToken: dto.access_token, refreshToken: dto.refresh_token };
};

export const toRegisteredUser = (raw: unknown): RegisteredUser => {
  const dto = SignUpResponseDtoSchema.parse(raw);
  if ('user' in dto) {
    return { id: dto.user.id, email: dto.user.email, needsEmailConfirmation: false };
  }
  return { id: dto.id, email: dto.email, needsEmailConfirmation: true };
};

export const toPasswordGrantRequest = (input: LoginInput): PasswordGrantRequestDto => ({
  email: input.email,
  password: input.password,
});

export const toRefreshTokenGrantRequest = (refreshToken: string): RefreshTokenGrantRequestDto => ({
  refresh_token: refreshToken,
});

export const toSignUpRequest = (input: RegisterInput): SignUpRequestDto => ({
  email: input.email,
  password: input.password,
  data: {
    first_name: input.firstName,
    last_name: input.lastName,
    username: input.username,
  },
});
