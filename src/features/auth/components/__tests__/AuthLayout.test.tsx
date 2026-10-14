import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react-native';
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

  it('has no back button unless one is asked for', async () => {
    await render(
      <AuthLayout>
        <AppText>Form</AppText>
      </AuthLayout>
    );

    expect(screen.queryByRole('button', { name: 'Back' })).not.toBeOnTheScreen();
  });

  it('shows a back button at the top that reports presses', async () => {
    const onBackPress = jest.fn();
    await render(
      <AuthLayout onBackPress={onBackPress}>
        <AppText>Form</AppText>
      </AuthLayout>
    );

    await fireEvent.press(screen.getByRole('button', { name: 'Back' }));

    expect(onBackPress).toHaveBeenCalledTimes(1);
  });
});
