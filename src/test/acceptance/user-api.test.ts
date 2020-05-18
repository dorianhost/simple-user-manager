import Joi from '@hapi/joi';
import faker from 'faker';
import { request } from '../helpers/acceptance-prepare';
import { config } from '../../config/config';
import { userResponseSchema } from '../../api/routes/v1/user/validation-schemas';
import { IUser } from '../../domain/interfaces/entities/IUser';
import { container } from '../../dependency-injection/container';
import { UserRole } from '../../domain/interfaces/entities/enums/UserRole';

describe('User API', () => {
  describe('#create user', () => {
    it('should successfully create user', async () => {
      const email = faker.internet.email();
      const response = await request
        .post(config.routes.v1.user)
        .send({ email })
        .expect(201);

      Joi.assert(response.body, userResponseSchema);
    });
  });

  describe('#update user', () => {
    let user: IUser;
    beforeAll(async () => {
      user = await container.cradle.userService.createUser(faker.internet.email());
    });

    it('should return 403 if authorization header is missed', async () => {
      await request
        .patch(`${config.routes.v1.user}/${user.id}`)
        .send({ role: UserRole.ADMIN })
        .expect(403);
    });

    it('should make update if authorization header is present', async () => {
      const result = await request
        .patch(`${config.routes.v1.user}/${user.id}`)
        .set({ Authorization: `Bearer ${user.id}` })
        .send({ role: UserRole.ADMIN })
        .expect(200);

      expect({ id: result.body.id, role: result.body.role }).toMatchObject({
        id: user.id,
        role: UserRole.ADMIN,
      });
    });
  });
});
