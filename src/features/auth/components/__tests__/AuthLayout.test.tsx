import React from 'react';
import { render, screen } from '@testing-library/react-native';
import { AppText } from '@/components/typography';
import AuthLayout from '../AuthLayout';

describe('AuthLayout', () => {
  it('renders its content', async () => {
    await render(
      <AuthLayout>
        <AppText>Form</AppText>
      </AuthLayout>
    );

    expect(screen.getByText('Form')).toBeOnTheScreen();
  });
});
