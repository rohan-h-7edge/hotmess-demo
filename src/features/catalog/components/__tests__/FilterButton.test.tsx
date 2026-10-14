import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react-native';
import FilterButton from '../FilterButton';

describe('FilterButton', () => {
  it('is a labelled button', async () => {
    const onPress = jest.fn();
    await render(<FilterButton onPress={onPress} />);

    await fireEvent.press(screen.getByRole('button', { name: 'Filter' }));

    expect(onPress).toHaveBeenCalledTimes(1);
  });
});
