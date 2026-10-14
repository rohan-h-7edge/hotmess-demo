import { z } from 'zod';

export const AuthUserDtoSchema = z.object({
  id: z.string(),
  email: z.string(),
  user_metadata: z
    .object({
      first_name: z.string().optional(),
      last_name: z.string().optional(),
      username: z.string().optional(),
    })
    .default({}),
});

export interface UpdateAuthUserRequestDto {
  data: {
    first_name: string;
    last_name: string;
    username: string;
  };
}
