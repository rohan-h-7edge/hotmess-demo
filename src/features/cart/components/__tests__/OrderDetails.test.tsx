import React from 'react';
import { render, screen } from '@testing-library/react-native';
import OrderDetails from '../OrderDetails';

describe('OrderDetails', () => {
  it('shows the total', async () => {
    await render(<OrderDetails totalLabel="₹2,580" />);

    expect(screen.getByText('Order Details')).toBeOnTheScreen();
    expect(screen.getByText('₹2,580')).toBeOnTheScreen();
  });
});
