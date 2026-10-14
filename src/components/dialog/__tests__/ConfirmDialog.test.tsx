import React from 'react';
import * as Haptics from 'expo-haptics';
import { fireEvent, render, screen } from '@testing-library/react-native';
import ConfirmDialog from '../ConfirmDialog';

const renderDialog = (visible = true) => {
  const handlers = { onConfirm: jest.fn(), onCancel: jest.fn() };
  return render(
    <ConfirmDialog
      visible={visible}
      title="Remove from Cart ?"
      message="Are you sure?"
      imageUrl="https://img/1.jpg"
      {...handlers}
    />
  ).then(() => handlers);
};

describe('ConfirmDialog', () => {
  it('shows the question and confirms', async () => {
    const { onConfirm } = await renderDialog();

    await fireEvent.press(screen.getByRole('button', { name: 'Confirm' }));

    expect(screen.getByRole('header', { name: 'Remove from Cart ?' })).toBeOnTheScreen();
    expect(screen.getByText('Are you sure?')).toBeOnTheScreen();
    expect(onConfirm).toHaveBeenCalledTimes(1);
  });

  it('cancels', async () => {
    const { onCancel } = await renderDialog();

    await fireEvent.press(screen.getByRole('button', { name: 'Cancel' }));

    expect(onCancel).toHaveBeenCalledTimes(1);
  });

  it('renders nothing while hidden', async () => {
    await renderDialog(false);

    expect(screen.queryByText('Are you sure?')).not.toBeOnTheScreen();
  });

  it('gives a strong haptic when it appears', async () => {
    await renderDialog();

    await fireEvent(screen.getByTestId('confirm-dialog'), 'show');

    expect(Haptics.impactAsync).toHaveBeenCalledWith(Haptics.ImpactFeedbackStyle.Heavy);
  });
});
