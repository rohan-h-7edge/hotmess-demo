import { act, renderHook } from '@testing-library/react-native';
import { useDebouncedValue } from '../useDebouncedValue';

describe('useDebouncedValue', () => {
  beforeEach(() => jest.useFakeTimers());
  afterEach(() => jest.useRealTimers());

  it('only updates after the value stops changing for the delay', async () => {
    const { result, rerender } = await renderHook(({ value }: { value: string }) => useDebouncedValue(value, 300), {
      initialProps: { value: 'j' },
    });

    await rerender({ value: 'ja' });
    await act(async () => {
      jest.advanceTimersByTime(200);
    });
    await rerender({ value: 'jac' });
    await act(async () => {
      jest.advanceTimersByTime(200);
    });
    expect(result.current).toBe('j');

    await act(async () => {
      jest.advanceTimersByTime(100);
    });
    expect(result.current).toBe('jac');
  });
});
