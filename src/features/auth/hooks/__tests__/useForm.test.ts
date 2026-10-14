import { act, renderHook } from '@testing-library/react-native';
import { LoginSchema } from '../../types/auth.types';
import { useForm } from '../useForm';

const renderLoginForm = () => renderHook(() => useForm(LoginSchema, { username: '', password: '' }));

describe('useForm', () => {
  it('shows translated errors for invalid values', async () => {
    const { result } = await renderLoginForm();

    let data;
    await act(async () => {
      data = result.current.validate();
    });

    expect(data).toBeNull();
    expect(result.current.errors).toEqual({ username: 'Username is required', password: 'Password is required' });
  });

  it('clears a field error when that field changes', async () => {
    const { result } = await renderLoginForm();
    await act(async () => {
      result.current.validate();
    });

    await act(async () => {
      result.current.changeField('username', 'emilys');
    });

    expect(result.current.values.username).toBe('emilys');
    expect(result.current.errors).toEqual({ username: undefined, password: 'Password is required' });
  });

  it('returns the parsed values when valid', async () => {
    const { result } = await renderLoginForm();
    await act(async () => {
      result.current.changeField('username', ' emilys ');
      result.current.changeField('password', 'emilyspass');
    });

    let data;
    await act(async () => {
      data = result.current.validate();
    });

    expect(data).toEqual({ username: 'emilys', password: 'emilyspass' });
    expect(result.current.errors).toEqual({});
  });
});
