import { LoginSchema, RegisterSchema } from '../auth.types';

describe('LoginSchema', () => {
  it('trims the email', () => {
    expect(LoginSchema.parse({ email: '  ana@x.co  ', password: 'secret' }).email).toBe('ana@x.co');
  });

  it('uses translation keys as error messages', () => {
    const result = LoginSchema.safeParse({ email: 'not-an-email', password: '' });

    expect(result.error?.issues.map((issue) => issue.message)).toEqual([
      'common:validation.emailInvalid',
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
