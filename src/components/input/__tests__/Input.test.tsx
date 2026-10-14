import React, { createRef } from 'react';
import { Text, TextInput } from 'react-native';
import { fireEvent, render, screen } from '@testing-library/react-native';
import Input from '../Input';

describe('Input', () => {
  it('reports typed text', async () => {
    const onChangeText = jest.fn();
    await render(<Input placeholder="Email" value="" onChangeText={onChangeText} />);

    await fireEvent.changeText(screen.getByPlaceholderText('Email'), 'a@b.co');

    expect(onChangeText).toHaveBeenCalledWith('a@b.co');
  });

  it('shows the error message', async () => {
    await render(<Input value="" onChangeText={jest.fn()} error="Email is required" errorTestID="email-error" />);

    expect(screen.getByTestId('email-error')).toHaveTextContent('Email is required');
  });

  it('forwards its ref to the text input', async () => {
    const ref = createRef<TextInput>();
    await render(<Input ref={ref} value="" onChangeText={jest.fn()} />);

    expect(ref.current?.focus).toEqual(expect.any(Function));
  });

  it('renders trailing content inside the field', async () => {
    await render(<Input value="" onChangeText={jest.fn()} trailing={<Text>Show</Text>} />);

    expect(screen.getByText('Show')).toBeOnTheScreen();
  });
});
