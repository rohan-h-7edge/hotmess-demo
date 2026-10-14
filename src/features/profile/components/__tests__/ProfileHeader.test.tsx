import React from 'react';
import { render, screen } from '@testing-library/react-native';
import ProfileHeader from '../ProfileHeader';

describe('ProfileHeader', () => {
  it('shows initials, name, username and email', async () => {
    await render(<ProfileHeader name="Ana Ray" email="ana@x.co" username="anaray" />);

    for (const text of ['AR', 'Ana Ray', '@anaray', 'ana@x.co']) {
      expect(screen.getByText(text)).toBeOnTheScreen();
    }
  });

  it('falls back to the email initial without a name', async () => {
    await render(<ProfileHeader name="" email="zoe@x.co" />);

    expect(screen.getByText('Z')).toBeOnTheScreen();
  });
});
