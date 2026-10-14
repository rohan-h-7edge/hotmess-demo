import { formatPrice } from '../formatPrice';

describe('formatPrice', () => {
  it('formats whole rupees with Indian digit grouping', () => {
    expect(formatPrice(129000, 'INR', 'en-IN')).toBe('₹1,29,000');
    expect(formatPrice(799, 'INR', 'en-IN')).toBe('₹799');
  });
});
