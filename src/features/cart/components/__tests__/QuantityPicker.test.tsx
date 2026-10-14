import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react-native';
import QuantityPicker from '../QuantityPicker';

describe('QuantityPicker', () => {
  it('shows the quantity and reports a new choice', async () => {
    const onChange = jest.fn();
    await render(<QuantityPicker quantity={1} max={10} onChange={onChange} />);

    await fireEvent.press(screen.getByRole('button', { name: /Quantity: 1/ }));
    await fireEvent.press(screen.getByRole('button', { name: '3' }));

    expect(onChange).toHaveBeenCalledWith(3);
  });

  it('does not report choosing the same quantity', async () => {
    const onChange = jest.fn();
    await render(<QuantityPicker quantity={2} max={10} onChange={onChange} />);

    await fireEvent.press(screen.getByRole('button', { name: /Quantity: 2/ }));
    await fireEvent.press(screen.getByRole('button', { name: '2' }));

    expect(onChange).not.toHaveBeenCalled();
  });
});
