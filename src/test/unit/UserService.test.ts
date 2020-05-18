import { UserRepository } from '../../db/repositories/UserRepository';
import { generateTestUser } from '../fixtures/generate-test-user';
import { container } from '../../dependency-injection/container';
import { IUserService } from '../../domain/interfaces/services/IUserService';

describe('UserService', () => {
  const userService: IUserService = container.cradle.userService;

  describe('#createUser', () => {
    let createUserRepoMock: jest.SpyInstance;

    beforeAll(() => {
      createUserRepoMock = jest.spyOn(UserRepository.prototype, 'createUser');
    });

    afterAll(() => jest.restoreAllMocks());

    afterEach(() => jest.resetAllMocks());

    it('should successfully create user', async () => {
      const user = generateTestUser();
      createUserRepoMock.mockResolvedValue(user);
      const createUserResult = await userService.createUser(user.email);

      expect(createUserResult).toEqual(user);
      expect(createUserRepoMock).toHaveBeenCalledTimes(1);

      const calledParams = createUserRepoMock.mock.calls[0][0];
      expect(calledParams.email).toEqual(user.email);
    });
  });
});
