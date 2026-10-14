import * as Haptics from 'expo-haptics';
import { modalOpenFeedback, selectionFeedback } from '../haptics';

describe('haptics', () => {
  it('gives a light tick for selections', () => {
    selectionFeedback();

    expect(Haptics.selectionAsync).toHaveBeenCalledTimes(1);
  });

  it('gives a heavy impact when a modal opens', () => {
    modalOpenFeedback();

    expect(Haptics.impactAsync).toHaveBeenCalledWith(Haptics.ImpactFeedbackStyle.Heavy);
  });
});
