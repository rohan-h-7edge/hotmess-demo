import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react-native';
import CouponRow from '../CouponRow';

describe('CouponRow', () => {
  it('is a labelled button', async () => {
    const onPress = jest.fn();
    await render(<CouponRow onPress={onPress} />);

    await fireEvent.press(screen.getByRole('button', { name: 'Apply Coupon' }));

    expect(onPress).toHaveBeenCalledTimes(1);
  });
});
