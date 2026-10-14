import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react-native';
import type { RootStackScreenProps } from '@/navigation/types';
import EditProfileScreen from '../EditProfileScreen';

const mockUpdate = { mutate: jest.fn(), isPending: false, error: null as Error | null };
let mockProfile: object = {};
jest.mock('@/features/user', () => ({
  ...jest.requireActual('@/features/user'),
  useUserProfile: () => mockProfile,
  useUpdateProfile: () => mockUpdate,
}));

const profile = { id: 'u-1', email: 'ana@x.co', firstName: 'Ana', lastName: 'Ray', username: 'anaray' };

const renderEdit = async (data: object | null = profile) => {
  mockProfile = { data };
  const navigation = { goBack: jest.fn() };
  const props = { navigation, route: { key: 'EditProfile', name: 'EditProfile' } } as unknown as RootStackScreenProps<'EditProfile'>;
  await render(<EditProfileScreen {...props} />);
  return navigation;
};

describe('EditProfileScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockUpdate.error = null;
  });

  it('starts with the saved values and a read-only email', async () => {
    await renderEdit();

    expect(screen.getByLabelText('First name')).toHaveDisplayValue('Ana');
    expect(screen.getByLabelText('Username')).toHaveDisplayValue('anaray');
    expect(screen.getByLabelText('Email')).not.toBeEnabled();
  });

  it('saves the edited names and goes back', async () => {
    const navigation = await renderEdit();

    await fireEvent.changeText(screen.getByLabelText('First name'), 'Anna');
    await fireEvent.press(screen.getByRole('button', { name: 'Save Changes' }));
    const [input, options] = mockUpdate.mutate.mock.calls[0];
    options.onSuccess();

    expect(input).toEqual({ firstName: 'Anna', lastName: 'Ray', username: 'anaray' });
    expect(navigation.goBack).toHaveBeenCalledTimes(1);
  });

  it('validates before saving', async () => {
    await renderEdit();

    await fireEvent.changeText(screen.getByLabelText('Username'), 'ab');
    await fireEvent.press(screen.getByRole('button', { name: 'Save Changes' }));

    expect(screen.getByText('Username must be at least 3 characters')).toBeOnTheScreen();
    expect(mockUpdate.mutate).not.toHaveBeenCalled();
  });

  it('shows a save error', async () => {
    mockUpdate.error = new Error('Username taken');
    await renderEdit();

    expect(screen.getByRole('alert')).toHaveTextContent('Username taken');
  });

  it('waits for the profile before showing the form', async () => {
    await renderEdit(null);

    expect(screen.queryByLabelText('First name')).not.toBeOnTheScreen();
  });
});
