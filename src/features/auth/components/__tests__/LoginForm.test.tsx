import React from 'react';
import { TextInput } from 'react-native';
import { fireEvent, render, screen } from '@testing-library/react-native';
import { RevealFocusedFieldContext } from '../../hooks/useRevealFocusedField';
import LoginForm from '../LoginForm';

const renderForm = (props: Partial<React.ComponentProps<typeof LoginForm>> = {}) => {
  const handlers = { onChangeField: jest.fn(), onSubmit: jest.fn() };
  return render(
    <LoginForm
      values={{ email: '', password: '' }}
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

    await fireEvent.changeText(screen.getByPlaceholderText('Email'), 'ana@x.co');
    await fireEvent.changeText(screen.getByPlaceholderText('Password'), 'secret123');
    await fireEvent.press(screen.getByRole('button', { name: 'Sign In' }));

    expect(onChangeField).toHaveBeenCalledWith('email', 'ana@x.co');
    expect(onChangeField).toHaveBeenCalledWith('password', 'secret123');
    expect(onSubmit).toHaveBeenCalledTimes(1);
  });

  it('shows field and submit errors', async () => {
    await renderForm({ errors: { email: 'Enter a valid email address' }, submitError: 'Invalid login credentials' });

    expect(screen.getByText('Enter a valid email address')).toBeOnTheScreen();
    expect(screen.getByRole('alert')).toHaveTextContent('Invalid login credentials');
  });

  it('moves to the password field on Next and submits on Go', async () => {
    const focus = jest.spyOn(TextInput.prototype, 'focus');
    const { onSubmit } = await renderForm();

    await fireEvent(screen.getByPlaceholderText('Email'), 'submitEditing');
    expect(focus).toHaveBeenCalledTimes(1);

    await fireEvent(screen.getByPlaceholderText('Password'), 'submitEditing');
    expect(onSubmit).toHaveBeenCalledTimes(1);
    focus.mockClear();
  });

  it('scrolls the form when a field gains focus', async () => {
    const reveal = jest.fn();
    await render(
      <RevealFocusedFieldContext.Provider value={reveal}>
        <LoginForm values={{ email: '', password: '' }} errors={{}} isSubmitting={false} onChangeField={jest.fn()} onSubmit={jest.fn()} />
      </RevealFocusedFieldContext.Provider>
    );

    for (const placeholder of ['Email', 'Password']) {
      await fireEvent(screen.getByPlaceholderText(placeholder), 'focus');
    }

    expect(reveal).toHaveBeenCalledTimes(2);
  });
});
