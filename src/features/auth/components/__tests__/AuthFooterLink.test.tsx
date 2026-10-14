import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react-native';
import AuthFooterLink from '../AuthFooterLink';

describe('AuthFooterLink', () => {
  it('shows the prompt and reports a press on the link', async () => {
    const onPress = jest.fn();
    await render(<AuthFooterLink prompt="No account?" actionLabel="Register" onPress={onPress} />);

    await fireEvent.press(screen.getByRole('link', { name: 'Register' }));

    expect(screen.getByText('No account?')).toBeOnTheScreen();
    expect(onPress).toHaveBeenCalledTimes(1);
  });
});
