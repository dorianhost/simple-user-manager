import '../helpers/database-prepare';

import faker from 'faker';
import SQL from 'sql-template-strings';
import { generateTestUser } from '../fixtures/generate-test-user';
import { rawSQL } from '../../db/connection';
import { UserModel } from '../../db/models/User';
import { DatabaseError } from '../../errors/DatabaseError';
import { container } from '../../dependency-injection/container';
import { IUserRepository } from '../../domain/interfaces/repositories/IUserRepository';

describe('UserRepository', () => {
  const userRepository = container.resolve<IUserRepository>('userRepository');
  const getUserFromDb = async (userId: string): Promise<UserModel> => {
    const query = SQL`SELECT 
                        id,
                        email,
                        last_action as "lastAction",
                        role,
                        created_at as "createdAt"
                      FROM "user" WHERE id=${userId}`;
    return (await rawSQL<UserModel>(query.text, query.values))[0];
  };

  describe('#createUser', () => {
    it('should create new user', async () => {
      const user = generateTestUser();

      const createResult = await userRepository.createUser(user);
      const userFromDb = await getUserFromDb(user.id);

      expect(user).toEqual(createResult);
      expect(user).toEqual(userFromDb);
    });

    it('should fail when email already exists', async () => {
      const user = await userRepository.createUser(generateTestUser());

      const newUserWithSameEmail = { ...generateTestUser(), email: user.email };

      await expect(userRepository.createUser(newUserWithSameEmail)).rejects.toThrow(DatabaseError);
    });
  });

  describe('#updateUser', () => {
    it('should update user data', async () => {
      const user = generateTestUser();
      await userRepository.createUser(user);

      const newEmail = faker.internet.email();

      const result = await userRepository.updateUser(user.id, { email: newEmail });
      const userFromDb = await getUserFromDb(user.id);

      expect(result).toEqual({ ...user, email: newEmail });
      expect(userFromDb).toEqual({ ...user, email: newEmail });
    });

    it('should fail if user does not exists', async () => {
      await expect(userRepository.updateUser(faker.random.uuid(), {})).rejects.toThrow(DatabaseError);
    });

    it('should fail if email already exists', async () => {
      const firstUser = await userRepository.createUser(generateTestUser());
      const secondUser = await userRepository.createUser(generateTestUser());

      await expect(userRepository.updateUser(firstUser.id, { email: secondUser.email })).rejects.toThrow(DatabaseError);
    });
  });
});
