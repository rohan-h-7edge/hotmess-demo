import { api } from '@/services/api';
import { userService } from '../userService';

jest.mock('@/services/api', () => ({ api: { get: jest.fn(), put: jest.fn() } }));

const userDto = { id: 'u-1', email: 'ana@x.co', user_metadata: { first_name: 'Ana', last_name: 'Ray', username: 'anaray' } };
const profile = { id: 'u-1', email: 'ana@x.co', firstName: 'Ana', lastName: 'Ray', username: 'anaray' };

describe('userService', () => {
  it('reads the signed-in user', async () => {
    jest.mocked(api.get).mockResolvedValue(userDto);

    await expect(userService.getProfile()).resolves.toEqual(profile);
    expect(api.get).toHaveBeenCalledWith('/auth/v1/user');
  });

  it('trims and saves the edited names', async () => {
    jest.mocked(api.put).mockResolvedValue(userDto);

    await expect(userService.updateProfile({ firstName: ' Ana ', lastName: 'Ray', username: 'anaray' })).resolves.toEqual(profile);
    expect(api.put).toHaveBeenCalledWith('/auth/v1/user', {
      data: { first_name: 'Ana', last_name: 'Ray', username: 'anaray' },
    });
  });
});
