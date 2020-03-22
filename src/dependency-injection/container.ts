import { asClass, createContainer, asFunction } from 'awilix';
import { IUserRepository } from '../domain/interfaces/repositories/IUserRepository';
import { UserRepository } from '../db/repositories/UserRepository';
import { IUserService } from '../domain/interfaces/services/IUserService';
import { UserService } from '../domain/services/UserService';
import { AppLogger } from '../domain/services/AppLogger';
import { createUserHandler } from '../api/routes/v1/user/create-user-handler';

const container = createContainer({ injectionMode: 'CLASSIC' });

container.register({
  appLogger: asClass(AppLogger).singleton(),
  userRepository: asClass<IUserRepository>(UserRepository)
    .singleton()
    .proxy(),
  userService: asClass<IUserService>(UserService).singleton(),

  //routes
  createUserHandler: asFunction(createUserHandler).singleton()
});

export { container };
