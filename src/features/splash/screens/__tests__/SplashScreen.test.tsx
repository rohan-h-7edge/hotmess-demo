import React from 'react';
import { render, screen, waitFor } from '@testing-library/react-native';
import SplashScreen from '../SplashScreen';

describe('SplashScreen', () => {
  it('shows the logo and a loading bar', async () => {
    await render(<SplashScreen onFinish={jest.fn()} />);

    expect(screen.getByLabelText('Hotmess. Elegance, Chic, Exquisite')).toBeOnTheScreen();
    expect(screen.getByRole('progressbar', { name: 'Loading' })).toBeOnTheScreen();
  });

  it('reports when loading finishes', async () => {
    const onFinish = jest.fn();
    await render(<SplashScreen onFinish={onFinish} />);

    await waitFor(() => expect(onFinish).toHaveBeenCalledTimes(1));
  });
});
