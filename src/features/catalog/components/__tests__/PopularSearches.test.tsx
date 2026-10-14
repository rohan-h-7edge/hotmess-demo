import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react-native';
import PopularSearches from '../PopularSearches';

describe('PopularSearches', () => {
  it('reports the term of the tapped chip', async () => {
    const onSelect = jest.fn();
    await render(
      <PopularSearches
        title="Popular searches"
        searches={[
          { term: 'shirt', label: 'Shirts' },
          { term: 'bag', label: 'Bags' },
        ]}
        onSelect={onSelect}
      />
    );

    await fireEvent.press(screen.getByRole('button', { name: 'Bags' }));

    expect(screen.getByRole('header', { name: 'Popular searches' })).toBeOnTheScreen();
    expect(onSelect).toHaveBeenCalledWith('bag');
  });
});
