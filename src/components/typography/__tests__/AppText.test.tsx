import React from 'react';
import { render, screen } from '@testing-library/react-native';
import { darkColors, lightColors, typography } from '@/theme';
import AppText from '../AppText';

const mockColorScheme = jest.fn(() => 'light');
jest.mock('react-native/Libraries/Utilities/useColorScheme', () => ({
  __esModule: true,
  default: () => mockColorScheme(),
}));

describe('AppText', () => {
  afterEach(() => mockColorScheme.mockReturnValue('light'));

  it('uses the body variant and the light text color by default', async () => {
    await render(<AppText>Hello</AppText>);

    expect(screen.getByText('Hello')).toHaveStyle({ fontSize: typography.body.fontSize, color: lightColors.text });
  });

  it('applies a variant and a color override', async () => {
    await render(
      <AppText variant="title" color="error">
        Oops
      </AppText>
    );

    expect(screen.getByText('Oops')).toHaveStyle({ fontSize: typography.title.fontSize, color: lightColors.error });
  });

  it('uses the dark palette in dark mode', async () => {
    mockColorScheme.mockReturnValue('dark');

    await render(<AppText>Night</AppText>);

    expect(screen.getByText('Night')).toHaveStyle({ color: darkColors.text });
  });
});
