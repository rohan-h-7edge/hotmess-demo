import { useMutation } from '@tanstack/react-query';
import { authService } from '../services/authService';
import type { RegisterInput } from '../types/auth.types';

export const useRegister = () =>
  useMutation({
    mutationFn: (input: RegisterInput) => authService.register(input),
  });
