import React from 'react';
import { render, screen } from '@testing-library/react-native';
import AuthHeader from '../AuthHeader';

describe('AuthHeader', () => {
  it('shows the title as a header and the subtitle', async () => {
    await render(<AuthHeader title="Welcome Back" subtitle="Sign in" />);

    expect(screen.getByRole('header', { name: 'Welcome Back' })).toBeOnTheScreen();
    expect(screen.getByText('Sign in')).toBeOnTheScreen();
  });
});
