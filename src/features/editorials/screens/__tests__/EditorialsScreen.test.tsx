import React from 'react';
import { render, screen } from '@testing-library/react-native';
import EditorialsScreen from '../EditorialsScreen';

describe('EditorialsScreen', () => {
  it('shows the title and a coming soon note', async () => {
    await render(<EditorialsScreen />);

    expect(screen.getByText('Editorials')).toBeOnTheScreen();
    expect(screen.getByText('Coming soon.')).toBeOnTheScreen();
  });
});
