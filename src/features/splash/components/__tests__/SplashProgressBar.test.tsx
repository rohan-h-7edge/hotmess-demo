import React from 'react';
import { render, screen, waitFor } from '@testing-library/react-native';
import SplashProgressBar from '../SplashProgressBar';

describe('SplashProgressBar', () => {
  it('shows a labelled progress bar', async () => {
    await render(<SplashProgressBar durationMs={2000} accessibilityLabel="Loading" onComplete={jest.fn()} />);

    expect(screen.getByRole('progressbar', { name: 'Loading' })).toBeOnTheScreen();
  });

  it('calls onComplete once the bar has filled', async () => {
    const onComplete = jest.fn();
    await render(<SplashProgressBar durationMs={2000} accessibilityLabel="Loading" onComplete={onComplete} />);

    await waitFor(() => expect(onComplete).toHaveBeenCalledTimes(1));
  });
});
