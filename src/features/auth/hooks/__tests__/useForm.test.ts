import { act, renderHook } from '@testing-library/react-native';
import { LoginSchema } from '../../types/auth.types';
import { useForm } from '../useForm';

const renderLoginForm = () => renderHook(() => useForm(LoginSchema, { email: '', password: '' }));

describe('useForm', () => {
  it('shows translated errors for invalid values', async () => {
    const { result } = await renderLoginForm();

    let data;
    await act(async () => {
      data = result.current.validate();
    });

    expect(data).toBeNull();
    expect(result.current.errors).toEqual({ email: 'Enter a valid email address', password: 'Password is required' });
  });

  it('clears a field error when that field changes', async () => {
    const { result } = await renderLoginForm();
    await act(async () => {
      result.current.validate();
    });

    await act(async () => {
      result.current.changeField('email', 'ana@x.co');
    });

    expect(result.current.values.email).toBe('ana@x.co');
    expect(result.current.errors).toEqual({ email: undefined, password: 'Password is required' });
  });

  it('returns the parsed values when valid', async () => {
    const { result } = await renderLoginForm();
    await act(async () => {
      result.current.changeField('email', ' ana@x.co ');
      result.current.changeField('password', 'secret123');
    });

    let data;
    await act(async () => {
      data = result.current.validate();
    });

    expect(data).toEqual({ email: 'ana@x.co', password: 'secret123' });
    expect(result.current.errors).toEqual({});
  });
});
