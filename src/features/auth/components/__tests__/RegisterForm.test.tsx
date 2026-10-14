import React from 'react';
import { TextInput } from 'react-native';
import { fireEvent, render, screen } from '@testing-library/react-native';
import RegisterForm from '../RegisterForm';

const emptyValues = { firstName: '', lastName: '', email: '', username: '', password: '' };

describe('RegisterForm', () => {
  it('reports every field and submits', async () => {
    const onChangeField = jest.fn();
    const onSubmit = jest.fn();
    await render(
      <RegisterForm values={emptyValues} errors={{}} isSubmitting={false} onChangeField={onChangeField} onSubmit={onSubmit} />
    );

    await fireEvent.changeText(screen.getByPlaceholderText('First name'), 'Ana');
    await fireEvent.changeText(screen.getByPlaceholderText('Last name'), 'Ray');
    await fireEvent.changeText(screen.getByPlaceholderText('Email'), 'a@x.co');
    await fireEvent.changeText(screen.getByPlaceholderText('Username'), 'anaray');
    await fireEvent.changeText(screen.getByPlaceholderText('Password'), 'secret123');
    await fireEvent.press(screen.getByRole('button', { name: 'Register' }));

    expect(onChangeField.mock.calls).toEqual([
      ['firstName', 'Ana'],
      ['lastName', 'Ray'],
      ['email', 'a@x.co'],
      ['username', 'anaray'],
      ['password', 'secret123'],
    ]);
    expect(onSubmit).toHaveBeenCalledTimes(1);
  });

  it('shows field and submit errors', async () => {
    await render(
      <RegisterForm
        values={emptyValues}
        errors={{ email: 'Enter a valid email address' }}
        submitError="Request failed"
        isSubmitting={false}
        onChangeField={jest.fn()}
        onSubmit={jest.fn()}
      />
    );

    expect(screen.getByText('Enter a valid email address')).toBeOnTheScreen();
    expect(screen.getByRole('alert')).toHaveTextContent('Request failed');
  });

  it('moves through the fields on Next and submits from the password field', async () => {
    const focus = jest.spyOn(TextInput.prototype, 'focus');
    const onSubmit = jest.fn();
    await render(
      <RegisterForm values={emptyValues} errors={{}} isSubmitting={false} onChangeField={jest.fn()} onSubmit={onSubmit} />
    );

    for (const placeholder of ['First name', 'Last name', 'Email', 'Username']) {
      await fireEvent(screen.getByPlaceholderText(placeholder), 'submitEditing');
    }
    expect(focus).toHaveBeenCalledTimes(4);

    await fireEvent(screen.getByPlaceholderText('Password'), 'submitEditing');
    expect(onSubmit).toHaveBeenCalledTimes(1);
    focus.mockClear();
  });
});
