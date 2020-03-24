import { asClass, createContainer } from 'awilix';
import { IUserRepository } from '../domain/interfaces/repositories/IUserRepository';
import { UserRepository } from '../db/repositories/UserRepository';
import { IUserService } from '../domain/interfaces/services/IUserService';
import { UserService } from '../domain/services/UserService';
import { AppLogger } from '../domain/services/AppLogger';
import { IAppLogger } from '../domain/interfaces/services/IAppLogger';

const container = createContainer({ injectionMode: 'CLASSIC' });

container.register({
  //app infrastructure
  appLogger: asClass<IAppLogger>(AppLogger).singleton(),

  //repositories
  userRepository: asClass<IUserRepository>(UserRepository)
    .singleton()
    .proxy(),

  //services
  userService: asClass<IUserService>(UserService).singleton(),
});

export { container };
