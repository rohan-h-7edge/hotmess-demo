import React from 'react';
import { render, screen } from '@testing-library/react-native';
import CheckoutBar from '../CheckoutBar';

describe('CheckoutBar', () => {
  it('shows the total and disables checkout when nothing can be bought', async () => {
    await render(<CheckoutBar totalLabel="₹0" canCheckout={false} />);

    expect(screen.getByText('₹0')).toBeOnTheScreen();
    expect(screen.getByRole('button', { name: 'Proceed to Checkout' })).toBeDisabled();
  });
});
