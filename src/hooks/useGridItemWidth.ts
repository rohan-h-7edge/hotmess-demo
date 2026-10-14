import { useWindowDimensions } from 'react-native';

export const useGridItemWidth = (columns: number, horizontalPadding: number, gap: number) => {
  const { width } = useWindowDimensions();
  return (width - horizontalPadding * 2 - gap * (columns - 1)) / columns;
};
