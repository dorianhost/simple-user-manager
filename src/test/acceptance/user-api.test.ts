import Joi from '@hapi/joi';
import faker from 'faker';
import { request } from '../helpers/acceptance-prepare';
import { config } from '../../config/config';
import { createUserResponseSchema } from '../../api/routes/v1/user/validation-schemas';

describe('User API', () => {
  describe('#create user', () => {
    it('should successfully create user', async () => {
      const email = faker.internet.email();
      const response = await request
        .post(config.routes.v1.user)
        .send({ email })
        .expect(201);

      Joi.assert(response.body, createUserResponseSchema);
    });
  });
});
