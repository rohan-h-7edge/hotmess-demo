import React from 'react';
import { render, screen, waitFor } from '@testing-library/react-native';
import type { RootStackScreenProps } from '@/navigation/types';
import SplashScreen from '../SplashScreen';

const renderSplash = async () => {
  const navigation = { replace: jest.fn() };
  const props = { navigation, route: { key: 'Splash', name: 'Splash' } } as unknown as RootStackScreenProps<'Splash'>;
  await render(<SplashScreen {...props} />);
  return navigation;
};

describe('SplashScreen', () => {
  it('shows the logo and a loading bar', async () => {
    await renderSplash();

    expect(screen.getByLabelText('Hotmess. Elegance, Chic, Exquisite')).toBeOnTheScreen();
    expect(screen.getByRole('progressbar', { name: 'Loading' })).toBeOnTheScreen();
  });

  it('opens the main tabs when loading finishes', async () => {
    const navigation = await renderSplash();

    await waitFor(() => expect(navigation.replace).toHaveBeenCalledWith('Main', { screen: 'Home' }));
  });
});
