import React from 'react';
import { render, screen } from '@testing-library/react-native';
import ListHeader from '../ListHeader';

describe('ListHeader', () => {
  it('shows the title as a header and the subtitle', async () => {
    await render(<ListHeader title="New In" subtitle="Fresh styles" />);

    expect(screen.getByRole('header', { name: 'New In' })).toBeOnTheScreen();
    expect(screen.getByText('Fresh styles')).toBeOnTheScreen();
  });
});
