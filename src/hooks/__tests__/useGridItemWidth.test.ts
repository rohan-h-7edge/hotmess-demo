import { renderHook } from '@testing-library/react-native';
import { useGridItemWidth } from '../useGridItemWidth';

jest.mock('react-native/Libraries/Utilities/useWindowDimensions', () => ({
  __esModule: true,
  default: () => ({ width: 400, height: 800, scale: 2, fontScale: 1 }),
}));

describe('useGridItemWidth', () => {
  it('splits the window width between columns after padding and gaps', async () => {
    const { result } = await renderHook(() => useGridItemWidth(2, 16, 16));

    expect(result.current).toBe(176);
  });
});
