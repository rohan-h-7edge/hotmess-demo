import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react-native';
import ProfileScreen from '../ProfileScreen';

const mockLogout = { mutate: jest.fn(), isPending: false };
jest.mock('@/features/auth', () => ({ useLogout: () => mockLogout }));

describe('ProfileScreen', () => {
  it('shows the title and signs out', async () => {
    await render(<ProfileScreen />);

    await fireEvent.press(screen.getByRole('button', { name: 'Sign Out' }));

    expect(screen.getByText('Profile')).toBeOnTheScreen();
    expect(mockLogout.mutate).toHaveBeenCalledTimes(1);
  });
});
