import * as Haptics from 'expo-haptics';

export const selectionFeedback = () => {
  Haptics.selectionAsync();
};

export const modalOpenFeedback = () => {
  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
};
