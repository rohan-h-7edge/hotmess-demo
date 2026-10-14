import { UpdateProfileSchema } from '../user.types';

describe('UpdateProfileSchema', () => {
  it('trims names', () => {
    expect(UpdateProfileSchema.parse({ firstName: ' Ana ', lastName: 'Ray', username: ' anaray ' })).toEqual({
      firstName: 'Ana',
      lastName: 'Ray',
      username: 'anaray',
    });
  });

  it('uses translation keys as error messages', () => {
    const result = UpdateProfileSchema.safeParse({ firstName: '', lastName: ' ', username: 'ab' });

    expect(result.error?.issues.map((issue) => issue.message)).toEqual([
      'common:validation.firstNameRequired',
      'common:validation.lastNameRequired',
      'common:validation.usernameTooShort',
    ]);
  });
});
