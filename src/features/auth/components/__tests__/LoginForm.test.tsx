import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react-native';
import LoginForm from '../LoginForm';

const renderForm = (props: Partial<React.ComponentProps<typeof LoginForm>> = {}) => {
  const handlers = { onChangeField: jest.fn(), onSubmit: jest.fn() };
  return render(
    <LoginForm
      values={{ username: '', password: '' }}
      errors={{}}
      isSubmitting={false}
      {...handlers}
      {...props}
    />
  ).then(() => handlers);
};

describe('LoginForm', () => {
  it('reports typed values and submits', async () => {
    const { onChangeField, onSubmit } = await renderForm();

    await fireEvent.changeText(screen.getByPlaceholderText('Username'), 'emilys');
    await fireEvent.changeText(screen.getByPlaceholderText('Password'), 'emilyspass');
    await fireEvent.press(screen.getByRole('button', { name: 'Sign In' }));

    expect(onChangeField).toHaveBeenCalledWith('username', 'emilys');
    expect(onChangeField).toHaveBeenCalledWith('password', 'emilyspass');
    expect(onSubmit).toHaveBeenCalledTimes(1);
  });

  it('shows field and submit errors', async () => {
    await renderForm({ errors: { username: 'Username is required' }, submitError: 'Invalid credentials' });

    expect(screen.getByText('Username is required')).toBeOnTheScreen();
    expect(screen.getByRole('alert')).toHaveTextContent('Invalid credentials');
  });
});
