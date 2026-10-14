import React from 'react';
import { processColor } from 'react-native';
import { render, screen } from '@testing-library/react-native';
import Icon from '../Icon';

describe('Icon', () => {
  it('renders the tinted image at the given size', async () => {
    await render(<Icon source={1} color="#FFFFFF" size={20} />);

    expect(screen.toJSON()).toMatchObject({
      props: { tintColor: processColor('#FFFFFF'), style: { width: 20, height: 20 } },
    });
  });
});
