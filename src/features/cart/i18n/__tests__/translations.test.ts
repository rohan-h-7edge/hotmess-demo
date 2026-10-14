import { cartTranslations } from '..';

const keysOf = (value: object, prefix = ''): string[] =>
  Object.entries(value).flatMap(([key, child]) =>
    typeof child === 'object' && child !== null ? keysOf(child, `${prefix}${key}.`) : [`${prefix}${key}`]
  );

describe('cart translations', () => {
  it('has every English key in every language', () => {
    const englishKeys = keysOf(cartTranslations.en).sort();
    for (const translations of Object.values(cartTranslations)) {
      expect(keysOf(translations).sort()).toEqual(englishKeys);
    }
  });
});
