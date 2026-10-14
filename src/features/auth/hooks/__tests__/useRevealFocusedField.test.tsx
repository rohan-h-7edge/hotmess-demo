import React from 'react';
import { renderHook } from '@testing-library/react-native';
import { RevealFocusedFieldContext, revealOffset, useRevealFocusedField } from '../useRevealFocusedField';

describe('revealOffset', () => {
  it('puts the field near the top of the visible area', () => {
    expect(revealOffset(300, 1000, 500, 16)).toBe(284);
  });

  it('stops at the end of the form so the button stays in view', () => {
    expect(revealOffset(900, 1000, 500, 16)).toBe(500);
  });

  it('does not scroll when the form fits or the field is at the top', () => {
    expect(revealOffset(300, 400, 500, 16)).toBe(0);
    expect(revealOffset(8, 1000, 500, 16)).toBe(0);
  });
});

describe('useRevealFocusedField', () => {
  it('returns the reveal function from the layout', async () => {
    const reveal = jest.fn();
    const { result } = await renderHook(() => useRevealFocusedField(), {
      wrapper: ({ children }) => (
        <RevealFocusedFieldContext.Provider value={reveal}>{children}</RevealFocusedFieldContext.Provider>
      ),
    });

    result.current();

    expect(reveal).toHaveBeenCalledTimes(1);
  });
});
