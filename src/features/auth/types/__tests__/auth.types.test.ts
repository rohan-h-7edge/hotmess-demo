import { LoginSchema, RegisterSchema } from '../auth.types';

describe('LoginSchema', () => {
  it('trims the username', () => {
    expect(LoginSchema.parse({ username: '  emilys  ', password: 'emilyspass' }).username).toBe('emilys');
  });

  it('uses translation keys as error messages', () => {
    const result = LoginSchema.safeParse({ username: ' ', password: '' });

    expect(result.error?.issues.map((issue) => issue.message)).toEqual([
      'auth:validation.usernameRequired',
      'common:validation.passwordRequired',
    ]);
  });
});

describe('RegisterSchema', () => {
  it('accepts a complete form and trims text fields', () => {
    const input = { firstName: ' Ana ', lastName: 'Ray', email: ' ana@x.co ', username: 'anaray', password: 'secret123' };

    expect(RegisterSchema.parse(input)).toEqual({ ...input, firstName: 'Ana', email: 'ana@x.co' });
  });

  it('uses translation keys as error messages', () => {
    const result = RegisterSchema.safeParse({ firstName: '', lastName: '', email: 'x', username: 'ab', password: 'short' });

    expect(result.error?.issues.map((issue) => issue.message)).toEqual([
      'auth:validation.firstNameRequired',
      'auth:validation.lastNameRequired',
      'common:validation.emailInvalid',
      'auth:validation.usernameTooShort',
      'common:validation.passwordTooShort',
    ]);
  });
});
