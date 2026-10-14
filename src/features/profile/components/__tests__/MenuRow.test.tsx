import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react-native';
import { AppText } from '@/components/typography';
import MenuRow from '../MenuRow';

describe('MenuRow', () => {
  it('is a button that reads its label and value', async () => {
    const onPress = jest.fn();
    await render(<MenuRow icon={1} label="My Cart" value="2 items" onPress={onPress} />);

    await fireEvent.press(screen.getByRole('button', { name: 'My Cart, 2 items' }));

    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('shows trailing content and is not a button without onPress', async () => {
    await render(<MenuRow icon={1} label="Language" trailing={<AppText>EN</AppText>} />);

    expect(screen.getByText('EN')).toBeOnTheScreen();
    expect(screen.queryByRole('button')).not.toBeOnTheScreen();
  });
});
