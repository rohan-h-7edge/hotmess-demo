import React from 'react';
import { render, screen } from '@testing-library/react-native';
import { AppText } from '@/components/typography';
import MenuSection from '../MenuSection';

describe('MenuSection', () => {
  it('shows a heading above its rows', async () => {
    await render(
      <MenuSection title="Settings">
        <AppText>Language</AppText>
      </MenuSection>
    );

    expect(screen.getByRole('header', { name: 'Settings' })).toBeOnTheScreen();
    expect(screen.getByText('Language')).toBeOnTheScreen();
  });
});
