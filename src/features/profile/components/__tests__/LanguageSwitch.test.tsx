import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react-native';
import LanguageSwitch from '../LanguageSwitch';

const options = [
  { value: 'en', label: 'English' },
  { value: 'hi', label: 'हिन्दी' },
];

describe('LanguageSwitch', () => {
  it('marks the current language and reports a new choice', async () => {
    const onChange = jest.fn();
    await render(<LanguageSwitch value="en" options={options} onChange={onChange} />);

    expect(screen.getByRole('radio', { name: 'English' })).toBeChecked();
    await fireEvent.press(screen.getByRole('radio', { name: 'हिन्दी' }));

    expect(onChange).toHaveBeenCalledWith('hi');
  });
});
