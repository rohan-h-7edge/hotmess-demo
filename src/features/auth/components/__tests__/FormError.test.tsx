import React from 'react';
import { render, screen } from '@testing-library/react-native';
import FormError from '../FormError';

describe('FormError', () => {
  it('announces the message as an alert', async () => {
    await render(<FormError message="Invalid credentials" />);

    expect(screen.getByRole('alert')).toHaveTextContent('Invalid credentials');
  });

  it('renders nothing without a message', async () => {
    await render(<FormError />);

    expect(screen.queryByRole('alert')).not.toBeOnTheScreen();
  });
});
