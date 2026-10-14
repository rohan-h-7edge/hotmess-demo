import { darkColors, lightColors, radius, spacing, textColors, typography } from '..';

describe('theme', () => {
  it('defines the same colors for light and dark mode', () => {
    expect(Object.keys(darkColors).sort()).toEqual(Object.keys(lightColors).sort());
  });

  it('has a spacing scale that grows step by step', () => {
    const steps = Object.values(spacing);
    expect([...steps].sort((a, b) => a - b)).toEqual(steps);
  });

  it('gives every text variant a font size and a theme color', () => {
    for (const [variant, style] of Object.entries(typography)) {
      expect(style.fontSize).toBeGreaterThan(0);
      expect(lightColors).toHaveProperty(textColors[variant as keyof typeof typography]);
    }
  });

  it('keeps pills fully rounded', () => {
    expect(radius.full).toBe(9999);
  });
});
