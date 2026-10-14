import { toUpdateProfileRequest, toUserProfile } from '../userMapper';

describe('userMapper', () => {
  it('maps the Supabase user and its metadata to a profile', () => {
    expect(
      toUserProfile({
        id: 'u-1',
        email: 'ana@x.co',
        role: 'authenticated',
        user_metadata: { first_name: 'Ana', last_name: 'Ray', username: 'anaray', email_verified: true },
      })
    ).toEqual({ id: 'u-1', email: 'ana@x.co', firstName: 'Ana', lastName: 'Ray', username: 'anaray' });
  });

  it('uses empty names when the metadata is missing', () => {
    expect(toUserProfile({ id: 'u-1', email: 'ana@x.co' })).toEqual({
      id: 'u-1',
      email: 'ana@x.co',
      firstName: '',
      lastName: '',
      username: '',
    });
  });

  it('puts edited names into user metadata with backend names', () => {
    expect(toUpdateProfileRequest({ firstName: 'Ana', lastName: 'Ray', username: 'anaray' })).toEqual({
      data: { first_name: 'Ana', last_name: 'Ray', username: 'anaray' },
    });
  });

  it('rejects a response without an id', () => {
    expect(() => toUserProfile({ email: 'ana@x.co' })).toThrow();
  });
});
