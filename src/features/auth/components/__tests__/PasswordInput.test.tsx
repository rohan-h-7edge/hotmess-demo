import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react-native';
import PasswordInput from '../PasswordInput';

describe('PasswordInput', () => {
  it('hides the password until the user shows it', async () => {
    await render(<PasswordInput placeholder="Password" value="secret123" onChangeText={jest.fn()} />);
    const input = screen.getByPlaceholderText('Password');
    expect(input).toHaveProp('secureTextEntry', true);

    await fireEvent.press(screen.getByRole('button', { name: 'Show password' }));
    expect(input).toHaveProp('secureTextEntry', false);

    await fireEvent.press(screen.getByRole('button', { name: 'Hide password' }));
    expect(input).toHaveProp('secureTextEntry', true);
  });

  it('reports typed text', async () => {
    const onChangeText = jest.fn();
    await render(<PasswordInput placeholder="Password" value="" onChangeText={onChangeText} />);

    await fireEvent.changeText(screen.getByPlaceholderText('Password'), 'secret123');

    expect(onChangeText).toHaveBeenCalledWith('secret123');
  });
});
