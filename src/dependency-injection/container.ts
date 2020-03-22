import { asClass, createContainer } from 'awilix';
import { IUserRepository } from '../domain/interfaces/repositories/IUserRepository';
import { UserRepository } from '../db/repositories/UserRepository';
import { IUserService } from '../domain/interfaces/services/IUserService';
import { UserService } from '../domain/services/UserService';
import { AppLogger } from '../domain/services/AppLogger';

const container = createContainer({ injectionMode: 'CLASSIC' });

container.register({
  //app infrastructure
  appLogger: asClass(AppLogger).singleton(),

  //repositories
  userRepository: asClass<IUserRepository>(UserRepository)
    .singleton()
    .proxy(),

  //services
  userService: asClass<IUserService>(UserService).singleton()
});

export { container };
