import '../helpers/database-prepare';

import SQL from 'sql-template-strings';
import { generateTestUser } from '../fixtures/generate-test-user';
import { userRepository } from '../../db/repositories/UserRepository';
import { rawSQL } from '../../db/connection';
import { UserModel } from '../../db/models/User';
import { DatabaseError } from '../../errors/DatabaseError';

describe('UserRepository', () => {
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
});
