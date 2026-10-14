import { createContext, useContext } from 'react';

export const RevealFocusedFieldContext = createContext<() => void>(() => undefined);

export const useRevealFocusedField = () => useContext(RevealFocusedFieldContext);

// Puts the focused field at the top of the visible area so the fields and button below it show too,
// without scrolling past the end of the form.
export const revealOffset = (fieldY: number, contentHeight: number, viewportHeight: number, gap: number) =>
  Math.max(0, Math.min(fieldY - gap, contentHeight - viewportHeight));
